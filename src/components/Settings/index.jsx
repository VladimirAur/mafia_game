import React from 'react';
import SettingsItem from './SettingsItem';
import object from "../../bd.json";

const Settings = () => {
  const [settings,setSettings] = React.useState([]);  
  

    React.useEffect(() =>{
        setSettings(object.settings);
        
        
    },[])  
    
    
  return (    		
    <div className="players">
        <ul className="players__list">
            {
                settings.map(item => <SettingsItem key={item.id} {...item}/>) 
            }
        </ul>
    </div>
    )
}

export default Settings;