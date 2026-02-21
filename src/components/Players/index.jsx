import React from 'react';
import { useAppContext } from '../../App';
import PlayersItem from './PlayersItem';

const Players = () => {
	const { players, setPlayers } = useAppContext();

	const addFoul = (id) => {
		setPlayers((prev) =>
			prev.map((player) => {
				if (player.id !== id) return player;

				if (player.foul >= 4) return player; // больше 4 нельзя

				const newFoul = player.foul + 1;

				return {
					...player,
					foul: newFoul,
					ban: newFoul === 4,
				};
			}),
		);
	};

	const removeFoul = (id) => {
		setPlayers((prev) =>
			prev.map((player) => {
				if (player.id !== id) return player;

				if (player.foul <= 0) return player; // меньше 0 нельзя

				const newFoul = player.foul - 1;

				return {
					...player,
					foul: newFoul,
					ban: false, // при уменьшении с 4 до 3 бан снимется
				};
			}),
		);
	};

    

	return (
		<div className="players">
			<ul className="players__list">
				{players.map((item) => (
					<PlayersItem key={item.id} {...item} addFoul={addFoul} removeFoul={removeFoul} />
				))}
			</ul>
		</div>
	);
};

export default Players;
