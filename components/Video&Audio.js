// App.js
import React, { useEffect, useRef, useState } from 'react';

export default function App() {
  const videoRef = useRef(null);
  const startupSoundRef = useRef(null);
  const navSoundRef = useRef(null);

  useEffect(() => {
    videoRef.current.play();
    startupSoundRef.current.play();
  }, []);

  return (
    <div className="app">
      <video ref={videoRef} src="/assets/intro.mp4" className="bg-video" muted />
      <audio ref={startupSoundRef} src="/assets/startup.mp3" />
      <audio ref={navSoundRef} src="/assets/nav.mp3" />

      {/* Components below */}
    </div>
  );
}
