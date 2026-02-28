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
		},

		startDay: (state) => {
			if (state.bannedQueue.length) {
				const banned = state.bannedQueue[0]; // Добавить проверку на первый елемент null если есть убрать
				state.speakingOrder = [banned, ...state.speakingOrder.filter((n) => n !== banned)];
				state.timerMode = 'ban';
			} else {
				state.timerMode = 'normal';
			}
		},
		endDay: (state, action) => {
			const dayNumber = action.payload;

			const player = state.spokePlayers.find((n) => n === dayNumber) ?? state.spokePlayers[0];

			// первый элемент null → таймер не стартует сразу
			state.speakingOrder = [null, ...state.spokePlayers.filter((n) => n !== player), player];

			state.bannedQueue = [];
			state.spokePlayers = [];
			state.timerMode = 'normal';
		},

		nextPlayer: (state) => {
			if (!state.speakingOrder.length) return;

			const player = state.speakingOrder.shift();

			if (!state.bannedQueue.includes(player)) {
				state.spokePlayers.push(player);
			}
		},
		banMatchPlayer: (state, action) => {
			const bannedNumber = action.payload;

			state.speakingOrder = state.speakingOrder.filter((n) => n !== bannedNumber);
			state.bannedQueue.push(bannedNumber);

			state.spokePlayers = [];
			state.currentPlayerNumber = bannedNumber;

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

export const { startDay, endDay, setSpeakingOrder, banMatchPlayer, nextPlayer, resetMatch } = matchSlice.actions;

export default matchSlice.reducer;
