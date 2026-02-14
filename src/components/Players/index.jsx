import React from 'react'

const Players = () => {
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
			<div className="players">
				<ul className="players__list">
					<li className="player">
						<span className="player__number">1</span>
						<div className="player__desc">
							<div className="player__name">Молотов</div>
							<div className="player__status">
								<div className="player__role">Ж</div>
								<div className="player__foll">
									<div className="player__foll-name">Фол</div>
									<button className="player__foll-btn player__foll-right">-</button>
									<input type="text" defaultValue="1" className="player__foll-count" />
									<button className="player__foll-btn player__foll-left">+</button>
								</div>
							</div>
						</div>
					</li>
					<li className="player">
						<span className="player__number">2</span>
						<div className="player__desc">
							<div className="player__name">Алиас</div>
							<div className="player__status">
								<div className="player__role">М</div>
								<div className="player__foll">
									<div className="player__foll-name">Фол</div>
									<button className="player__foll-btn player__foll-right">-</button>
									<input type="text" defaultValue="0" className="player__foll-count" />
									<button className="player__foll-btn player__foll-left">+</button>
								</div>
							</div>
						</div>
					</li>
					<li className="player">
						<span className="player__number">3</span>
						<div className="player__desc">
							<div className="player__name">Игрокер</div>
							<div className="player__status">
								<div className="player__role">Ж</div>
								<div className="player__foll">
									<div className="player__foll-name">Фол</div>
									<button className="player__foll-btn player__foll-right">-</button>
									<input type="text" defaultValue="2" className="player__foll-count" />
									<button className="player__foll-btn player__foll-left">+</button>
								</div>
							</div>
						</div>
					</li>
					<li className="player">
						<span className="player__number">4</span>
						<div className="player__desc">
							<div className="player__name">Никитос</div>
							<div className="player__status">
								<div className="player__role">Ж</div>
								<div className="player__foll">
									<div className="player__foll-name">Фол</div>
									<button className="player__foll-btn player__foll-right">-</button>
									<input type="text" defaultValue="0" className="player__foll-count" />
									<button className="player__foll-btn player__foll-left">+</button>
								</div>
							</div>
						</div>
					</li>
					<li className="player">
						<span className="player__number">5</span>
						<div className="player__desc">
							<div className="player__name">Купер</div>
							<div className="player__status">
								<div className="player__role">Ш</div>
								<div className="player__foll">
									<div className="player__foll-name">Фол</div>
									<button className="player__foll-btn player__foll-right">-</button>
									<input type="text" defaultValue="0" className="player__foll-count" />
									<button className="player__foll-btn player__foll-left">+</button>
								</div>
							</div>
						</div>
					</li>
					<li className="player">
						<span className="player__number">6</span>
						<div className="player__desc">
							<div className="player__name">Пижон</div>
							<div className="player__status">
								<div className="player__role">М</div>
								<div className="player__foll">
									<div className="player__foll-name">Фол</div>
									<button className="player__foll-btn player__foll-right">-</button>
									<input type="text" defaultValue="0" className="player__foll-count" />
									<button className="player__foll-btn player__foll-left">+</button>
								</div>
							</div>
						</div>
					</li>
					<li className="player">
						<span className="player__number">7</span>
						<div className="player__desc">
							<div className="player__name">Сантехник</div>
							<div className="player__status">
								<div className="player__role">Д</div>
								<div className="player__foll">
									<div className="player__foll-name">Фол</div>
									<button className="player__foll-btn player__foll-right">-</button>
									<input type="text" defaultValue="0" className="player__foll-count" />
									<button className="player__foll-btn player__foll-left">+</button>
								</div>
							</div>
						</div>
					</li>
					<li className="player">
						<span className="player__number">8</span>
						<div className="player__desc">
							<div className="player__name">Нейминг</div>
							<div className="player__status">
								<div className="player__role">Ж</div>
								<div className="player__foll">
									<div className="player__foll-name">Фол</div>
									<button className="player__foll-btn player__foll-right">-</button>
									<input type="text" defaultValue="1" className="player__foll-count" />
									<button className="player__foll-btn player__foll-left">+</button>
								</div>
							</div>
						</div>
					</li>
					<li className="player player--empty">
						<span className="player__number">9</span>
						<div className="player__desc">
							<div className="player__name">Ахилес</div>
							<div className="player__status">
								<div className="player__role">Ж</div>
								<div className="player__foll">
									<div className="player__foll-name">Фол</div>
									<button className="player__foll-btn player__foll-right">-</button>
									<input type="text" defaultValue="1" className="player__foll-count" />
									<button className="player__foll-btn player__foll-left">+</button>
								</div>
							</div>
						</div>
					</li>
					<li className="player">
						<span className="player__number">10</span>
						<div className="player__desc">
							<div className="player__name">Замод</div>
							<div className="player__status">
								<div className="player__role">Ж</div>
								<div className="player__foll">
									<div className="player__foll-name">Фол</div>
									<button className="player__foll-btn player__foll-right">-</button>
									<input type="text" defaultValue="1" className="player__foll-count" />
									<button className="player__foll-btn player__foll-left">+</button>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
  )
}

export default Players;