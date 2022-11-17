import React, { useContext } from "react";
import Contacts from "../src/components/Contacts";
import Inbox from "../src/components/Inbox";
import ThemeToggler from "../src/components/ThemeToggler";
import { Context } from "../src/context";
import * as S from "../styles/pages/chat";

const Chat: React.FC = () => {
  const { theme } = useContext(Context);
  return (
    <>
      <S.Container>
        <S.Header theme={theme}>
          <h1>Chat page</h1>
          <ThemeToggler />
        </S.Header>
        <S.Chat>
          <Contacts />
          <Inbox />
        </S.Chat>
      </S.Container>
    </>
  );
};

export default Chat;
