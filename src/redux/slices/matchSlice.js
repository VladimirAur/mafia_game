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
			state.currentPlayerNumber = 1;
		},
		banMatchPlayer: (state, action) => {
			const bannedNumber = action.payload;

			state.speakingOrder = state.speakingOrder.filter((n) => n !== bannedNumber);
			state.bannedQueue.push(bannedNumber);

			state.spokePlayers = [];
			state.currentPlayerNumber = bannedNumber;

			state.timerMode = 'normal';
		},
		startDay: (state) => {
			// если есть бан, он говорит первым
			if (state.bannedQueue.length) {
				const banned = state.bannedQueue.shift();
				state.currentPlayerNumber = banned;
				state.timerMode = 'ban';
			} else {
				const first = state.speakingOrder.shift();
				state.currentPlayerNumber = first;
				state.timerMode = 'normal';
			}

			state.spokePlayers = [];
		},
		nextPlayer: (state) => {
			if (state.speakingOrder.length) {
				const next = state.speakingOrder.shift();
				state.currentPlayerNumber = next;
				state.timerMode = 'normal';
				state.spokePlayers.push(next);
			} else {
				state.currentPlayerNumber = null; // конец дня
			}
		},
	},
});

export const startMatch = () => (dispatch, getState) => {
	const players = getState().players.playersData;
	const speakingOrder = players.map((player) => player.number);

	dispatch(setSpeakingOrder(speakingOrder));
};

export const { setSpeakingOrder, banMatchPlayer, nextPlayer } = matchSlice.actions;

export default matchSlice.reducer;
