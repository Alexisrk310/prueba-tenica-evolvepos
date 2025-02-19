import React from 'react';

interface SearchBarProps {
	searchTerm: string;
	onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
	return (
		<input
			type="text"
			placeholder="Buscar por nombre"
			value={searchTerm}
			onChange={(e) => onSearch(e.target.value)}
			className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
	);
};

export default SearchBar;
