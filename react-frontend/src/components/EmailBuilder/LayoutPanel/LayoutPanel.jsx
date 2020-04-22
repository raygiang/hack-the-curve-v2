import React from 'react';
import './layout-panel.scss';

const LayoutPanel = (props) => {
    const { layoutData, layouts, updateLayout } = props;
    
    const clickHandler = (e) => {
        let newLayouts = {};
        for(let i = 0; i < layouts[e.target.value].length; i++) {
            newLayouts[layoutData.selectedLayout.id + '-' + i] = null
        }

        let newSelectedLayout = {
            ...layoutData.selectedLayout,
            "layout": e.target.value,
            picked: true,
            layouts: newLayouts,
        };
        
        updateLayout(newSelectedLayout);
    }

    const generateLayoutOptions = () => (
        Object.keys(layouts).map((id) => (
            <div key={id} className="layout-option">
                {/* <input
                    type="radio"
                    id={`layout-option-${id}`}
                    name="layout-type"
                    value={id}
                    defaultChecked={layoutData.selectedLayout.layout.toString() === id}
                />
                <label htmlFor={`layout-option-${id}`}>{layouts[id]}</label> */}
                <button className="layout-option__button" value={id} onClick={clickHandler}>{layouts[id]}</button>
            </div>
        ))
    );

    return (
        <section className="layout-panel">
            <h2 className="layout-panel__heading">Select a Layout Option</h2>
            <fieldset className="layout-panel__layout-type-container">
                <legend>Layout Type</legend>
                {generateLayoutOptions()}
            </fieldset>
        </section>
    )
}

export default LayoutPanel
