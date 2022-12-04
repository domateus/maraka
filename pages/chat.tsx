import * as DH from "@cipher/diffieHellman";
import * as rsa from "@cipher/rsa";
import * as contactsActions from "@context/contacts";
import * as sessionActions from "@context/session";
import { BigInteger } from "jsbn";
import React, { useEffect, useRef } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import Contacts from "../src/components/Contacts";
import Inbox from "../src/components/Inbox";
import ThemeToggler from "../src/components/ThemeToggler";
import { RootState } from "../src/context/store";
import * as S from "../styles/pages/chat";
//"http://fast-chamber-80133.herokuapp.com/"

const socket = io("http://localhost:8000/");

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const hasDSAKeysRef = useRef(false);
  const { user, theme, hasDefinedName, dsa } = useSelector(
    (state: RootState) => state.session
  );
  const { contacts } = useSelector((state: RootState) => state.contacts);
  const pickName = () => {
    if (contacts.find((c) => c.name === user)) {
      alert("Name already taken");
      dispatch(sessionActions.setUser(""));
    } else if (user.length > 14) {
      alert("Username is too long, max us 14 caracters");
      return;
    } else {
      dispatch(sessionActions.defineName());
      const { publicKey, privateKey } = rsa.parseKeys(rsa.generateKeys());
      dispatch(sessionActions.setRsa({ publicKey, privateKey }));
      socket.emit("add", { user, publicKey, dsak: dsa.y });
    }
  };

  useEffect(() => {
    socket.emit("hi");

    socket.on("psks", ({ dh, dsa: DSA }) => {
      if (hasDSAKeysRef.current) {
        return;
      }
      hasDSAKeysRef.current = true;
      dispatch(
        sessionActions.setDHConstants({ p: dh.p, q: dh.q, a: DH.secretKey() })
      );
      const x = new BigInteger(
        window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16),
        16
      );
      const y = new BigInteger(DSA.g, 16).modPow(x, new BigInteger(DSA.p, 16));
      dispatch(
        sessionActions.setDSAConstants({
          ...DSA,
          x: x.toString(16).padStart(256, "0"),
          y: y.toString(16).padStart(256, "0"),
        })
      );
    });
    socket.on("users", (users) => {
      dispatch(contactsActions.set(users));
    });
    socket.on("new-user", (newUser) => {
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
      socket.off("dhpsk");
    };
  }, [dispatch, user, hasDefinedName]);

  if (!hasDefinedName) {
    return (
      <S.Container>
        <h1>Pick your name!</h1>
        <input
          disabled={!dsa.y}
          autoFocus
          value={user}
          onChange={(e) => dispatch(sessionActions.setUser(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Enter") pickName();
          }}
        />
        {user.length} / 14
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
        <h1>{user}</h1>
        <ThemeToggler />
      </S.Header>
      <S.Chat>
        <Contacts socket={socket} />
        <Inbox socket={socket} />
      </S.Chat>
    </S.Container>
  );
};

export default Chat;
