import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

// action should have a {type, payload}
function authReducer(state, action) {
    if (action.type == "LOGIN" || action.type == "SIGNUP") {
        return {
            user: action.payload
        };
    } else if (action.type == "LOGOUT") {
        return {
            user: null
        };
    } 
    else {
        return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {user: null});
    useEffect(() => {
        const isUserLoggedIn = async () => {
            const response = await fetch('http://localhost:5001/api/currentUser', {
                method: 'GET',
                credentials: 'include'
            });
            const userId = await response.json();
            if (response.ok) {
                dispatch({type: 'LOGIN', payload: userId});
            }
        }
        isUserLoggedIn();
    }, [])
    console.log("User state: ", state);
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    );
}