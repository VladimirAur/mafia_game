import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentPlayerNumber, endDay, nextPlayer } from '../redux/slices/matchSlice';

const Timer = ({ seconds }) => {
	const dispatch = useDispatch();
	const dayNumber = useSelector((state) => state.phases.dayNumber);
	const timerMode = useSelector((s) => s.match.timerMode);
	const [time, setTime] = React.useState(timerMode === 'ban' ? 20 : 10);
	const [running, setRunning] = React.useState(false);
	const speakingOrder = useSelector((state) => state.match.speakingOrder);
	const currentPlayerNumber = useSelector((state) => state.match.currentPlayerNumber);
	const isLastPlayer = speakingOrder.length === 1;
	const isSpeechNow = currentPlayerNumber !== null && !speakingOrder.includes(currentPlayerNumber);

	React.useEffect(() => {
		if (!running) return;
		const id = setInterval(() => setTime((t) => (t > 0 ? t - 1 : (setRunning(false), 0))), 1000);
		return () => clearInterval(id);
	}, [running]);

	const startTimer = () => setRunning(true);
	const pauseTimer = () => setRunning(false);

	const handleNextPlayer = () => {
		dispatch(nextPlayer());
	};

	const handleEndDay = (dayNumber) => {
		dispatch(nextPlayer());
		dispatch(endDay(dayNumber));
	};

	const finishSpeech = () => {
		dispatch(clearCurrentPlayerNumber());
	};

	return (
		<div className="player__timer timer">
			<div className="timer__control">
				<div className="timer__count">{time} сек</div>
				<button className="timer__button" onClick={startTimer}>
					<span className="icon-play3"></span>
				</button>
				<button className="timer__button">
					<span className="icon-stop2" onClick={pauseTimer}></span>
				</button>
			</div>
			{isSpeechNow ? (
				<button className="timer__button timer__button-next" onClick={finishSpeech}>
					Закончить речь
				</button>
			) : !isLastPlayer ? (
				<button className="timer__button timer__button-next" onClick={handleNextPlayer}>
					Следующий Игрок
				</button>
			) : (
				<button className="timer__button timer__button-next" onClick={() => handleEndDay(dayNumber)}>
					Конец обсуждения
				</button>
			)}
		</div>
	);
};

export default Timer;
