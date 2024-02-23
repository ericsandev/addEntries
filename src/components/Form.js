import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../services/Api';

/**
 * Form Component - Allows users to add new entries.
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Callback function invoked after successfully submitting the form
 * @returns {JSX.Element} Form component UI
 */
const Form = ({ onSubmit }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [content, setContent] = useState('');
	const [created, setCreated] = useState(formatDate(new Date()));
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	/**
	 * Function to format the date into "DD/MM/YYYY" format.
	 * @param {Date} date - Date object to be formatted
	 * @returns {string} Formatted date string
	 */
	function formatDate(date) {
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	}

	/**
	 * Handles form submission.
	 * @param {Event} e - Form submit event
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (!title || !author || !content) {
				throw new Error('Todos los campos son obligatorios');
			}
			await Api.addEntry({ title, author, content, created });
			console.log(title, author, content, created);
			setTitle('');
			setAuthor('');
			setContent('');
			setCreated(formatDate(new Date()));

			if (typeof onSubmit === 'function') {
				onSubmit();
			}
			navigate('/');
		} catch (error) {
			setErrorMessage(error.message);
		}
	};
	// Render the form UI
	return (
		<div className="flex w-full flex-col justify-center items-center">
			<h2 className="text-2xl mb-4">Agregar nueva entrada</h2>

			<form
				className="w-full lg:w-[650px] rounded-lg p-4"
				onSubmit={handleSubmit}>
				<div className="flex flex-col">
					<label>Título:</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="flex flex-col">
					<label>Autor:</label>
					<input
						type="text"
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
					/>
				</div>
				<div className="flex flex-col">
					<label>Contenido:</label>
					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
				</div>
				<div className="flex justify-between items-center">
					<button
						className="bg-black p-2 text-white rounded-lg mt-4"
						type="submit">
						Crear entrada
					</button>
					<Link className="p-2 text-sm" to="/">
						← regresar
					</Link>
				</div>
				{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
			</form>
		</div>
	);
};

export default Form;
