import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	speakingOrder: [],
	bannedQueue: [],
	spokePlayers: [],
	nominatedPlayers: {},
	killedPlayer: null,
	timerMode: '',
	speechAllowed: false,
	endDiscussion: false,
	currentPlayerNumber: null,
	status: 'empty',
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
			state.speechAllowed = true;
		},

		nextPlayer: (state) => {
			const player = state.speakingOrder.shift();
			state.spokePlayers.push(player);

			state.currentPlayerNumber = state.speakingOrder[0];
		},
		endDay: (state, action) => {
			const dayNumber = action.payload;
			const player = state.spokePlayers.find((n) => n === dayNumber) ?? state.spokePlayers[0];
			state.speakingOrder = [...state.spokePlayers.filter((n) => n !== player), player];

			state.spokePlayers = [];
			state.currentPlayerNumber = null;
			state.endDiscussion = true;
			state.speechAllowed = false;
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
			state.speechAllowed = true;

			state.speakingOrder = state.speakingOrder.filter((n) => n !== player);
			state.nominatedPlayers = {};
		},
		endSpeech: (state) => {
			if (state.endDiscussion) {
				state.currentPlayerNumber = null;
				state.speechAllowed = false;
			} else {
				state.currentPlayerNumber = state.speakingOrder[0];
				state.speechAllowed = true;
			}
		},
		clearCurrentPlayerNumber: (state) => {
			state.currentPlayerNumber = null;
		},
		banMatchPlayer: (state, action) => {
			state.nominatedPlayers[action.payload] = action.payload;
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
	endSpeech,
	clearCurrentPlayerNumber,
	nominatePlayer,
} = matchSlice.actions;

export default matchSlice.reducer;
