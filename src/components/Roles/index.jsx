import React from 'react';
import RolesItem from './RolesItem';
import object from "../../bd.json";

const Roles = () => {
  const [roles,setRoles] = React.useState([]);  
  

    React.useEffect(() =>{
        setRoles(object.roles);
        
        
    },[])  
    
    
  return (    		
    <div className="players">
        <ul className="players__list">
            {
                roles.map(item => <RolesItem key={item.id} {...item}/>) 
            }
        </ul>
    </div>
    )
}

export default Roles;