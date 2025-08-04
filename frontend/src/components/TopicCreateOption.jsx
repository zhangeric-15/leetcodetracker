import { useState } from "react";

// GENERATED FROM GOOGLE AI 
function generateRandomColor() {
  // Generate a random integer between 0 and 16777215 (which is 0xFFFFFF in decimal)
  const randomNumber = Math.floor(Math.random() * 16777215);

  // Convert the number to a hexadecimal string
  let hexColor = randomNumber.toString(16);

  // Pad the string with leading zeros if it's less than 6 characters long
  // This ensures a valid 6-digit hexadecimal color code
  hexColor = hexColor.padStart(6, '0');

  // Return the color code with the "#" prefix
  return `#${hexColor.toUpperCase()}`;
}


function TopicCreateOption({ value, handleNewTopic }) {
    // IMPORTANT - the function inside useState to generate the random color only RUNS ONCE when the component is created
    const [color, setColor] = useState(() => generateRandomColor());

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