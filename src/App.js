import {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import AppConfigReducer from "./reducer/appConfig";
import AppNetworkReducer from "./reducer/network";
import MainContainer from "./MainContainer";
import Spinner from "./Spinner";

function App() {
  const [reducerState] = AppConfigReducer();
  const [networkState, networkAction] = AppNetworkReducer();

  const [child, setChild] = useState(<Spinner />);

  useEffect(() => {
    networkAction({
      type: "loadMenu",
      baseURL: reducerState.baseURL,
      config: reducerState.config
    });
  }, []);

  useEffect(() => {
    if (networkState.menuList) setChild(<MainContainer />);
  }, [networkState.menuList]);

  return (
    <Router>
      <Switch>
        <Route exact path={["/", "/:category/:item"]}>
          {child}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
