import { configureStore } from '@reduxjs/toolkit';
import roles from './slices/roleSlice';
import players from './slices/playerSlice';
import phases from './slices/phaseSlice';
import match from './slices/matchSlice';

import { loadState, saveState } from '../localStorage';

export const store = configureStore({
	reducer: {
		roles,
		players,
		phases,
		match,
	},
	preloadedState: loadState(),
});

store.subscribe(() => {
	saveState(store.getState());
});
