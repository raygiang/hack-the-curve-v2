import React from 'react';
import '../email-field.scss';

const ParagraphField = (props) => {
    const { fieldId, layoutId, isEditing, currVal, setCurrVal, width } = props;

    const onChangeHandler = (e) => {
        setCurrVal(e.target.value);
    }

    const renderField = () => {
        if(fieldId === isEditing) {
            return (
                <textarea
                    className="paragraph-field__input"
                    layoutkey={layoutId}
                    nodekey={fieldId}
                    placeholder="Type Paragraph Here"
                    defaultValue={currVal}
                    onChange={onChangeHandler}
                />
            )
        }
        else {
            return (
                <p className="paragraph-field__input-message" layoutkey={layoutId} nodekey={fieldId}>{currVal ? currVal : 'Click to Edit Content'}</p>
            )
        }
    }

    return (
        <div className="paragraph-field" layoutkey={layoutId} nodekey={fieldId} style={{ width: width, flex: width }}>
            {renderField()}
        </div>
    )
}

export default ParagraphField
