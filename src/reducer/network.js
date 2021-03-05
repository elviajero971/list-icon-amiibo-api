import {useReducer} from "react";

const initialValue = {
  menuList: undefined,
  viewList: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setMenu":
      return {...state, menuList: action.config};
    case "resetView":
      return {...state, viewList: []};
    case "setView":
      return {...state, viewList: action.viewData};
    default:
      return state;
  }
}

const middleware = (dispatch) => (action) => {
  switch (action.type) {
    case "loadView":
      fetch(action.url).then(
        data => data.json()
      ).then(
        jsonData => dispatch({type: "setView", viewData: jsonData.amiibo})
      ).catch(
        () => dispatch({type: "resetView"})
      )
      break;
    case "loadMenu":
      const {config} = action;
      const numberOfRequest = config.length;
      let numberOfFinishedRequest = 0;

      const checkToSendFinalAction = (index) => {
        numberOfFinishedRequest += 1;
        if (numberOfFinishedRequest === numberOfRequest) {
          dispatch({
            type: "setMenu",
            config
          })
        }
      }

      for (let i = 0; i < numberOfRequest; i += 1) {
          fetch(`${action.baseURL}${config[i].url}`).then(
            data => data.json()
          ).then(
            jsonData => {
              config[i].menuData = jsonData.amiibo;
              checkToSendFinalAction(i);
            }
          ).catch(
            () => checkToSendFinalAction(i)
          );
      }
      break;
    default:
      dispatch(action);
      break;
  }
}

const AppNetworkReducer = () => {
  const [networkState, networkAction_] = useReducer(reducer, initialValue);
  const networkAction = middleware(networkAction_);
  return [networkState, networkAction];
}

export default AppNetworkReducer;
