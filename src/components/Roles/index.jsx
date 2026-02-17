import React from 'react';
import RolesItem from './RolesItem';
import object from '../../bd.json';

const Roles = () => {
	const [roles, setRoles] = React.useState([]);
    const [adding, setAdding] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

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
            {adding ? (
                <div className="roles__popup">
                    <div className={`roles__select ${isFocused ? "roles__select--focus" : ""}`}>
                        <input 
                            type="text"
                            placeholder="Роль..." 
                            className={`role__name ${isFocused ? "role__name--modbrt" : ""}`} 
                            onFocus={() => setIsFocused(!isFocused)}
                            onBlur={() => setIsFocused(false)} 
                        /> 
                        {isFocused && (
                            <ul className="roles__list">
                                <li className="role__name role__name--modbrb">Бессмертный</li>
                                <li className="role__name role__name--modbrb">Доктор</li>
                                <li className="role__name role__name--modbrb">Помошник</li>
                            </ul>)}
                        
                    </div>
				                
				<button className="roles__add roles__add--small" onClick={()=> setAdding(!adding)}>Добавить</button>
                </div>            
                ):
                (<button className="roles__add" onClick={()=> setAdding(!adding)}>+ Добавить роль</button>)
            }
            
			
			<button className="roles__start">Начать (10)</button>
		</div>
	);
};

export default Roles;
