import {useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import Switch from "react-switch";
import AppConfigReducer from "../reducer/appConfig";
import AppNetworkReducer from "../reducer/network";
import { FixedSizeList as List} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import SwitchDarkMode from "react-switch";
import Card from "./Card";

import "./ViewContainer.css";

const ViewContainer = () => {
  const [cardList, setCardList] = useState([]);

  const defaultHeaderText = "Please click on a menu item";
  const [headerText, setHeaderText] = useState(defaultHeaderText);

  const [reducerState, reducerAction] = AppConfigReducer();
  const {config, viewMode, viewColorMode} = reducerState;

  const [networkState, networkAction] = AppNetworkReducer();

  const {
    category,
    item
  } = useParams();
  const {viewList} = networkState;
  useEffect(() => {
    const cardArray = viewList.map(
      (element, index) => {
        return <Card data={element} key={`card_${index}`} />;
      }
    );
    if (viewList.length) setHeaderText(oldState => `${oldState} (${cardArray.length})`);
    setCardList(cardArray);
  }, [networkState]);

  useEffect(() => {
    networkAction({type: "resetView"});

    for (let i = 0; i < config.length; i += 1) {
      if(config[i].url === category) {
        const text = `${config[i].name} / ${item}`;
        setHeaderText(text);
        networkAction({
          type: "loadView",
          url: `${config[i].viewUrl}${item}`
        });
        return;
      }
    }
    setHeaderText(defaultHeaderText);
  }, [config, category, item]);

  const switchChange = (checked) => {
    reducerAction({
      type: "setViewMode",
      payload:  checked ? "list" : "icon"
    });
  }

  const switchChangeColor = (checked) => {
    reducerAction({
      type: "setViewColorMode",
      payload: checked ? "lightMode" : "darkMode"
    });
  }

  const Row = ({ index, style }) => (
    <div style={style}>
      <div className="listItem">
        <img src={viewList[index].image}/>
        <div className="text">
          {viewList[index].name}
        </div>
        <div className="text">
          {viewList[index].gameSeries}
        </div>
        <div className="text">
          {viewList[index].character}
        </div>

      </div>
    </div>
  );

  let viewColorModeDisplay = "viewContainer viewLightMode";

  if (viewColorMode === "darkMode") {
    viewColorModeDisplay="viewContainer viewDarkMode";
    
  }

  

  
  let viewModeDisplay = 
    <div className="scroller">
      {cardList}
    </div>;
  if (viewMode === "list") {
    viewModeDisplay = 
    <AutoSizer>
      {({ height, width}) => (
        <List
          className="list"
          height={height}
          itemCount={viewList.length}
          itemSize={110}
          width={width}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  }

  return(
    <div className={viewColorModeDisplay === "viewContainer viewLightMode" ? "viewContainer viewLightMode" : "viewContainer viewDarkMode"}>
      <div className="header">
        <div className="switch">
          <span>Dark</span>
            <SwitchDarkMode 
              checked={viewColorMode === "lightMode"}
              onChange={switchChangeColor}
            />
          <span>Light</span>
        </div>
        <div className="headerText">
          {headerText}
        </div>
        <div className="switch">
          <span>Card</span>
            <Switch 
              checked={viewMode === "list"}
              onChange={switchChange}
            />
          <span>List</span>
        </div>
      </div>
      <div className="view">
        {viewModeDisplay}
      </div>
    </div>
  );
}

export default ViewContainer;
