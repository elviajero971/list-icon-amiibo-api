import {useReducer} from 'react';

const baseURL = "https://www.amiiboapi.com/api/";
const config = [
  {
    name: "Type",
    url: "type",
    viewUrl: `${baseURL}amiibo/?type=`,
    menuData: []
  },
  {
    name: "Game Series",
    url: "gameseries",
    viewUrl: `${baseURL}amiibo/?gameseries=`,
    menuData: []
  },
  {
    name: "Series",
    url: "amiiboseries",
    viewUrl: `${baseURL}amiibo/?amiiboSeries=`,
    menuData: []
  },
  {
    name: "Character",
    url: "character",
    viewUrl: `${baseURL}amiibo/?character=`,
    menuData: []
  }
];

const initialValue = {
  config,
  baseURL,
  viewMode: "list"
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setViewMode':
      return {...state, viewMode: action.payload};
    default:
      return state;
  }
}

const AppConfigReducer = () => {
  const [reducerState, reducerAction] = useReducer(reducer, initialValue);
  return [reducerState, reducerAction];
}

export default AppConfigReducer;
