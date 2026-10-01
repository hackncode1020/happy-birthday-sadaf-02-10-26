import React from 'react';
import { Volume2, VolumeX, Music, Play, Pause, Sparkles } from 'lucide-react';

interface NavbarProps {
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onReplayWelcome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
  onReplayWelcome,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/75 border-b border-pink-100/90 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark & Replay Welcome button */}
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#831843] hover:text-pink-600 transition-colors whitespace-nowrap shrink-0"
          >
            Sadaf&apos;s Day 💗
          </a>

          {onReplayWelcome && (
            <button
              onClick={onReplayWelcome}
              title="Replay Welcome Screen"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-pink-700 bg-pink-100/70 hover:bg-pink-200/90 border border-pink-200 transition-all cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-pink-500" />
              <span>Welcome Page 🎁</span>
            </button>
          )}
        </div>

        {/* Zone 2: Clean navigation links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-pink-900/75">
          <a href="#cake" className="hover:text-pink-600 transition-colors">
            Wish & Cake
          </a>
          <a href="#letter" className="hover:text-pink-600 transition-colors">
            Letter
          </a>
          <a href="#balloons" className="hover:text-pink-600 transition-colors">
            Balloons 🎈
          </a>
          <a href="#scratch" className="hover:text-pink-600 transition-colors">
            Scratch ✨
          </a>
          <a href="#wishes" className="hover:text-pink-600 transition-colors">
            Wishes 🌟
          </a>
          <a href="#memories" className="hover:text-pink-600 transition-colors">
            Memories
          </a>
          <a href="#why-special" className="hover:text-pink-600 transition-colors">
            Why Special
          </a>
        </nav>

        {/* Zone 3: Audio controls & quick actions */}
        <div className="flex items-center gap-2 shrink-0">
          {onReplayWelcome && (
            <button
              onClick={onReplayWelcome}
              title="Replay Welcome Page"
              className="sm:hidden p-1.5 rounded-full text-pink-700 bg-pink-100/80 hover:bg-pink-200 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-pink-500" />
            </button>
          )}

          <button
            onClick={onTogglePlay}
            title={isPlaying ? 'Pause song' : 'Play song'}
            aria-label={isPlaying ? 'Pause Varron Forever' : 'Play Varron Forever'}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-pink-100/90 hover:bg-pink-200 text-[#831843] border border-pink-200/80 transition-all cursor-pointer whitespace-nowrap"
          >
            <Music className={`w-3.5 h-3.5 text-pink-500 ${isPlaying ? 'animate-bounce' : ''}`} />
            <span className="hidden sm:inline">Varron Forever</span>
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-pink-600 text-pink-600" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-pink-600 text-pink-600" />
            )}
          </button>

          <button
            onClick={onToggleMute}
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            className="p-1.5 rounded-full text-pink-600 hover:bg-pink-100/70 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
