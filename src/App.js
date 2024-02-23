import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './components/Form';
import Detail from './components/Detail';
import Offline from './components/Offline';
import Home from './pages/Home';
import './App.css';

const App = () => {
	return (
		<Router>
			<div className="p-4">
				<Routes>
					<Route exact path="/" element={<Home />}></Route>
					<Route exact path="/add" element={<Form />}></Route>
					<Route path="/entry/:entryId" element={<Detail />}></Route>
				</Routes>
				<Offline />
			</div>
		</Router>
	);
};

export default App;
