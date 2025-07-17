import { useEffect, useRef, useState } from "react";
import useTopicContext from "../../hooks/useTopicContext";
import { TopicContextProvider } from "../../context/TopicContextProvider";

function TopicDropDown() {
    const [isTopicMenuOpen, setTopicMenuOpen] = useState(false);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const {topics, dispatch} = useTopicContext();

    // IMPORTANT: 
    // Object returned by 'useRef' has a 'current' property. The initial value is set to the argument passed into 'useRef'
    // Updating the object's 'current' property will NOT trigger a re-render. This is a variable that doesn't change during re-renders.
    // When linked with a component like <div> that, the 'current' property will be set to that DOM node AFTER it gets rendered on screen.
    const dropDownMenuRef = useRef(null);
    // TODO: Not sure, if I need to update the dependency array for useEffect
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return (() => {
            console.log("REMOVING outside mousedown listener for Topic dropdown")
            document.removeEventListener('mousedown', handleClickOutside)
        })
    }, [])

    function handleDropdownOpen() {
        console.log("Form opened");
        setTopicMenuOpen(true);
    }

    // Handles any mouse click OUTSIDE of the dropdown menu
    function handleClickOutside(event) {
        // dropDownMenuRef.current.contains(event.target) checks if the user clicked INSIDE the dropdown menu
        // Adding a ! means we want to make sure the user clicked outside so we can CLOSE it
        if (dropDownMenuRef.current && !dropDownMenuRef.current.contains(event.target)) {
            console.log("Detected outside of Topic Dropdown Menu. Closing it!");
            setTopicMenuOpen(false);
        }
    }

    // TODO: Implement
    function handleDeleteTopic(event) {
        // Prevents event from BUBBLING UP to parent
        event.stopPropagation();
    }

    function createDropdownMenuOption() {
        return topics.map(topic => {
            return (
                <div key={topic._id} className="dropdown-menu-option">
                    <span className="tag" style={{backgroundColor: topic.color, borderRadius: '8px', padding: '6px', display: 'inline'}}>
                        {topic.topicName}
                    </span>
                    <div>
                        <input
                        className="colorSelectorInput"
                        type="color"
                        />
                        <button>Delete</button>
                    </div>
                </div>
            )
        })
    }


    return (
        <div className="dropdown-container">
            {isTopicMenuOpen ? (
                <div ref={dropDownMenuRef} className="dropdown-menu">
                    <div className="dropdown-value">
                        <span className="tag" style={{backgroundColor: 'Blue', borderRadius: '8px', padding: '6px', display: 'inline-block'}}>
                            Default
                        </span>
                        <span className="tag" style={{backgroundColor: 'Blue', borderRadius: '8px', padding: '6px', display: 'inline-block'}}>
                            Default
                        </span>
                        <input
                        type="text"
                        placeholder="Topic Name"
                        required/>
                    </div>
                    <div className="dropdown-menu-options-container">
                        {createDropdownMenuOption()}
                        {/* <div className="dropdown-menu-option">
                            <span className="tag" style={{backgroundColor: 'Blue', borderRadius: '8px', padding: '6px', display: 'inline'}}>
                                Test
                            </span>
                            <div>
                                <input
                                className="colorSelectorInput"
                                type="color"
                                />
                                <button>Delete</button>
                            </div>
                        </div>
                        <div className="dropdown-menu-option">
                            <span className="tag" style={{backgroundColor: 'Blue', borderRadius: '8px', padding: '6px', display: 'inline'}}>
                                Test
                            </span>
                            <input
                            className="colorSelectorInput"
                            type="color"
                            />
                        </div>
                        <div className="dropdown-menu-option">
                            <span className="tag" style={{backgroundColor: 'Blue', borderRadius: '8px', padding: '6px', display: 'inline'}}>
                                Test
                            </span>
                            <input
                            className="colorSelectorInput"
                            type="color"
                            />
                        </div> */}
                    </div>
                </div> 
            ) : 
            <div className="default-dropdown-value" onClick={handleDropdownOpen}>
                <span className="tag" style={{backgroundColor: 'Blue', borderRadius: '8px', padding: '6px', display: 'inline'}}>
                    Default Value
                </span>
            </div>
            }
        </div>
        
    );
}

export default TopicDropDown;