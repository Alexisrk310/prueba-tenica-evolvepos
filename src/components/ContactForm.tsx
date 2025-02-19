import React, { useState } from 'react';
import { Contact } from '../interfaces/Contact';
import { validateContact } from '../helpers/ValidateContact';

interface ContactFormProps {
	onSubmit: (contact: Omit<Contact, 'id'>) => void;
	initialData?: Omit<Contact, 'id'>;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, initialData }) => {
	
	const [formData, setFormData] = useState<Omit<Contact, 'id'>>({
		nombre: initialData?.nombre || '',
		telefono: initialData?.telefono || '',
		email: initialData?.email || '',
	});

	
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateContact(formData)) {
			onSubmit(formData);
			setFormData({ nombre: '', telefono: '', email: '' }); 
		} else {
			alert('Por favor, completa todos los campos correctamente.');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label className="block text-sm font-medium text-gray-700">
					Nombre
				</label>
				<input
					type="text"
					name="nombre"
					placeholder="Nombre"
					value={formData.nombre}
					onChange={handleInputChange}
					className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">
					Teléfono
				</label>
				<input
					type="text"
					name="telefono"
					placeholder="Teléfono"
					value={formData.telefono}
					onChange={handleInputChange}
					className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">Email</label>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleInputChange}
					className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<button
				type="submit"
				className="w-full bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-400 transition duration-300">
				{initialData ? 'Guardar Cambios' : 'Añadir Contacto'}
			</button>
		</form>
	);
};

export default ContactForm;
