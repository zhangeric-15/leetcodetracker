import { createContext, useReducer } from "react";

export const AuthContext = createContext();

// action should have a {type, payload}
function authReducer(state, action) {
    if (action.type == "LOGIN" || action.type == "SIGNUP") {
        return {
            user: action.payload
        };
    } else {
        return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {user: null});
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    );
}