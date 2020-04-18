import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
import Field from './Field/Field';
import './field-panel.scss';

const FieldPanel = (props) => {
    const { column, fields } = props;

    const setDraggableStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        margin: "0 0 0.5rem 0",
      
        background: isDragging ? "lightgreen" : "#dedede",
      
        ...draggableStyle
    });

    /**
     * Clone to be rendered following the mouse while a drag occurs. Replaces the original Draggable as the original
     * is fixed in place. 
    */
    const getRenderClone = (provided, snapshot, rubric) => (
        <div
            className="field"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={setDraggableStyle(snapshot.isDragging, provided.draggableProps.style)}
        >
            {fields[rubric.source.index].content}
        </div>
    );

    return (
        <Droppable
            droppableId={column.id}
            isDropDisabled={true}
            renderClone={getRenderClone}
        >
            {(provided, snapshot) => (
                <section className="field-panel"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={snapshot.isDraggingOver ? {backgroundColor: 'skyblue'} : {}}
                >
                    <h2 className="field-panel__heading">{column.title}</h2>
                    <div className="field-panel__field-container">
                        {
                            fields.map((field, index) => {
                                let shouldRenderClone = field.id === snapshot.draggingFromThisWith;
                                return (
                                    <Field key={field.id} field={field} index={index} shouldRenderClone={shouldRenderClone} />
                                )
                            })
                        }
                        {provided.placeholder}
                    </div>
                </section>
            )}
        </Droppable>
    )
}

export default FieldPanel
