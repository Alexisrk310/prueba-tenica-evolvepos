import { Contact } from "../interfaces/Contact";

export const generateId = (): string => {
    return Math.random().toString(36).substring(2, 9);
  };
  
  export const validateContact = (contact: Omit<Contact, 'id'>): boolean => {
    return (
      contact.nombre.trim() !== '' &&
      contact.telefono.trim() !== '' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)
    );
  };