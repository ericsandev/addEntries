import React, { useState, useEffect } from 'react';
import Api from '../services/Api';
import { Link } from 'react-router-dom';
import Search from './Search';

const List = ({ updateEntries }) => {
	const [entries, setEntries] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [filteredEntries, setFilteredEntries] = useState([]);

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

	const handleSearch = (query) => {
		setSearchQuery(query);
	};

	const handleDeleteEntry = async (entryId) => {
		try {
			await Api.deleteEntry(entryId);
			setEntries(entries.filter((entry) => entry.id !== entryId));
		} catch (error) {
			setError(error.message);
		}
	};

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
