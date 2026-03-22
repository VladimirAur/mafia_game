import React from 'react';
import PlayersItem from './PlayersItem';
import { useDispatch, useSelector } from 'react-redux';
import { checkWinner, clearGameStatus, resetPlayers } from '../../redux/slices/playerSlice';
import {
	resetMatch,
	advancePhase,
	finalizeVoting,
	finalizeRemoveAll,
	clearStatus,
} from '../../redux/slices/matchSlice';
import { resetRoles } from '../../redux/slices/roleSlice';
import { useNavigate } from 'react-router-dom';
import Timer from '../Timer';

import PlayersResultPopup from './PlayersResultPopup';

const Players = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const players = useSelector((state) => state.players.playersData);
	const gameStatus = useSelector((state) => state.players.gameStatus);
	const {
		phase,
		dayNumber,
		speakingOrder,
		currentPlayerNumber,
		timerMode,
		status,
		nominatedPlayers,
		currentCandidate,
		removeAllVotes,
	} = useSelector((state) => state.match);

	// const { phase, dayNumber } = useSelector((state) => state.phases);
	// const nominatedArray = [...new Set(Object.values(nominatedPlayers))];
	const nominatedList = [...new Set(Object.values(nominatedPlayers))].join(', ');
	const nowRemoveAllVoting = status === 'removeall_vote';
	const removeAllTotal = removeAllVotes.length;
	const enoughForRemoveAll = removeAllVotes.length > Math.floor(speakingOrder.length / 2);

	const nowNominate = phase === 'day' && !nominatedList;
	const teamWon = gameStatus === 'winner_red' ? 'красная' : gameStatus === 'winner_black' ? 'черная' : null;

	React.useEffect(() => {
		dispatch(checkWinner());
	}, [players, dispatch]);

	const onNextPhase = () => {
		dispatch(advancePhase());
	};

	const returnToGame = () => {
		dispatch(clearGameStatus());
		dispatch(clearStatus());
	};

	const startNewGame = () => {
		dispatch(resetRoles());
		dispatch(resetPlayers());
		dispatch(resetMatch());
		navigate('/');
	};

	const onFinalizeVoting = () => {
		dispatch(finalizeVoting());
	};

	const endRemoveAllVoting = () => {
		dispatch(finalizeRemoveAll());
	};

	return (
		<div className="players">
			<ul className="players__list">
				{nowNominate && currentPlayerNumber && (
					<div className="players__tip">Нажмите на номер игрока для выставления.</div>
				)}
				{nominatedList && !nowRemoveAllVoting && (
					<div className="players__tip">Игроки выставленные на голосование: {nominatedList}</div>
				)}
				{nowRemoveAllVoting && (
					<div className="players__tip">
						<span>
							{enoughForRemoveAll ? 'Будут исключены' : 'За исключение игроков'}: {nominatedList}{' '}
						</span>
						<span>(Голосов: {removeAllTotal})</span>
					</div>
				)}

				{phase === 'night' && dayNumber !== 0 && (
					<div className="players__tip">
						Нажмите на <span className="icon-close"></span> что бы сделать выстрел
					</div>
				)}

				{players.map((player) => (
					<PlayersItem
						key={player.number}
						{...player}
						hasTimer={player.number === currentPlayerNumber}
						candidate={player.number === currentCandidate}
						timerMode={timerMode}
					/>
				))}
			</ul>
			{status === 'counting_votes' && (
				<button className="roles__start" onClick={onFinalizeVoting}>
					Далее
				</button>
			)}
			{status === 'removeall_vote' && (
				<button className="roles__start" onClick={endRemoveAllVoting}>
					Закончить голосование
				</button>
			)}
			{status === 'idle' && (
				<button className="roles__start" onClick={onNextPhase}>
					{phase === 'day' ? 'Наступает ночь' : 'Наступает день'}
				</button>
			)}
			{status === 'speech_before' && phase === 'night' && (
				<button className="roles__start" onClick={onNextPhase}>
					Наступает день
				</button>
			)}
			{currentPlayerNumber && <Timer />}
			{currentCandidate && <Timer />}
			{(teamWon || status === 'draw') && (
				<PlayersResultPopup
					startNewGame={startNewGame}
					returnToGame={returnToGame}
					team={teamWon}
					type={teamWon ? 'win' : 'draw'}
				/>
			)}
		</div>
	);
};

export default Players;
