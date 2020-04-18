import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import EmailField from './EmailField/EmailField';
import './email-panel.scss';

const EmailPanel = (props) => {
    const { column, fields } = props;

    return (
        <Droppable
            droppableId={column.id}
        >
            {(provided, snapshot) => (
                <section className="email-panel"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={snapshot.isDraggingOver ? {backgroundColor: 'skyblue'} : {}}
                >
                    <h2 className="email-panel__heading">{column.title}</h2>
                    <div className="email-panel__field-container">
                        {
                            fields.map((field, index) => (
                                <EmailField key={field.id} field={field} index={index} />
                            ))
                        }
                        {provided.placeholder}
                    </div>
                </section>
            )}
        </Droppable>
    )
}

export default EmailPanel