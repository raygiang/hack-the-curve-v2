import React, { useState, useRef } from 'react';
import EmailPanel from './EmailPanel/EmailPanel';
import FieldPanel from './FieldPanel/FieldPanel';
import { DragDropContext } from 'react-beautiful-dnd';
import { builderData } from './utils/builderData';
import HeadingOptions from './OptionsPanel/HeadingOptions/HeadingOptions';
import EmptyOptions from './OptionsPanel/EmptyOptions';
import './email-builder.scss';
import ParagraphOptions from './OptionsPanel/ParagraphOptions/ParagraphOptions';
import LayoutPanel from './LayoutPanel/LayoutPanel';

const EmailBuilder = () => {
    const [builderInfo, setBuilderInfo] = useState(builderData);
    const [editData, setEditData] = useState({ isEditing: null, selectedField: null });
    const [layoutData, setLayoutData] = useState({ isSelecting: null, selectedLayout: null });
    const count = useRef(0);

    const dragEndHandler = ({ destination, source, draggableId }) => {
        // If there is no destination or the destination is the same location
        if(!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        if(destination.droppableId === 'email-layout') {
            const startCol = builderInfo.columns[source.droppableId];
            const startFieldIds = [...startCol.fieldIds];
            
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
        else {
            const origField = builderInfo.fields[draggableId];
            let layout = builderInfo.layouts[destination.droppableId.split('-')[0]];
            let newId = origField.id + '_' + count.current;
            count.current++;
            
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
                layouts : {
                    ...builderInfo.layouts,
                    [layout.id]: {
                        ...layout,
                        layouts: {
                            ...layout.layouts,
                            [destination.droppableId] : newId,
                        }
                    }
                },
            })
        }
    }

    const getPanel = (columnId, column, fields) => {
        if(editData.isEditing) {
            let type = editData.isEditing.split("_")[0];
            switch(type) {
                case 'heading':
                    return <HeadingOptions
                                key={columnId}
                                selectedField={editData.selectedField}
                                updateField={updateField}
                                removeField={removeField}
                            />
                case 'paragraph':
                    return <ParagraphOptions
                                key={columnId}
                                selectedField={editData.selectedField}
                                updateField={updateField}
                                removeField={removeField}
                            />
                default:
                    return <EmptyOptions key={columnId} removeField={removeField} />
            }
        }
        else if(layoutData.isSelecting) {
            if(layoutData.selectedLayout.picked) {
                return <FieldPanel
                    key={columnId}
                    column={column}
                    fields={fields}
                />
            }
            else {
                return <LayoutPanel
                    key={columnId}
                    layouts={builderInfo.layoutTypes}
                    layoutData={layoutData}
                    updateLayout={updateLayout}
                />
            }
        }
        else {
            return <EmptyOptions key={columnId} removeField={removeField} />
            
        }
    }

    const updateField = (field) => {
        const builderInfoFields = builderInfo.fields;

        setBuilderInfo ({
            ...builderInfo,
            fields : {
                ...builderInfoFields,
                [field.id]: field,
            }
        })
    }

    const removeField = (field) => {
        console.log("Delete me Baby");
        // delete builderInfo.fields[field.id];
        // let emailLayoutColumn = builderInfo.columns['email-layout'];
        // let origFieldIds = emailLayoutColumn.fieldIds;
        // let deleteIndex = emailLayoutColumn.fieldIds.indexOf(field.id);
        // origFieldIds.splice(deleteIndex, 1);

        // setBuilderInfo({
        //     ...builderInfo,
        //     columns: {
        //         ...builderInfo.columns,
        //         'email-layout': emailLayoutColumn,
        //     }
        // });

        // setEditData({isEditing: null, selectedField: null});
    }

    const updateLayout = (layout) => {
        const builderInfoLayouts = builderInfo.layouts;

        setBuilderInfo ({
            ...builderInfo,
            layouts : {
                ...builderInfoLayouts,
                [layout.id]: layout,
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
                        const fields = columnId === 'fields'
                            ? column.fieldIds.map(fieldId => builderInfo.fields[fieldId])
                            : column.fieldIds.map(fieldId => builderInfo.layouts[fieldId]);

                        if(columnId === 'email-layout') {
                            return (
                                <EmailPanel
                                    key={columnId}
                                    column={column}
                                    fields={fields}
                                    builderInfo={builderInfo}
                                    isEditing={editData.isEditing}
                                    setEditData={setEditData}
                                    setLayoutData={setLayoutData}
                                />
                            )
                        }
                        else {
                            return getPanel(columnId, column, fields);
                        }
                    })
                }
            </div>
        </DragDropContext>
    )
}

export default EmailBuilder
