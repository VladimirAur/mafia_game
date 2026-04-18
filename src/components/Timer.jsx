import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	advancePhase,
	enableNomination,
	endDiscussion,
	endSpeechAfter,
	endSpeechBefore,
	endVoting,
	nextSpeaker,
	nextTieSpeaker,
	nextVotingPlayer,
} from '../redux/slices/matchSlice';
import { deletePlayer } from '../redux/slices/playerSlice';

const Timer = () => {
	const dispatch = useDispatch();
	const {
		speakingOrder,
		status,
		currentPlayerNumber,
		currentCandidate,
		candidates,
		dayNumber,
		phase,
		gameLog,
		stepIndex,
	} = useSelector((state) => state.match);
	// STATE REFACTOR
	const matchSteps = gameLog[`${phase}_${dayNumber}`] || [];
	const currentStep = matchSteps[stepIndex];
	const nextStep = matchSteps[stepIndex + 1];

	// **STATE REFACTOR

	// Проверка для таймера в первую ночь
	const firstNight = dayNumber === 0;
	// Проверки для ежедневных монологов
	const nowDiscussion = status === 'discussion_off' || status === 'discussion_on';
	const isLastSpeaker = speakingOrder.length === 1;
	// Проверка для речей после исключения
	const nowSingleSpeech = status === 'speech_before' || status === 'speech_after';
	// Проверки для голосования
	const nowVoting = status === 'voting';
	const isLastCandidate = currentCandidate === candidates[candidates.length - 1]?.candidate;
	// Проверки для речей во время голосования
	const nowTieSpeech = status === 'tie_speech';
	const isLastTieSpeaker = currentPlayerNumber === candidates[candidates.length - 1]?.candidate;

	const getSeconds = (status, currentStep) => {
		switch (true) {
			// первая ночь
			case currentStep === 'mafiaIntroduced':
				return 90;

			// дневные статусы
			case status === 'discussion_off':
			case status === 'discussion_on':
			case status === 'speech_after':
			case status === 'speech_before':
				return 60;

			case status === 'voting':
				return 2;

			case status === 'tie_speech':
				return 30;

			default:
				return 60;
		}
	};

	const seconds = getSeconds(status, currentStep) ?? 60;

	const [time, setTime] = React.useState(seconds);
	const [timerOn, setTimerOn] = React.useState(false);

	React.useEffect(() => {
		if (!timerOn) return;

		const id = setInterval(() => {
			setTime((t) => {
				if (t <= 1) {
					clearInterval(id);
					setTimerOn(false); // останавливаем таймер
					return 0;
				}
				return t - 1;
			});
		}, 1000);
		return () => clearInterval(id);
	}, [timerOn, dispatch]);

	const startTimer = () => {
		setTimerOn(true);
		if (status === 'discussion_off') dispatch(enableNomination());
	};

	const pauseTimer = () => {
		setTimerOn(false);
	};
	const onNextPhase = () => {
		dispatch(advancePhase());
	};
	const handleNextPlayer = () => {
		setTime(seconds);
		setTimerOn(false);
		dispatch(nextSpeaker());
	};

	const finishDiscussion = () => {
		dispatch(nextSpeaker());
		dispatch(endDiscussion());
	};

	const finishSpeech = (playerNumber) => {
		if (status === 'speech_before') {
			dispatch(endSpeechBefore());
			setTime(seconds);
			setTimerOn(false);
		} else {
			dispatch(endSpeechAfter());
			dispatch(deletePlayer(playerNumber));
			setTime(seconds);
			setTimerOn(false);
		}
	};

	const handleNextTieSpeaker = () => {
		setTime(seconds);
		setTimerOn(false);
		dispatch(nextTieSpeaker());
	};
	const changeCandidate = () => {
		setTime(seconds);
		setTimerOn(false);
		dispatch(nextVotingPlayer());
	};

	const finishElection = () => {
		setTimerOn(false);
		dispatch(endVoting());
	};

	return (
		<div className="player__timer timer">
			{currentStep === 'mafiaIntroduced' && (
				<div className="timer__text">
					{time > 35 ? 'Просыпается Дон и Мафия' : time > 30 ? 'Мафия засыпает' : 'Вольная посадка'}
				</div>
			)}

			{currentPlayerNumber && (
				<div className="timer__text">
					{status === 'speech_after' || status === 'speech_before' ? 'Прощальная речь игрока' : 'Речь игрока'}{' '}
					{currentPlayerNumber}
				</div>
			)}
			{currentCandidate && <div className="timer__text">Голосование за игрока {currentCandidate}</div>}

			<div className="timer__control">
				<div
					className={`timer__count ${
						(firstNight && time <= 35 && time > 30) || (!firstNight && time <= 11)
							? 'timer__count--warning'
							: ''
					}`}
				>
					{time} сек
				</div>
				<button className="timer__button" onClick={pauseTimer}>
					<span className="icon-pause2"></span>
				</button>
				<button className="timer__button" onClick={startTimer}>
					<span className="icon-play3"></span>
				</button>
			</div>
			{currentStep === 'mafiaIntroduced' && (
				<button className="timer__button" onClick={() => onNextPhase()}>
					Закончить знакомство
				</button>
			)}
			{nowSingleSpeech && (
				<button className="timer__button" onClick={() => finishSpeech(currentPlayerNumber)}>
					Закончить речь
				</button>
			)}
			{nowDiscussion && !isLastSpeaker && (
				<button className="timer__button" onClick={handleNextPlayer}>
					Следующий игрок
				</button>
			)}
			{nowDiscussion && isLastSpeaker && (
				<button className="timer__button" onClick={finishDiscussion}>
					Закончить обсуждение
				</button>
			)}
			{nowVoting && !isLastCandidate && (
				<button className="timer__button" onClick={changeCandidate}>
					Следующий игрок
				</button>
			)}
			{isLastCandidate && (
				<button className="timer__button" onClick={() => finishElection()}>
					Закончить голосование
				</button>
			)}
			{nowTieSpeech && !isLastTieSpeaker && (
				<button className="timer__button" onClick={handleNextTieSpeaker}>
					Следующий игрок
				</button>
			)}
			{nowTieSpeech && isLastTieSpeaker && (
				<button className="timer__button" onClick={handleNextTieSpeaker}>
					Повторное голосование
				</button>
			)}
		</div>
	);
};

export default Timer;
