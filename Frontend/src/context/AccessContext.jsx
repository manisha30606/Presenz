import React, { createContext, useContext, useState, useEffect } from "react";

const AccessContext = createContext();

export const AccessProvider = ({ children }) => {
  const [isAccessOn, setIsAccessOn] = useState(false);

  useEffect(() => {
    console.log("Access State Updated in Provider:", isAccessOn);
  }, [isAccessOn]);

  return (
    <AccessContext.Provider value={{ isAccessOn, setIsAccessOn }}>
      {children}
    </AccessContext.Provider>
  );
};

export const useAccess = () => useContext(AccessContext);
