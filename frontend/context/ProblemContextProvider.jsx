import { createContext, useReducer } from "react";

export const ProblemContext = createContext();

function problemReducer(state, action) {
    switch (action.type) {
        case 'CREATE_PROBLEM':
        case 'GET_PROBLEMS':
            return {
                problems: action.payload
            };
        default:
            return state;
    }
}


export function ProblemContextProvider({ children }) {
    const [state, dispatch] = useReducer(problemReducer, {problems: null});
    return (
        // value will be {problems, dispatch}
        <ProblemContext.Provider value={{...state, dispatch}}>
            { children }
        </ProblemContext.Provider>
    )
}