import React, { useState } from 'react';
import { Contact } from '../interfaces/Contact';
import { validateContact } from '../helpers/ValidateContact';

interface ContactFormProps {
	onSubmit: (contact: Omit<Contact, 'id'>) => void;
	initialData?: Omit<Contact, 'id'>;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, initialData }) => {
	const [nombre, setNombre] = useState(initialData?.nombre || '');
	const [telefono, setTelefono] = useState(initialData?.telefono || '');
	const [email, setEmail] = useState(initialData?.email || '');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newContact = { nombre, telefono, email };
		if (validateContact(newContact)) {
			onSubmit(newContact);
			setNombre('');
			setTelefono('');
			setEmail('');
		} else {
			alert('Por favor, completa todos los campos correctamente.');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<input
				type="text"
				placeholder="Nombre"
				value={nombre}
				onChange={(e) => setNombre(e.target.value)}
				className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<input
				type="text"
				placeholder="Teléfono"
				value={telefono}
				onChange={(e) => setTelefono(e.target.value)}
				className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<button
				type="submit"
				className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300">
				{initialData ? 'Guardar Cambios' : 'Añadir Contacto'}
			</button>
		</form>
	);
};

export default ContactForm;
