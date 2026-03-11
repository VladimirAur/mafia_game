import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	phase: 'night',
	dayNumber: 0,
};

const phaseSlice = createSlice({
	name: 'phases',
	initialState,
	reducers: {
		nextPhase: (state) => {
			if (state.phase === 'night') {
				state.dayNumber += 1;
				state.phase = 'day';
			} else {
				state.phase = 'night';
			}
		},

		prevPhase: (state) => {
			if (state.phase === 'day') {
				state.phase = 'night';
				state.dayNumber -= 1;
			} else {
				if (state.dayNumber > 0) {
					state.phase = 'day';
				}
			}
		},

		resetPhase: () => initialState,
	},
});

export const { nextPhase, prevPhase, resetPhase } = phaseSlice.actions;

export default phaseSlice.reducer;
