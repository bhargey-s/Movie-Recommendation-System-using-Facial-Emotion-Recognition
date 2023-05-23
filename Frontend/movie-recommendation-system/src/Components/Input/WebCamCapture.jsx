import React, { useRef } from 'react';

const WebcamCapture = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const handleCapture = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw video frame on canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas image to data URL
        const dataURL = canvas.toDataURL('image/png');

        // Output the data URL or perform further processing
        console.log(dataURL);
    };

    const handleStream = (stream) => {
        const video = videoRef.current;
        video.srcObject = stream;
    };

    const handleStreamError = (error) => {
        console.error('Error accessing webcam:', error);
    };

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(handleStream)
        .catch(handleStreamError);

    return (
        <div>
            <video ref={videoRef} width="640" height="480" autoPlay></video>
            <button onClick={handleCapture}>Capture Photo</button>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
    );
};

export default WebcamCapture;