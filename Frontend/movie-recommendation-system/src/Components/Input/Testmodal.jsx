import React, { useState } from 'react';
import Webcam from 'react-webcam';
import Modal from 'react-modal';

// Define the WebcamCaptureModal component
const WebcamCaptureModal = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Function to open the modal
    const openModal = () => {
        setModalIsOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>Open Webcam</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Webcam Modal"
            >
                <h2>Webcam Capture</h2>
                <Webcam />

                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
};

export default WebcamCaptureModal;