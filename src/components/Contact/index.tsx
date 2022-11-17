const Contact: React.FC<{ contact: Contact }> = ({ contact }) => {
  return (
    <div>
      <div>
        <h3>{contact.name}</h3>
        <p>{contact.email}</p>
      </div>
    </div>
  );
};

export default Contact;
