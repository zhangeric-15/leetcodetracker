import { useState, useEffect } from "react";
import TopicDropDown from "./TopicDropdown";
import { TopicContextProvider } from "../../context/TopicContextProvider";
import useTopicContext from "../../hooks/useTopicContext";

function ProblemForm() {
    const [selectedTopics, setSelectedTopics] = useState([]);
    const {topics, dispatch} = useTopicContext();

    useEffect(() => {
        if (topics !== null) {
            const updatedSelectedTopics = updateSelectedTopics(topics, selectedTopics);
            setSelectedTopics(updatedSelectedTopics);
        }
    }, [topics])


    function handleSubmit() {
        console.log("Problem form submitted");
    }

    function handleTopicSelection(selectedTopic) {
        if (!selectedTopics.some(topic => topic._id === selectedTopic._id)) {
            setSelectedTopics(prev => [...prev, selectedTopic]);
        }
    }

    function handleSelectedTopicRemoved(removedTopic) {
        setSelectedTopics(selectedTopics.filter(selectedTopic => selectedTopic._id !== removedTopic._id));
    }

    function handleSelectedTopicDeletion(deletedTopic) {
        const updatedSelectedTopics = selectedTopics.filter(selectedTopic => selectedTopic._id !== deletedTopic._id);
        setSelectedTopics(updatedSelectedTopics);
    }

        // Replace any old Selected Topics with its corresponding new/updated Topic object
    function updateSelectedTopics(newTopics, oldSelectedTopics) {
        const updatedSelectedTopics = []
        oldSelectedTopics.forEach(oldTopic => {
            const updatedTopic = newTopics.find(newTopic => newTopic._id === oldTopic._id)
            if (updatedTopic) {
                updatedSelectedTopics.push(updatedTopic);
            }
        });
        return updatedSelectedTopics;
    }


    return (
        <form className="credentialsForm" onSubmit={handleSubmit}>
            <h2> Add Problem </h2>
            <label>Problem Name:</label>
            <input
            type="text"
            placeholder="Problem Name"
            onChange={(e) => setEmail(e.target.value)}
            required/>

            <label>Difficulty:</label>
            <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            />
            
            <label>Topics:</label>
            <TopicDropDown selectedTopics={selectedTopics} onTopicSelection={handleTopicSelection} onSelectedTopicRemoved={handleSelectedTopicRemoved} onSelectedTopicDeleted={handleSelectedTopicDeletion}/>
            <div>
                <button>Add</button>
                <button>Cancel</button>
            </div>
        </form>
    )
}

export default ProblemForm;