import React, { createContext, useReducer, useState } from 'react';

const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      sessionStorage.setItem(
        `user_session_info`,
        JSON.stringify(action.payload)
      );
      return action.payload;
    case 'LOGOUT':
      sessionStorage.removeItem(`user_session_info`);
      return null;
    default:
      return state;
  }
};

export const ConsumerContext = createContext<any>({});

const ConsumerStore = (props: any) => {
  const [user, userDispatch] = useReducer(userReducer, null); //示例 reducer
  const [hasLogin, setHasLogin] = useState(false);
  const store = {
    user,
    userDispatch,
    hasLogin,
    setHasLogin,
    // userStore: {user, userDispatch} //示例 划分
  };
  return (
    <ConsumerContext.Provider value={store}>
      {props.children}
    </ConsumerContext.Provider>
  );
};

export default ConsumerStore;
