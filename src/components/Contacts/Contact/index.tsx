import { setUserToChat } from "@context/session";
import { RootState } from "@context/store";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./styles";
const Contact: React.FC<{ contact: Contact }> = ({ contact }) => {
  const dispatch = useDispatch();

  const { userToChat } = useSelector((state: RootState) => state.session);
  return (
    <S.Container onClick={() => dispatch(setUserToChat(contact.name))}>
      <S.Contact $selected={userToChat === contact.name}>
        <h3>{contact.name}</h3>
      </S.Contact>
    </S.Container>
  );
};

export default Contact;
