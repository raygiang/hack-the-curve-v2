import React, { useState, useRef } from 'react';
import EmailPanel from './EmailPanel/EmailPanel';
import FieldPanel from './FieldPanel/FieldPanel';
import { DragDropContext } from 'react-beautiful-dnd';
import { builderData } from './utils/builderData';
import './email-builder.scss';

const EmailBuilder = () => {
    const [builderInfo, setBuilderInfo] = useState(builderData);
    const count = useRef(0);

    const dragEndHandler = ({ destination, source, draggableId }) => {
        // If there is no destination or the destination is the same location
        if(!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        const startCol = builderInfo.columns[source.droppableId];
        const finishCol = builderInfo.columns[destination.droppableId];
        const startFieldIds = [...startCol.fieldIds];
        
        // If destination is in same column as original
        if(startCol === finishCol) {
            startFieldIds.splice(source.index, 1);
            startFieldIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...startCol,
                fieldIds: startFieldIds,
            }

            setBuilderInfo({
                ...builderInfo,
                columns: {
                    ...builderInfo.columns,
                    [newColumn.id]: newColumn,
                }
            })
            return;
        }

        // Moving to another list
        const finishFieldIds = [...finishCol.fieldIds];
        const origField = builderInfo.fields[draggableId];
        let newId = origField.id + '-' + count.current;
        count.current++;
        finishFieldIds.splice(destination.index, 0, newId);
        const newFinish = {
            ...finishCol,
            fieldIds: finishFieldIds,
        }

        setBuilderInfo({
            ...builderInfo,
            fields: {
                ...builderInfo.fields,
                [newId]: {
                    ...origField,
                    type: origField.id,
                    id: newId,
                },
            },
            columns: {
                ...builderInfo.columns,
                [newFinish.id]: newFinish,
            }
        })
    }

    return (
        <DragDropContext
            onDragEnd={dragEndHandler}
        >
            <div className="email-builder">
                {
                    builderInfo.columnOrder.map(columnId => {
                        const column = builderInfo.columns[columnId];
                        const fields = column.fieldIds.map(fieldId => builderInfo.fields[fieldId]);

                        if(columnId === 'email-layout') {
                            return <EmailPanel key={columnId} column={column} fields={fields} />
                        }
                        else {
                            return <FieldPanel key={columnId} column={column} fields={fields} />
                        }
                    })
                }
            </div>
        </DragDropContext>
    )
}

export default EmailBuilder
