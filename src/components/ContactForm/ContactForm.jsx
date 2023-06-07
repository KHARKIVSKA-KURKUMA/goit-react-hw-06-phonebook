import React, { useState } from 'react';
import { Input, Form, Label, Button } from './ContactForm.styled';

function ContactForm(props) {
  /* ---------------------------------- STATE --------------------------------- */
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  /* ---------------------------------- CLEAN --------------------------------- */
  const cleanField = () => {
    setName('');
    setNumber('');
  };

  /* --------------------------------- SUBMIT --------------------------------- */
  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit({
      name: name,
      number: number,
    });
    cleanField();
  };

  /* --------------------------------- RENDER --------------------------------- */
  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={e => setName(e.currentTarget.value)}
          required
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={e => setNumber(e.currentTarget.value)}
          required
        />
      </Label>
      <Button type="submit">Add contact</Button>
    </Form>
  );
}

export default ContactForm;
