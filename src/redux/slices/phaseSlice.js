import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	phase: 'Ночь',
	dayNumber: 1,
};

const phaseSlice = createSlice({
	name: 'phases',
	initialState,
	reducers: {
		nextPhase: (state) => {
			if (state.phase === 'Ночь') {
				state.phase = 'День';
			} else {
				state.phase = 'Ночь';
				state.dayNumber += 1;
			}
		},

		resetPhase: () => initialState,
	},
});

export const { nextPhase, resetPhase } = phaseSlice.actions;

export default phaseSlice.reducer;
