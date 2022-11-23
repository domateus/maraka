import * as contactsActions from "@context/contacts";
import * as sessionActions from "@context/session";
import React, { useEffect } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import Contacts from "../src/components/Contacts";
import Inbox from "../src/components/Inbox";
import ThemeToggler from "../src/components/ThemeToggler";
import { RootState } from "../src/context/store";
import * as S from "../styles/pages/chat";

const socket = io("http://fast-chamber-80133.herokuapp.com/");

const Chat: React.FC = () => {
  const dispatch = useDispatch();

  const { user, theme, hasDefinedName } = useSelector(
    (state: RootState) => state.session
  );
  const { contacts } = useSelector((state: RootState) => state.contacts);

  const pickName = () => {
    if (contacts.find((c) => c.name === user)) {
      alert("Name already taken");
      dispatch(sessionActions.setUser(""));
    } else {
      dispatch(sessionActions.defineName());
      socket.emit("add", user);
    }
  };

  useEffect(() => {
    socket.on("users", (users) => {
      console.log("users", users);
      dispatch(contactsActions.set(users));
    });
    socket.on("new-user", (newUser) => {
      console.log("new user", newUser);
      dispatch(contactsActions.push(newUser));
    });
    socket.on("user-disconnected", (userToRemove) => {
      dispatch(contactsActions.remove(userToRemove));
    });
    hasDefinedName && socket.emit("get-users", user);
    socket.on("disconnect", console.log);

    return () => {
      socket.off("users");
      socket.off("new-user");
      socket.off("user-disconnected");
      socket.off("disconnect");
    };
  }, [dispatch, user, hasDefinedName]);

  if (!hasDefinedName) {
    return (
      <S.Container>
        <h1>Pick your name!</h1>
        <input
          autoFocus
          value={user}
          onChange={(e) => dispatch(sessionActions.setUser(e.target.value))}
          onBlur={pickName}
          onKeyDown={(e) => {
            if (e.key === "Enter") pickName();
          }}
        />
      </S.Container>
    );
  }

  if (!socket)
    return (
      <S.Container>
        <ImSpinner2 />
      </S.Container>
    );

  return (
    <S.Container>
      <S.Header theme={theme}>
        <h1>Chat page ─ {user}</h1>
        <button onClick={() => socket.emit("remove", user)}>Disconnect</button>
        <ThemeToggler />
      </S.Header>
      <S.Chat>
        <Contacts />
        <Inbox socket={socket} />
      </S.Chat>
    </S.Container>
  );
};

export default Chat;
