import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './email-field.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';

const EmailField = (props) => {
    const { field, index } = props;
    const { id, type, content } = field;

    const setDraggableStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        margin: "0 0 0.5rem 0",
      
        background: isDragging ? "lightgreen" : "#f0a70f",
      
        ...draggableStyle
    });

    const getInputField = () => {
        if(type === 'heading') {
            return(<input className="email-field__input" type="text" />);
        }
        else if(type === 'paragraph') {
            return(<textarea className="email-field__input" />);
        }
        else if(type === 'image') {
            return(
                <input className="email-field__input-file" id="image" type="file" />
            );
        }
        else {
            return(<div>INSERT SEVERAL IFRAMES HERE</div>)
        }
    }

    return (
        <Draggable
            draggableId={id}
            index={index}
        >
            {(provided, snapshot) => (
                <div
                    className="email-field"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={setDraggableStyle(snapshot.isDragging, provided.draggableProps.style)}
                >
                    <span className="email-field__drag-handle" {...provided.dragHandleProps}>
                        <FontAwesomeIcon icon={faGripVertical} />
                    </span>
                    {getInputField()}
                </div>
            )}
        </Draggable>
    )
}

export default EmailField
