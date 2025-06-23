import { createContext } from "react";

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


function ProblemContextProvider({ children }) {
    const [state, dispatch] = useReducer(problemReducer, {problems: null});
    return (
        <ProblemContext.Provider value={{state, dispatch}}>
            { children }
        </ProblemContext.Provider>
    )
}