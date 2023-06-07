import { List, Items } from './Contact.styled';
import ContactListItem from './ContactItem';

const ContactList = ({ contacts, onDeleteClick, onEditClick }) => {
  return (
    <List>
      {contacts.map(({ id, name, number }) => (
        <Items key={id}>
          <ContactListItem
            id={id}
            name={name}
            number={number}
            onDeleteClick={onDeleteClick}
            onEditClick={onEditClick}
          />
        </Items>
      ))}
    </List>
  );
};

export default ContactList;
