import React, { createContext, useState } from 'react';

export const AuthContext = createContext()

function AuthContextProvider({children}){
    const [token, setToken] = useState("")
    const [auth, setAuth] = useState(false)
    return (
        <AuthContext.Provider value={{token, setToken, auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider