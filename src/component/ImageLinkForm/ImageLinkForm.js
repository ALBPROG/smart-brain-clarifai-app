import React from 'react';
import './ImageLinkForm.css';

// desctructur onInputChange {onInputChange}
const ImageLinkForm = ({onInputChange, onPhotoSubmit}) => {
    return (
        <div>
          <p className='f3'>
            {"This Magic Brain will detect faces in your pictures. Give it a try"}
        </p> 
            <div className="center">
              <div className="form center pa4 br3 shadow-5">
               <input className="f4 pa2 w-70 center" type='text' onChange={onInputChange}/>
               <button 
               className="f4 w-30 grow link ph3 pv2 dib white bg-light bg-light-purple"
               onClick={onPhotoSubmit}>
               Detect</button> 
              </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;