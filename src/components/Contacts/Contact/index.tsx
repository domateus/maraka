import { readMessages } from "@context/contacts";
import { setUserToChat } from "@context/session";
import { RootState } from "@context/store";
import { MdOutlineModeComment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import * as S from "../styles";

const Contact: React.FC<{ contact: Contact }> = ({ contact }) => {
  const dispatch = useDispatch();

  const { userToChat } = useSelector((state: RootState) => state.session);

  return (
    <S.Container
      onClick={() => {
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
