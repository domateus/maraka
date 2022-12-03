import { dh } from "@cipher/diffieHellman";
import * as RSA from "@cipher/rsa";
import { sha512 } from "@cipher/sha";
import { asciiToHex } from "@cipher/utils";
import ChatInput from "@components/ChatInput";
import Messages from "@components/Messages";
import { commandSet, tell } from "@context/command";
import {
  canScrollToNewMessages,
  gotUnreadMessages,
  setDHK,
  updateKey,
} from "@context/contacts";
import { push } from "@context/messages";
import { RootState } from "@context/store";
import {
  contactValidKey,
  generateKey,
  getCiphertext,
  getPlaintext,
  isKeyValid,
  uuidv4,
} from "@utils";
import { useCallback, useEffect } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import * as S from "./styles";

const Inbox = ({
  socket,
}: {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) => {
  const dispatch = useDispatch();

  const { user, userToChat, psk, rsa } = useSelector(
    (state: RootState) => state.session
  );
  const { contacts } = useSelector((state: RootState) => state.contacts);
  const { messages } = useSelector((state: RootState) => state.messages);

  const sendMessage = ({
    text,
    encryption,
  }: {
    text: string;
    encryption: EncryptionAlgorithm;
  }) => {
    if (!socket || !user) return;
    const contact = contacts.find((c) => c.name === userToChat);
    if (!contact) return;

    let key = contactValidKey({ algorithm: encryption, contact });

    let newMessage: Message<Partial<TextPayload>> = {
      id: uuidv4(),
      from: user,
      to: userToChat,
      timestamp: Date.now(),
      payload: {
        type: "MESSAGE",
        encryption,
      },
    };

    if (!isKeyValid(key)) {
      const newValue = generateKey({ algorithm: encryption, message: text });
      newMessage = {
        ...newMessage,
        payload: {
          ...newMessage.payload,
          key: {
            value: newValue,
            type: encryption,
            timestamp: Date.now(),
            version: key?.version ? key.version + 1 : 1,
          },
        },
      };
      const ciphertext = getCiphertext({
        key: newMessage.payload.key!.value,
        plaintext: text,
        algorithm: encryption,
      });
      const encryptedKey = RSA.encrypt({
        plaintext: newMessage.payload.key!.value,
        key: contact.publicKey,
      });
      newMessage = {
        ...newMessage,
        payload: {
          ...newMessage.payload,
          text: ciphertext,
          key: {
            ...(newMessage.payload!.key as AlgorithmKey),
            value: encryptedKey,
          },
        },
      };
      if (encryption !== "OTP") {
        dispatch(
          updateKey({
            contactName: userToChat,
            key: {
              ...(newMessage.payload!.key as AlgorithmKey),
              value: newValue,
            },
          })
        );
      }
    } else {
      const ciphertext = getCiphertext({
        key: key!.value,
        plaintext: text,
        algorithm: encryption,
      });
      newMessage = {
        ...newMessage,
        payload: {
          ...newMessage.payload,
          text: ciphertext,
        },
      };
    }

    newMessage.hash = sha512(asciiToHex(JSON.stringify(newMessage)));

    dispatch(
      push({
        ...(newMessage as Message<TextPayload>),
        payload: {
          ...(newMessage.payload as TextPayload),
          text,
        },
        channel: userToChat,
      })
    );
    socket.emit("send-message", newMessage);
  };

  const handleTextMessage = useCallback(
    (message: Message<TextPayload>) => {
      const receivedFrom = contacts.find((c) => c.name === message.from);
      if (!receivedFrom) return;

      const cloneMessage = { ...message };
      delete cloneMessage.hash;

      const hash = sha512(asciiToHex(JSON.stringify(cloneMessage)));

      message.hashVerified = message.hash === hash;

      let key = contactValidKey({
        contact: receivedFrom,
        algorithm: message.payload.encryption,
      });

      const refreshKey = () => {
        const decryptedKey = asciiToHex(
          RSA.decrypt({
            ciphertext: message.payload.key!.value,
            key: rsa.privateKey,
          })
        );
        message.payload.key!.value = decryptedKey;
        if (message.payload.encryption !== "OTP") {
          dispatch(
            updateKey({
              contactName: message.from,
              key: {
                ...(message.payload.key as AlgorithmKey),
                value: decryptedKey,
              },
            })
          );
        }
      };

      if (!isKeyValid(key) || message.payload.encryption === "OTP") {
        refreshKey();
      } else if (
        message.payload.key &&
        key &&
        (message.payload.key.version > key.version ||
          message.payload.key.timestamp > key.timestamp)
      ) {
        // when timestamps are different, means that both users have different keys
        // so we will use the one with the latest timestamp
        refreshKey();
      }

      const text = getPlaintext({
        algorithm: message.payload.encryption,
        message: message.payload.text,
        key:
          ((key?.value && message.payload.encryption) === "RSA"
            ? rsa.privateKey
            : key?.value) ?? message!.payload!.key!.value,
      });

      dispatch(
        push({
          ...message,
          payload: {
            ...message.payload,
            text,
          },
          channel: message.from,
        })
      );
      if (message.from !== userToChat) {
        dispatch(gotUnreadMessages(message.from));
      } else {
        dispatch(canScrollToNewMessages(message.from));
      }
    },
    [contacts, dispatch, rsa.privateKey, userToChat]
  );

  const handleDHPSK = useCallback(
    (message: Message<DHPSKPayload>) => {
      if (message.payload.A) {
        socket.emit("send-message", {
          id: uuidv4(),
          from: user,
          to: message.from,
          timestamp: Date.now(),
          payload: {
            type: "DHPSK",
            B: dh({ p: psk.p, e: psk.a, b: psk.q }),
          },
        });

        const dhk = dh({ p: psk.p, e: psk.a, b: message.payload.A });
        dispatch(setDHK({ dhk, name: message.from }));
      } else if (message.payload.B) {
        const dhk = dh({ p: psk.p, e: psk.a, b: message.payload.B });
        dispatch(setDHK({ dhk, name: message.from }));
      }
    },
    [dispatch, psk.a, psk.p, psk.q, socket, user]
  );

  useEffect(() => {
    socket.on("receive-message", (message: Message) => {
      if (message.payload.type === "MESSAGE") {
        handleTextMessage(message as Message<TextPayload>);
      } else if (message.payload.type === "DHPSK") {
        handleDHPSK(message as Message<DHPSKPayload>);
      }
    });
    return () => {
      socket.off("receive-message");
    };
  }, [socket, handleTextMessage, handleDHPSK]);

  if (!userToChat && !contacts.find((u) => u.name === userToChat))
    return <div></div>;

  return (
    <S.Container>
      <Messages />
      <br />
      <ChatInput sendMessage={sendMessage} />
      {contacts.find((u) => u.name === userToChat)?.canScrollToNewMessages && (
        <S.ScrollContainer
          onClick={() =>
            dispatch(
              tell({
                targetId:
                  messages[userToChat][messages[userToChat].length - 1].id,
                name: commandSet.SCROLL_DOWN,
              })
            )
          }
        >
          <IoIosArrowDropdown />
        </S.ScrollContainer>
      )}
    </S.Container>
  );
};

export default Inbox;
