import React, { Component } from 'react';
import shortid from 'shortid';
import Container from './components/Container';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactsList from './components/ContactsList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  
  componentDidUpdate(prevProps, prevState) {

    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      console.log('Обновилось поле contacts, записываю contacts в хранилище');
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  addContact = ({ name, number }) => {
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  onDeleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  onSubmitData = data => {
    const { contacts } = this.state;

    const addContact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };

    if (contacts.find(contact => contact.name === addContact.name)) {
      alert(`${addContact.name} is already in contacts!`);
      return;
    }

    this.setState({
      contacts: [...contacts, addContact],
    });
  };

  render() {
    const {  contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
    return (
      <>
        <Container>
          <h1>Phonebook:</h1>
          <ContactForm onSubmitData={this.onSubmitData} />
          {contacts.length !==0 && (
            <>
            {contacts.length > 1 && (
              <Filter value={filter} changeFilter={this.changeFilter} />
            )}
            <h2>Contacts:</h2>
            <ContactsList
              contacts={filteredContacts}
              onDeleteContact={this.onDeleteContact}
            />
            </>
          )}
        </Container>
      </>
    );
  }
}

export default App;
