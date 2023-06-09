import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import {
  addContactAction,
  removeContactAction,
  updateContactAction,
} from 'store/contacts/actions';
import { changeFilterAction } from 'store/filter/actions';
import { contactSelector, filterSelector } from 'store/selectors';

const App = () => {
  const { contacts } = useSelector(contactSelector);
  const { filter } = useSelector(filterSelector);
  /* -------------------------------------------------------------------------- */
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('contacts :>> ', contacts);
  }, [contacts]);
  useEffect(() => {
    console.log('filter  :>> ', filter);
  }, [filter]);
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
      dispatch(addContactAction(newContact));
    }
  };

  /* ------------------------------ CHANGE FILTER ----------------------------- */
  const changeFilter = e => dispatch(changeFilterAction(e.currentTarget.value));
  /* ----------------------------- DELETE CONTACTS ---------------------------- */
  const deleteContact = contactId => {
    dispatch(removeContactAction(contactId));
  };
  /* ------------------------------ EDIT CONTACT ------------------------------ */
  const editContact = contact => {
    dispatch(updateContactAction(contact));
  };
  /* -------------------------- GET FILTERED CONTACTS ------------------------- */
  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
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
        <Filter filter={filter} onChange={changeFilter} />
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
