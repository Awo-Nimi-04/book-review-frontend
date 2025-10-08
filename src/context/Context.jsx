import React, { createContext } from "react";
import { useAuth } from "../utilities/customHooks/authHook";

export const PageContext = createContext({
  userId: null,
  isAuthUser: false,
  token: null,
  username: "",
  otherChatUser: null,
  setOtherChatUser: () => {},
  login: () => {},
  logout: () => {},
});

const PageContextProvider = ({ children }) => {
  const {
    login,
    logout,
    token,
    userId,
    username,
    otherChatUser,
    setOtherChatUser,
  } = useAuth();

  const contextValue = {
    isAuthUser: !!token,
    token: token,
    login: login,
    logout: logout,
    userId: userId,
    username: username,
    otherChatUser: otherChatUser,
    setOtherChatUser: setOtherChatUser,
  };
  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
};

export default PageContextProvider;
