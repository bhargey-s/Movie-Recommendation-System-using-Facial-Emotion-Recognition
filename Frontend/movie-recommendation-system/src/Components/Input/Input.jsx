import { React, useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import Modal from 'react-modal';
import galleryIcon from '../../assets/Icons/photos.svg';
import cameraIcon from '../../assets/Icons/apple-camera.svg';
import "./input-stylesheet.css"

function Input() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state || { name: "Bhargey", age: 22 };

    const webcamRef = useRef(null);
    const fileInputRef = useRef(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [facialimage, setFacialImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        // setFacialImage(e.target.files[0]);
        convertToBase64(e.target.files[0]);
    }

    // Function to open the modal
    const openModal = () => {
        setModalIsOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalIsOpen(false);
    };

    // Function to handle capturing the photo
    const capturePhoto = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setFacialImage(imageSrc);
        closeModal();
    };

    const convertToBase64 = (image) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64ImageData = reader.result;
            setFacialImage(base64ImageData);
        };
        reader.readAsDataURL(image);
    };

    const sendImage = async () => {
        setIsLoading(true);
        fetch('http://localhost:8000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: facialimage }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response from the backend
                console.log(data);
                let emotion = data?.emotion[0]?.['dominant_emotion'] || false;
                if (!emotion) {
                    setIsLoading(false);
                    alert("Try again");
                    return;
                }
                navigate("/output", { state: { emotion: emotion, name: state.name } });
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
            });
    }

    return (
        <div className="input">
            {!isLoading && <div className="input-card">
                <div>
                    <p style={{ fontFamily: 'Netflix Sans Medium', fontSize: "40px", lineHeight: "55px", textAlign: "left" }}>Hello, {state.name} &#128075;</p>
                    <p style={{ fontSize: "20px", textAlign: "left" }}>Please take a picture or upload a picture of your face</p>
                </div>
                <div className="icons">
                    <div>
                        <img src={cameraIcon} alt="" onClick={openModal} />
                    </div>
                    <div className="separation"></div>
                    <div>
                        <img src={galleryIcon} alt="" onClick={handleIconClick} />
                        <input
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                {facialimage && <button onClick={sendImage} style={{ background: "none", border: "1px solid #fff" }}>Upload Image</button>}
            </div>}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Webcam Modal"
                className="modal"
            >
                <div className="modal-header">
                    <h2>Webcam Capture</h2>
                    <button onClick={closeModal}>Close</button>
                </div>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg" />
                <div className="modal-footer">
                    <button onClick={capturePhoto}>Capture</button>
                </div>
            </Modal>
            {isLoading &&
                <div>
                    Loading... <br />
                    Hold on to your mood
                </div>}
        </div>
    )
}

export default Input