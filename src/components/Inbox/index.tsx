import { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import * as S from "./styles";

const user = "Maraka";

const Inbox = () => {
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    !socket && setSocket(io("ws://localhost:5000"));
    socket &&
      socket.on("message", (message: Message) => {
        console.log(message);
        setMessages((messages) => [...messages, message]);
      });

    socket && socket.on("users", (a) => console.log("sd", a));
  }, [socket]);

  const sendMessage = () => {
    if (!socket) return;
    setMessages((messages) => [
      ...messages,
      { author: user, text: message, id: 42 },
    ]);
    socket.emit("message", message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div>
      <S.Messages>
        {messages.map((message, index) =>
          message.author === user ? (
            <S.MyMessage key={index}>
              <div>{message.author}</div>
              <div>{message.text}</div>
            </S.MyMessage>
          ) : (
            <S.TheirMessage key={index}>
              <div>{message.author}</div>
              <div>{message.text}</div>
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
      <button
        onClick={() => {
          if (!socket) return;
          socket.emit("users", "a");
        }}
      >
        asdfasdf
      </button>
    </div>
  );
};

export default Inbox;
