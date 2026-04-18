import { createSlice } from '@reduxjs/toolkit';
import { setOnRole } from './playerSlice';

const initialState = {
	phase: 'night',
	dayNumber: 0,
	gameLog: {
		night_0: ['mafiaIntroduced', 'freeSeating'],
	},
	stepIndex: 0,
	speakingOrder: [],
	firstSpeakerOfDay: null,
	spokePlayers: [],
	currentPlayerNumber: null,
	removedDuringDiscussion: false,
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
		createDayOrder: (state, action) => {
			const players = action.payload;
			const dayNumber = state.dayNumber + 1;

			state.gameLog[`day_${dayNumber}`] = players.map((p) => `discussion_${p}`);

			state.phase = 'day';
			state.dayNumber = dayNumber;
			state.stepIndex = 0;
		},
		createNightOrder: (state) => {
			state.gameLog[`night_${state.dayNumber}`] = ['mafiaWake', 'nightAction'];

			state.phase = 'night';
			state.stepIndex = 0;
		},
		// @@@@@@@@@@@@$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
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
						state.firstSpeakerOfDay = state.speakingOrder[0];
						break;
				}
			} else {
				if (state.status === 'speech_after' || state.status === 'idle') {
					state.spokePlayers = [];
					state.currentPlayerNumber = null;
					state.firstSpeakerOfDay = state.speakingOrder[0];
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
			if (state.killedPlayer === action.payload && state.phase === 'night') state.status = 'idle';
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

		enableNomination: (state) => {
			state.status = 'discussion_on';
		},

		nominatePlayer: (state, action) => {
			const speaker = state.currentPlayerNumber;
			const candidate = action.payload;

			if (state.status !== 'discussion_on') return;

			// уже номинировал
			if (state.candidates.some((c) => c.nominatedBy === speaker)) return;

			// уже есть такой кандидат
			if (state.candidates.some((c) => c.candidate === candidate)) return;

			state.candidates.push({
				candidate,
				votes: [],
				nominatedBy: speaker,
			});
		},
		removeNomination: (state, action) => {
			const speaker = action.payload;
			state.candidates = state.candidates.filter((c) => c.nominatedBy !== speaker);
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
			const candidates = state.candidates;

			switch (true) {
				case state.removedDuringDiscussion:
					state.candidates = [];
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
					state.speakingOrder = state.speakingOrder.filter((n) => n !== candidates[0].candidate);
					state.spokePlayers = state.spokePlayers.filter((n) => n !== candidates[0].candidate);
					break;

				default:
					state.candidates = [];
					state.status = 'idle';
			}

			const alive = [...state.spokePlayers].sort((a, b) => a - b);
			let startIndex = alive.findIndex((n) => n > state.firstSpeakerOfDay);

			if (startIndex === -1) startIndex = 0;

			state.speakingOrder = [...alive.slice(startIndex), ...alive.slice(0, startIndex)];

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
		removeVote: (state, action) => {
			const voter = action.payload;

			const candidate = state.candidates.find((c) => c.votes.includes(voter));

			if (candidate) {
				candidate.votes = candidate.votes.filter((v) => v !== voter);
			}
			state.removeAllVotes = state.removeAllVotes.filter((v) => v !== voter);
		},
		nextTieSpeaker: (state) => {
			const index = state.candidates.findIndex((c) => c.candidate === state.currentPlayerNumber);

			const next = state.candidates[index + 1]?.candidate;

			if (next !== undefined) {
				state.currentPlayerNumber = next;
			} else {
				state.currentPlayerNumber = null;
				state.currentCandidate = state.candidates[0]?.candidate;
				state.isTieRepeat = true;
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

			switch (true) {
				case currentCandidatesCount === 1:
					state.status = 'speech_after';
					state.currentPlayerNumber = winners[0].candidate;
					state.speakingOrder = state.speakingOrder.filter((n) => n !== winners[0].candidate);
					state.noKillNights = 0;
					state.candidates = [];
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
			// if (!state.removeAllVotes.length) return;

			const majority = Math.floor(state.speakingOrder.length / 2) + 1; // больше половины
			const enoughVotes = state.removeAllVotes.length >= majority;

			if (enoughVotes) {
				// Удаляем всех кандидатов
				state.speakingOrder = state.speakingOrder.filter(
					(n) => !state.candidates.some((c) => c.candidate === n),
				);
				state.spokePlayers = state.spokePlayers.filter((n) => !state.candidates.some((c) => c.candidate === n));
				state.noKillNights = 0;
			}

			// Очистка после голосования
			state.removeAllVotes = [];
			state.candidates = [];
			state.currentCandidate = null;
			state.currentPlayerNumber = null;
			state.isTieRepeat = false;
			state.status = 'idle';
		},

		endSpeechAfter: (state) => {
			state.currentPlayerNumber = null;
			state.status = 'idle';
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
// export const advancePhase = () => (dispatch, getState) => {
// 	const { phase, dayNumber } = getState().match;

// 	// checkDraw вызываем только если ночь и день > 0 (нулевая ночь не считается)
// 	if (phase === 'night' && dayNumber > 0) {
// 		dispatch(checkDraw());
// 	}

// 	// переход к следующей фазе
// 	dispatch(setOnRole(false));
// 	dispatch(switchPhase());
// };
export const advancePhase = () => (dispatch, getState) => {
	const { phase, dayNumber } = getState().match;

	const players = getState()
		.players.playersData.filter((p) => !p.ban)
		.map((p) => p.number);

	if (phase === 'night' && dayNumber > 0) {
		dispatch(checkDraw());
	}

	dispatch(setOnRole(false));

	if (phase === 'night') {
		dispatch(createDayOrder(players));
	} else {
		dispatch(createNightOrder());
	}
};

export const {
	createDayOrder,
	createNightOrder,
	// @@@@@@@@@@@@
	setSpeakingOrder,
	resetMatch,
	nominatePlayer,
	removeNomination,
	killPlayer,
	kickPlayer,
	endSpeechBefore,
	enableNomination,
	nextSpeaker,
	endDiscussion,
	votePlayer,
	removeVote,
	nextVotingPlayer,
	nextTieSpeaker,
	endVoting,
	reassignVote,
	finalizeVoting,
	voteRemoveAll,
	finalizeRemoveAll,
	endSpeechAfter,
	checkDraw,
	clearStatus,
	switchPhase,
} = matchSlice.actions;

export default matchSlice.reducer;
// 376
