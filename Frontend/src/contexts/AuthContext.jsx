import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ( {children} ) => {
    const [user , setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        console.log(savedUser);
        try {
            if(savedUser && savedUser !== 'undefined'){
                setUser(JSON.parse(savedUser));
            }
        } catch (error) {
            console.log("Invalid user data in localStroge");
            localStorage.removeItem("user");
        }
    } , [])
    // console.log(user);
const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null)
}

return(
    <AuthContext.Provider value={{user , setUser , logout}}>
        {children}
    </AuthContext.Provider>
)

}

