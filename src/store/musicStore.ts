import { create } from "zustand";
import type { Song } from "../types/dataMusic";

interface PlayingMusic extends Song {
    typePlaylist: string;
    playlistLenght: number;
}

interface MusicStore {
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    playingMusic: PlayingMusic;
    setPlayingMusic: (playingMusic: PlayingMusic) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const useMusicStore = create<MusicStore>((set) => ({
    isPlaying: false,
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    playingMusic: {
        id: 0,
        title: "",
        artist: "",
        cover: "",
        audio: "",
        typePlaylist: "",
        playlistLenght: 0,
    },
    setPlayingMusic: (playingMusic) => set({ playingMusic }),
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),
}));
