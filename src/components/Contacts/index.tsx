import { RootState } from "@context/store";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import Contact from "./Contact";
import * as S from "./styles";

const Contacts = ({
  socket,
}: {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) => {
  const { contacts } = useSelector((state: RootState) => state.contacts);
  return (
    <S.Container>
      {contacts.map((contact) => (
        <Contact socket={socket} key={contact.id} contact={contact} />
      ))}
    </S.Container>
  );
};

export default Contacts;
