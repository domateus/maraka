import { RootState } from "@context/store";
import { useSelector } from "react-redux";
import Message from "./Message";
import * as S from "./styles";

const Messages: React.FC = () => {
  const { messages } = useSelector((state: RootState) => state.messages);
  const { userToChat } = useSelector((state: RootState) => state.session);

  return (
    <S.Messages>
      {(messages[userToChat] || []).map((message, i, self) => (
        <Message
          key={message.id}
          message={message}
          isLast={i === self.length - 1}
        />
      ))}
    </S.Messages>
  );
};

export default Messages;
