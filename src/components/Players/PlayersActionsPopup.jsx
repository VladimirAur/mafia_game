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
	handleRemoveVote,
	handleRemoveNomination,
}) => {
	const { phase, dayNumber, currentPlayerNumber, status, candidates, removeAllVotes } = useSelector(
		(state) => state.match,
	);
	// Разрешить убийство мфией один раз
	const firstNight = dayNumber === 0;
	const allowMafiaKill = !firstNight && phase === 'night' && status !== 'speech_before';

	// Блок проверок что бы разрешить игроку отменить номинирование во время его речи
	const nowPlayerSpeach = currentPlayerNumber === number;
	const nominatedNumber = candidates.find((c) => c.nominatedBy === number)?.candidate;
	const hasNominee =
		nowPlayerSpeach && nominatedNumber && (status === 'discussion_on' || status === 'discussion_off');
	const hasVoted = candidates.some((c) => c.votes.includes(number)) || removeAllVotes.includes(number);
	const nowVoting = status === 'voting' || status === 'removeall_vote';

	return (
		<div className="players__popup">
			<button className="players__popup-close" onClick={closePopup}>
				<span className="icon-close"></span>
			</button>
			<div className="players__popup-set">
				{allowMafiaKill && (
					<button className="players__btn-confirm" onClick={() => onConfirm('mafia_kill')}>
						Убийство Мафией
					</button>
				)}
				{hasNominee && (
					<button className="players__btn-confirm" onClick={() => handleRemoveNomination(number)}>
						Убрать выставление
					</button>
				)}
				{hasVoted && nowVoting && (
					<button className="players__btn-confirm" onClick={() => handleRemoveVote(number)}>
						Убрать голос
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
