import React from 'react';
import RolesItem from './RolesItem';
import object from '../../bd.json';

const Roles = () => {
	const [roles, setRoles] = React.useState([]);
    const [activePopup, setActivePopup] = React.useState(false);

	React.useEffect(() => {
		setRoles(object.roles);
	}, []);

	return (
		<div className="roles">
			<h2 className="roles__title"># Настройки игры</h2>
			<ul className="roles__list">
				{roles.map((item) => (
					<RolesItem key={item.id} {...item} />
				))}
			</ul>
            {activePopup ? (
                <div className="roles__popup">
				<input type="text" placeholder="Роль..." className="role__name" />
				<button className="roles__add roles__add--small">Добавить</button>
			</div>            
            ):
            (<button className="roles__add">+ Добавить роль</button>)
        }
            
			
			
			<button className="roles__start">Начать (10)</button>
		</div>
	);
};

export default Roles;
