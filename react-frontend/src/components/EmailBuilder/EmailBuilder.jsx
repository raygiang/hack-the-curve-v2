import React, { useState } from 'react';
import EmailPanel from './EmailPanel/EmailPanel';
import FieldPanel from './FieldPanel/FieldPanel';
import { DragDropContext } from 'react-beautiful-dnd';
import { builderData } from './utils/builderData';
import './email-builder.scss';

const EmailBuilder = () => {
    const [builderInfo, setBuilderInfo] = useState(builderData);

    const dragEndHandler = ({ destination, source, draggableId }) => {
        // If there is no destination or the destination is the same location
        if(!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        const startCol = builderInfo.columns[source.droppableId]
        const finishCol = builderInfo.columns[destination.droppableId]
        console.log(builderInfo.columns, destination.droppableId);
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
        startFieldIds.splice(source.index, 1);
        const newStart = {
            ...startCol,
            fieldIds: startFieldIds,
        }

        const finishFieldIds = [...finishCol.fieldIds];
        finishFieldIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finishCol,
            fieldIds: finishFieldIds,
        }

        setBuilderInfo({
            ...builderInfo,
            columns: {
                ...builderInfo.columns,
                [newStart.id]: newStart,
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

                        if(columnId === 'email') {
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
