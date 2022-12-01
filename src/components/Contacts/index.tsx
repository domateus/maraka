import { RootState } from "@context/store";
import { useSelector } from "react-redux";
import Contact from "./Contact";
import * as S from "./styles";

const Contacts = () => {
  const { contacts } = useSelector((state: RootState) => state.contacts);
  return (
    <S.Container>
      {contacts.map((contact) => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </S.Container>
  );
};

export default Contacts;
