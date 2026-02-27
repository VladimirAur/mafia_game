import React from 'react';
import { useSelector } from 'react-redux';

const PlayersItem = ({ number, nickname, role, foul, addFoul, removeFoul, excludePlayer, ban }) => {
	const phase = useSelector((state) => state.phases.phase);

	return (
		<li className={`player ${ban ? 'player--disabled' : ''}`}>
			<div className="player__item">
				<span className={`player__number ${ban ? 'player__number--disabled' : ''}`}>{number}</span>
				<div className="player__desc">
					<div className="player__name">{nickname ? nickname : 'Игрок'}</div>
					{phase === 'Ночь' && (
						<div className="player__status">
							<div className="player__role">{role}</div>
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

			<div className="player__timer timer">
				<div className="timer__count">60c</div>
				<button className="timer__button">S</button>
				<button className="timer__button">P</button>
				<button className="timer__button">Следующий</button>
			</div>
		</li>
	);
};

export default PlayersItem;
