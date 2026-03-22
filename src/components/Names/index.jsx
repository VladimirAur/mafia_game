import React from 'react';
import NamesItem from './NamesItem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChooseRole from './ChooseRole';

const Names = () => {
	const navigate = useNavigate();
	const players = useSelector((state) => state.players.playersData);

	return (
		<div className="players">
			<div className="players__options">
				<h2 className="roles__title">
					<span className="icon-equalizer"></span> Выбрать Роли ТЕСТ
				</h2>
				<ul className="players__list">
					{players.map((player) => (
						<ChooseRole key={player.number} number={player.number} />
					))}
				</ul>
			</div>

			<button className="roles__start" onClick={() => navigate('/drawing')}>
				Раздача ролей
			</button>
		</div>
	);
};

export default Names;
