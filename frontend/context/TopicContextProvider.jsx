import { createContext, useReducer, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";


export const TopicContext = createContext();

function topicReducer(state, action) {
    console.log('topicReducer triggered');
    switch (action.type) {
        // action.payload = list of topics
        case 'SET_TOPICS':
           return {
            topics: action.payload
           };
        // action.payload = topic object being deleted
        case 'DELETE_TOPIC':
            console.log('DELETE TOPIC triggered');
            const deletedTopic = action.payload;
            return {
                topics: state.topics.filter(topic => topic._id !== deletedTopic._id)
            };
        // action.payload = topic object that was created
        case 'CREATE_TOPIC':
            console.log('CREATE TOPIC triggered');
            const newTopic = action.payload;
            return {
                topics: [...state.topics, newTopic]
            };
        case 'SET_TOPIC_COLOR':
            return {
                topics: state.topics.map(topic => {
                if (topic._id == action.payload._id) {
                    return {...topic, color: action.payload.color};
                }
                return topic;
                })
            };
        default:
            return state; 
    }
}

export function TopicContextProvider({ children }) {
    const [state, dispatch] = useReducer(topicReducer, {topics: null})
    // IMPORTANT - Will utilize this for useEffect as we want to re-fetch everytime a user logs in/out.
    const {user} = useAuthContext();
    useEffect(() => {
        const getTopics = async () => {
            // Reset when User logs out or when page first gets loaded (user will be null b/c we are not logged in).
            if (!user) {
                dispatch({type: 'SET_TOPICS', payload: null})
                return;
            }
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
    }, [user])
    return (
        // value will be {topics, dispatch}
        <TopicContext.Provider value={{...state, dispatch}}>
            { children }
        </TopicContext.Provider>
    )
}