import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Naming, Drawing, Options, Match } from './pages';
import './sass/main.scss';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Options />} />
			<Route path="/drawing" element={<Drawing />} />
			<Route path="/naming" element={<Naming />} />
			<Route path="/Match" element={<Match />} />
		</Routes>
	);
}

export default App;
