import React, { useRef, useState } from 'react';

const MediaAccess = () => {
  const videoRef = useRef(null);
  const [error, setError] = useState('');

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Media Access</h1>
      <button onClick={startVideo}>Start Camera</button>
      {error && <p>Error: {error}</p>}
      <video ref={videoRef} autoPlay style={{ width: '400px', height: '300px' }}></video>
    </div>
  );
};

export default MediaAccess;
