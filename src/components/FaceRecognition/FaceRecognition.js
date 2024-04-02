import React from "react";
import './FaceRecognition.css'


let _left_col = "";
let _topRow = "";
let _bottomRow = "";
let _rightCol = "";

const setClarifai = (imageURL) => {
    const PAT = '2bbf4e71b47b41c7afde1fbba0a7c92b';
    const USER_ID = 'gy8zixqi1qmv';
    const APP_ID = 'FaceRecognitionIMG';
    const IMAGE_URL = imageURL;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                        // "base64": IMAGE_BYTES_STRING
                    }
                }
            }
        ]
    });

    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    return options;
}


const clarifaiAPI = (imageURL) => {
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", setClarifai(imageURL))
        .then(response => response.json())
        .then(result => {

            const regions = result.outputs[0].data.regions;

            regions.forEach(region => {
                const boundingBox = region.region_info.bounding_box;
                const topRow = boundingBox.top_row.toFixed(3);
                const leftCol = boundingBox.left_col.toFixed(3);
                const bottomRow = boundingBox.bottom_row.toFixed(3);
                const rightCol = boundingBox.right_col.toFixed(3);

                region.data.concepts.forEach(concept => {
                    //const name = concept.name;
                    //const value = concept.value.toFixed(4);


                    const image = document.getElementById("inputimage");
                    const width = Number(image.width);
                    const height = Number(image.height);
                    //console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol} - Image w: ${width} h: ${height}`);
                    _left_col = leftCol * width;
                    _rightCol = width - (rightCol * width);
                    _bottomRow = height - (bottomRow * height);
                    _topRow = topRow * height;
                    //console.log(`Bounding Box: L:${_left_col} R:${_rightCol} B:${_bottomRow} T:${_topRow}`);

                    let ch = document.createElement('div');
                    ch.className = "bounding-box";
                    ch.style.top = parseFloat(_topRow.toFixed(2)) + "px";
                    ch.style.bottom = parseFloat(_bottomRow.toFixed(2)) + "px";
                    ch.style.left = parseFloat(_left_col.toFixed(2)) + "px";
                    ch.style.right = parseFloat(_rightCol.toFixed(2)) + "px";


                    const pepe = document.getElementById("pepe");
                    pepe.appendChild(ch);
                    // const box = document.getElementsByClassName("bounding-box");
                    // if (box) {
                    //     console.log("seteandolo")
                    //     Object.assign(box[0].style, stylesToSet);
                    // }



                });
            });

        })
        .catch(error => console.log('error', error));
}




function FaceRecognition({ source }) {

    if (source !== "") {
        clarifaiAPI(source);
    } else {
        const elements = document.getElementsByClassName("bounding-box");
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }


    return (
        <div className="center ma">
            <div id="pepe" className="absolute mt2">
                <img id="inputimage" alt="" src={source} width='500px' height='auto' />
            </div>

        </div>
    );
}

export default FaceRecognition;