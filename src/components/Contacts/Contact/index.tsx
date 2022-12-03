import { dh } from "@cipher/diffieHellman";
import { readMessages } from "@context/contacts";
import { setUserToChat } from "@context/session";
import { RootState } from "@context/store";
import { uuidv4 } from "@utils";
import { MdOutlineModeComment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import * as S from "../styles";

const Contact: React.FC<{
  contact: Contact;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}> = ({ contact, socket }) => {
  const dispatch = useDispatch();

  const { userToChat, user, psk } = useSelector(
    (state: RootState) => state.session
  );

  return (
    <S.Container
      onClick={() => {
        if (!contact?.dhk) {
          const keyExchange: Message<DHPSKPayload> = {
            from: user,
            to: contact.name,
            id: uuidv4(),
            timestamp: Date.now(),
            payload: {
              type: "DHPSK",
              A: dh({ p: psk.p, b: psk.q, e: psk.a }),
            },
          };
          console.log("keyExchange", keyExchange);
          socket.emit("send-message", keyExchange);
        }
        dispatch(setUserToChat(contact.name));
        dispatch(readMessages(contact.name));
      }}
    >
      <S.Contact $selected={userToChat === contact.name}>
        <span>{contact.name}</span>
        {contact.hasUnreadMessages && <MdOutlineModeComment />}
      </S.Contact>
    </S.Container>
  );
};

export default Contact;
