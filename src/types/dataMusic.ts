export interface SongBase {
    cover: string;
    title: string;
    artist: string;
    audio: string;
}

export interface Song extends SongBase {
    id: number;
    typePlaylist?: string;
}

export interface AllSongs extends SongBase {
    isTop?: boolean;
    isPopular?: boolean;
}

export interface Albums {
    id: number;
    title: string;
    cover: string;
    artist: string;
    year: number;
    songNumber: number;
}
