import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	nominatePlayer,
	kickPlayer,
	votePlayer,
	killPlayer,
	reassignVote,
	voteRemoveAll,
} from '../../redux/slices/matchSlice';
import { deletePlayer, incrementFoul, decrementFoul, loseByPlayer } from '../../redux/slices/playerSlice';
import PlayersConfirmPopup from './PlayersConfirmPopup';
import PlayersActionsPopup from './PlayersActionsPopup';
import PlayersFouls from './PlayersFouls';
import PlayersFoulsPopup from './PlayersFoulsPopup';

const PlayersItem = ({ number, nickname, role, foul, ban, hasTimer, candidate }) => {
	const dispatch = useDispatch();
	const { phase, status, nominatedPlayers, candidates, removeAllVotes } = useSelector((state) => state.match);
	const onRole = useSelector((state) => state.players.onRole);

	const nominatedNumber = nominatedPlayers[number];
	const nowDiscussion = status === 'discussion_on';
	const nowVoting = status === 'voting';
	const nowRemoveAllVoting = status === 'removeall_vote';
	const nowRegularStatus = !nowDiscussion && !nowVoting && !nowRemoveAllVoting;
	const hasNominee = nominatedNumber && (status === 'discussion_on' || status === 'discussion_off');
	const hasVoted = candidates.some((c) => c.votes.includes(number));
	const hasRemoveAllVoted = removeAllVotes.includes(number);

	// Блок информации о том кто проголосовал за игрока и к-во голосов
	const playerVotesData = candidates.find((c) => c.candidate === number);
	const playerHasVotes = playerVotesData?.votes?.length > 0;
	const playerTotalVotes = playerVotesData?.votes?.length || 0;
	const playerVoters = playerVotesData?.votes?.join(', ') || '';

	const [activePopup, setActivePopup] = React.useState(false);
	const [confirmPopup, setConfirmPopup] = React.useState('empty');
	const [showCandidates, setShowCandidates] = React.useState(false);

	const addFoul = (number) => {
		dispatch(incrementFoul(number));
	};

	const removeFoul = (number) => {
		dispatch(decrementFoul(number));
		setActivePopup(false);
	};

	const handleNominatePlayer = (number) => {
		if (nowDiscussion) dispatch(nominatePlayer(number));
	};

	const closePopup = () => {
		setActivePopup(false);
	};
	const openPopup = () => {
		setActivePopup(true);
	};

	const removePlayer = (number) => {
		dispatch(deletePlayer(number));
		dispatch(kickPlayer(number));
		setActivePopup(false);
	};

	const giveVoice = (number) => {
		dispatch(votePlayer(number));
	};

	const giveVoiceForRemove = (number) => {
		dispatch(voteRemoveAll(number));
	};

	const onConfirm = (type) => {
		setActivePopup(false);
		setConfirmPopup(type);
	};
	const offConfirm = () => {
		setConfirmPopup('empty');
	};
	const killByMafia = (number) => {
		dispatch(killPlayer(number));
		dispatch(deletePlayer(number));
		setActivePopup(false);
	};
	const revote = (number, candidate) => {
		dispatch(reassignVote({ voter: number, newCandidate: candidate }));
		setShowCandidates(false);
		setActivePopup(false);
	};
	const teamLoss = (number) => {
		dispatch(loseByPlayer(number));
	};

	return (
		<li className={`player ${ban ? 'player--disabled' : ''}`}>
			<div className={`player__item ${ban ? 'player__item--disabled' : ''}`}>
				{nowDiscussion && (
					<button
						className={`player__number ${nowDiscussion && !ban ? 'player__number--active' : ''}`}
						onClick={() => handleNominatePlayer(number)}
						disabled={ban}
					>
						{number}
					</button>
				)}
				{nowVoting && (
					<button
						className={`player__number ${!hasVoted ? 'player__number--active' : ''}`}
						onClick={() => giveVoice(number)}
						disabled={ban}
					>
						{number}
					</button>
				)}
				{nowRemoveAllVoting && (
					<button
						className={`player__number ${!hasRemoveAllVoted ? 'player__number--active' : ''}`}
						onClick={() => giveVoiceForRemove(number)}
						disabled={ban}
					>
						{number}
					</button>
				)}
				{nowRegularStatus && <button className="player__number">{number}</button>}

				<div
					className={`player__desc ${hasTimer ? 'player__desc--active' : ''} ${candidate ? 'player__desc--voting' : ''}`}
				>
					<div className="player__name">{nickname ? nickname : 'Игрок'}</div>
					{phase === 'night' && (
						<div className={`player__status ${onRole ? 'player__status--active ' : ''}`}>
							<div className="player__role">{role}</div>
						</div>
					)}
					{hasNominee && (
						<div className="player__nominated">
							<span className="player__nominated-icon icon-left2"></span>
							{nominatedNumber}
						</div>
					)}

					{playerHasVotes && (
						<div className="player__votes-info">
							<div className="player__votes">Голосов: {playerTotalVotes}</div>
							<div className="player__votes">{playerVoters}</div>
						</div>
					)}
				</div>
				<PlayersFouls number={number} foul={foul} addFoul={addFoul} />
				<button className="player__foll-btn player__foll-del" onClick={openPopup} disabled={ban}>
					<span className="icon-close"></span>
				</button>
			</div>

			{activePopup && (
				<PlayersActionsPopup
					number={number}
					removeFoul={removeFoul}
					onConfirm={onConfirm}
					closePopup={closePopup}
					revote={revote}
					showCandidates={showCandidates}
					setShowCandidates={setShowCandidates}
				/>
			)}
			{foul > 3 && ban !== true && (
				<PlayersFoulsPopup number={number} removePlayer={removePlayer} removeFoul={removeFoul} />
			)}
			{confirmPopup !== 'empty' && (
				<PlayersConfirmPopup
					number={number}
					confirmPopup={confirmPopup}
					offConfirm={offConfirm}
					setActivePopup={setActivePopup}
					removePlayer={removePlayer}
					killByMafia={killByMafia}
					teamLoss={teamLoss}
				/>
			)}
		</li>
	);
};

export default PlayersItem;
