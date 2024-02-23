import React, { useState, useEffect } from 'react';
import Api from '../services/Api';
import { Link } from 'react-router-dom';
import Search from './Search';

/**
 * List component displays a list of entries fetched from an API.
 * It provides a search functionality to filter the entries.
 * @param {Function} updateEntries - A function to trigger an update of entries.
 * @returns {JSX.Element} - The List component JSX
 */
const List = ({ updateEntries }) => {
	const [entries, setEntries] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [filteredEntries, setFilteredEntries] = useState([]);

	// Effect hook to fetch entries from API when updateEntries changes
	useEffect(() => {
		const fetchEntries = async () => {
			try {
				const data = await Api.getAllEntries();
				setEntries(data);
				setIsLoading(false);
			} catch (error) {
				setError(error.message);
				setIsLoading(false);
			}
		};

		fetchEntries();

		return () => {
			setEntries([]);
		};
	}, [updateEntries]); // Re-run effect when updateEntries changes

	// Effect hook to filter entries based on search query
	useEffect(() => {
		const filtered = entries.filter(
			(entry) =>
				entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				entry.content
					.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				entry.author.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredEntries(filtered);
	}, [entries, searchQuery]);

	// Handler function to search an entry
	const handleSearch = (query) => {
		setSearchQuery(query);
	};

	// Handler function to delete an entry
	const handleDeleteEntry = async (entryId) => {
		try {
			await Api.deleteEntry(entryId);
			setEntries(entries.filter((entry) => entry.id !== entryId));
		} catch (error) {
			setError(error.message);
		}
	};
	// Render component JSX
	return (
		<div className="flex flex-col">
			<Search onSearch={handleSearch} />
			<ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{filteredEntries.map((entry) => (
					<li
						className="bg-white border border-black p-4 rounded-lg text-black"
						key={entry.id}>
						<h3 className="text-xl">{entry.title}</h3>
						<p>{entry.content.substring(0, 70)}...</p>
						<div className="flex justify-between gap-2 mt-2">
							<p className="text-sm font-bold">
								Autor: {entry.author}
							</p>
							<p className="text-sm font-bold">{entry.date}</p>
						</div>
						<div className="flex justify-between items-center mt-4">
							<button className="bg-black px-2 py-1 mt-2 text-white rounded-lg text-sm">
								<Link to={`/entry/${entry.id}`}>Leer más</Link>
							</button>
							<button
								className="justify-end rounded-lg text-sm"
								onClick={() => handleDeleteEntry(entry.id)}>
								🗑️
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default List;
