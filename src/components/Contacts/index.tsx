import Contact from "../Contact";

const Contacts = () => {
  const contacts: Contact[] = [
    {
      name: "katha",
      email: "krenk@email.com",
      id: 3,
    },
    {
      name: "ratheesh",
      email: "rath@email.com",
      id: 4,
    },
    {
      name: "John Doe",
      email: "a@A",
      id: 1,
    },
    {
      name: "Jane Doe",
      email: "asdf@asdf",
      id: 2,
    },
  ];

  return (
    <div>
      {contacts.map((contact) => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </div>
  );
};

export default Contacts;
