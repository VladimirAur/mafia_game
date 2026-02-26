import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

const rolesArray = [
	{
		id: '',
		name: 'Мафия',
		number: 2,
		icon: 'icon-mafiya',
		img: 'assets/img/chelovek_siluet_dym_121937_168x300.jpg',
	},
	{
		name: 'Житель',
		number: 6,
		icon: 'icon-user',
		img: 'assets/img/listia_liniia_neon_139772_168x300.jpg',
	},
	{
		name: 'Дон',
		number: 1,
		icon: 'icon-dollar',
		img: 'assets/img/volk_siluet_luna_118727_168x300.jpg',
	},
	{
		name: 'Шериф',
		number: 1,
		icon: 'icon-badge',
		img: 'assets/img/luna_derevo_zvezdnoe_nebo_132139_168x300.jpg',
	},
	{
		name: 'Любовница',
		number: 0,
		icon: 'icon-user',
		img: 'assets/img/astronavt_portal_neon_141352_168x300.jpg',
	},
	{
		name: 'Маньяк',
		number: 0,
		icon: 'icon-user',
		img: 'assets/img/doroga_zakat_gorizont_118582_168x300.jpg',
	},
	{
		name: 'Гомночист',
		number: 0,
		icon: 'icon-user',
		img: 'assets/img/doroga_razmetka_pasmurno_124093_168x300.jpg',
	},
	{
		name: 'Хакер',
		number: 0,
		icon: 'icon-user',
		img: 'assets/img/zvezdnoe_nebo_mlechnyj_put_noch_124665_168x300.jpg',
	},
];

const calculateTotal = (rolesData) => rolesData.reduce((sum, r) => sum + r.number, 0);

const initialState = {
	rolesData: rolesArray,
	totalCount: calculateTotal(rolesArray),
};

const roleSlice = createSlice({
	name: 'roles',
	initialState,
	reducers: {
		activateRole(state, action) {
			const role = state.rolesData.find((r) => r.name === action.payload);
			if (role) role.number = 1;
			else state.rolesData.push({ name: action.payload, number: 1, img: '' });
			state.totalCount = calculateTotal(state.rolesData);
		},
		incrementNumber(state, action) {
			const role = state.rolesData.find((r) => r.name === action.payload);
			if (role) role.number += 1;
			state.totalCount = calculateTotal(state.rolesData);
		},
		decrementNumber(state, action) {
			const role = state.rolesData.find((r) => r.name === action.payload);
			if (role && role.number > 0) role.number -= 1;
			state.totalCount = calculateTotal(state.rolesData);
		},
		resetNumber(state, action) {
			const role = state.rolesData.find((r) => r.name === action.payload);
			if (role) role.number = 0;
			state.totalCount = calculateTotal(state.rolesData);
		},
		resetRoles: () => initialState,
	},
});

export const selectRoles = createSelector([(state) => state.roles.rolesData], (roles) => {
	const mainRoles = [];
	const extraRoles = [];

	roles.forEach((role) => {
		if (role.number > 0) mainRoles.push(role);
		else extraRoles.push(role);
	});

	return { mainRoles, extraRoles };
});

export const { activateRole, incrementNumber, decrementNumber, resetNumber, resetRoles } = roleSlice.actions;
export default roleSlice.reducer;
