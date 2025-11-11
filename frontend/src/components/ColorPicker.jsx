import { ChromePicker } from "react-color";
import { createPortal } from "react-dom";

/* We need to create a PORTAL here to teleport the React Element returned by createPortal to another place in the DOM.
        The reason for this is to 'escape' the bounds of the parent, especially when dealing with z-index. */
/* 
IMPORTANT:
- React's Virtual Tree stays the same. Context, hooks, and props all work normally.
- Event bubbling still works thorugh REACT tree (not the DOM hierarchy)

*/
function ColorPicker({onChange, onConfirm, onCancel, colorPickerStyle, currentColor}) {
    return createPortal(
        <div style={colorPickerStyle} onClick={(event) => event.stopPropagation()}>
            <ChromePicker disableAlpha={true} color={currentColor} onChange={(selectedColor, event) => onChange(selectedColor, event)}/>
            <div style={{backgroundColor: 'WHITE'}}>
                <button onClick={() => onConfirm()}>OK</button>
                <button onClick={() => onCancel()}>Cancel</button>
            </div>
        </div>,
        document.body);
}
export default ColorPicker;