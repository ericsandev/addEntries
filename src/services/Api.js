// Ejemplo de ApiService.js

const API_BASE_URL = 'http://localhost:3001';
// URL base del servicio REST

const Api = {
	getAllEntries: async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/api/data`);
			if (!response.ok) {
				throw new Error('Error al obtener las entradas del blog');
			}
			return await response.json();
		} catch (error) {
			throw new Error(error.message);
		}
	},

	getEntry: async (entryId) => {
		try {
			const response = await fetch(`${API_BASE_URL}/entries/${entryId}`);
			if (!response.ok) {
				throw new Error('Error al obtener los detalles de la entrada');
			}
			return await response.json();
		} catch (error) {
			throw new Error(error.message);
		}
	},

	addEntry: async (entryData) => {
		try {
			const response = await fetch(`${API_BASE_URL}/api/post`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(entryData),
			});
			if (!response.ok) {
				throw new Error('Error al agregar la entrada al blog');
			}
		} catch (error) {
			throw new Error(error.message);
		}
	},

	deleteEntry: async (entryId) => {
		try {
			const response = await fetch(
				`${API_BASE_URL}/api/post/${entryId}`,
				{
					method: 'DELETE',
				}
			);
			if (!response.ok) {
				throw new Error('Error al eliminar la entrada del blog');
			}
		} catch (error) {
			throw new Error(error.message);
		}
	},

	// Método para buscar entradas por título, contenido o autor
	searchEntries: async (query) => {
		try {
			const response = await fetch(
				`${API_BASE_URL}/entries/search?query=${query}`
			);
			if (!response.ok) {
				throw new Error('Error al buscar entradas');
			}
			return await response.json();
		} catch (error) {
			throw new Error(error.message);
		}
	},
};

async function fetchEntries() {
	try {
		const entries = await Api.getAllEntries();
		console.log(entries); // Hacer algo con las entradas, como mostrarlas en la interfaz de usuario
	} catch (error) {
		console.error('Error al obtener las entradas:', error);
	}
}

fetchEntries();

export default Api;
