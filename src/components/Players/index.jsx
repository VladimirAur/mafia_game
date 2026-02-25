import React from 'react';
import PlayersItem from './PlayersItem';
import { useDispatch, useSelector } from 'react-redux';
import { decrementFoul, incrementFoul } from '../../redux/slices/playerSlice';

const Players = () => {
    const dispatch = useDispatch();
	const players = useSelector(state => state.players.playersData);

	const addFoul = (number) => {
        dispatch(incrementFoul(number))
		
	};

	const removeFoul = (number) => {
		dispatch(decrementFoul(number));
	};

    

	return (
		<div className="players">
			<ul className="players__list">
				{players.map((player) => (
					<PlayersItem key={player.number} {...player} addFoul={addFoul} removeFoul={removeFoul} />
				))}
			</ul>
		</div>
	);
};

export default Players;
