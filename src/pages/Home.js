import React, { useState, useEffect } from 'react';
import List from '../components/List';
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import ApiService from '../services/Api';

const Home = () => {
	const [entries, setEntries] = useState([]);

	useEffect(() => {
		updateEntries();
	}, []);

	const updateEntries = async () => {
		try {
			const data = await ApiService.getAllEntries();
			setEntries(data);
		} catch (error) {
			console.error('Error updating entries:', error);
		}
	};

	return (
		<>
			<div className="flex items-center gap-2">
				<Link to="/">
					<img
						src="./images/logo-header.svg"
						width="120"
						alt="Wired"
					/>
				</Link>
				<button className="bg-black text-white text-lg px-4 py-2 rounded-lg">
					<Link to="/add">+ Crear post</Link>
				</button>
			</div>
			<div className="flex">
				<List entries={entries} />
			</div>
		</>
	);
};

export default Home;
