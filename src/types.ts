export interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  subcaption?: string;
}

export interface AudioState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoaded?: boolean;
  songTitle?: string;
}
