import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	playersData: [],
};

const playerSlice = createSlice({
	name: 'players',
	initialState,
	reducers: {
		setPlayers(state, action) {
			state.playersData = action.payload;
		},
	},
});

export const { setPlayers } = playerSlice.actions;
export default playerSlice.reducer;
