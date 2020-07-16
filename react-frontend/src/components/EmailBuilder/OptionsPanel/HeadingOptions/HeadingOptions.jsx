import React from 'react';
import '../options.scss';

const HeadingOptions = (props) => {
    const { selectedField, updateField, removeField } = props;
    
    const onChangeHandler = (e) => {
        if(e.target.name === "heading-type") {
            let newSelectedField = {
                ...selectedField,
                "heading-type": e.target.value,
            };
            updateField(newSelectedField);
        };
    }

    const generateHeadingOptions = () => {
        let headingOptions = [];

        for(let i = 1; i <= 6; i++) {
            headingOptions.push(
                <div key={i} className="heading-option">
                    <input
                        type="radio"
                        id={"h" + i}
                        name="heading-type"
                        value={i}
                        checked={i === parseInt(selectedField["heading-type"])}
                        onChange={onChangeHandler}
                    />
                    <label htmlFor={"h" + i}>H{i}</label>
                </div>
            )
        }

        return headingOptions;
    }

    const handleDelete = () => {
        removeField(selectedField);
    }

    return (
        <section className="heading-options">
            <h2 className="heading-options__heading">Heading Options</h2>
            <form action="">
                <fieldset className="heading-type-container">
                    <legend>Heading Type</legend>
                        {generateHeadingOptions()}
                </fieldset>
            </form>
            <div className="heading-options__delete-container">
                <button className="heading-options__delete-container" onClick={handleDelete}>Delete</button>
            </div>
        </section>
    )
}

export default HeadingOptions
