import React, { useState } from 'react';

const Search = ({ onSearch }) => {
	const [query, setQuery] = useState('');

	const handleChange = (e) => {
		// Actualizar el estado de la consulta de búsqueda
		const value = e.target.value;
		setQuery(value);

		// Llamar a la función de búsqueda con la consulta actual
		onSearch(value);
	};

	return (
		<div className="py-4 relative">
			<input
				type="text"
				placeholder="Buscar por título, contenido o autor..."
				value={query}
				onChange={handleChange}
				className="w-full border rounded-lg p-2 flex-grow"
			/>
		</div>
	);
};

export default Search;
