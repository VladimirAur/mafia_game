import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Timer from '../Timer';
import { nominatePlayer, killPlayer, kickPlayer, votePlayer } from '../../redux/slices/matchSlice';
import { deletePlayer, incrementFoul, decrementFoul, loseByPlayer } from '../../redux/slices/playerSlice';

const PlayersItem = ({ number, nickname, role, foul, ban, hasTimer }) => {
	const dispatch = useDispatch();
	const { phase, dayNumber } = useSelector((state) => state.phases);
	const { killedPlayer, status, currentCandidate, nominatedPlayers, voting } = useSelector((state) => state.match);
	const onRole = useSelector((state) => state.players.onRole);

	const nominatedNumber = nominatedPlayers[number];
	const currentCandidateNumber = Number(currentCandidate);
	const nowDiscussion = status === 'discussion' && phase === 'day';
	const hasNominee = phase === 'day' && nominatedNumber && status !== 'voting';
	const inVoting = number in voting && voting[number] > 0;
	const votes = voting[number];
	const firstNight = dayNumber === 0;

	const [activePopup, setActivePopup] = React.useState(false);

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
	const excludePlayer = (number) => {
		dispatch(killPlayer(number));
		dispatch(deletePlayer(number));
		setActivePopup(false);
	};

	const removePlayer = (number) => {
		dispatch(deletePlayer(number));
		dispatch(kickPlayer(number));
		setActivePopup(false);
	};

	const giveVoice = (number) => {
		dispatch(votePlayer(number));
	};

	const teamLoss = (number) => {
		dispatch(loseByPlayer(number));
	};

	return (
		<li className={`player ${ban ? 'player--disabled' : ''}`}>
			<div className={`player__item ${ban ? 'player__item--disabled' : ''}`}>
				{nowDiscussion ? (
					<button
						className={`player__number ${nowDiscussion && !ban ? 'player__number--active' : ''}`}
						onClick={() => handleNominatePlayer(number)}
						disabled={ban}
					>
						{number}
					</button>
				) : (
					<button
						className={`player__number ${currentCandidateNumber === number ? 'player__number--voting' : ''}`}
						onClick={() => giveVoice(number)}
						disabled={ban}
					>
						{number}
					</button>
				)}

				<div className="player__desc">
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
					{inVoting && <div className="player__votes">Голосов: {votes}</div>}
				</div>
				{phase === 'day' && (
					<div className="player__foll">
						<div className="player__foll-count">
							<input type="text" value={foul > 0 ? foul : 'Ф'} className="player__foll-number" readOnly />
							<button className="player__foll-btn player__foll-right" onClick={() => addFoul(number)}>
								<span className="icon-plus"></span>
							</button>
						</div>
					</div>
				)}

				<button className="player__foll-btn player__foll-del" onClick={openPopup} disabled={killedPlayer}>
					<span className="icon-close"></span>
				</button>
			</div>
			{hasTimer && <Timer />}
			{activePopup && phase === 'night' && (
				<div className="players__popup">
					<button className="players__popup-close" onClick={closePopup}>
						<span className="icon-close"></span>
					</button>
					<div className="players__popup-set">
						{!firstNight && (
							<button className="players__btn-confirm" onClick={() => excludePlayer(number)}>
								Убийство Мафией
							</button>
						)}

						<button className="players__btn-confirm" onClick={() => removePlayer(number)}>
							Дисквалификация
						</button>
						<button className="players__btn-confirm" onClick={() => teamLoss(number)}>
							Поражение команды
						</button>
					</div>
				</div>
			)}
			{activePopup && phase === 'day' && (
				<div className="players__popup">
					<button className="players__popup-close" onClick={closePopup}>
						<span className="icon-close"></span>
					</button>
					<div className="players__popup-set">
						<button className="players__btn-confirm" onClick={() => removeFoul(number)}>
							Убрать 1 Фол
						</button>
						<button className="players__btn-confirm" onClick={() => removePlayer(number)}>
							Дисквалификация
						</button>
						<button className="players__btn-confirm" onClick={() => teamLoss(number)}>
							Поражение команды
						</button>
					</div>
				</div>
			)}
		</li>
	);
};

export default PlayersItem;
