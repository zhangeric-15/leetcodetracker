import { useState, useEffect } from "react";
import TopicDropDown from "./TopicDropdown";
import { TopicContextProvider } from "../../context/TopicContextProvider";
import useTopicContext from "../../hooks/useTopicContext";
import DifficultyDropdown from "./DifficultyDropdown";
import UnderstandingDropdown from "./UnderstandingDropdown";

function ProblemForm({ problem = null }) {
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState(() => {
        if (problem !== null) {
            return problem.difficulty;
        } else {
            return null;
        }
    })
    const [selectedUnderstanding, setSelectedUnderstanding] = useState(() => {
        if (problem !== null) {
            return problem.understanding;
        } else {
            return null;
        }
    })
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

    // Topic Handlers
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

    // Difficulty Handlers
    function handleDifficultyChanged(difficulty) {
        setSelectedDifficulty(difficulty);
    }

    // Understanding handlers
    function handleUnderstandingChanged(understanding) {
        setSelectedUnderstanding(understanding);
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
            <DifficultyDropdown difficulty={selectedDifficulty} onDifficultyChanged={handleDifficultyChanged}/>

            <label>Understanding: </label>
            <UnderstandingDropdown understanding={selectedUnderstanding} onUnderstandingChanged={handleUnderstandingChanged} />
            
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