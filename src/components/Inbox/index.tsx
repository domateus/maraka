import { gotUnreadMessages } from "@context/contacts";
import { push } from "@context/messages";
import { RootState } from "@context/store";
import { uuidv4 } from "@utils";
import { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
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

  const { messages } = useSelector((state: RootState) => state.messages);
  const { user, userToChat } = useSelector((state: RootState) => state.session);

  console.log("messages", messages);

  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!socket || !user) return;
    const newMessage = {
      id: uuidv4(),
      from: user,
      text: message,
      channel: userToChat,
    };
    dispatch(push(newMessage));
    socket.emit("send-message", { from: user, to: userToChat, text: message });
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    socket.on("receive-message", (message: Message) => {
      dispatch(push({ ...message, channel: message.from }));
      if (message.from !== userToChat) {
        dispatch(gotUnreadMessages(message.from));
      }
    });
    return () => {
      socket.off("receive-message");
    };
  }, [dispatch, socket, user, userToChat]);

  if (!userToChat) return <div></div>;

  return (
    <div>
      <S.Messages>
        {(messages[userToChat] || []).map(({ id, from, text }) =>
          from === user ? (
            <S.MyMessage key={id}>
              <div>{from}</div>
              <div>{text}</div>
            </S.MyMessage>
          ) : (
            <S.TheirMessage key={id}>
              <div>{from}</div>
              <div>{text}</div>
            </S.TheirMessage>
          )
        )}
      </S.Messages>
      <br />
      <S.InputContainer>
        <S.Input
          type="text"
          value={message}
          onKeyDown={handleKeyDown}
          onChange={(e) => setMessage(e.target.value)}
        />
        <S.SendButton onClick={sendMessage}>
          <FiSend color="black" />
        </S.SendButton>
      </S.InputContainer>
    </div>
  );
};

export default Inbox;
