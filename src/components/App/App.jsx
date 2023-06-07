import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {
  Title,
  Container,
  FormWrap,
  ContactWrap,
  SubTitle,
  Notification,
} from './App.styled';
import ContactForm from '../ContactForm';
import { nanoid } from 'nanoid';
import ContactList from '../ContactList';
import Filter from 'components/Filter/Filter';
import useLocalStorage from 'hooks/useLocalStorage';

const App = () => {
  /* ---------------------------------- STATE --------------------------------- */
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filterText, setFilterText] = useState('');

  /* ------------------------------- ADD CONTACT ------------------------------ */
  const addContact = ({ name, number }) => {
    if (contacts.find(contact => contact.name === name)) {
      toast.error(`${name} is already in your contacts!`);
    } else {
      const newContact = {
        id: nanoid(15),
        name: name,
        number: number,
      };
      setContacts(prev => [newContact, ...prev]);
    }
  };

  /* ------------------------------ CHANGE FILTER ----------------------------- */
  const changeFilter = e => setFilterText(e.currentTarget.value);

  /* ----------------------------- DELETE CONTACTS ---------------------------- */
  const deleteContact = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };
  /* ------------------------------ EDIT CONTACT ------------------------------ */
  const editContact = contact => {
    setContacts(prev =>
      prev.map(el => {
        if (el.id === contact.id) {
          return contact;
        }
        return el;
      })
    );
  };
  /* -------------------------- GET FILTERED CONTACTS ------------------------- */
  const getFilteredContacts = () => {
    const normalizedFilter = filterText.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  /* --------------------------------- RENDER --------------------------------- */
  return (
    <Container>
      <ToastContainer autoClose={1500} theme="colored" />
      <FormWrap>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={addContact} />
      </FormWrap>
      <div>
        <SubTitle>Contacts</SubTitle>
        <Filter filter={filterText} onChange={changeFilter} />
        {getFilteredContacts().length > 0 ? (
          <ContactWrap>
            <ContactList
              contacts={getFilteredContacts()}
              onDeleteClick={deleteContact}
              onEditClick={editContact}
            ></ContactList>
          </ContactWrap>
        ) : (
          <Notification>You don't have contacts</Notification>
        )}
      </div>
    </Container>
  );
};
export default App;
