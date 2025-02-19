import React from 'react';
import { Contact } from '../interfaces/Contact';

interface ContactListProps {
	contacts: Contact[];
	onEdit: (contact: Contact) => void;
	onDelete: (id: string) => void;
}

const ContactOptions: React.FC<ContactListProps> = ({
	contacts,
	onEdit,
	onDelete,
}) => {
	return (
		<div className="space-y-4 mt-6">
			{contacts.map((contact) => (
				<div
					key={contact.id}
					className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
					<div className="flex justify-between items-center">
						<div>
							<h3 className="text-lg font-semibold text-gray-800">
								{contact.nombre}
							</h3>
							<p className="text-sm text-gray-600">{contact.telefono}</p>
							<p className="text-sm text-gray-600">{contact.email}</p>
						</div>
						<div className="space-x-2">
							<button
								onClick={() => onEdit(contact)}
								className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-300">
								Editar
							</button>
							<button
								onClick={() => onDelete(contact.id)}
								className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300">
								Eliminar
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default ContactOptions;
