import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentPlayerNumber: null,
	timerMode: 'normal',
	nominatedPlayers: [],
};

const matchSlice = createSlice({
	name: 'match',
	initialState,
	reducers: {
		// старт дня
		startDay: (state, action) => {
			const { players, dayNumber } = action.payload;

			const start = players.find((p) => p.number >= dayNumber && !p.ban) ?? players.find((p) => !p.ban);

			state.currentPlayerNumber = start?.number ?? null;
			state.timerMode = 'normal';
			state.nominatedPlayers = [];
		},

		// следующий живой игрок (60с)
		nextPlayer: (state, action) => {
			const alive = action.payload.filter((p) => !p.ban);

			const index = alive.findIndex((p) => p.number === state.currentPlayerNumber);

			const next = alive[(index + 1) % alive.length];

			state.currentPlayerNumber = next?.number ?? null;
			state.timerMode = 'normal';
		},

		// таймер для забаненного игрока (30с)
		startBanTimer: (state, action) => {
			state.currentPlayerNumber = action.payload;
			state.timerMode = 'ban';
		},

		// выставление
		nominatePlayer: (state, action) => {
			const { nominated, by } = action.payload;

			!state.nominatedPlayers.some((n) => n.nominated === nominated) &&
				state.nominatedPlayers.push({ nominated, by });
		},
	},
});

export const { startDay, nextPlayer, startBanTimer, nominatePlayer } = matchSlice.actions;

export default matchSlice.reducer;
