import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Timer from '../Timer';
import { nominatePlayer, banMatchPlayer } from '../../redux/slices/matchSlice';

const PlayersItem = ({
	number,
	nickname,
	role,
	foul,
	addFoul,
	removeFoul,
	// excludePlayer,
	ban,
	hasTimer,
	timerMode,
}) => {
	const dispatch = useDispatch();
	const phase = useSelector((state) => state.phases.phase);
	const playerHasTimer = useSelector((state) => state.match.currentPlayerNumber);
	const nominatedNumber = useSelector((state) => state.match.nominatedPlayers[number]);
	const speechAllowed = useSelector((state) => state.match.speechAllowed);
	const [activePopup, setActivePopup] = React.useState(false);

	const handleNominatePlayer = (number) => {
		dispatch(nominatePlayer(number));
	};

	const closePopup = () => {
		setActivePopup(false);
	};
	const openPopup = () => {
		setActivePopup(true);
	};
	const excludePlayer = (number) => {
		dispatch(banMatchPlayer(number));
		setActivePopup(false);
	};

	return (
		<li className={`player ${ban ? 'player--disabled' : ''}`}>
			<div className="player__item">
				{phase === 'day' ? (
					<span
						className={`player__number ${playerHasTimer ? 'player__number--active' : ''}`}
						onClick={() => handleNominatePlayer(number)}
					>
						{number}
					</span>
				) : (
					<span className="player__number">{number}</span>
				)}

				<div className="player__desc">
					<div className="player__name">{nickname ? nickname : 'Игрок'}</div>
					{phase === 'night' && (
						<div className="player__status">
							<div className="player__role">{role}</div>
						</div>
					)}
					{phase === 'day' && nominatedNumber && (
						<div className="player__nominated">
							<span className="player__nominated-icon icon-left2"></span>
							{nominatedNumber}
						</div>
					)}
				</div>
				{phase === 'day' && (
					<div className="player__foll">
						<div className="player__foll-count">
							<button className="player__foll-btn player__foll-left" onClick={() => removeFoul(number)}>
								<span className="icon-minus"></span>
							</button>
							<input type="text" value={foul > 0 ? foul : 'Ф'} className="player__foll-number" readOnly />
							<button className="player__foll-btn player__foll-right" onClick={() => addFoul(number)}>
								<span className="icon-plus"></span>
							</button>
						</div>
					</div>
				)}

				<button className="player__foll-btn player__foll-del" onClick={openPopup}>
					<span className="icon-close"></span>
				</button>
			</div>
			{hasTimer && speechAllowed && <Timer seconds={timerMode === 'normal' ? 60 : 30} />}
			{activePopup && (
				<div className="players__popup">
					<button className="players__popup-close" onClick={closePopup}>
						<span className="icon-close"></span>
					</button>
					<div className="players__popup-set">
						<button className="players__btn-confirm" onClick={() => excludePlayer(number)}>
							Killed
						</button>
						<button className="players__btn-confirm">DeletedMatch</button>
					</div>
				</div>
			)}
		</li>
	);
};

export default PlayersItem;
