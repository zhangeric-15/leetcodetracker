import { useContext } from "react";
import { TopicContext } from "../context/TopicContextProvider";

function useTopicContext() {
    // context = {topics: [], dispatch}
    const context = useContext(TopicContext);
    if (!context) {
        throw Error("useTopicContext MUST be defined in a component that is wrapped in TopicContextProvider component!");
    }
    return context;
}

export default useTopicContext;