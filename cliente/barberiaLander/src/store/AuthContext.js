import React, { useState } from "react";

const AuthContext = React.createContext({
  user: { ciUsuario: "", nombre: "", rol: "", telefono: "" },
  isLoggedIn: false,
  login: (user) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const userIsLoggedIn = user !== null;

  const loginHandler = (user) => {
    setUser(user);
  };
  const logoutHandler = () => {
    setUser(null);
  };
  const contextValue = {
    user: user,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
