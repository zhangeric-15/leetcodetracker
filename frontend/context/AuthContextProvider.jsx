import { createContext, useReducer } from "react";

const AuthContext = createContext();

// action should have a {type, payload}
function AuthReducer(state, action) {
    if (action.type == "LOGIN" || action.type == "SIGNUP") {
        return {
            user: action.payload
        };
    } else {
        return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(null, {user: null});
    return (
        <AuthContext.Provider>
            { children }
        </AuthContext.Provider>
    );

}