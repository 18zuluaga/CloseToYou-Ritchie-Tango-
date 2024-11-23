import {useEffect, useState, useCallback, useContext} from 'react';
import {ContactService} from '../service/contact/contact.service';
import {IGroupedContactSection} from '../interface/section.interface';
import {IContact} from '../interface/contact.interface';
import {getErrorMessageAndColor} from '../utilities/getErrorMessageAndColor.function';
import {GlobalContext} from './context/Global.context';

export const useContacts = () => {
  const [contacts, setContacts] = useState<IGroupedContactSection[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const {setSnackbar} = useContext(GlobalContext)!;
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const handlesearch = (name: string) => {
    setSearchQuery(name);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      loadContacts(name);
    }, 300);

    setDebounceTimeout(timeout);
  };

  const loadContacts = useCallback(async (name: string | undefined) => {
    try {
      const contactosAxios = await ContactService.getAll(name);
      setContacts(contactosAxios);
    } catch (err) {
      console.error('Error fetching contacts', err);
    }
  }, []);

  const deleteContact = async (id: number) => {
    try {
      const deleteContacts = await ContactService.delete(id.toString());
      if (deleteContacts) {
        setSnackbar({
          message: `Contacto fue exitosamente eliminado`,
          color: '#77dd77',
        });
        loadContacts(undefined);
      }
      return deleteContacts;
    } catch (err: any) {
      const {message, color} = getErrorMessageAndColor(err.response.status);

      setSnackbar({
        message,
        color,
      });
    }
  };

  const updateContact = async (contact: IContact) => {
    try {
      const address = JSON.stringify(contact.address);
      const formData = new FormData();
      formData.append('name', contact.name);
      formData.append('email', contact.email);
      formData.append('role', contact.role.toString());
      formData.append('phone', contact.phone);
      formData.append('address', address);
      if (contact.image) {
        formData.append('file', {
          uri: contact.image,
          name: `${contact.name}-image.jpg`,
          type: 'image/jpg',
        });
      }
      const updateContacts = await ContactService.update(
        formData,
        contact.id.toString(),
      );
      if (updateContacts) {
        setSnackbar({
          message: `${contact.name} fue exitosamente actualizado`,
          color: '#77dd77',
        });
      }
      return updateContacts;
    } catch (err: any) {
      const {message, color} = getErrorMessageAndColor(err.response.status);

      setSnackbar({
        message,
        color,
      });
    }
  };

  const addContact = async (contact: IContact) => {
    try {
      const address = JSON.stringify(contact.address);
      const formData = new FormData();
      formData.append('name', contact.name);
      formData.append('email', contact.email);
      formData.append('role', contact.role.toString());
      formData.append('phone', contact.phone);
      formData.append('address', address);
      if (contact.image) {
        formData.append('file', {
          uri: contact.image,
          name: `${contact.name}-image.jpg`,
          type: 'image/jpg',
        });
      }

      const newcontact = await ContactService.create(formData);
      if (newcontact) {
        setSnackbar({
          message: `${newcontact.name} fue exitosamente guardado`,
          color: '#77dd77',
        });
      }
      return newcontact;
    } catch (err: any) {
      const {message, color} = getErrorMessageAndColor(err.response.status);

      setSnackbar({
        message,
        color,
      });
    }
  };

  const contactById = async (id: number) => {
    return await ContactService.getById(id.toString());
  };


  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  return {
    contacts,
    setContacts,
    addContact,
    handlesearch,
    searchQuery,
    loadContacts,
    deleteContact,
    updateContact,
    contactById,
  };
};
