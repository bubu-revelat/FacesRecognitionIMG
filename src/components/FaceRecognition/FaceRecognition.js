import React, { useEffect } from "react";
import './FaceRecognition.css'
import { useUser } from '../UserContext/UserContext';
import endpoint from "../../endpoint";


let _left_col = "";
let _topRow = "";
let _bottomRow = "";
let _rightCol = "";




const clarifaiAPI = async (imageURL) => {
    console.log("11111")
    fetch(endpoint.url +'/imageurl', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            input:imageURL
        })
        }).then(response =>{
            if (!response.ok)
             throw new Error('Failed to fetch data from Clarifai API');
            
             return response.json();
        }).then(result => {
            const regions = result.outputs[0].data.regions;

            regions.forEach(region => {
                const boundingBox = region.region_info.bounding_box;
                const topRow = boundingBox.top_row.toFixed(3);
                const leftCol = boundingBox.left_col.toFixed(3);
                const bottomRow = boundingBox.bottom_row.toFixed(3);
                const rightCol = boundingBox.right_col.toFixed(3);

                region.data.concepts.forEach(concept => {
                    const image = document.getElementById("inputimage");
                    const width = Number(image.width);
                    const height = Number(image.height);
                    _left_col = leftCol * width;
                    _rightCol = width - (rightCol * width);
                    _bottomRow = height - (bottomRow * height);
                    _topRow = topRow * height;

                    let ch = document.createElement('div');
                    ch.className = "bounding-box";
                    ch.style.top = parseFloat(_topRow.toFixed(2)) + "px";
                    ch.style.bottom = parseFloat(_bottomRow.toFixed(2)) + "px";
                    ch.style.left = parseFloat(_left_col.toFixed(2)) + "px";
                    ch.style.right = parseFloat(_rightCol.toFixed(2)) + "px";


                    const pepe = document.getElementById("pepe");
                    pepe.appendChild(ch);
                });
            });

        })
        .catch(error => console.log('error', error));
}


function FaceRecognition({ source }) {

    const { user, updateUser } = useUser();


    useEffect(() => {

        function updateCounter() {
            let payload = {
                id: user.id
            }

            fetch(endpoint.url +'/image', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then(response => response.json())
                .then(result => {
                    updateUser(result?.user);

                })

        }
        if (source !== "" && user) {
            clarifaiAPI(source)
            updateCounter();
        }

    }, [source]);






    useEffect(() => {
        if (source === "") {
            const elements = document.getElementsByClassName("bounding-box");
            while (elements.length > 0) {
                elements[0].parentNode.removeChild(elements[0]);
            }
        }
    }, [source]);


    return (
        <div className="center ma">
            <div id="pepe" className="absolute mt2">
                <img id="inputimage" alt="" src={source} width='500px' height='auto' />
            </div>
        </div>
    );
}

export default FaceRecognition;