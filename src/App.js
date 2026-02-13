import './sass/main.scss';

function App() {
	return (
		<div className="container">
			<div className="header">
				<h2 className="header__name">Mafia</h2>
				<nav className="header__nav">
					<button className="header__nav-item">Игроки</button>
					<button className="header__nav-item">Голосование</button>
					<button className="header__nav-item">Результат</button>
				</nav>
			</div>
		</div>
	);
}

export default App;
