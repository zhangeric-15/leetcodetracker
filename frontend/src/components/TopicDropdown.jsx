import { useEffect, useRef, useState } from "react";
import useTopicContext from "../../hooks/useTopicContext";
import { ChromePicker } from 'react-color';
import TopicMenuOption from "./TopicMenuOption";
import TopicCreateOption from "./TopicCreateOption";

function TopicDropDown() {
    const [isTopicMenuOpen, setTopicMenuOpen] = useState(false);
    const [selectedTopics, setSelectedTopics] = useState([]);
    // SOURCE OF TRUTH - topics array from the data base
    const {topics, dispatch} = useTopicContext();
    // Keeps track of the search value the user inputed 
    const [topicSearchValue, setTopicSearchValue] = useState("");
    const [filteredTopics, setFilteredTopics] = useState([]);
    const [exactSearchMatch, setExactSearchMatch] = useState(false);
    // Check if color picker is open. If it is, we don't want any clicks on it to close the dropdown (since the color picker is PORTALED somewhere else in the DOM)
    const isColorPickerOpen = useRef(false);

    // IMPORTANT: 
    // Object returned by 'useRef' has a 'current' property. The initial value is set to the argument passed into 'useRef'
    // Updating the object's 'current' property will NOT trigger a re-render. This is a variable that doesn't change during re-renders.
    // When linked with a component like <div> that, the 'current' property will be set to that DOM node AFTER it gets rendered on screen.
    const dropDownMenuRef = useRef(null);
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return (() => {
            console.log("REMOVING outside mousedown listener for Topic dropdown")
            document.removeEventListener('mousedown', handleClickOutside)
        })
    }, [])

    useEffect(() => {
        // Important Edge case - Topics can be null during the FIRST render b/c this useEffect will run BEFORE TopicContextProvider's useEffect.
        if (topics !== null) {
            const topicsIdMap = new Map
            // if there's nothing in the search field, reset
            if (!topicSearchValue) {
                // Reset filteredTopics to original context state
                setFilteredTopics(topics)
            } 
            else {
                const updatedFilteredTopics = updateFilteredTopics(topics, filteredTopics);
                setFilteredTopics(updatedFilteredTopics);
            }
            const updatedSelectedTopics = updateSelectedTopics(topics, selectedTopics);
            setSelectedTopics(updatedSelectedTopics);
        }
    }, [topics]);

    // Replace any old Filtered Topics with its corresponding new/updated Topic object
    function updateFilteredTopics(newTopics, oldFilteredTopics) {
        const updatedFilteredTopics = []
        oldFilteredTopics.forEach(oldTopic => {
            const updatedTopic = newTopics.find(newTopic => newTopic._id === oldTopic._id)
            if (updatedTopic) {
                updatedFilteredTopics.push(updatedTopic);
            }
        });
        return updatedFilteredTopics;
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
    
    
    function handleOpeningDropdown() {
        console.log("Topic Dropwdown opened");
        setTopicMenuOpen(true);
    }

    // VERY IMPORTANT HANDLER - We need to set the isColorPickerOpen reference varaible because the color picker has been PORTALED elsewhere in the DOM.
    // As a result, clicking anywhere in the Color Picker (located in the child TopicMenuOption) will trigger entire topic dropdown to close (because the color picker is technically OUTSIDE this component).
    function handleColorPickClicked(isOpen) {
        isColorPickerOpen.current = isOpen;
    }

    function handleColorChange(updatedTopic) {
        dispatch({type: 'SET_TOPIC_COLOR', payload: updatedTopic});
    }


    // Event handler for when User selects a TopicMenuOption component. Need to add this to the selectedTopics state.
    function handleSelectedTopic(topic) {
        if (!selectedTopics.some(selectedTopic => selectedTopic._id === topic._id)) {
            setSelectedTopics(prev => [...prev, topic]);
        }
    }

    // Handle DELETING Topics permanently 
    function handleTopicDeletion(deletedTopic) {
        // Update the Selected and Filtered topics list after deleting a topic
        const updatedSelectedTopics = selectedTopics.filter(selectedTopic => selectedTopic._id !== deletedTopic._id);
        const updatedFilteredTopics = filteredTopics.filter(filteredTopic => filteredTopic._id !== deletedTopic._id);
        // Don't forget to remove any Topics that were selected 
        setSelectedTopics(updatedSelectedTopics);
        dispatch({type: 'DELETE_TOPIC', payload: deletedTopic});
        // If there's no more filtered topics, we should reset to context topics state
        if (updatedFilteredTopics.length === 0) {
            setExactSearchMatch(false);
            setTopicSearchValue("");
            
        } else {
            setFilteredTopics(updatedFilteredTopics);
        }
    }

    // Handle CREATING new Topic
    // This will always trigger a filtered topics reset to context topics state
    function handleTopicCreation(newTopic) {
        setSelectedTopics(prev => [...prev, newTopic]);
        // IMPORTANT - We want to reset the dropdown menu to showcase everything. 
        //      To do this, set the search value text to an empty string and the exact match boolean to false. 
        setExactSearchMatch(false);
        setTopicSearchValue("");
        dispatch({type: 'CREATE_TOPIC', payload: newTopic});
    }

    // Handles any mouse click OUTSIDE of the dropdown menu
    // IMPORTANT NOTE - The color picker for each tag is considered OUTSIDE the dropdown (since it was portaled elsewhere in the DOM)
    function handleClickOutside(event) {
        // dropDownMenuRef.current.contains(event.target) checks if the user clicked INSIDE the dropdown menu
        // Adding a ! means we want to make sure the user clicked outside so we can CLOSE it
        if (!isColorPickerOpen.current && dropDownMenuRef.current && !dropDownMenuRef.current.contains(event.target)) {
            console.log("Detected outside of Topic Dropdown Menu. Closing it!");
            setTopicMenuOpen(false);
            // Reset the search state
            setTopicSearchValue("");
        }
    }

    // Handle REMOVING SELECTED topics 
    function handleRemoveSelectedTopic(event, removeTopic) {
        event.stopPropagation();
        setSelectedTopics(selectedTopics.filter(selectedTopic => selectedTopic._id !== removeTopic._id));
    }

    function createSelectedTopicTags() {
        return selectedTopics.map(selectedTopic => (
            <span key={selectedTopic._id} className="tag" style={{backgroundColor: selectedTopic.color, borderRadius: '8px', padding: '6px', display: 'inline'}}>
                {selectedTopic.topicName}
            </span>
        ))
    }

    function createRemovableSelectedTopicTags() {
        return selectedTopics.map(selectedTopic => (
            <span key={selectedTopic._id} className="tag" style={{backgroundColor: selectedTopic.color, borderRadius: '8px', padding: '6px', display: 'inline'}}>
                {selectedTopic.topicName}
                <button onClick={(event) => handleRemoveSelectedTopic(event, selectedTopic)}>
                    <i className="fa-solid fa-x"></i>
                </button>
            </span>
        ))
    } 

    // Create the list of topics dropdown menu options based on the content in topicsArr
    function createDropdownMenuOption() {
        return filteredTopics.map(topic => {
            return (
                <TopicMenuOption key={topic._id} topic={topic} onSelection={handleSelectedTopic} 
                    isSelected={selectedTopics.includes(topic)} onDeletion={handleTopicDeletion}
                    onColorPickClicked={handleColorPickClicked} onColorChange={handleColorChange}/>
            )
        })
    }

    function createAddTopicOption() {
        return <TopicCreateOption value={topicSearchValue} handleNewTopic={handleTopicCreation}/>
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
                        {createDropdownMenuOption()}
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