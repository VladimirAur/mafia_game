import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	playersData: [],
	gameStatus: '',
	onRole: false,
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
			// player.ban = player.foul >= 4;
		},
		decrementFoul(state, action) {
			const player = state.playersData.find((player) => player.number === action.payload);
			if (player.foul > 0) player.foul -= 1;
			// player.ban = player.foul >= 4;
		},
		deletePlayer(state, action) {
			const deleteNumber = Number(action.payload);
			const player = state.playersData.find((player) => player.number === deleteNumber);
			player.ban = true;
		},
		checkWinner: (state) => {
			const activePlayers = state.playersData.filter((p) => !p.ban);

			const blackCount = activePlayers.filter((p) => p.color === 'black').length;
			const redCount = activePlayers.filter((p) => p.color === 'red').length;

			if (blackCount === 0 && redCount > 0) {
				state.gameStatus = 'winner_red'; // все черные убраны
			} else if (blackCount > 0 && redCount > 0 && blackCount === redCount) {
				state.gameStatus = 'winner_black'; // поровну → черные победили
			} else {
				state.gameStatus = 'in_game'; // игра продолжается
			}
		},
		loseByPlayer: (state, action) => {
			const player = action.payload; // объект игрока или его number/id
			state.gameStatus = player.color === 'black' ? 'winner_red' : 'winner_black';
		},
		clearGameStatus: (state) => {
			state.gameStatus = '';
		},
		setOnRole: (state, action) => {
			state.onRole = action.payload;
		},
		resetPlayers: () => initialState,
		// ТЕСТ ТЕСТ
		setPlayerRole: (state, action) => {
			const { number, role } = action.payload;

			const player = state.playersData.find((p) => p.number === number);
			if (player) {
				player.role = role.name;
				player.img = role.img;
				player.color = role.color;
			}
		},
	},
});

export const {
	setPlayers,
	addPlayerNickname,
	incrementFoul,
	decrementFoul,
	deletePlayer,
	checkWinner,
	loseByPlayer,
	clearGameStatus,
	setOnRole,
	resetPlayers,
	setPlayerRole,
} = playerSlice.actions;
export default playerSlice.reducer;
