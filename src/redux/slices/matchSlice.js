import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	speakingOrder: [],
	bannedQueue: [],
	spokePlayers: [],
	nominatedPlayers: {},
	timerMode: '',
	currentPlayerNumber: null,
};

const matchSlice = createSlice({
	name: 'match',
	initialState,
	reducers: {
		setSpeakingOrder: (state, action) => {
			state.speakingOrder = action.payload;
		},

		startDay: (state) => {
			state.currentPlayerNumber = state.speakingOrder[0];
			if (state.speakingOrder[0] === null) state.speakingOrder.shift();

			const banned = state.bannedQueue.shift();
			state.timerMode = banned !== undefined ? 'ban' : 'normal';

			if (banned !== undefined) state.speakingOrder.unshift(banned);

			state.spokePlayers = [];
			// state.currentPlayerNumber = null;
		},
		endDay: (state, action) => {
			const dayNumber = action.payload;

			const player = state.spokePlayers.find((n) => n === dayNumber) ?? state.spokePlayers[0];

			// первый элемент null → таймер не стартует сразу
			state.speakingOrder = [null, ...state.spokePlayers.filter((n) => n !== player), player];

			state.bannedQueue = [];
			state.spokePlayers = [];
			state.timerMode = 'test';
			state.currentPlayerNumber = null;
		},

		nextPlayer: (state) => {
			if (!state.speakingOrder.length) return;

			const player = state.speakingOrder.shift();

			if (!state.bannedQueue.includes(player)) {
				state.spokePlayers.push(player);
			}
			state.currentPlayerNumber = state.speakingOrder[0];
		},
		nominatePlayer: (state, action) => {
			const speaker = state.speakingOrder[0];

			if (!speaker) return; // нет активной речи

			state.nominatedPlayers[speaker] = action.payload;
			// всегда перезаписывается
		},
		giveSpeech: (state, action) => {
			const player = Number(action.payload);

			state.currentPlayerNumber = player;

			state.speakingOrder = state.speakingOrder.filter((n) => n !== player);
			state.nominatedPlayers = {};
		},
		clearCurrentPlayerNumber: (state) => {
			state.currentPlayerNumber = null;
		},
		banMatchPlayer: (state, action) => {
			const bannedNumber = action.payload;

			state.speakingOrder = state.speakingOrder.filter((n) => n !== bannedNumber);
			state.bannedQueue.push(bannedNumber);

			state.spokePlayers = [];
			state.timerMode = 'normal';
		},
		resetMatch: () => initialState,
	},
});

export const startMatch = () => (dispatch, getState) => {
	const players = getState().players.playersData;
	const speakingOrder = players.map((player) => player.number);

	dispatch(setSpeakingOrder(speakingOrder));
};

export const {
	startDay,
	endDay,
	setSpeakingOrder,
	banMatchPlayer,
	nextPlayer,
	resetMatch,
	giveSpeech,
	clearCurrentPlayerNumber,
	nominatePlayer,
} = matchSlice.actions;

export default matchSlice.reducer;
