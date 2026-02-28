import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	speakingOrder: [],
	bannedQueue: [],
	spokePlayers: [],
	currentPlayerNumber: null,
};

const matchSlice = createSlice({
	name: 'match',
	initialState,
	reducers: {
		setSpeakingOrder: (state, action) => {
			state.speakingOrder = action.payload;
			state.spokePlayers = [];
			state.bannedQueue = [];
			state.currentPlayerNumber = null;
		},
		banMatchPlayer: (state, action) => {
			const bannedNumber = action.payload;

			state.speakingOrder = state.speakingOrder.filter((n) => n !== bannedNumber);
			state.bannedQueue.push(bannedNumber);

			state.spokePlayers = [];
			state.currentPlayerNumber = bannedNumber;

			state.timerMode = 'normal';
		},
	},
});

export const startMatch = () => (dispatch, getState) => {
	const players = getState().players.playersData;
	const speakingOrder = players.map((player) => player.number);

	dispatch(setSpeakingOrder(speakingOrder));
};

export const { setSpeakingOrder, banMatchPlayer } = matchSlice.actions;

export default matchSlice.reducer;
