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
  decryptKey,
  encryptKey,
  generateKey,
  getCiphertext,
  getPlaintext,
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
    const key =
      contactValidKey({ algorithm: encryption, contact }) ??
      generateKey({ algorithm: encryption, message: text });

    const ciphertext = getCiphertext({
      key: key as string,
      plaintext: text,
      algorithm: encryption,
    });
    const newMessage: Message<TextPayload> = {
      id: uuidv4(),
      from: user,
      to: userToChat,
      timestamp: Date.now(),
      payload: {
        type: "MESSAGE",
        text: ciphertext,
        encryption,
      },
    };
    if (encryption !== "OTP") {
      dispatch(
        updateKey({ contactName: userToChat, key: key as AlgorithmKey })
      );
    } else {
      newMessage.payload.key = encryptKey({
        message: key as string,
        publicKey: contact.publicKey,
      });
    }
    console.log("sent the message", newMessage);
    dispatch(
      push({
        ...newMessage,
        payload: { ...newMessage.payload, text },
        channel: userToChat,
      })
    );
    socket.emit("send-message", newMessage);
  };

  const handleTextMessage = useCallback(
    (message: Message<TextPayload>) => {
      const receivedFrom = contacts.find((c) => c.name === message.from);
      if (!receivedFrom) return;
      const key =
        message.payload.encryption === "OTP"
          ? ({
              timestamp: message.timestamp,
              value: decryptKey({
                message: message.payload.key as string,
                privateKey: keys?.privateKey,
              }),
              type: "OTP",
            } as AlgorithmKey)
          : contactValidKey({
              contact: receivedFrom,
              algorithm: message.payload.encryption,
            });

      const text = getPlaintext({
        algorithm: message.payload.encryption,
        message: message.payload.text,
        key: key!.value as string,
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
      console.log("received message", message);
      if (message.payload.type === "MESSAGE") {
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
