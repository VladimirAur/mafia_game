import React from 'react';
import PlayersItem from './PlayersItem';
import { useDispatch, useSelector } from 'react-redux';
import { decrementFoul, deletePlayer, incrementFoul } from '../../redux/slices/playerSlice';
import { banMatchPlayer, giveSpeech } from '../../redux/slices/matchSlice';

const Players = () => {
	const dispatch = useDispatch();
	const players = useSelector((state) => state.players.playersData);
	const currentPlayer = useSelector((state) => state.match.currentPlayerNumber);
	const timerMode = useSelector((state) => state.match.timerMode);
	const phase = useSelector((state) => state.phases.phase);
	const nominatedList = useSelector((state) => [...new Set(Object.values(state.match.nominatedPlayers))].join(', '));
	const isDiscussion = useSelector((state) => state.match.speakingOrder[0]);

	const addFoul = (number) => {
		dispatch(incrementFoul(number));
	};

	const removeFoul = (number) => {
		dispatch(decrementFoul(number));
	};

	const excludePlayer = (number) => {
		dispatch(deletePlayer(number));
		dispatch(banMatchPlayer(number));
	};

	const giveASpeach = () => {
		if (nominatedList.length !== 1) return;

		dispatch(giveSpeech(nominatedList[0]));
	};

	// console.log(nominatedList);

	return (
		<div className="players">
			<ul className="players__list">
				{nominatedList ? (
					<div className="players__tip">Игроки выставленные на голосование: {nominatedList}</div>
				) : (
					phase === 'День' && <div className="players__tip">Нажмите на номер игрока для выставления.</div>
				)}

				{players.map((player) => (
					<PlayersItem
						key={player.number}
						{...player}
						hasTimer={player.number === currentPlayer}
						timerMode={timerMode}
						addFoul={addFoul}
						removeFoul={removeFoul}
						excludePlayer={excludePlayer}
					/>
				))}
			</ul>
			{nominatedList.length === 1 && !isDiscussion ? (
				<button className="roles__start" onClick={() => giveASpeach()}>
					Речь игрока {nominatedList}
				</button>
			) : (
				nominatedList.length > 1 && <button className="roles__start">Начать голосование</button>
			)}
		</div>
	);
};

export default Players;
