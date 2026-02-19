import React from 'react';
import { useAppContext } from '../../App';
import NamesItem from './NamesItem';
import { useNavigate } from 'react-router-dom';

const Names = () => {
	const { players } = useAppContext();
	const navigate = useNavigate();
	const allFilled = true;
    // players.every((player) => player.nickname?.trim());

	return (
		<div className="players">
			<h2 className="roles__title">% Имена Игроков</h2>
			<ul className="players__list">
				{players.map((item, index) => (
					<NamesItem key={item.id} index={index} id={item.id} />
				))}
			</ul>
			<button
                className={`roles__start  ${!allFilled ? 'roles__start--disabled' : ''}`}
				disabled={!allFilled}
				onClick={() => {
					if (allFilled) {
						navigate('/drawing');
					}
				}}>Начать
			</button>
		</div>
	);
};

export default Names;
