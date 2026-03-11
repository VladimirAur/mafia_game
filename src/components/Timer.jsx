import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	endDiscussion,
	endSpeechAfter,
	endSpeechBefore,
	nextSpeaker,
	prepVoting,
	startVoting,
} from '../redux/slices/matchSlice';

const Timer = () => {
	const dispatch = useDispatch();
	const dayNumber = useSelector((state) => state.phases.dayNumber);
	const { speakingOrder, status, timerMode, nominatedPlayers } = useSelector((state) => state.match);

	const isLastPlayer = speakingOrder.length === 1;
	const valedictory = status === 'speech_before' || status === 'speech_after';
	const nowDiscuss = status === 'discussion' && !isLastPlayer;
	const nominatedList = Object.keys(nominatedPlayers).length;

	const [running, setRunning] = React.useState(false);
	const [time, setTime] = React.useState(timerMode === 'ban' ? 30 : 60);

	React.useEffect(() => {
		if (!running) return;
		const id = setInterval(() => setTime((t) => (t > 0 ? t - 1 : (setRunning(false), 0))), 1000);
		return () => clearInterval(id);
	}, [running]);

	const startTimer = () => setRunning(true);
	const pauseTimer = () => setRunning(false);

	const handleNextPlayer = () => {
		dispatch(nextSpeaker());
	};

	const finishDiscussion = (dayNumber) => {
		dispatch(nextSpeaker());
		dispatch(endDiscussion(dayNumber));

		if (nominatedList > 1) dispatch(startVoting());
	};

	const finishSpeech = () => {
		if (status === 'speech_before') {
			dispatch(endSpeechBefore());
		} else {
			dispatch(endSpeechAfter());
		}
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
			{valedictory && (
				<button className="timer__button timer__button-next" onClick={finishSpeech}>
					Закончить речь
				</button>
			)}
			{nowDiscuss ? (
				<button className="timer__button timer__button-next" onClick={handleNextPlayer}>
					Следующий игрок
				</button>
			) : (
				status === 'discussion' && (
					<button className="timer__button timer__button-next" onClick={() => finishDiscussion(dayNumber)}>
						Закончить обсуждение
					</button>
				)
			)}
		</div>
	);
};

export default Timer;
