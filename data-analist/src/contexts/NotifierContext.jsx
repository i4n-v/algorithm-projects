import React, { useReducer } from "react";

export const NotifierContext = React.createContext();
export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

export const initialState = {
  show: false,
  message: "",
  severity: "success",
  seconds: 5,
};

const reducer = (_, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        show: true,
        message: action.payload.message,
        severity: action.payload.severity,
        seconds: action.payload.seconds,
      };
    case HIDE_NOTIFICATION:
      return initialState;
    default:
      return initialState;
  }
};

export const NotifierProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <NotifierContext.Provider value={[state, dispatch]}>{children}</NotifierContext.Provider>;
};
