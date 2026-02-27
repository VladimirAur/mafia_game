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

			// ищем первого банированного игрока
			const banned = players.find((p) => p.ban);

			if (banned) {
				state.currentPlayerNumber = banned.number;
				state.timerMode = 'foul'; // 30с
			} else {
				// первый игрок дня по номеру >= dayNumber
				const start = players.find((p) => p.number >= dayNumber && !p.ban) ?? players.find((p) => !p.ban);

				state.currentPlayerNumber = start?.number ?? null;
				state.timerMode = 'normal'; // 60с
			}

			state.nominatedPlayers = [];
		},

		nextPlayerReducer: (state, action) => {
			state.currentPlayerNumber = action.payload;
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

export const nextPlayer = () => (dispatch, getState) => {
	const players = getState().players.playersData;
	const { currentPlayerNumber } = getState().match;

	const alive = players.filter((p) => !p.ban);
	const index = alive.findIndex((p) => p.number === currentPlayerNumber);
	const next = alive[(index + 1) % alive.length];

	dispatch(nextPlayerReducer(next?.number ?? null));
};

export const { startDay, nextPlayerReducer, startBanTimer, nominatePlayer } = matchSlice.actions;

export default matchSlice.reducer;
