/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BirthdayCake } from './components/BirthdayCake';
import { PersonalMessage } from './components/PersonalMessage';
import { LetterSection } from './components/LetterSection';
import { BalloonPopSection } from './components/BalloonPopSection';
import { ScratchCardSection } from './components/ScratchCardSection';
import { WishingWell } from './components/WishingWell';
import { PhotoSection } from './components/PhotoSection';
import { FriendshipMilestones } from './components/FriendshipMilestones';
import { WhySpecialSection } from './components/WhySpecialSection';
import { InteractiveHeart } from './components/InteractiveHeart';
import { DateSection } from './components/DateSection';
import { MusicPlayer } from './components/MusicPlayer';
import { FinalSurprise } from './components/FinalSurprise';
import { Footer } from './components/Footer';
import { FloatingHearts } from './components/FloatingHearts';
import { AudioState } from './types';
import { X } from 'lucide-react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

const YOUTUBE_VIDEO_ID = 'SQ4jZ-EAL88';
const START_OFFSET_SECONDS = 15; // 0:15 start time

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ytPlayerRef = useRef<any>(null);
  const [isYouTubeActive, setIsYouTubeActive] = useState<boolean>(false);

  // Lock body scroll while on Welcome Screen
  useEffect(() => {
    if (!hasEntered) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [hasEntered]);

  // Guard flag so the song starts ONLY ONCE and NEVER restarts or replays on enter
  const isPlayingRef = useRef<boolean>(false);
  const hasInitializedPlayback = useRef<boolean>(false);

  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    currentTime: START_OFFSET_SECONDS,
    duration: 180,
    volume: 0.85,
    isMuted: false,
    songTitle: 'Varron Forever',
  });

  // Start audio ONCE upon first interaction; subsequent calls keep playing without restarting
  const startAudioOnce = useCallback(() => {
    if (isPlayingRef.current) {
      // Audio is ALREADY playing: DO NOT touch timestamp! DO NOT restart!
      return;
    }

    isPlayingRef.current = true;

    if (isYouTubeActive && ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
      try {
        if (!hasInitializedPlayback.current) {
          hasInitializedPlayback.current = true;
          ytPlayerRef.current.seekTo(START_OFFSET_SECONDS, true);
        }
        ytPlayerRef.current.playVideo();
      } catch {
        if (audioRef.current && !hasInitializedPlayback.current) {
          hasInitializedPlayback.current = true;
          audioRef.current.currentTime = START_OFFSET_SECONDS;
          audioRef.current.play().catch(() => {});
        }
      }
    } else if (audioRef.current && !hasInitializedPlayback.current) {
      hasInitializedPlayback.current = true;
      audioRef.current.currentTime = START_OFFSET_SECONDS;
      audioRef.current.play().catch(() => {});
    }
  }, [isYouTubeActive]);

  // Global unlock: as soon as the user touches/clicks anywhere on the website, start continuous audio
  useEffect(() => {
    const handleGlobalTrigger = () => {
      startAudioOnce();
    };

    window.addEventListener('pointerdown', handleGlobalTrigger, { once: true });
    window.addEventListener('touchstart', handleGlobalTrigger, { once: true });
    window.addEventListener('click', handleGlobalTrigger, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleGlobalTrigger);
      window.removeEventListener('touchstart', handleGlobalTrigger);
      window.removeEventListener('click', handleGlobalTrigger);
    };
  }, [startAudioOnce]);

  // Initialize YouTube Player API in permanent root container
  useEffect(() => {
    const initPlayer = () => {
      const container = document.getElementById('youtube-player-iframe');
      if (!container || !window.YT || !window.YT.Player) return;

      try {
        ytPlayerRef.current = new window.YT.Player('youtube-player-iframe', {
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            start: START_OFFSET_SECONDS,
            autoplay: 1, // Attempt autoplay right away
            controls: 1,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: (event: any) => {
              setIsYouTubeActive(true);
              event.target.setVolume(audioState.volume * 100);
              event.target.seekTo(START_OFFSET_SECONDS, true);

              // Attempt autoplay as soon as player is ready
              try {
                event.target.playVideo();
              } catch {
                // browser requires gesture
              }

              const dur = event.target.getDuration();
              if (dur) {
                setAudioState((prev) => ({
                  ...prev,
                  duration: dur,
                  currentTime: START_OFFSET_SECONDS,
                }));
              }
            },
            onStateChange: (event: any) => {
              // 1: playing, 2: paused, 0: ended
              if (event.data === 1) {
                isPlayingRef.current = true;
                setAudioState((prev) => ({ ...prev, isPlaying: true }));
              } else if (event.data === 2) {
                isPlayingRef.current = false;
                setAudioState((prev) => ({ ...prev, isPlaying: false }));
              } else if (event.data === 0) {
                // Continuous playback: automatically loop from 15s without stopping
                try {
                  ytPlayerRef.current.seekTo(START_OFFSET_SECONDS, true);
                  ytPlayerRef.current.playVideo();
                } catch {
                  // ignore
                }
              }
            },
            onError: () => {
              setIsYouTubeActive(false);
            },
          },
        });
      } catch {
        setIsYouTubeActive(false);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    }
  }, []);

  // Poll current time when YouTube video is playing
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isYouTubeActive && audioState.isPlaying) {
      interval = setInterval(() => {
        if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === 'function') {
          const current = ytPlayerRef.current.getCurrentTime();
          const dur = ytPlayerRef.current.getDuration();
          setAudioState((prev) => ({
            ...prev,
            currentTime: current,
            duration: dur || prev.duration,
          }));
        }
      }, 300);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isYouTubeActive, audioState.isPlaying]);

  // Fallback HTML5 audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = audioState.volume;

    const handleTimeUpdate = () => {
      if (!isYouTubeActive) {
        setAudioState((prev) => ({
          ...prev,
          currentTime: audio.currentTime,
        }));
      }
    };

    const handleLoadedMetadata = () => {
      if (!isYouTubeActive) {
        setAudioState((prev) => ({
          ...prev,
          duration: audio.duration || 180,
        }));
      }
    };

    const handlePlay = () => {
      if (!isYouTubeActive) {
        isPlayingRef.current = true;
        setAudioState((prev) => ({ ...prev, isPlaying: true }));
      }
    };

    const handlePause = () => {
      if (!isYouTubeActive) {
        isPlayingRef.current = false;
        setAudioState((prev) => ({ ...prev, isPlaying: false }));
      }
    };

    const handleEnded = () => {
      // Continuous loop for fallback
      audio.currentTime = START_OFFSET_SECONDS;
      audio.play().catch(() => {});
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isYouTubeActive]);

  // Transition from Welcome Screen to Main Content without disturbing playback
  const handleOpenSurprise = () => {
    if (!isPlayingRef.current) {
      startAudioOnce();
    }
    setHasEntered(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTogglePlay = () => {
    if (isYouTubeActive && ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
      if (audioState.isPlaying) {
        ytPlayerRef.current.pauseVideo();
      } else {
        ytPlayerRef.current.playVideo();
      }
    } else if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleSeek = (time: number) => {
    if (isYouTubeActive && ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === 'function') {
      ytPlayerRef.current.seekTo(time, true);
      setAudioState((prev) => ({ ...prev, currentTime: time }));
    } else if (audioRef.current) {
      audioRef.current.currentTime = time;
      setAudioState((prev) => ({ ...prev, currentTime: time }));
    }
  };

  const handleVolumeChange = (vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    if (isYouTubeActive && ytPlayerRef.current && typeof ytPlayerRef.current.setVolume === 'function') {
      ytPlayerRef.current.setVolume(clamped * 100);
      if (clamped === 0) ytPlayerRef.current.mute();
      else ytPlayerRef.current.unMute();
    }
    if (audioRef.current) {
      audioRef.current.volume = clamped;
      audioRef.current.muted = clamped === 0;
    }
    setAudioState((prev) => ({
      ...prev,
      volume: clamped,
      isMuted: clamped === 0,
    }));
  };

  const handleToggleMute = () => {
    const nextMuted = !audioState.isMuted;
    if (isYouTubeActive && ytPlayerRef.current) {
      if (nextMuted) ytPlayerRef.current.mute();
      else ytPlayerRef.current.unMute();
    }
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
    setAudioState((prev) => ({
      ...prev,
      isMuted: nextMuted,
    }));
  };

  // Explicit restart back to 0:15 only when the user deliberately clicks Restart
  const handleRestart = () => {
    if (isYouTubeActive && ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === 'function') {
      ytPlayerRef.current.seekTo(START_OFFSET_SECONDS, true);
      ytPlayerRef.current.playVideo();
    } else if (audioRef.current) {
      audioRef.current.currentTime = START_OFFSET_SECONDS;
      audioRef.current.play().catch(() => {});
    }
    setAudioState((prev) => ({ ...prev, currentTime: START_OFFSET_SECONDS }));
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-gradient-to-b from-[#FFF5F7] via-[#FFF0F4] to-[#FFEBF1] selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden">
      {/* Background Floating Hearts */}
      <FloatingHearts />

      {/* Local fallback audio element */}
      <audio
        ref={audioRef}
        src="/varoon-forever.mp3"
        preload="metadata"
        loop
      />

      {/* PERMANENT ROOT YOUTUBE IFRAME CONTAINER */}
      <div
        style={{
          position: 'fixed',
          top: showVideoModal ? '50%' : '-9999px',
          left: showVideoModal ? '50%' : '-9999px',
          transform: showVideoModal ? 'translate(-50%, -50%)' : 'none',
          width: showVideoModal ? 'min(92vw, 560px)' : '200px',
          height: showVideoModal ? 'min(56vw, 315px)' : '200px',
          zIndex: showVideoModal ? 60 : -999,
          opacity: showVideoModal ? 1 : 0.001,
          pointerEvents: showVideoModal ? 'auto' : 'none',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: showVideoModal ? '0 25px 50px -12px rgba(0, 0, 0, 0.55)' : 'none',
          transition: 'opacity 0.25s ease',
          backgroundColor: '#000',
        }}
      >
        <div id="youtube-player-iframe" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Video Modal Backdrop */}
      {showVideoModal && (
        <div
          onClick={() => setShowVideoModal(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn"
        >
          <button
            onClick={() => setShowVideoModal(false)}
            aria-label="Close clip preview"
            className="absolute top-6 right-6 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all cursor-pointer shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* 1. DEDICATED FIRST SCREEN: Beautiful Welcome Page (Shown immediately on website start) */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-700 ease-out ${
          hasEntered
            ? 'opacity-0 scale-105 pointer-events-none -translate-y-full'
            : 'opacity-100 scale-100 translate-y-0'
        }`}
      >
        <WelcomeScreen
          onOpen={handleOpenSurprise}
          onStartAudio={startAudioOnce}
        />
      </div>

      {/* 2. Top Navbar (Available once entered, with option to replay welcome screen) */}
      <Navbar
        isPlaying={audioState.isPlaying}
        isMuted={audioState.isMuted}
        onTogglePlay={handleTogglePlay}
        onToggleMute={handleToggleMute}
        onReplayWelcome={() => setHasEntered(false)}
      />

      {/* 3. Emotional Progression & Delightful Birthday Content */}
      <main className="flex-1 relative z-10 pb-16">
        {/* Hero Birthday Introduction with Countdown Timer */}
        <HeroSection />

        {/* Interactive Birthday Cake with Blowable Candles */}
        <BirthdayCake />

        {/* Personal Birthday Message */}
        <PersonalMessage />

        {/* Real Interactive Letter with Live Handwriting */}
        <LetterSection />

        {/* Pop The Birthday Balloons Mini-Game */}
        <div id="balloons">
          <BalloonPopSection />
        </div>

        {/* Scratch To Reveal Secret Message Card */}
        <div id="scratch">
          <ScratchCardSection />
        </div>

        {/* Make 3 Wishes Starlight Fountain */}
        <div id="wishes">
          <WishingWell />
        </div>

        {/* Photo Memory Gallery (Polaroid, Scrapbook, Cinematic) */}
        <PhotoSection />

        {/* Bestie Journey & Friendship Milestones */}
        <div id="milestones">
          <FriendshipMilestones />
        </div>

        {/* Why Sadaf Is Special */}
        <WhySpecialSection />

        {/* Interactive Heart */}
        <InteractiveHeart />

        {/* Birthday Date Section */}
        <DateSection />

        {/* Cinematic Finale Surprise */}
        <FinalSurprise />
      </main>

      {/* Floating Mini Music Player with Continuous Play & Watch Clip Support */}
      <MusicPlayer
        audioState={audioState}
        onTogglePlay={handleTogglePlay}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
        onToggleMute={handleToggleMute}
        onRestart={handleRestart}
        isYouTubeActive={isYouTubeActive}
        showVideo={showVideoModal}
        onToggleVideo={() => setShowVideoModal(!showVideoModal)}
      />

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}
