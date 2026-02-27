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
		prevPhase(state) {
			if (state.phase === 'День') {
				state.phase = 'Ночь';
			} else {
				if (state.dayNumber > 1) {
					state.phase = 'День';
					state.dayNumber -= 1;
				}
			}
		},

		resetPhase: () => initialState,
	},
});

export const { nextPhase, prevPhase, resetPhase } = phaseSlice.actions;

export default phaseSlice.reducer;
