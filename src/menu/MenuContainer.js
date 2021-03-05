
import {useState, useEffect } from 'react';

import AppConfigReducer from "../reducer/appConfig";
import MenuItem from "./MenuItem";

import "./MenuContainer.css";

const MenuContainer = () => {
  const [menuItemList, setMenuItemList] = useState([]);
  const [reducerState] = AppConfigReducer();
  
  const {config} = reducerState;

  useEffect(() => {
    const tempArray = [];
    for (let i = 0; i < config.length; i += 1) {
      tempArray.push(
        <MenuItem
          data={config[i].menuData}
          url={config[i].url}
          hoverGesture={true}
          key={`menuItem_${i}`}
          text={config[i].name}
        />
      );
    }
    setMenuItemList(tempArray)
  }, [config])



  return (
    <div className="menuContainer">
      {menuItemList}
    </div>
  )
}

export default MenuContainer;
