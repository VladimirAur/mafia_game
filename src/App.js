import { Routes, Route } from 'react-router-dom';
import Options from './pages/Options';
import Roles from './pages/Roles';
import './sass/main.scss';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Options />} />
			<Route path="/roles" element={<Roles />} />
		</Routes>
	);
}

export default App;
