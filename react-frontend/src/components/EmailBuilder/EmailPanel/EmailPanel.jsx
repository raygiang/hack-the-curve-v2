import React, { useRef, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
// import EmailField from './EmailField/EmailField';
import LayoutArea from './LayoutArea/LayoutArea';
import './email-panel.scss';

const EmailPanel = (props) => {
    const { column, fields, builderInfo, isEditing, setEditData, layoutData, setLayoutData } = props;
    const node = useRef();

    /**
     * Add event listeners for detecting where the user is clicking
     */
    useEffect(() => {
        /**
         * Click listener for determining if the user clicked inside or outside of this email field
         */
        const handleClick = e => {
            if(node.current.parentNode.nextSibling.contains(e.target)) return;
            const fieldRegex = /-field/;
            const layoutRegex = /layout/;

            if(fieldRegex.test(e.target.className) && e.target.attributes.nodekey) {
                let fieldId = e.target.attributes.nodekey.value;
                setEditData({ isEditing: fieldId, selectedField: builderInfo.fields[fieldId] });

                if(e.target.attributes.layoutkey) {
                    let layoutId = e.target.attributes.layoutkey.value;
                    setLayoutData({ isSelecting: layoutId, selectedLayout: builderInfo.layouts[layoutId] });
                }
            }
            else {
                setEditData({ isEditing: null, selectedField: null});
                setLayoutData({ isSelecting: null, selectedLayout: null });
            }

            if(layoutRegex.test(e.target.className) && e.target.attributes.nodekey) {
                let layoutId = e.target.attributes.nodekey.value;
                setLayoutData({ isSelecting: layoutId, selectedLayout: builderInfo.layouts[layoutId] });
            }
        };

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [builderInfo, isEditing, setEditData, setLayoutData]);

    return (
        <Droppable
            droppableId={column.id}
            type="Layout"
        >
            {(provided, snapshot) => (
                <section className="email-panel"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={snapshot.isDraggingOver ? {backgroundColor: 'skyblue'} : {}}
                >
                    <h2 className="email-panel__heading">{column.title}</h2>
                    <div className="email-panel__field-container" ref={node}>
                        {
                            fields.map((layout, index) => (
                                <LayoutArea key={layout.id} builderInfo={builderInfo} layout={layout} index={index} isEditing={isEditing} layoutData={layoutData} />
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
