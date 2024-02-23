import React, { useEffect, useState } from 'react';

const Offline = () => {
	const [isOnline, setIsOnline] = useState(navigator.onLine);

	useEffect(() => {
		const updateOnlineStatus = () => {
			setIsOnline(navigator.onLine);
		};

		window.addEventListener('online', updateOnlineStatus);
		window.addEventListener('offline', updateOnlineStatus);

		return () => {
			window.removeEventListener('online', updateOnlineStatus);
			window.removeEventListener('offline', updateOnlineStatus);
		};
	}, []);

	return (
		!isOnline && (
			<div className="offline-message">
				<p>No hay conexión a Internet.</p>
			</div>
		)
	);
};

export default Offline;
