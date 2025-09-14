import { useRef, useState, useEffect } from "react";
import ColorPicker from "./ColorPicker";

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


function TopicCreateOption({ value, onCreateTopic, onColorPickClicked }) {
    // IMPORTANT Lazy initialization - the function inside useState generates the random color only RUNS ONCE when the component is created
    const [color, setColor] = useState(() => generateRandomColor());
    const [tempColor, setTempColor] = useState(color);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const colorChangeButtonRef = useRef();
    const [colorPickerStyle, setColorPickerStyle] = useState();

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
            if (response.ok) {
                onCreateTopic(topic)
            } else {
                console.log("Add Topic ERROR - Bad response: ", topic);
            }
        } catch(error) {
            console.log("Add Topic ERROR - Unable to send POST request to add new topic");
        }
    }


    // Handle user attempting to change color of topic. Setting the new color as TEMP until User confirms selection
    function handleTempColorChange(selectedColor, event) {
        //console.log("New color is: ", color);
        setTempColor(selectedColor.hex);
    }

    function closeColorPicker() {
        setShowColorPicker(false);
        onColorPickClicked(false);
    }

    // Cancel any change in Topic color
    function handleColorCancel() {
        closeColorPicker();
    }

    function handleChangeColorButtonClicked(event) {
        event.stopPropagation();
        setShowColorPicker(true);
        onColorPickClicked(true);
        // This essentially gets the position of the Change Color button. We want to open the color picker right above the 'Change Color' button.
        const changeColorButtonPos = colorChangeButtonRef.current.getBoundingClientRect();
        setColorPickerStyle({position: 'absolute', left: changeColorButtonPos.left - 120, top: changeColorButtonPos.top - 275, zIndex: 9999,});
    }


    function handleColorConfirm() {
        closeColorPicker();
        setColor(tempColor);
    }

    return (
        <div className="dropdown-menu-option" onClick={handleClick}>
            <div>
                <span>
                    CREATE
                </span>
                <span className="tag" style={{backgroundColor: showColorPicker ? tempColor : color, marginLeft: '12px', borderRadius: '8px', padding: '6px', display: 'inline'}}>
                    {value}
                </span>
            </div>
            <div style={{display: 'flex'}}>
                <button type="button" ref={colorChangeButtonRef} onClick={handleChangeColorButtonClicked}>Change Color</button>
                {showColorPicker && <ColorPicker onChange={handleTempColorChange} onConfirm={handleColorConfirm} onCancel={handleColorCancel} colorPickerStyle={colorPickerStyle} currentColor={tempColor}/>}
            </div>
        </div>
    );
}

export default TopicCreateOption;