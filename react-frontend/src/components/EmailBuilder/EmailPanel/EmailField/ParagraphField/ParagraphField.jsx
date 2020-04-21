import React from 'react';
import '../email-field.scss';

const ParagraphField = (props) => {
    const { fieldId, isEditing, currVal, setCurrVal, width } = props;

    const onChangeHandler = (e) => {
        setCurrVal(e.target.value);
    }

    const renderField = () => {
        if(fieldId === isEditing) {
            return (
                <textarea
                    className="paragraph-field__input"
                    nodekey={fieldId}
                    placeholder="Type Paragraph Here"
                    defaultValue={currVal}
                    onChange={onChangeHandler}
                />
            )
        }
        else {
            return (
                <p className="paragraph-field__input-message" nodekey={fieldId}>{currVal ? currVal : 'Click to Edit Content'}</p>
            )
        }
    }

    return (
        <div className="paragraph-field" nodekey={fieldId} style={{ width: width, flex: width }}>
            {renderField()}
        </div>
    )
}

export default ParagraphField
