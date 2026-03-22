import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	phase: 'night',
	dayNumber: 0,
	speakingOrder: [],
	spokePlayers: [],
	currentPlayerNumber: null,
	removedDuringDiscussion: false,
	nominatedPlayers: {},
	currentCandidate: null,
	candidates: [],
	killedPlayer: null,
	noKillNights: 0,
	isTieRepeat: false,
	removeAllVotes: [],
	status: 'idle',
};

const matchSlice = createSlice({
	name: 'match',
	initialState,
	reducers: {
		setSpeakingOrder: (state, action) => {
			state.speakingOrder = action.payload;
			state.status = 'idle';
		},
		switchPhase: (state) => {
			if (state.phase === 'night') {
				state.phase = 'day';
				state.dayNumber += 1;

				switch (true) {
					case state.status === 'speech_before':
						state.currentPlayerNumber = state.killedPlayer;
						break;

					case state.status === 'idle':
						state.status = 'discussion_off';
						state.currentPlayerNumber = state.speakingOrder[0] || null;
						break;
				}
			} else {
				if (state.status === 'speech_after' || state.status === 'idle') {
					state.spokePlayers = [];
					state.currentPlayerNumber = null;
					state.candidates = [];
				}

				state.phase = 'night';
			}
		},
		kickPlayer: (state, action) => {
			state.speakingOrder = state.speakingOrder.filter((n) => n !== action.payload);
			state.spokePlayers = state.spokePlayers.filter((n) => n !== action.payload);
			state.removedDuringDiscussion = true;
			state.noKillNights = 0;
		},

		killPlayer: (state, action) => {
			state.killedPlayer = action.payload;
			state.speakingOrder = state.speakingOrder.filter((n) => n !== action.payload);
			state.status = 'speech_before';
			state.noKillNights = 0;
		},

		endSpeechBefore: (state) => {
			state.currentPlayerNumber = state.speakingOrder[0] || null;
			state.status = 'discussion_off';
			state.killedPlayer = null;
		},
		startDiscussion: (state) => {
			state.currentPlayerNumber = state.speakingOrder[0] || null; // первый говорящий
			state.status = 'discussion_off'; // обсуждение началось, но таймер пока не включен
		},
		enableNomination: (state) => {
			state.status = 'discussion_on';
		},

		disableNomination: (state) => {
			state.status = 'discussion_off';
		},
		nominatePlayer: (state, action) => {
			const speaker = state.speakingOrder[0];
			if (state.status !== 'discussion_on') return;
			state.nominatedPlayers[speaker] = action.payload;
		},
		nextSpeaker: (state) => {
			const current = state.currentPlayerNumber;
			const exists = state.speakingOrder.includes(current);

			// удаляем текущего из speakingOrder
			state.speakingOrder = state.speakingOrder.filter((n) => n !== current);

			// добавляем в spokePlayers только если он реально был в очереди
			if (exists) {
				state.spokePlayers.push(current);
			}

			state.currentPlayerNumber = state.speakingOrder[0] || null;
			state.status = 'discussion_off';
		},
		endDiscussion: (state) => {
			const candidates = [];
			for (const setter of Object.keys(state.nominatedPlayers)) {
				const candidate = state.nominatedPlayers[setter];
				if (!candidates.some((c) => c.candidate === candidate)) {
					candidates.push({ candidate: Number(candidate), votes: [] });
				}
			}

			switch (true) {
				case state.removedDuringDiscussion:
					state.nominatedPlayers = {};
					state.status = 'idle';
					break;

				case candidates.length > 1:
					state.status = 'voting';
					state.currentCandidate = candidates[0].candidate;
					state.candidates = candidates;
					break;

				case candidates.length === 1:
					state.status = 'speech_after';
					state.currentPlayerNumber = candidates[0].candidate;
					break;

				default:
					state.nominatedPlayers = {};
					state.status = 'idle';
			}

			const alive = [...state.spokePlayers].sort((a, b) => a - b);

			// игрок, с которого начинаем
			const startPlayer = state.dayNumber + 1;
			// находим его индекс
			const startIndex = alive.indexOf(startPlayer);
			// если вдруг такого нет (например выбыл) — берём ближайшего следующего
			const safeIndex = startIndex !== -1 ? startIndex : 0;
			state.speakingOrder = [...alive.slice(safeIndex), ...alive.slice(0, safeIndex)];

			if (state.status !== 'speech_after') {
				state.currentPlayerNumber = null;
			}
			state.removedDuringDiscussion = false;
		},

		nextVotingPlayer: (state) => {
			if (!state.currentCandidate || !state.candidates.length) return;

			// находим индекс текущего кандидата
			const index = state.candidates.findIndex((c) => c.candidate === state.currentCandidate);

			// переключаем на следующего кандидата или ставим null
			state.currentCandidate = state.candidates[index + 1]?.candidate || null;
		},
		votePlayer: (state, action) => {
			const voter = action.payload;

			// 1. Проверяем, не голосовал ли уже этот игрок
			const alreadyVoted = state.candidates.some((c) => c.votes.includes(voter));
			if (alreadyVoted) return;
			// 2. Находим текущего кандидата
			const candidate = state.candidates.find((c) => c.candidate === state.currentCandidate);
			if (!candidate) return;
			// 3. Добавляем голос
			candidate.votes.push(voter);
		},
		nextTieSpeaker: (state) => {
			const index = state.candidates.findIndex((c) => c.candidate === state.currentPlayerNumber);

			const next = state.candidates[index + 1]?.candidate;

			if (next !== undefined) {
				state.currentPlayerNumber = next;
			} else {
				state.currentPlayerNumber = null;
				state.currentCandidate = state.candidates[0]?.candidate;
				state.status = 'voting';
			}
		},
		endVoting: (state) => {
			if (!state.candidates.length) return;

			const allPlayers = state.speakingOrder.concat(...state.candidates.flatMap((c) => c.votes));

			const votedSoFar = state.candidates.flatMap((c) => c.votes);
			const notVoted = allPlayers.filter((n) => !votedSoFar.includes(n));

			const lastCandidate = state.candidates[state.candidates.length - 1];
			lastCandidate.votes.push(...notVoted);

			state.status = 'counting_votes';
			state.currentCandidate = null;
		},
		reassignVote: (state, action) => {
			const { voter, newCandidate } = action.payload;
			console.log(voter, newCandidate);

			// Удаляем голос у старого кандидата
			const oldCandidate = state.candidates.find((c) => c.votes.includes(voter));
			if (oldCandidate) {
				oldCandidate.votes = oldCandidate.votes.filter((v) => v !== voter);
			}

			// Добавляем голос к новому кандидату
			const candidate = state.candidates.find((c) => c.candidate === newCandidate);
			if (candidate && !candidate.votes.includes(voter)) {
				candidate.votes.push(voter);
			}
		},
		finalizeVoting: (state) => {
			if (!state.candidates.length) return;

			const previousCandidatesCount = state.candidates.length;

			const maxVotes = Math.max(...state.candidates.map((c) => c.votes.length));
			const winners = state.candidates.filter((c) => c.votes.length === maxVotes);

			const currentCandidatesCount = winners.length;
			const isSameCandidatesCount = currentCandidatesCount === previousCandidatesCount;

			state.candidates = winners.map((c) => ({ candidate: c.candidate, votes: [] }));

			const winnersSet = new Set(winners.map((w) => w.candidate));
			state.nominatedPlayers = Object.fromEntries(
				Object.entries(state.nominatedPlayers).filter(([, c]) => winnersSet.has(Number(c))),
			);

			switch (true) {
				case currentCandidatesCount === 1:
					state.status = 'speech_after';
					state.currentPlayerNumber = winners[0].candidate;
					state.speakingOrder = state.speakingOrder.filter((n) => n !== winners[0].candidate);
					state.candidates = [];
					state.nominatedPlayers = {};
					state.isTieRepeat = false;
					break;

				case isSameCandidatesCount && state.isTieRepeat:
					state.status = 'removeall_vote';
					state.currentPlayerNumber = null;
					break;

				case isSameCandidatesCount:
					state.status = 'tie_speech';
					state.currentPlayerNumber = winners[0].candidate;
					state.isTieRepeat = true;
					break;

				default:
					state.status = 'tie_speech';
					state.currentPlayerNumber = winners[0].candidate;
					state.isTieRepeat = false;
			}

			state.currentCandidate = null;
		},
		voteRemoveAll: (state, action) => {
			const voter = action.payload;

			if (!state.removeAllVotes.includes(voter)) {
				state.removeAllVotes.push(voter);
			}
		},
		finalizeRemoveAll: (state) => {
			if (!state.removeAllVotes.length) return;

			const majority = Math.floor(state.speakingOrder.length / 2) + 1; // больше половины
			const enoughVotes = state.removeAllVotes.length >= majority;

			if (enoughVotes) {
				// Удаляем всех кандидатов
				state.speakingOrder = state.speakingOrder.filter(
					(n) => !state.candidates.some((c) => c.candidate === n),
				);
			}

			// Очистка после голосования
			state.removeAllVotes = [];
			state.candidates = [];
			state.nominatedPlayers = {};
			state.currentCandidate = null;
			state.currentPlayerNumber = null;
			state.isTieRepeat = false;
			state.status = 'idle';
		},

		endSpeechAfter: (state) => {
			state.currentPlayerNumber = null;
			state.nominatedPlayers = {};
			state.status = 'idle';
		},
		endDay: (state) => {
			state.status = 'idle';
			state.removedDuringDiscussion = false;
			state.nominatedPlayers = {};
		},

		checkDraw: (state) => {
			if (!state.killedPlayer) state.noKillNights++;
			else state.noKillNights = 0;

			if (state.noKillNights >= 3) {
				state.status = 'draw';
			}
		},
		clearStatus: (state) => {
			state.status = 'idle';
		},
		resetMatch: () => initialState,
	},
});

export const startMatch = () => (dispatch, getState) => {
	const players = getState().players.playersData;
	const speakingOrder = players.map((player) => player.number);

	dispatch(setSpeakingOrder(speakingOrder));
};
export const advancePhase = () => (dispatch, getState) => {
	const { phase, dayNumber } = getState().match;

	// checkDraw вызываем только если ночь и день > 0 (нулевая ночь не считается)
	if (phase === 'night' && dayNumber > 0) {
		dispatch(checkDraw());
	}

	// переход к следующей фазе
	dispatch(switchPhase());
};

export const {
	setSpeakingOrder,
	resetMatch,
	nominatePlayer,
	killPlayer,
	kickPlayer,
	endSpeechBefore,
	startDiscussion,
	enableNomination,
	disableNomination,
	nextSpeaker,
	endDiscussion,
	startVoting,
	votePlayer,
	nextVotingPlayer,
	nextTieSpeaker,
	endVoting,
	reassignVote,
	finalizeVoting,
	voteRemoveAll,
	finalizeRemoveAll,
	endSpeechAfter,
	endDay,
	checkDraw,
	clearStatus,
	switchPhase,
} = matchSlice.actions;

export default matchSlice.reducer;
