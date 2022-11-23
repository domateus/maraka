import { RootState } from "@context/store";
import { useSelector } from "react-redux";
import Contact from "./Contact";

const Contacts = () => {
  const { contacts } = useSelector((state: RootState) => state.contacts);
  return (
    <div>
      {contacts.map((contact) => (
        <Contact key={contact.name} contact={contact} />
      ))}
    </div>
  );
};

export default Contacts;
