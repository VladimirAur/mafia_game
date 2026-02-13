import './sass/main.scss';

function App() {
	return (
		<div className="container">
			<div className="top-line"></div>
			<div className="header">
				<h2 className="header__name">Mafia</h2>
				<nav className="header__nav">
					<button className="header__nav-item">Игроки</button>
					<button className="header__nav-item">Голосование</button>
					<button className="header__nav-item">Результат</button>
				</nav>
			</div>
			<div className="players">
				<ul className="players__list">
					<li className="player">
						<span className="player__number">1</span>
						<div className="player__desc">
							<div className="player__name">Купер</div>
							<div className="player__status">
								<div className="player__role">М</div>
								<div className="player__foll">
									<div className="player__foll-name">Фол</div>
									<button className="player__foll-btn">-</button>
									<input type="text" className="player__foll-count" />
									<button className="player__foll-btn">+</button>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default App;
