import React, { useState, useRef, useEffect } from 'react';
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

    useEffect(() => {
        const currentLayouts = builderInfo.layouts;
        let newLayoutFlag = true;

        for(let layout in currentLayouts) {
            if(!currentLayouts[layout].picked) newLayoutFlag = false;
        }

        if(newLayoutFlag) {
            builderInfo.columns['email-layout'].fieldIds.push('layout' + count.current);

            setBuilderInfo({
                ...builderInfo,
                layouts: {
                    ...builderInfo.layouts,
                    ['layout' + count.current]: {
                        id: 'layout' + count.current,
                        content: 'Click to Select a Layout',
                        layout: 0,
                        picked: false,
                        layouts: {"layout-0": null},
                    },
                }
            });
            count.current++;
        }
    }, [builderInfo])

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

            setLayoutData({ isSelecting: null, selectedLayout: {
                    ...layout,
                    layouts: {
                        ...layout.layouts,
                        [destination.droppableId] : newId,
                    }
                }
            });
            
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
                    resetPicked={resetPicked}
                    removeLayout={removeLayout}
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

        setEditData({ isEditing: editData.isEditing, selectedField: field });

        setBuilderInfo ({
            ...builderInfo,
            fields : {
                ...builderInfoFields,
                [field.id]: field,
            }
        })
    }

    const removeField = (field) => {
        delete builderInfo.fields[field.id];
        const layoutID = layoutData.selectedLayout.id;
        const origLayout = builderInfo.layouts[layoutID];
        for(let key in origLayout.layouts) {
            if(origLayout.layouts[key] === field.id) {
                origLayout.layouts[key] = null;
            }
        }

        setBuilderInfo(builderInfo);

        setEditData({isEditing: null, selectedField: null});
    }

    const updateLayout = (layout) => {
        const builderInfoLayouts = builderInfo.layouts;

        setLayoutData({
            ...layoutData,
            selectedLayout: {
                ...layoutData.selectedLayout,
                picked: true,
            },
        });

        setBuilderInfo ({
            ...builderInfo,
            layouts : {
                ...builderInfoLayouts,
                [layout.id]: layout,
            }
        })
    }

    const removeLayout = () => {
        if(!window.confirm("Are you sure you want to remove this layout?")) return;

        const currentLayout = layoutData.selectedLayout.id;
        const currentLayoutIndex = builderInfo.columns['email-layout'].fieldIds.indexOf(currentLayout);
        let fieldIds = [...builderInfo.columns['email-layout'].fieldIds];
        fieldIds.splice(currentLayoutIndex, 1);
        
        builderInfo.columns['email-layout'].fieldIds = fieldIds;
        delete builderInfo.layouts[currentLayout];

        setBuilderInfo(builderInfo);
        setEditData({ isEditing: null, selectedField: null });
        setLayoutData({ isSelecting: null, selectedLayout: null });
    }

    const resetPicked = () => {
        setLayoutData({
            ...layoutData,
            selectedLayout: {
                ...layoutData.selectedLayout,
                picked: false,
            },
        });
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
                                    layoutData={layoutData}
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
