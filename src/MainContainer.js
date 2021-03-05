import MenuContainer from "./menu/MenuContainer";
import ViewContainer from "./view/ViewContainer";

import "./MainContainer.css";

const MainContainer = () => {
  return (
    <div className="mainContainer">
      <MenuContainer />
      <ViewContainer />
    </div>
  )
}

export default MainContainer;
