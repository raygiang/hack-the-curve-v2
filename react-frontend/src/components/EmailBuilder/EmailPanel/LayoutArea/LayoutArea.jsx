import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import LayoutBox from './LayoutBox/LayoutBox';
import './layout-area.scss';

const LayoutArea = (props) => {
    const { builderInfo, layout, index, isEditing, layoutData } = props;

    /**
     * Set the style of this email field while a drag is being performed
     */
    const setDraggableStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        margin: "0 0 0.5rem 0",
        opacity: layout.picked ? 1 : layoutData.isSelecting === layout.id ? 1 : 0.5,
      
        background: isDragging ? "lightgreen" : layoutData.isSelecting === layout.id ? "#FFBE7D" : "lavender",
      
        ...draggableStyle
    });

    const getRenderComponent = (width, index) => {
        if(layout.picked) {
            return (
                <LayoutBox
                    key={index}
                    builderInfo={builderInfo}
                    width={width}
                    layoutId={layout.id}
                    index={index}
                    isEditing={isEditing}
                />
            )
        }
        else {
            return(
                <div key={index} className="layout-area__deactivated-message" nodekey={layout.id}>
                    Click to Add a Layout
                </div>
            )
        }
    }

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
                                getRenderComponent(width, index)
                            ))}
                        </div>
                    </div>
                )
            }}
        </Draggable>
    )
}

export default LayoutArea
