import { configureStore } from '@reduxjs/toolkit';
import roles from './slices/roleSlice';
import players from './slices/playerSlice';

export const store = configureStore({
	reducer: {
		roles,
		players,
	},
});
