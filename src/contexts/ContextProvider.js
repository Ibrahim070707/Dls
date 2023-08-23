import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const RoleIds = localStorage.getItem("RoleID");

  const [currentColor, setCurrentColor] = useState("#1677ff");
  // const Base_Url = "https://flymingotech.co.in/CRMBackend/public/api/";
  // const MediaBase_Url = "https://flymingotech.co.in/CRMBackend/storage/app/";
  const Base_Url = "https://myfiinbox.com/Rest/gbZc1bkumA/backend/public/api/";
  const MediaBase_Url =
    "https://myfiinbox.com/Rest/gbZc1bkumA/backend/storage/app/";

  const setMode = (e) => {
    setCurrentMode(e.target.value);

    localStorage.setItem("themeMode", e.target.value);

    setThemeSettings(false);
  };

  const setColor = (color) => {
    console.log(color);
    setCurrentColor(color);

    localStorage.setItem("ColorMode", color);
  };

  const handleClick = () => (clicked) => {
    setIsClicked({
      ...initialState,
      [clicked]: true,
    });
  };

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        currentColor,
        currentMode,
        setColor,
        setMode,
        themeSettings,
        setThemeSettings,
        Base_Url,
        MediaBase_Url,
        setCurrentMode,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
