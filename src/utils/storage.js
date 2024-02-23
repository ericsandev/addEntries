const localStorageKey = 'blogEntries';

const localStorageService = {
	saveEntries: (entries) => {
		try {
			localStorage.setItem(localStorageKey, JSON.stringify(entries));
		} catch (error) {
			console.error(
				'Error al guardar las entradas en el almacenamiento local:',
				error
			);
		}
	},

	getEntries: () => {
		try {
			const entriesJSON = localStorage.getItem(localStorageKey);
			return entriesJSON ? JSON.parse(entriesJSON) : [];
		} catch (error) {
			console.error(
				'Error al obtener las entradas del almacenamiento local:',
				error
			);
			return [];
		}
	},

	clearEntries: () => {
		try {
			localStorage.removeItem(localStorageKey);
		} catch (error) {
			console.error(
				'Error al limpiar las entradas del almacenamiento local:',
				error
			);
		}
	},
};

export default localStorageService;
