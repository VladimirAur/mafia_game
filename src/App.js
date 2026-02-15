import { Routes, Route } from 'react-router-dom';
import { Naming, Roles, Options, Match } from './pages';
import './sass/main.scss';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Options />} />
			<Route path="/roles" element={<Roles />} />
			<Route path="/naming" element={<Naming />} />
			<Route path="/Match" element={<Match />} />
		</Routes>
	);
}

export default App;
