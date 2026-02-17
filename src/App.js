import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Naming, Drawing, Options, Match } from './pages';
import './sass/main.scss';

export const AppContext = React.createContext();
export const useAppContext = () => React.useContext(AppContext);

function App() {
	const [namesArray, setNamesArray] = React.useState([]);
	const [players, setPlayers] = React.useState([]);

	return (
		<AppContext.Provider value={{ namesArray, setNamesArray, players, setPlayers }}>
			<Routes>
				<Route path="/" element={<Options />} />
				<Route path="/drawing" element={<Drawing />} />
				<Route path="/naming" element={<Naming />} />
				<Route path="/Match" element={<Match />} />
			</Routes>
		</AppContext.Provider>
	);
}

export default App;
