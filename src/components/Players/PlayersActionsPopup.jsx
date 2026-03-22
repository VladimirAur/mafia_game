import React from 'react';
import { useSelector } from 'react-redux';

const PlayersActionsPopup = ({
	number,
	removeFoul,
	onConfirm,
	closePopup,
	revote,
	showCandidates,
	setShowCandidates,
}) => {
	const { phase, dayNumber, status, candidates } = useSelector((state) => state.match);
	const firstNight = dayNumber === 0;

	return (
		<div className="players__popup">
			<button className="players__popup-close" onClick={closePopup}>
				<span className="icon-close"></span>
			</button>
			<div className="players__popup-set">
				{!firstNight && phase === 'night' && (
					<button className="players__btn-confirm" onClick={() => onConfirm('mafia_kill')}>
						Убийство Мафией
					</button>
				)}
				{status === 'counting_votes' && (
					<button className="players__btn-confirm" onClick={() => setShowCandidates(true)}>
						Переголосовать
					</button>
				)}
				{showCandidates && (
					<div className="players__revote-numbers">
						{candidates.map((c) => (
							<button
								key={c.candidate}
								onClick={() => revote(number, c.candidate)}
								className="player__number player__number--active"
							>
								{c.candidate}
							</button>
						))}
					</div>
				)}
				<button className="players__btn-confirm" onClick={() => removeFoul(number)}>
					Убрать 1 Фол
				</button>

				<button className="players__btn-confirm" onClick={() => onConfirm('kick_player')}>
					Дисквалификация
				</button>
				<button className="players__btn-confirm" onClick={() => onConfirm('team_loss')}>
					Поражение команды
				</button>
			</div>
		</div>
	);
};

export default PlayersActionsPopup;
