import React from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {}
});

const AuthContextProvider = () => {
    return <AuthContext.Provider></AuthContext.Provider>
}

export default AuthContext;