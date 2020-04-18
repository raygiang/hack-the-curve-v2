import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './field.scss';

const Field = (props) => {
    const {field, index} = props;
    const {id, content} = field;

    const setDraggableStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        margin: "0 0 0.5rem 0",
      
        background: isDragging ? "lightgreen" : "#dedede",
      
        ...draggableStyle
    });

    return (
        <Draggable
            draggableId={id}
            index={index}
        >
            {(provided, snapshot) => {
                // console.log(provided.draggableProps);
                return (
                <div
                    className="field"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={setDraggableStyle(snapshot.isDragging, provided.draggableProps.style)}
                >
                    {content}
                </div>
            )}}
        </Draggable>
    )
}

export default Field
