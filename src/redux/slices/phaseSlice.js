import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	phase: 'night',
	dayNumber: 1,
};

const phaseSlice = createSlice({
	name: 'phases',
	initialState,
	reducers: {
		nextPhase: (state) => {
			if (state.phase === 'night') {
				state.phase = 'day';
			} else {
				state.phase = 'night';
				state.dayNumber += 1;
			}
		},
		prevPhase(state) {
			if (state.phase === 'day') {
				state.phase = 'night';
			} else {
				if (state.dayNumber > 1) {
					state.phase = 'day';
					state.dayNumber -= 1;
				}
			}
		},

		resetPhase: () => initialState,
	},
});

export const { nextPhase, prevPhase, resetPhase } = phaseSlice.actions;

export default phaseSlice.reducer;
