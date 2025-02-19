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
			setContacts((prev) =>
				prev.map((c) => (c.id === editingContact.id ? { ...c, ...contact } : c))
			);
			setEditingContact(null);
		} else {
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
		<div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
				
				<div className="bg-white p-6 rounded-xl shadow-lg">
					<h2 className="text-2xl font-bold text-gray-800 mb-6">
						{editingContact ? 'Editar Contacto' : 'Añadir Contacto'}
					</h2>
					<ContactForm
						onSubmit={handleAddOrUpdateContact}
						initialData={editingContact || undefined}
					/>
				</div>

				
				<div className="bg-white p-6 rounded-xl shadow-lg">
					<h2 className="text-2xl font-bold text-gray-800 mb-6">
						Lista de Contactos
					</h2>
					<SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
					<ContactOptions
						contacts={filteredContacts}
						onEdit={setEditingContact}
						onDelete={handleDeleteContact}
					/>
				</div>
			</div>
		</div>
	);
};

export default App;
