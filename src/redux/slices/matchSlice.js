import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	speakingOrder: [],
	spokePlayers: [],
	currentPlayerNumber: null,
	speechAllowed: false,
	nominatedPlayers: {},
	voting: {},
	votedPlayers: [],
	currentCandidate: null,
	nominationOrder: [],
	killedPlayer: null,
	timerMode: '',
	status: 'discussion',
};

const matchSlice = createSlice({
	name: 'match',
	initialState,
	reducers: {
		setSpeakingOrder: (state, action) => {
			state.speakingOrder = action.payload;
		},

		nominatePlayer: (state, action) => {
			const speaker = state.speakingOrder[0];

			if (!speaker) return;

			state.nominatedPlayers[speaker] = action.payload;
		},

		resetMatch: () => initialState,

		killPlayer: (state, action) => {
			state.killedPlayer = action.payload;
			state.status = 'speech_before';
		},
		kickPlayer: (state, action) => {
			state.speakingOrder = state.speakingOrder.filter((n) => n !== action.payload);
		},
		startSpeachBefore: (state) => {
			state.currentPlayerNumber = state.killedPlayer;
			state.speakingOrder = state.speakingOrder.filter((n) => n !== state.killedPlayer);
			state.speechAllowed = true;
		},
		endSpeechBefore: (state) => {
			state.currentPlayerNumber = state.speakingOrder[0];
			state.speechAllowed = true;
			state.killedPlayer = null;
			state.status = 'discussion';
		},
		startDiscussion: (state) => {
			state.currentPlayerNumber = state.speakingOrder[0];
			state.speechAllowed = true;
		},
		nextSpeaker: (state) => {
			const player = state.speakingOrder.shift();
			state.spokePlayers.push(player);

			state.currentPlayerNumber = state.speakingOrder[0];
		},
		endDiscussion: (state, action) => {
			const dayNumber = action.payload;
			const player = state.spokePlayers.find((n) => n === dayNumber) ?? state.spokePlayers[0];
			state.speakingOrder = [...state.spokePlayers.filter((n) => n !== player), player];

			state.spokePlayers = [];
			state.currentPlayerNumber = null;
			state.speechAllowed = false;
			state.status = 'speech_after';
		},
		startVoting: (state) => {
			const candidates = [...new Set(Object.values(state.nominatedPlayers))];
			state.voting = Object.fromEntries(candidates.map((n) => [n, 0]));
			state.nominationOrder = candidates;
			state.votedPlayers = [];
			state.currentCandidate = candidates[0] || null;
			state.status = 'voting';
		},

		nextVotingPlayer: (state) => {
			if (!state.currentCandidate) return;

			const index = state.nominationOrder.indexOf(state.currentCandidate);

			state.currentCandidate = state.nominationOrder[index + 1] ?? null;

			state.votedPlayers = [];
		},
		votePlayer: (state, action) => {
			const voter = action.payload;

			if (state.votedPlayers.includes(voter)) return;

			state.voting[state.currentCandidate] += 1;
			state.votedPlayers.push(voter);
		},

		startSpeechAfter: (state, action) => {
			const player = Number(action.payload);
			state.currentPlayerNumber = player;
			state.speechAllowed = true;

			state.speakingOrder = state.speakingOrder.filter((n) => n !== player);
			state.nominatedPlayers = {};
		},
		endVoting: (state) => {
			const votes = state.voting;

			if (!votes || Object.keys(votes).length === 0) return;

			// 1. Находим максимальное количество голосов
			const maxVotes = Math.max(...Object.values(votes));

			// 2. Находим всех кандидатов с максимальным количеством голосов
			const winners = Object.keys(votes)
				.filter((candidate) => votes[candidate] === maxVotes)
				.map(Number); // ключи из объекта — строки, конвертим в числа

			const winnersSet = new Set(winners);

			state.nominatedPlayers = Object.fromEntries(
				state.nominationOrder
					.filter((candidate) => winnersSet.has(candidate))
					.flatMap((candidate) =>
						Object.entries(state.nominatedPlayers).filter(([voter, c]) => Number(c) === candidate),
					),
			);

			state.nominationOrder = state.nominationOrder.filter((c) => winnersSet.has(c));

			state.currentCandidate = null;
			state.voting = {};
			state.votedPlayers = [];
			state.status = 'speech_after';
		},
		endSpeechAfter: (state) => {
			state.currentPlayerNumber = null;
			state.speechAllowed = false;
			state.status = 'empty';
		},
		endDay: (state) => {
			state.status = 'discussion';
		},
	},
});

export const startMatch = () => (dispatch, getState) => {
	const players = getState().players.playersData;
	const speakingOrder = players.map((player) => player.number);

	dispatch(setSpeakingOrder(speakingOrder));
};

export const {
	setSpeakingOrder,
	resetMatch,
	nominatePlayer,
	killPlayer,
	kickPlayer,
	startSpeachBefore,
	endSpeechBefore,
	startDiscussion,
	nextSpeaker,
	endDiscussion,
	prepVoting,
	startVoting,
	votePlayer,
	nextVotingPlayer,
	endVoting,
	startSpeechAfter,
	endSpeechAfter,
	endDay,
} = matchSlice.actions;

export default matchSlice.reducer;
