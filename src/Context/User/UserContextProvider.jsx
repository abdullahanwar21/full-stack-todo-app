import React, { useState } from "react";
import UserContext from "./UserContext";
const UserContextProvider = ({ children }) => {
  const [isUser, setIsUser] = useState(true);
  
  return (
    <div>
      <UserContext.Provider value={{ isUser , setIsUser }}>
        {children}
      </UserContext.Provider>
    </div>
  );
};

export default UserContextProvider;
