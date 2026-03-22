import React from 'react';
import { useSelector } from 'react-redux';

const PlayersResultPopup = ({ startNewGame, returnToGame, type, team }) => {
	const players = useSelector((state) => state.players.playersData);
	const mafia = players
		.filter((p) => p.role === 'Мафия')
		.map((p) => p.number)
		.join(', ');

	const don = players.find((p) => p.role === 'Дон')?.number ?? null;
	const sheriff = players.find((p) => p.role === 'Шериф')?.number ?? null;

	const text = type === 'draw' ? 'Три ночи без потерь - ничья!' : `Выиграла ${team} команда`;

	return (
		<div className="players__popup">
			<button className="players__popup-close">
				<span className="icon-close" onClick={returnToGame}></span>
			</button>
			<div className="players__popup-set">
				<h2 className="players__advert">Игра Окончена</h2>
				{type === 'win' && <p className="players__caution">Выиграла {team} команда</p>}
				{type === 'draw' && <p className="players__caution">Три ночи без потерь - ничья!</p>}
				<p className="players__text">Мафия: {mafia}</p>
				<p className="players__text">Дон: {don}</p>
				<p className="players__text">Шериф: {sheriff}</p>
				<button className="players__btn-confirm" onClick={startNewGame}>
					Новая Игра
				</button>
			</div>
		</div>
	);
};

export default PlayersResultPopup;
