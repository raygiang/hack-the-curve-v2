import React from 'react';
import '../email-field.scss';

const HeadingField = (props) => {
    const { fieldId, field, layoutId, isEditing, currVal, setCurrVal, width } = props;

    const onChangeHandler = (e) => {
        setCurrVal(e.target.value);
    }

    const getRenderText = () => {
        switch(parseInt(field["heading-type"])) {
            case 1:
                return (
                    <h1 className="heading-field__input-message" layoutkey={layoutId} nodekey={fieldId}>
                        {currVal ? currVal : 'Click to Edit Content'}
                    </h1>
                )
            case 2:
                return (
                    <h2 className="heading-field__input-message" layoutkey={layoutId} nodekey={fieldId}>
                        {currVal ? currVal : 'Click to Edit Content'}
                    </h2>
                )
            case 3:
                return (
                    <h3 className="heading-field__input-message" layoutkey={layoutId} nodekey={fieldId}>
                        {currVal ? currVal : 'Click to Edit Content'}
                    </h3>
                )
            case 4:
                return (
                    <h4 className="heading-field__input-message" layoutkey={layoutId} nodekey={fieldId}>
                        {currVal ? currVal : 'Click to Edit Content'}
                    </h4>
                )
            case 5:
                return (
                    <h5 className="heading-field__input-message" layoutkey={layoutId} nodekey={fieldId}>
                        {currVal ? currVal : 'Click to Edit Content'}
                    </h5>
                )
            default:
                return (
                    <h6 className="heading-field__input-message" layoutkey={layoutId} nodekey={fieldId}>
                        {currVal ? currVal : 'Click to Edit Content'}
                    </h6>
                )
        }
    }

    const getFontSize = () => {
        switch(parseInt(field["heading-type"])) {
            case 1:
                return "2em";
            case 2:
                return "1.5em";
            case 3:
                return "1.17em";
            case 4:
                return "1em";
            case 5:
                return "0.83em";
            default:
                return "0.67em";
        }
    }

    const renderField = () => {
        if(fieldId === isEditing) {
            return (
                <input
                    id={fieldId}
                    className="heading-field__input"
                    type="text"
                    layoutkey={layoutId}
                    nodekey={fieldId}
                    placeholder="Type Heading Here"
                    defaultValue={currVal}
                    onChange={onChangeHandler}
                    style={{ fontSize: getFontSize() }}
                />
            )
        }
        else {
            return getRenderText();
        }
    }

    return (
        <div className="heading-field" layoutkey={layoutId} nodekey={fieldId} style={{ width: width, flex: width }}>
            {renderField()}
        </div>
    )
}

export default HeadingField
