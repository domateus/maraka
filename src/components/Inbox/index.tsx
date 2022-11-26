import ChatInput from "@components/ChatInput";
import Messages from "@components/Messages";
import { commandSet, tell } from "@context/command";
import { canScrollToNewMessages, gotUnreadMessages } from "@context/contacts";
import { push } from "@context/messages";
import { RootState } from "@context/store";
import { uuidv4 } from "@utils";
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

  const { user, userToChat } = useSelector((state: RootState) => state.session);
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
    const newMessage: Message<TextPayload> = {
      id: uuidv4(),
      from: user,
      to: userToChat,
      timestamp: Date.now(),
      payload: {
        type: "MESSAGE",
        text,
        encryption,
      },
    };
    dispatch(push({ ...newMessage, channel: userToChat }));
    socket.emit("send-message", newMessage);
  };

  const handleTextMessage = useCallback(
    (message: Message<TextPayload>) => {
      dispatch(push({ ...message, channel: message.from }));
      if (message.from !== userToChat) {
        dispatch(gotUnreadMessages(message.from));
      } else {
        dispatch(canScrollToNewMessages(message.from));
      }
    },
    [dispatch, userToChat]
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
