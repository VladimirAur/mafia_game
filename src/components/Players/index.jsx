import React from 'react';
import PlayersItem from './PlayersItem';
import { useDispatch, useSelector } from 'react-redux';
import { checkWinner, clearStatus, deletePlayer, resetPlayers } from '../../redux/slices/playerSlice';
import { endVoting, nextVotingPlayer, resetMatch, startSpeechAfter, startVoting } from '../../redux/slices/matchSlice';
import { resetRoles } from '../../redux/slices/roleSlice';
import { resetPhase } from '../../redux/slices/phaseSlice';
import { useNavigate } from 'react-router-dom';

const Players = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const players = useSelector((state) => state.players.playersData);
	const gameStatus = useSelector((state) => state.players.status);
	const { currentPlayerNumber, timerMode, status, nominatedPlayers, currentCandidate, nominationOrder } = useSelector(
		(state) => state.match,
	);

	const phase = useSelector((state) => state.phases.phase);
	const nominatedList = [...new Set(Object.values(nominatedPlayers))].join(', ');

	const nowDiscussion = status === 'discussion';
	const nowNominate = nowDiscussion && phase === 'day' && !nominatedList;
	const speechExpected = nominatedList.length === 1 && status === 'speech_after';
	const voteAllowed = nominatedList.length > 1 && !nowDiscussion && !currentCandidate;
	const nowVoting = status === 'voting';
	const election = nominationOrder.length;
	const isLastCandidate = currentCandidate === nominationOrder[nominationOrder.length - 1];
	const nowPlayerSwitch = election && !isLastCandidate && currentCandidate !== null;
	const team = gameStatus === 'winner_red' ? 'красная' : gameStatus === 'winner_black' ? 'черная' : null;

	const mafia = players
		.filter((p) => p.role === 'Мафия')
		.map((p) => p.number)
		.join(', ');

	const don = players.find((p) => p.role === 'Дон')?.number ?? null;
	const sheriff = players.find((p) => p.role === 'Шериф')?.number ?? null;

	React.useEffect(() => {
		dispatch(checkWinner());
	}, [players, dispatch]);

	const giveASpeach = () => {
		if (nominatedList.length !== 1) return;

		dispatch(deletePlayer(nominatedList[0]));
		dispatch(startSpeechAfter(nominatedList[0]));
	};

	const startElections = () => {
		dispatch(startVoting());
	};

	const changeCandidate = () => {
		dispatch(nextVotingPlayer());
	};

	const finishElection = () => {
		dispatch(endVoting());
	};

	const returnToGame = () => {
		dispatch(clearStatus());
	};

	const startNewGame = () => {
		dispatch(resetRoles());
		dispatch(resetPhase());
		dispatch(resetPlayers());
		dispatch(resetMatch());
		navigate('/');
	};

	return (
		<div className="players">
			<ul className="players__list">
				{nowNominate && <div className="players__tip">Нажмите на номер игрока для выставления.</div>}
				{nominatedList && (
					<div className="players__tip">Игроки выставленные на голосование: {nominatedList}</div>
				)}
				{nowVoting && <div className="players__tip">Нажмите на номер игрока, чтобы проголосовать</div>}
				{phase === 'night' && (
					<div className="players__tip">
						Нажмите на <span className="icon-close"></span> что бы сделать выстрел
					</div>
				)}

				{players.map((player) => (
					<PlayersItem
						key={player.number}
						{...player}
						hasTimer={player.number === currentPlayerNumber}
						timerMode={timerMode}
					/>
				))}
			</ul>
			{speechExpected ? (
				<button className="roles__start" onClick={() => giveASpeach()}>
					Речь игрока {nominatedList}
				</button>
			) : (
				voteAllowed && (
					<button className="roles__start" onClick={startElections}>
						Начать голосование
					</button>
				)
			)}
			{nowPlayerSwitch && (
				<button className="roles__start" onClick={changeCandidate}>
					Следующий игрок
				</button>
			)}
			{isLastCandidate && (
				<button className="roles__start" onClick={finishElection}>
					Закончить голосование
				</button>
			)}
			{team && (
				<div className="players__popup">
					<button className="players__popup-close">
						<span className="icon-close" onClick={returnToGame}></span>
					</button>
					<div className="players__popup-set">
						<h2 className="players__advert">Игра Окончена</h2>
						<p className="players__caution">Выиграла {team} команда</p>
						<p className="players__text">Мафия: {mafia}</p>
						<p className="players__text">Дон: {don}</p>
						<p className="players__text">Шериф: {sheriff}</p>
						<button className="players__btn-confirm" onClick={startNewGame}>
							Новая Игра
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Players;
