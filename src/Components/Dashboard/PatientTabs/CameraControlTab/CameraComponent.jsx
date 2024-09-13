import React, { useRef, useEffect, useState } from 'react';

const MediaComponent = () => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const streamRef = useRef(null); // Ref to hold the media stream

  useEffect(() => {
    const startMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream; // Store the stream in the ref
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        if (err.name === 'NotAllowedError') {
          setError(
            'Permission denied. Please enable camera and microphone access in your browser settings.'
          );
        } else if (err.name === 'NotFoundError') {
          setError('No camera or microphone found.');
        } else {
          setError('An unknown error occurred: ' + err.message);
        }
      }
    };

    startMedia();

    // Cleanup function to stop the media stream
    const cleanupStream = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };

    // Add event listener for page visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        cleanupStream();
      } else if (document.visibilityState === 'visible' && !streamRef.current) {
        startMedia();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup on component unmount
    return () => {
      cleanupStream();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }}></video>
    </div>
  );
};

export default MediaComponent;
