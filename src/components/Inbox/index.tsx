import * as rsa from "@cipher/rsa";
import { asciiToHex } from "@cipher/utils";
import ChatInput from "@components/ChatInput";
import Messages from "@components/Messages";
import { commandSet, tell } from "@context/command";
import {
  canScrollToNewMessages,
  gotUnreadMessages,
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

  const { user, userToChat, keys } = useSelector(
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
      console.log("piece of shiet", newValue);
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
      console.log("new key", newMessage);
      const ciphertext = getCiphertext({
        key: newMessage.payload.key!.value,
        plaintext: text,
        algorithm: encryption,
      });
      const encryptedKey = rsa.encrypt({
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
      console.log("encrypted key", encryptedKey);
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

    console.log("sent the message", newMessage);
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
      let key = contactValidKey({
        contact: receivedFrom,
        algorithm: message.payload.encryption,
      });

      console.log("has a key already?", key);

      const refreshKey = () => {
        const decryptedKey = asciiToHex(
          rsa.decrypt({
            ciphertext: message.payload.key!.value,
            key: keys.privateKey,
          })
        );
        console.log("decrypted key", decryptedKey, message.payload.key!.value);
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

      console.log(
        "received message",
        message.payload.text,
        asciiToHex(key?.value ?? message!.payload!.key!.value)
      );

      const text = getPlaintext({
        algorithm: message.payload.encryption,
        message: message.payload.text,
        key: key?.value ?? message!.payload!.key!.value,
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
    [contacts, dispatch, userToChat]
  );

  useEffect(() => {
    socket.on("receive-message", (message: Message) => {
      if (message.payload.type === "MESSAGE") {
        console.log("received message", message.payload.key);

        handleTextMessage(message as Message<TextPayload>);
      }
    });
    return () => {
      socket.off("receive-message");
    };
  }, [socket, handleTextMessage]);

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
