import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Timer from '../Timer';
import { nominatePlayer } from '../../redux/slices/matchSlice';

const PlayersItem = ({
	number,
	nickname,
	role,
	foul,
	addFoul,
	removeFoul,
	excludePlayer,
	ban,
	hasTimer,
	timerMode,
}) => {
	const dispatch = useDispatch();
	const phase = useSelector((state) => state.phases.phase);
	const playerHasTimer = useSelector((state) => state.match.currentPlayerNumber);
	const nominatedNumber = useSelector((state) => state.match.nominatedPlayers[number]);

	const handleNominatePlayer = (number) => {
		dispatch(nominatePlayer(number));
	};

	return (
		<li className={`player ${ban ? 'player--disabled' : ''}`}>
			<div className="player__item">
				<span
					className={`player__number ${playerHasTimer ? 'player__number--active' : ''}`}
					onClick={() => handleNominatePlayer(number)}
				>
					{number}
				</span>
				<div className="player__desc">
					<div className="player__name">{nickname ? nickname : 'Игрок'}</div>
					{phase === 'Ночь' && (
						<div className="player__status">
							<div className="player__role">{role}</div>
						</div>
					)}
					{phase === 'День' && nominatedNumber && (
						<div className="player__nominated">
							<span className="player__nominated-icon icon-left2"></span>
							{nominatedNumber}
						</div>
					)}
				</div>
				{phase === 'День' && (
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

				<button className="player__foll-btn player__foll-del" onClick={() => excludePlayer(number)}>
					<span className="icon-close"></span>
				</button>
			</div>
			{hasTimer && phase === 'День' && <Timer seconds={timerMode === 'normal' ? 60 : 30} />}
			{/* <Timer/> */}
		</li>
	);
};

export default PlayersItem;
