import React, {useState} from "react";
import './ImageLinkForm.css'
import FaceRecognition from "../FaceRecognition/FaceRecognition";

function ImageLinkForm(){

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }
    let imageURL ='';

    const setImage = ()=>{
        imageURL=inputValue;
    }
    return(
        <div>
            <p className="f3">
            {'This Magic Brain detect faces in your pictures. Git it a try!'}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center" type="text" value={inputValue} onChange={handleInputChange}/>
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-black" onSubmit={setImage()}>Detect</button>
                </div>
                
            </div>
            <FaceRecognition source={imageURL}/>
        </div>
    );
}

export default ImageLinkForm;