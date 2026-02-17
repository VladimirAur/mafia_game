import React from 'react';
import RolesItem from './RolesItem';
import object from '../../bd.json';

const Roles = () => {
	const [roles, setRoles] = React.useState([]);
	const [adding, setAdding] = React.useState(false);
	const [isFocused, setIsFocused] = React.useState(false);
	const [value, setValue] = React.useState();

	React.useEffect(() => {
		setRoles(object.roles);
	}, []);

	const addNewRole = (value) => {
		const newRole = {
			name: value,
			number: 1,
		};
		setRoles((prevRoles) => [...prevRoles, newRole]);
		setAdding(false);
		setValue('');
	};

	const resetRole = (indexToReset) => {
		setRoles((prevRoles) =>
			prevRoles.map(
				(role, index) =>
					index === indexToReset
						? { ...role, number: 0 }
						: role, 
			),
		);
	};

	return (
		<div className="roles">
			<h2 className="roles__title"># Настройки игры</h2>
			<ul className="roles__list">
				{roles.map((role, index) => (
					<RolesItem key={index} role={role} index={index} resetRole={resetRole} />
				))}
			</ul>
			{adding ? (
				<div className="roles__popup">
					<div className={`roles__select ${isFocused ? 'roles__select--focus' : ''}`}>
						<input
							type="text"
							value={value}
							placeholder="Роль..."
							className={`role__name ${isFocused ? 'role__name--modbrt' : ''}`}
							onFocus={() => setIsFocused(!isFocused)}
							onBlur={() => setIsFocused(false)}
							onChange={(e) => setValue(e.target.value)}
						/>
						<span className="roles__close" onMouseDown={() => setValue('')}>
							x
						</span>
						{isFocused && (
							<ul className="roles__list">
								<li
									className="role__name role__name--modbrb"
									onMouseDown={() => setValue('Бессмертный')}
								>
									Бессмертный
								</li>
								<li className="role__name role__name--modbrb" onMouseDown={() => setValue('Доктор')}>
									Доктор
								</li>
								<li className="role__name role__name--modbrb" onMouseDown={() => setValue('Помошник')}>
									Помошник
								</li>
							</ul>
						)}
					</div>
					<button className="roles__add roles__add--small" onClick={() => addNewRole(value)}>
						Добавить
					</button>
				</div>
			) : (
				<button className="roles__add" onClick={() => setAdding(true)}>
					+ Добавить роль
				</button>
			)}

			<button className="roles__start">Начать (10)</button>
		</div>
	);
};

export default Roles;
