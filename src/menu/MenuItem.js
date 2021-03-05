import {useState} from 'react';
import { useHistory } from "react-router-dom";
import "./MenuItem.css";

const MenuItem = (props) => {
  const [menuClicked, setMenuClicked] = useState(false);

  const history = useHistory();

  const childArray = props.data.map(
    (element, index) =>
      <div
        className="menuItemElement"
        key={`menuItemElement${index}`}
        onClick={
          () => {
            setMenuClicked(false);
            history.push(`/${props.url}/${element.name}`);
          }
        }
      >
        {element.name}
      </div>
  );

  let menuItemClassName = "menuItem ";
  if (menuClicked) menuItemClassName += "clicked";

  const clickGesture = () => {
    if (!props.hoverGesture) {
      setMenuClicked(!menuClicked);
    }
  }

  const hoverGesture = (value) => {
    if (props.hoverGesture) {
      setMenuClicked(value);
    }
  }

  return (
    <div
      onMouseEnter={() => hoverGesture(true)}
      onMouseLeave={() => hoverGesture(false)}
      onClick={clickGesture}
      className={menuItemClassName}
    >
      <div className="menuItemText">
        {props.text}({childArray.length})
      </div>
      <div className="menuItemList">
        <div className="menuItemScoller">
          {childArray}
        </div>
      </div>
    </div>
  )
}

export default MenuItem;
