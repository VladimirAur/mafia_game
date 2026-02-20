import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Naming, Drawing, Options, Match } from './pages';
import './sass/main.scss';

export const AppContext = React.createContext();
export const useAppContext = () => React.useContext(AppContext);

function App() {
	const [rolesNames, setRolesNames] = React.useState(() => {
		const saved = localStorage.getItem('rolesNames');
		return saved ? JSON.parse(saved) : [];
	});

	const [players, setPlayers] = React.useState(() => {
		const saved = localStorage.getItem('players');
		return saved ? JSON.parse(saved) : [];
	});

	React.useEffect(() => {
		localStorage.setItem('rolesNames', JSON.stringify(rolesNames));
	}, [rolesNames]);

	React.useEffect(() => {
		localStorage.setItem('players', JSON.stringify(players));
	}, [players]);

	return (
		<AppContext.Provider value={{ rolesNames, setRolesNames, players, setPlayers }}>
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
