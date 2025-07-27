import { useEffect, useRef, useState } from "react";
import useTopicContext from "../../hooks/useTopicContext";
import { ChromePicker } from 'react-color';
import TopicMenuOption from "./TopicMenuOption";

function TopicDropDown() {
    const [isTopicMenuOpen, setTopicMenuOpen] = useState(false);
    const [selectedTopics, setSelectedTopics] = useState([]);
    // SOURCE OF TRUTH - topics array from the data base
    const {topics, dispatch} = useTopicContext();
    // Keeps track of the search value the user inputed 
    const [topicSearchValue, setTopicSearchValue] = useState("");
    const [filteredTopics, setFilteredTopics] = useState([]);
    const [exactSearchMatch, setExactSearchMatch] = useState(false);


    // IMPORTANT: 
    // Object returned by 'useRef' has a 'current' property. The initial value is set to the argument passed into 'useRef'
    // Updating the object's 'current' property will NOT trigger a re-render. This is a variable that doesn't change during re-renders.
    // When linked with a component like <div> that, the 'current' property will be set to that DOM node AFTER it gets rendered on screen.
    const dropDownMenuRef = useRef(null);
    // TODO: Not sure if I need to update the dependency array for useEffect
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return (() => {
            console.log("REMOVING outside mousedown listener for Topic dropdown")
            document.removeEventListener('mousedown', handleClickOutside)
        })
    }, [])

    // TODO: May need this later?
    // useEffect(() => setFilteredTopics(topics), [topics]);

    function handleOpeningDropdown() {
        console.log("Form opened");
        setTopicMenuOpen(true);
        // Reset filteredtopics back to all topics present in database
        setFilteredTopics(topics);
    }

    // Event handler for when User selects a TopicMenuOption component. Need to add this to the selectedTopics state.
    function handleSelectedTopic(topic) {
        if (!selectedTopics.some(selectedTopic => selectedTopic._id === topic._id)) {
            setSelectedTopics(prev => [...prev, topic]);
        }
    }

    function handleTopicDeletion(deletedTopic) {
        const updatedSelectedTopics = selectedTopics.filter(selectedTopic => selectedTopic._id !== deletedTopic._id);
        const updatedFilteredTopics = filteredTopics.filter(filteredTopic => filteredTopic._id !== deletedTopic._id);
        setSelectedTopics(updatedSelectedTopics);
        setFilteredTopics(updatedFilteredTopics);
        dispatch({type: 'DELETE_TOPIC', payload: deletedTopic});
    }

    // Handles any mouse click OUTSIDE of the dropdown menu
    function handleClickOutside(event) {
        // dropDownMenuRef.current.contains(event.target) checks if the user clicked INSIDE the dropdown menu
        // Adding a ! means we want to make sure the user clicked outside so we can CLOSE it
        if (dropDownMenuRef.current && !dropDownMenuRef.current.contains(event.target)) {
            console.log("Detected outside of Topic Dropdown Menu. Closing it!");
            setTopicMenuOpen(false);
            // Reset the search state
            setTopicSearchValue("");
        }
    }

    function handleRemoveSelectedTopic(event, removeTopic) {
        event.stopPropagation();
        setSelectedTopics(selectedTopics.filter(selectedTopic => selectedTopic._id !== removeTopic._id));
    }

    function createSelectedTopicTags() {
        return selectedTopics.map(selectedTopic => (
            <span className="tag" style={{backgroundColor: selectedTopic.color, borderRadius: '8px', padding: '6px', display: 'inline'}}>
                {selectedTopic.topicName}
            </span>
        ))
    }

    function createRemovableSelectedTopicTags() {
        return selectedTopics.map(selectedTopic => (
            <span className="tag" style={{backgroundColor: selectedTopic.color, borderRadius: '8px', padding: '6px', display: 'inline'}}>
                {selectedTopic.topicName}
                <button onClick={(event) => handleRemoveSelectedTopic(event, selectedTopic)}>
                    <i class="fa-solid fa-x"></i>
                </button>
            </span>
        ))
    } 

    // Create the list of topics dropdown menu options based on the content in topicsArr
    function createDropdownMenuOption(topicsArr) {
        console.log("Create dropdown menu option method ran");
        return topicsArr.map(topic => {
            return (
                <TopicMenuOption key={topic._id} topic={topic} onClick={handleSelectedTopic} isSelected={selectedTopics.includes(topic)} onDelete={handleTopicDeletion}/>
            )
        })
    }

    function createAddTopicOption() {
        return (
            <div className="dropdown-menu-option">
                <div>
                    <span>
                        CREATE
                    </span>
                    <span className="tag" style={{backgroundColor: 'GREEN', borderRadius: '8px', padding: '6px', display: 'inline', marginLeft: "12px"}}>
                        {topicSearchValue}
                    </span>
                </div>
                <div>
                    <input
                    className="colorSelectorInput"
                    type="color"
                    />
                </div>
            </div>
        )
    }

    // Handles filtering the Topic Menu Options
    function handleTopicSearch(event) {
        //console.log("Handle Topic Search triggered with value: ", event.target.value);
        const searchStr = event.target.value;
        const searchedTopics = topics.filter(topic => (topic.topicName.toLowerCase().includes(searchStr.toLowerCase())));
        const exactMatch = searchedTopics.some(topic => topic.topicName.toLowerCase() === searchStr.toLowerCase());
        setTopicSearchValue(searchStr);
        setFilteredTopics(searchedTopics);
        setExactSearchMatch(exactMatch);
    }
    
    return (
        <div className="dropdown-container">
            {isTopicMenuOpen ? (
                <div ref={dropDownMenuRef} className="dropdown-menu">
                    <div className="dropdown-value">
                        <div className="default-dropdown-value" onClick={handleOpeningDropdown}>
                            {selectedTopics.length !== 0 ? createRemovableSelectedTopicTags() : (<div style={{padding: '20px'}}></div>)}
                        </div>
                        <input
                        type="text"
                        placeholder="Topic Name"
                        value={topicSearchValue}
                        onChange={handleTopicSearch}
                        required/>
                    </div>
                    <div className="dropdown-menu-options-container">
                        {createDropdownMenuOption(filteredTopics)}
                        {/* We only want to create a new Topic Tag if it DOES NOT EXIST in the list of topic options and if there's a search value PRESENT */}
                        {(topicSearchValue !== "") && !exactSearchMatch && createAddTopicOption()}
                    </div>
                </div> 
            ) : 
            <div className="default-dropdown-value" onClick={handleOpeningDropdown}>
                {selectedTopics.length !== 0 ? createSelectedTopicTags() : (<div style={{padding: '20px'}}></div>)}
            </div>
            }
        </div>
    );
}

export default TopicDropDown;