import React from 'react';
import NamesItem from './NamesItem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Names = () => {
    const navigate = useNavigate();   
    const players = useSelector((state) => state.players.playersData);
		
	// const allFilled = players.every((player) => player.nickname?.trim());
   
	return (
		<div className="players">
			<div className="players__options">
				<h2 className="roles__title"><span className='icon-equalizer'></span> Имена Игроков</h2>
				<ul className="players__list">
					{players.map((player) => (
						<NamesItem key={player.number} number={player.number} />
					))}
				</ul>
			</div>

			{/* <button
                className={`roles__start  ${!allFilled ? 'roles__start--disabled' : ''}`}
				disabled={!allFilled}
				onClick={() => {
					if (allFilled) {
						navigate('/drawing');
					}
				}}>Раздача ролей
			</button> */}
			<button className="roles__start" onClick={() => navigate('/drawing')}>
				Раздача ролей
			</button>
		</div>
	);
};

export default Names;
