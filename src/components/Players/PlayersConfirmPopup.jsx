const PlayersConfirmPopup = ({ confirmPopup, offConfirm, number, removePlayer, teamLoss, killByMafia }) => {
	const confirmConfig = {
		kick_player: {
			text: 'Вы действительно хотите удалить игрока?',
			actionText: 'Дисквалификация',
			action: (number) => removePlayer(number),
		},
		team_loss: {
			text: 'Вы подтверждаете поражение команды?',
			actionText: 'Поражение команды',
			action: (number) => teamLoss(number),
		},
		mafia_kill: {
			text: 'Вы подтверждаете Убийство Мафией?',
			actionText: 'Убийство Мафией',
			action: (number) => killByMafia(number),
		},
	};

	return (
		<div className="players__popup">
			<button className="players__popup-close" onClick={offConfirm}>
				<span className="icon-close"></span>
			</button>

			<div className="players__popup-set">
				<div className="players__caution">{confirmConfig[confirmPopup].text}</div>

				<button
					className="players__btn-confirm"
					onClick={() => {
						confirmConfig[confirmPopup].action(number);
						offConfirm();
					}}
				>
					{confirmConfig[confirmPopup].actionText}
				</button>

				<button className="players__btn-confirm" onClick={offConfirm}>
					Отмена
				</button>
			</div>
		</div>
	);
};

export default PlayersConfirmPopup;
