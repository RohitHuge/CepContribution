import React, { useState, useEffect } from 'react';

const VideoSection = () => {
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  useEffect(() => {
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoStream]);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      setVideoStream(stream);
      setIsVideoEnabled(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopVideo = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
      setIsVideoEnabled(false);
    }
  };

  const startRecording = () => {
    if (videoStream) {
      const recorder = new MediaRecorder(videoStream);
      const chunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'video-recording.webm';
        a.click();
        URL.revokeObjectURL(url);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  return (
    <section id="video-section" className="min-h-screen py-20">
      <h2 className="text-4xl md:text-6xl font-black mb-12 text-center font-['Orbitron'] uppercase">
        VIDEO CALLS
      </h2>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 dark:bg-[#0D0D0D]/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Connect with Sellers & Buyers
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
            Video calls help you inspect items before purchase and build trust with other users.
          </p>

          {/* Video Container */}
          <div className="relative bg-black rounded-lg overflow-hidden mb-6">
            {isVideoEnabled ? (
              <video
                ref={(video) => {
                  if (video && videoStream) {
                    video.srcObject = videoStream;
                  }
                }}
                autoPlay
                muted
                className="w-full h-96 object-cover"
              />
            ) : (
              <div className="w-full h-96 flex items-center justify-center bg-gray-800">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">📹</div>
                  <p className="text-xl">Camera is off</p>
                  <p className="text-sm text-gray-400">Click "Start Video" to begin</p>
                </div>
              </div>
            )}
            
            {/* Recording Indicator */}
            {isRecording && (
              <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">REC</span>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            {!isVideoEnabled ? (
              <button
                onClick={startVideo}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <span>📹</span>
                <span>Start Video</span>
              </button>
            ) : (
              <>
                <button
                  onClick={stopVideo}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <span>⏹️</span>
                  <span>Stop Video</span>
                </button>
                
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <span>🔴</span>
                    <span>Start Recording</span>
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <span>⏹️</span>
                    <span>Stop Recording</span>
                  </button>
                )}
              </>
            )}
          </div>

          {/* Features List */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h4 className="font-bold text-lg mb-2">Inspect Items</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Get a detailed look at items before purchasing
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h4 className="font-bold text-lg mb-2">Build Trust</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Connect face-to-face with sellers and buyers
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">📹</div>
              <h4 className="font-bold text-lg mb-2">Record Calls</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Save important conversations for reference
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
