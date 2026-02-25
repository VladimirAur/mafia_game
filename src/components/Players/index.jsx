import React from 'react';
import PlayersItem from './PlayersItem';
import { useDispatch, useSelector } from 'react-redux';
import { decrementFoul, deletePlayer, incrementFoul } from '../../redux/slices/playerSlice';

const Players = () => {
    const dispatch = useDispatch();
	const players = useSelector(state => state.players.playersData);

	const addFoul = (number) => {
        dispatch(incrementFoul(number))
		
	};

	const removeFoul = (number) => {
		dispatch(decrementFoul(number));
	};

    const excludePlayer = (number) => {
        dispatch(deletePlayer(number));
    }

	return (
		<div className="players">
			<ul className="players__list">
				{players.map((player) => (
					<PlayersItem 
                        key={player.number} 
                        {...player} 
                        addFoul={addFoul} r
                        removeFoul={removeFoul} 
                        excludePlayer={excludePlayer}/>
				))}
			</ul>
		</div>
	);
};

export default Players;
