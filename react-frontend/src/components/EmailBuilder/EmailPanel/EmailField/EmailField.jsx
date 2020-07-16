// import React, { useState } from 'react';
// import { Draggable } from 'react-beautiful-dnd';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
// import HeadingField from './HeadingField/HeadingField';
// import ParagraphField from './ParagraphField/ParagraphField';
// import './email-field.scss';

// const EmailField = (props) => {
//     const [currVal, setCurrVal] = useState('');
//     const { field, index, isEditing } = props;
//     const { id, type } = field;

//     /**
//      * Set the style of this email field while a drag is being performed
//      */
//     const setDraggableStyle = (isDragging, draggableStyle) => ({
//         userSelect: "none",
//         margin: "0 0 0.5rem 0",
      
//         background: isDragging ? "lightgreen" : "#f0a70f",
      
//         ...draggableStyle
//     });

//     /**
//      * Return the appropriate input component depending on type of the email field
//      */
//     const getInputField = () => {
//         if(type === 'heading') {
//             return(<HeadingField fieldId={id} field={field} isEditing={isEditing} currVal={currVal} setCurrVal={setCurrVal} />);
//         }
//         else if(type === 'paragraph') {
//             return(<ParagraphField fieldId={id} field={field} isEditing={isEditing} currVal={currVal} setCurrVal={setCurrVal} />);
//         }
//         else if(type === 'image') {
//             return(
//                 <input className="email-field__input-file" id="image" type="file" nodekey={id} />
//             );
//         }
//         else {
//             return(<div nodekey={id}>INSERT SEVERAL IFRAMES HERE</div>)
//         }
//     }

//     return (
//         <Draggable
//             draggableId={id}
//             index={index}
//         >
//             {(provided, snapshot) => (
//                 <div
//                     className="email-field-container"
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     style={setDraggableStyle(snapshot.isDragging, provided.draggableProps.style)}
//                 >
//                     <span className="email-field-container__drag-handle" nodekey={id} {...provided.dragHandleProps}>
//                         <FontAwesomeIcon icon={faGripVertical} />
//                     </span>
//                     {getInputField()}
//                 </div>
//             )}
//         </Draggable>
//     )
// }

// export default EmailField
