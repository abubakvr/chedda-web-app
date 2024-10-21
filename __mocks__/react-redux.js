// __mocks__/react-redux.js

import React from "react";

export const useDispatch = jest.fn();
export const useSelector = jest.fn();

export const Provider = ({ children }) =>
  React.createElement("div", null, children);
