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
		addPlayerNickname(state, action) {
			const { number, name } = action.payload;
			const player = state.playersData.find((player) => player.number === number);
			if (player) player.nickname = name;
		},
		incrementFoul(state, action) {
			const player = state.playersData.find((player) => player.number === action.payload);
			if (player.foul < 4) player.foul += 1;
			player.ban = player.foul >= 4;
		},
		decrementFoul(state, action) {
			const player = state.playersData.find((player) => player.number === action.payload);
			if (player.foul > 0) player.foul -= 1;
			player.ban = player.foul >= 4;
		},
	},
});

export const { setPlayers, addPlayerNickname, incrementFoul, decrementFoul } = playerSlice.actions;
export default playerSlice.reducer;
