import { createContext, useReducer, useState } from "react";

export const ProblemContext = createContext();

// action takes {type, payload}
function problemReducer(state, action) {
    switch (action.type) {
        // action.payload = new problem object
        case 'ADD_PROBLEM':
            return {
                problems: sortProblems(action.sortOption, [...state.problems, action.payload])
            };
        // action.payload = updated problem object
        case 'UPDATE_PROBLEM':
            const updatedProblems = state.problems.map(problem => problem._id === action.payload._id ? action.payload : problem)
            return {
                problems: sortProblems(action.sortOption, updatedProblems)
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

/* Sort problems by date ascending */
function sortByDateAsce(problems) {
    problems.sort((a, b) => new Date(a.date) - new Date(b.date));
    return problems;
}
/* Sort problems by date descending */
function sortByDateDesc(problems) {
    problems.sort((a, b) => new Date(b.date) - new Date(a.date));
    return problems;
}
/* Sort problems given a sortOption */
function sortProblems(sortOption, problems) {
    if (sortOption == "date_asce") {
        return sortByDateAsce(problems);
    } 
    return sortByDateDesc(problems);
}

export function ProblemContextProvider({ children }) {
    const [state, dispatch] = useReducer(problemReducer, {problems: null});
    const [sortOption, setSortOption] = useState("date_desc");
    return (
        // value will be {problems, dispatch}
        <ProblemContext.Provider value={{...state, dispatch, sortOption, setSortOption}}>
            { children }
        </ProblemContext.Provider>
    )
}