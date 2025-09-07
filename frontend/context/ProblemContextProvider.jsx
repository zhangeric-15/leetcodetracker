import { createContext, useReducer } from "react";

export const ProblemContext = createContext();

// action takes {type, payload}
function problemReducer(state, action) {
    switch (action.type) {
        // action.payload = new problem object
        case 'ADD_PROBLEM':
            return {
                problems: [...state.problems, action.payload]
            };
        // action.payload = updated problem object
        case 'UPDATE_PROBLEM':
            return {
                problems: state.problems.map(problem => problem._id === action.payload._id ? action.payload : problem)
            };
        // action.payload = an array of problems
        case 'SET_PROBLEMS':
            return {
                problems: action.payload
            };
        // action.payload = id of problem being deleted
        case 'DELETE_PROBLEM':
            return {
                // filtering out the problem that was deleted
                problems: state.problems.filter((problem) => problem._id !== action.payload)
            };
        // action.payload = id of TOPIC being deleted
        case 'REMOVE_TOPIC_FROM_PROBLEMS':
            return {
                problems: state.problems.map(problem => {
                            return {...problem, topics: problem.topics.filter(topic => {
                                if (topic === action.payload) {
                                    console.log("FOUND BAD TOPIC ID:", action.payload);
                                }
                                return topic !== action.payload
                            })}
                         })
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