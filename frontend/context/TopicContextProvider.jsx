import { createContext, useReducer, useEffect } from "react";


export const TopicContext = createContext();

function topicReducer(state, action) {
    switch (action.type) {
        // action.payload = list of topics
        case 'SET_TOPICS':
           return {
            topics: action.payload
           };
        default:
            return state; 
    }
}

export function TopicContextProvider({ children }) {
    console.log("Topic Context Provider re-rendering");
    const [state, dispatch] = useReducer(topicReducer, {topics: null})
    useEffect(() => {
        const getTopics = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/topics/getAllTopics', {
                    credentials: 'include'
                });
                const topicsArr = await response.json();
                if (response.ok) {
                    dispatch({type: 'SET_TOPICS', payload: topicsArr})
                }
            } catch (error) {
                console.log("Unable to fetch topics for the current user", error);
            }
        }
        getTopics();
    }, [])
    return (
        // value will be {topics, dispatch}
        <TopicContext.Provider value={{...state, dispatch}}>
            { children }
        </TopicContext.Provider>
    )
}