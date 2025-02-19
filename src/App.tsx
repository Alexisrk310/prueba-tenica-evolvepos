import React, { useState } from 'react';
import { Contact } from './interfaces/Contact';
import { generateId } from './helpers/ValidateContact';
import ContactForm from './components/ContactForm';
import ContactOptions from './components/ContactOptions';
import SearchBar from './components/SearchBar';

const App: React.FC = () => {
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [editingContact, setEditingContact] = useState<Contact | null>(null);
	const [searchTerm, setSearchTerm] = useState('');

	const handleAddOrUpdateContact = (contact: Omit<Contact, 'id'>) => {
		if (editingContact) {
			// Editar contacto existente
			setContacts((prev) =>
				prev.map((c) => (c.id === editingContact.id ? { ...c, ...contact } : c))
			);
			setEditingContact(null);
		} else {
			// Añadir nuevo contacto
			setContacts((prev) => [...prev, { ...contact, id: generateId() }]);
		}
	};

	const handleDeleteContact = (id: string) => {
		setContacts((prev) => prev.filter((contact) => contact.id !== id));
	};

	const filteredContacts = contacts.filter((contact) =>
		contact.nombre.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
				<h1 className="text-3xl font-bold text-center mb-6">
					Agenda de Contactos
				</h1>
				<ContactForm
					onSubmit={handleAddOrUpdateContact}
					initialData={editingContact || undefined}
				/>
				<SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
				<ContactOptions
					contacts={filteredContacts}
					onEdit={setEditingContact}
					onDelete={handleDeleteContact}
				/>
			</div>
		</div>
	);
};

export default App;
