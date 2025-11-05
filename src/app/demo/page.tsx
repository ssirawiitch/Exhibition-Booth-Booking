// app/demo/page.tsx
'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Play, Pause, Volume2, VolumeX, Maximize, ArrowLeft } from 'lucide-react';
import Header from '@/component/Header';
import { useSession } from 'next-auth/react';
import DemoMain from '@/component/DemoMain';

export default function DemoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * duration;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      
      <Header />

      {/* Hero Section */}
      <DemoMain />

      {/* Video Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Video Container */}
          <div className="relative bg-black aspect-video">
            <video
              ref={videoRef}
              className="w-full h-full"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            >
              {/* Replace with your video file path */}
              <source src="/demo-video.mp4" type="video/mp4" />
              <source src="/demo-video.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>

            {/* Play/Pause Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <button
                  onClick={togglePlay}
                  className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-all transform hover:scale-110 shadow-2xl"
                >
                  <Play className="w-10 h-10 text-white ml-1" />
                </button>
              </div>
            )}
          </div>

          {/* Video Controls */}
          <div className="bg-gray-900 p-6">
            {/* Progress Bar */}
            <div 
              className="w-full h-2 bg-gray-700 rounded-full mb-4 cursor-pointer group"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-red-600 rounded-full transition-all group-hover:bg-red-500"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-all"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-1" />
                  )}
                </button>

                {/* Mute/Unmute Button */}
                <button
                  onClick={toggleMute}
                  className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-all"
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6 text-white" />
                  ) : (
                    <Volume2 className="w-6 h-6 text-white" />
                  )}
                </button>

                {/* Time Display */}
                <div className="text-white text-sm font-medium">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-all"
              >
                <Maximize className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {session ? <div className="bg-gradient-to-r from-red-600 to-red-700 py-10"><div className="max-w-4xl mx-auto px-6 text-center">
      <p className="m-5 text-white">By Will and Drew</p></div>
      </div> : 
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-red-100 mb-8">Join thousands of exhibitors using ExpoBook today</p>
          <div className="flex justify-center space-x-4">
            <Link href="/user/login" className="inline-block bg-white text-red-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
              Sign In Now
            </Link>
            <Link href="/user/exhibition" className="inline-block border-2 border-white text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-all">
              Browse Exhibitions
            </Link>
          </div>
        </div>
      </div>
      }
    </div>
  );
}