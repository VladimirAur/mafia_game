import { Routes, Route } from 'react-router-dom';
import { Naming, Roles, Options, Match } from './pages';
import './sass/main.scss';

function App() {
	return (
		<div className="container">
			<Routes>
				<Route path="/" element={<Options />} />
				<Route path="/roles" element={<Roles />} />
				<Route path="/naming" element={<Naming />} />
				<Route path="/Match" element={<Match />} />
			</Routes>
		</div>
	);
}

export default App;
