import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

const rolesArray = [
	{
		id: '',
		name: 'Мафия',
		number: 2,
		icon: 'icon-mafiya',
		color: 'black',
		img: 'assets/img/mafia.svg',
	},
	{
		name: 'Житель',
		number: 6,
		icon: 'icon-man1',
		color: 'red',
		img: 'assets/img/peace.svg',
	},
	{
		name: 'Дон',
		number: 1,
		color: 'black',
		icon: 'icon-dollar',
		img: 'assets/img/don.svg',
	},
	{
		name: 'Шериф',
		number: 1,
		icon: 'icon-badge',
		color: 'red',
		img: 'assets/img/sherif.svg',
	},
	{
		name: 'Любовница',
		number: 0,
		icon: 'icon-man',
		color: 'red',
		img: 'assets/img/love.svg',
	},
	{
		name: 'Маньяк',
		number: 0,
		icon: 'icon-man',
		color: 'red',
		img: 'assets/img/maniak.svg',
	},
	{
		name: 'Доктор',
		number: 0,
		icon: 'icon-man',
		color: 'red',
		img: 'assets/img/doctor.svg',
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
