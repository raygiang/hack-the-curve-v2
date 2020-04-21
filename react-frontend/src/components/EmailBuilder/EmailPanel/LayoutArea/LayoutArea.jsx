import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import LayoutBox from './LayoutBox/LayoutBox';
import './layout-area.scss';

const LayoutArea = (props) => {
    const { builderInfo, layout, index, isEditing } = props;

    /**
     * Set the style of this email field while a drag is being performed
     */
    const setDraggableStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        margin: "0 0 0.5rem 0",
      
        background: isDragging ? "lightgreen" : "lavender",
      
        ...draggableStyle
    });

    return (
        <Draggable
            draggableId={layout.id}
            index={index}
        >
            {(provided, snapshot) => {
                return (
                    <div className="layout-area"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={setDraggableStyle(snapshot.isDragging, provided.draggableProps.style)}
                        nodekey={layout.id}
                    >
                        <span className="layout-area__drag-handle" {...provided.dragHandleProps}>
                            <FontAwesomeIcon icon={faGripVertical} />
                        </span>
                        <div className="layout-area__droppable-area" nodekey={layout.id}>
                            {builderInfo.layoutTypes[layout.layout].map((width, index) => (
                                <LayoutBox
                                    key={index}
                                    builderInfo={builderInfo}
                                    width={width}
                                    layoutId={layout.id}
                                    index={index}
                                    isEditing={isEditing}
                                />
                            ))}
                        </div>
                    </div>
                )
            }}
        </Draggable>
    )
}

export default LayoutArea
