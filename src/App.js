import './sass/main.scss';

function App() {
	return (
		<div className="container">
			<div className="header">
				<h1>Mafia</h1>
				<nav>
					<ul>
						<li>
							<button>Игроки</button>
						</li>
					</ul>
				</nav>
			</div>
			<div className="main">
				<ul className="players">
					<li className="player">
						<span>1</span>
						<p>Peter</p>
						<p>Role</p>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default App;
