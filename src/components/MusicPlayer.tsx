import React, { useRef, useState } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Music,
  Tv,
  Sparkles,
  Repeat,
} from 'lucide-react';
import { AudioState } from '../types';

interface MusicPlayerProps {
  audioState: AudioState;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
  onRestart: () => void;
  isYouTubeActive: boolean;
  onToggleVideo: () => void;
  showVideo: boolean;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  audioState,
  onTogglePlay,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onRestart,
  isYouTubeActive,
  onToggleVideo,
  showVideo,
}) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioState.duration) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(ratio * audioState.duration);
  };

  const percent =
    audioState.duration > 0
      ? (audioState.currentTime / audioState.duration) * 100
      : 0;

  return (
    <div
      id="music"
      className="fixed bottom-4 right-4 z-40 max-w-sm w-[calc(100vw-2rem)] sm:w-96 transition-all duration-300"
    >
      <div className="glass-panel-elevated rounded-3xl p-4 sm:p-5 border border-pink-200/90 shadow-2xl shadow-pink-900/15 backdrop-blur-xl">
        {/* Header / Track info */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center shrink-0 shadow-md ${
                audioState.isPlaying ? 'animate-bounce' : ''
              }`}
            >
              <Music className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-serif text-sm sm:text-base font-bold text-[#831843] truncate">
                  ♫ Varron Forever
                </h4>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-pink-100 text-pink-700 whitespace-nowrap">
                  0:15
                </span>
              </div>
              <p className="text-[11px] text-pink-600/80 truncate flex items-center gap-1">
                <span>{isYouTubeActive ? 'YouTube Official' : 'Continuous Play'}</span>
                <span className="text-pink-400">·</span>
                <span className="inline-flex items-center gap-0.5 text-pink-700 font-medium">
                  <Repeat className="w-2.5 h-2.5" /> Loop
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Play/Pause quick mini toggle */}
            <button
              onClick={onTogglePlay}
              aria-label={audioState.isPlaying ? 'Pause' : 'Play'}
              className="p-2.5 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 text-white shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {audioState.isPlaying ? (
                <Pause className="w-4 h-4 fill-white" />
              ) : (
                <Play className="w-4 h-4 fill-white translate-x-0.5" />
              )}
            </button>

            {/* Minimize / Expand Toggle */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              aria-label={isMinimized ? 'Expand player' : 'Minimize player'}
              className="p-1.5 rounded-full text-pink-400 hover:text-pink-600 transition-colors cursor-pointer"
            >
              {isMinimized ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Expanded Controls */}
        {!isMinimized && (
          <div className="mt-4 pt-3 border-t border-pink-100 animate-fadeIn space-y-3">
            {/* Progress Bar */}
            <div className="space-y-1">
              <div
                ref={progressRef}
                onClick={handleProgressBarClick}
                className="relative w-full h-2.5 bg-pink-100/90 rounded-full cursor-pointer overflow-hidden group shadow-inner"
                role="progressbar"
                aria-valuenow={audioState.currentTime}
                aria-valuemin={0}
                aria-valuemax={audioState.duration || 100}
              >
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full transition-all duration-100"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-pink-700/80 font-mono tabular-nums">
                <span>{formatTime(audioState.currentTime)}</span>
                <span>{formatTime(audioState.duration)}</span>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-1">
              {/* Restart button (Restarts from 15s) */}
              <button
                onClick={onRestart}
                title="Restart from 0:15"
                aria-label="Restart audio track from 0:15"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs text-pink-700 bg-pink-50 hover:bg-pink-100/80 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="text-[11px]">0:15</span>
              </button>

              {/* Video toggle */}
              <button
                onClick={onToggleVideo}
                title={showVideo ? 'Hide video' : 'Watch video clip'}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  showVideo
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-pink-100/80 text-pink-700 hover:bg-pink-200'
                }`}
              >
                <Tv className="w-3.5 h-3.5" />
                <span className="text-[11px]">{showVideo ? 'Hide Clip' : 'Watch Clip'}</span>
              </button>

              {/* Volume & Mute */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onToggleMute}
                  aria-label={audioState.isMuted ? 'Unmute' : 'Mute'}
                  className="p-1.5 rounded-full text-pink-600 hover:bg-pink-100/60 transition-colors cursor-pointer"
                >
                  {audioState.isMuted || audioState.volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={audioState.isMuted ? 0 : audioState.volume}
                  onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                  aria-label="Volume slider"
                  className="w-16 accent-pink-500 cursor-pointer hidden sm:block"
                />
              </div>
            </div>

            {/* Continuous Play Tag */}
            <div className="pt-2 border-t border-pink-100 text-center text-[10px] text-pink-600/80 flex items-center justify-center gap-1.5 font-medium">
              <Sparkles className="w-3 h-3 text-pink-400" />
              <span>Continuous Play Enabled · Never Stops</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
