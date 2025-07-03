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
    // {user: {email}}
    const [state, dispatch] = useReducer(authReducer, {user: null});
    useEffect(() => {
        const isUserLoggedIn = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/users/currentUser', {
                    method: 'GET',
                    credentials: 'include'
                });
                const userData = await response.json();
                if (response.ok) {
                    dispatch({type: 'LOGIN', payload: userData});
                } else {
                    console.log("No user logged in. Display Signup page");
                }
            } catch(error) {
                console.log("Unable to fetch current user GET request", error);
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