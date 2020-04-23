import React from 'react';
import './layout-panel.scss';

const LayoutPanel = (props) => {
    const { layoutData, layouts, updateLayout } = props;
    
    const clickHandler = (e) => {
        let newLayouts = {};
        let index = e.target.value ? e.target.value : e.target.attributes.value.value; 
        for(let i = 0; i < layouts[index].length; i++) {
            newLayouts[layoutData.selectedLayout.id + '-' + i] = null
        }

        let newSelectedLayout = {
            ...layoutData.selectedLayout,
            "layout": index,
            picked: true,
            layouts: newLayouts,
        };
        
        updateLayout(newSelectedLayout);
    }

    const generateLayoutOptions = () => (
        Object.keys(layouts).map((id) => (
            <div key={id} className="layout-panel__option">
                {/* <input
                    type="radio"
                    id={`layout-option-${id}`}
                    name="layout-type"
                    value={id}
                    defaultChecked={layoutData.selectedLayout.layout.toString() === id}
                />
                <label htmlFor={`layout-option-${id}`}>{layouts[id]}</label> */}
                <button className="layout-panel__option-button" value={id} onClick={clickHandler}>
                    {layouts[id].map((layoutBlock, index) => (
                        <div key={index} value={id} style={{width: layoutBlock, flex: layoutBlock}}>{layoutBlock}</div>
                    ))}
                </button>
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
