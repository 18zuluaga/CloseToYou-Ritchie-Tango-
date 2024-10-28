import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState, useCallback} from 'react';
import {defaultContacts} from '../utilities/const/contacts.const';
import {Contact} from '../interface/contact.interface';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(contacts);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const handlesearch = (name: string) => {
    setSearchQuery(name);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().startsWith(name.toLowerCase()),
      );
      setFilteredContacts(filtered);
    }, 300);

    setDebounceTimeout(timeout);
  };

  const loadContacts = useCallback(async () => {
    const contactsStorage = await AsyncStorage.getItem('contacts');
    const contIdStorage = await AsyncStorage.getItem('contId');
    if (contactsStorage && contIdStorage) {
      const parsedContacts = JSON.parse(contactsStorage);
      setContacts(parsedContacts);
      setFilteredContacts(parsedContacts);
    } else {
      await AsyncStorage.setItem('contacts', JSON.stringify(defaultContacts));
      await AsyncStorage.setItem(
        'contId',
        JSON.stringify(defaultContacts.length),
      );
      setContacts(defaultContacts);
      setFilteredContacts(defaultContacts);
    }
  }, []);

  const deleteContact = async (id: number) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    setFilteredContacts(updatedContacts);
    await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const updateContact = async (contactReq: Contact) => {
    const updatedContacts = contacts.filter(
      contact => contact.id !== contactReq.id,
    );
    updatedContacts.push(contactReq);
    setContacts(updatedContacts);
    setFilteredContacts(updatedContacts);
    await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const addContact = async (contact: Contact) => {
    const contIdStorage = await AsyncStorage.getItem('contId');
    if (contIdStorage) {
      const contId = +JSON.parse(contIdStorage) + 1;
      const updatedContacts = [...contacts, {...contact, id: contId}];
      setContacts(updatedContacts);
      console.log(updatedContacts);
      setFilteredContacts(updatedContacts);
      await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
    }
  };

  const groupedContacts = () => {
    const sections = filteredContacts.reduce((acc, contact) => {
      const firstLetter = contact.name[0].toUpperCase();
      const section = acc.find(sec => sec.title === firstLetter);

      if (section) {
        section.data.push(contact);
      } else {
        acc.push({title: firstLetter, data: [contact]});
      }
      return acc;
    }, [] as {title: string; data: typeof contacts}[]);

    return sections.sort((a, b) => a.title.localeCompare(b.title));
  };

  // Cargar contactos al montar el componente
  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  // Efecto para limpiar el timeout de búsqueda
  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  return {
    contacts: filteredContacts,
    groupedContacts,
    setContacts,
    addContact,
    handlesearch,
    searchQuery,
    loadContacts,
    deleteContact,
    updateContact,
  };
};
