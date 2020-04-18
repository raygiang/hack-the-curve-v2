import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
// import {builderData} from '../utils/builderData';
import Field from './Field/Field';
import './field-panel.scss';

const FieldPanel = (props) => {
    const { column, fields } = props;

    return (
        <Droppable
            droppableId={column.id}
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
                            fields.map((field, index) => (
                                <Field key={field.id} field={field} index={index} />
                            ))
                        }
                        {provided.placeholder}
                    </div>
                </section>
            )}
        </Droppable>
    )
}

export default FieldPanel
