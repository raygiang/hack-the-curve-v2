import React from 'react';

const ParagraphOptions = (props) => {
    const { selectedField, removeField } = props;

    const handleDelete = () => {
        removeField(selectedField);
    }

    return (
        <section className="paragraph-options">
            <h2 className="paragraph-options__heading">Paragraph Options</h2>
            <div className="paragraph-options__delete-container">
                <button className="paragraph-options__delete-container" onClick={handleDelete}>Delete</button>
            </div>
        </section>
    )
}

export default ParagraphOptions
