import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // Necesario si estás utilizando React Router
import ApiService from '../services/Api';

/**
 * Detail Component - Displays detailed information about a specific entry.
 * @returns {JSX.Element} Detail component UI
 */
const Detail = () => {
	const { entryId } = useParams();
	const [entry, setEntry] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	/**
	 * Fetches the details of the entry from the API.
	 */
	useEffect(() => {
		const fetchEntryDetail = async () => {
			try {
				const data = await ApiService.getEntry(entryId);
				setEntry(data);
				setIsLoading(false);
			} catch (error) {
				setError(error.message);
				setIsLoading(false);
			}
		};
		fetchEntryDetail();
		return () => {
			setEntry(null);
		};
	}, [entryId]);

	// Render loading state if data is still loading
	if (isLoading) {
		return <div>Cargando...</div>;
	}
	// Render error message if there's an error
	if (error) {
		return <div>Error: {error}</div>;
	}
	// Render message if entry is not found
	if (!entry) {
		return <div>No se encontró la entrada</div>;
	}
	// Render the detailed information of the entry
	return (
		<div className="p-8">
			<Link className="p-2 bg-black text-sm text-white" to="/">
				← regresar
			</Link>
			<div className="flex flex-col border border-black p-4 mt-4 rounded-lg">
				<h2 className="text-2xl text-black mt-4">{entry.title}</h2>
				<p className="text-sm">Autor: {entry.author}</p>
				<p className="text-base p-4 bg-white text-black border border-black  mt-4 rounded-lg">
					{' '}
					{entry.content}
				</p>
				<p>{entry.date}</p>
			</div>
		</div>
	);
};

export default Detail;
