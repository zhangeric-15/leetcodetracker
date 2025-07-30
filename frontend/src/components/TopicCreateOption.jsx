import { useState } from "react";

function TopicCreateOption({ value, handleNewTopic }) {
    const [color, setColor] = useState('GREEN');

    async function handleClick(event) {
        event.stopPropagation();
        // Handle sending POST request to Add Topic 
        const newTopic = { topicName: value, color };
        try {
            const response = await fetch('http://localhost:5001/api/topics/addTopic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(newTopic)
            });
            const topic = await response.json();
            handleNewTopic(newTopic)
        } catch(error) {
            console.log("Add Topic ERROR - Unable to send POST request to add new topic");
        }
    }

    return (
        <div className="dropdown-menu-option" onClick={handleClick}>
            <div>
                <span>
                    CREATE
                </span>
                <span className="tag" style={{backgroundColor: color, borderRadius: '8px', padding: '6px', display: 'inline', marginLeft: "12px"}}>
                    {value}
                </span>
            </div>
            <div>
                <input
                className="colorSelectorInput"
                type="color"
                />
            </div>
        </div>
    );
}

export default TopicCreateOption;