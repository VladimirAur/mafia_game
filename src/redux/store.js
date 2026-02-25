import { configureStore } from '@reduxjs/toolkit';
import roles from './slices/roleSlice';
import players from './slices/playerSlice';

import { loadState, saveState } from '../localStorage';

export const store = configureStore({
	reducer: {
		roles,
		players,
	},
	preloadedState: loadState(),
});

store.subscribe(() => {
	saveState(store.getState());
});
