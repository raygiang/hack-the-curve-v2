import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import HeadingField from '../../EmailField/HeadingField/HeadingField';
import ParagraphField from '../../EmailField/ParagraphField/ParagraphField';
import './layout-box.scss';

const LayoutBox = (props) => {
    const [currVal, setCurrVal] = useState('');
    const { builderInfo, index, width, layoutId, isEditing } = props;
    const layoutBoxId = layoutId + '-' + index;
    const currentField = builderInfo.layouts[layoutId].layouts[layoutBoxId];

    const getDroppableField = () => (
        <Droppable
            droppableId={layoutBoxId}
            type="Field"
        >
            {(provided, snapshot) => {
                return (
                    <div
                        className="layout-box"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={snapshot.isDraggingOver ? {backgroundColor: 'skyblue', width: width} : {width: width}}
                        nodekey={layoutId}
                    >
                        <div className="layout-box__message" nodekey={layoutId}>
                            Please Drag a Field Here
                        </div>
                        {provided.placeholder}
                    </div>
                )
            }}
        </Droppable>
    )

    const getEmailField = () => {
        const emailField = builderInfo.fields[currentField];
        const type = emailField.type;
        const id = emailField.id;

        if(type === 'heading') {
            return(<HeadingField fieldId={id} field={emailField} isEditing={isEditing} currVal={currVal} setCurrVal={setCurrVal} width={width} />);
        }
        else if(type === 'paragraph') {
            return(<ParagraphField fieldId={id} field={emailField} isEditing={isEditing} currVal={currVal} setCurrVal={setCurrVal} width={width} />);
        }
        else if(type === 'image') {
            return(
                <input className="image-field" id="image" type="file" nodekey={id} style={{width: width, flex: width}} />
            );
        }
        else {
            return(<div className="video-field" nodekey={id} style={{width: width, flex: width}}>INSERT SEVERAL IFRAMES HERE</div>)
        }
    }

    
        if(currentField) {
            return getEmailField();
        }
        else {
            return getDroppableField();
        }

}

export default LayoutBox
