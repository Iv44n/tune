import { useEffect, useState, useRef } from "react";
import { useMusicStore } from "../store/musicStore";
import {
    Loading,
    Pause,
    Play,
    PlayTrackNext,
    PlayTrackPrev,
} from "./PlayButtons";
import SongControl from "./SongControl";
import { TYPE_PLAYLIST } from "../consts/playlistType";

export default function Player() {
    const [drop, setDrop] = useState(false);
    const {
        isPlaying,
        setIsPlaying,
        playingMusic,
        isLoading,
        setIsLoading,
        fetchSong
    } = useMusicStore();

    const { cover, title, artist, audio, playlistLenght } = playingMusic || {};
    const audioRef = useRef(null);

    useEffect(() => {
        fetchSong({
            lib: TYPE_PLAYLIST.SONGS_TOP,
            id: 1,
        });
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            isPlaying ? audioRef.current.play() : audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current && audio !== audioRef.current.src) {
            audioRef.current.src = audio;
            isPlaying ? audioRef.current.play() : audioRef.current.pause();
        }
    }, [audio]);

    const handleClick = () => setIsPlaying(!isPlaying);

    const fetchNextSong = async (offset) => {
        setIsLoading(true);
        setIsPlaying(false);

        const returnId = () => {
            if (offset === -1) {
                return playingMusic.id === 1
                    ? playlistLenght
                    : playingMusic.id - 1;
            } else {
                return playingMusic.id === playlistLenght
                    ? 1
                    : playingMusic.id + 1;
            }
        };
        const id = returnId();

        await fetchSong({
            lib: playingMusic.typePlaylist,
            id,
        });
        setIsPlaying(true);
        setIsLoading(false);
    };

     return (
        <footer
            className={`
            flex gap-4 fixed bottom-0 w-full md:px-10 bg-[#FFFFFF] shadow-2xl shadow-blue-950 justify-between items-center
            ${drop ? "h-area flex-col p-0" : "p-4"}`}
        >
            <MobilePlayer
                cover={cover}
                title={title}
                artist={artist}
                drop={drop}
                setDrop={setDrop}
            />
            <div
                className={`
                flex gap-5 items-center justify-between relative
                ${drop && "flex-col px-5 w-full"}`}
            >
                <div
                    className={`
                    text-4xl grid gap-4 place-content-center grid-flow-col w-fit
                    ${drop && "pl-2 bottom-8 absolute z-50"}
                `}
                >
                    <button onClick={() => fetchNextSong(-1)}>
                        <PlayTrackPrev />
                    </button>

                    <button
                        className="text-black cursor-pointer w-9 h-9"
                        onClick={handleClick}
                    >
                        {isLoading ? (
                            <Loading />
                        ) : isPlaying ? (
                            <Play />
                        ) : (
                            <Pause />
                        )}
                    </button>

                    <button onClick={() => fetchNextSong(1)}>
                        <PlayTrackNext />
                    </button>

                    <audio
                        ref={audioRef}
                        preload="auto"
                        onEnded={() => fetchNextSong(1)}
                    ></audio>
                </div>

                <div
                    className={`md:flex gap-10 ${
                        drop ? "block w-full" : "hidden"
                    }`}
                >
                    <SongControl audio={audioRef} drop={drop} />
                </div>
            </div>

            <button
                onClick={() => setDrop(!drop)}
                className={`md:hidden text-xl rounded-full h-5 w-5 flex text-white bg-blue-600 items-center absolute bottom-[70px] right-6 ${
                    drop && "hidden"
                }`}
            >
                <i className="ri-arrow-up-s-line"></i>
            </button>
        </footer>
    );
}

function MobilePlayer({ cover, title, artist, drop, setDrop }) {
    const [like, setLike] = useState(false);
    const classIconHeart = like ? "fill text-red-600" : "line";

    return (
        <>
            {!drop ? (
                <div className="flex items-center gap-2 w-[250px]">
                    <img
                        src={cover}
                        alt={`${title} - ${artist} - Image`}
                        className="rounded-full w-12 h-12  md:w-14 md:h-14"
                        loading="lazy"
                    />
                    <div className="flex-1 overflow-hidden max-w-[200px]">
                        <h3 className="text-base font-semibold truncate ... overflow-hidden">
                            {title}
                        </h3>
                        <p className="text-zinc-500 text-sm truncate ... overflow-hidden">
                            {artist}
                        </p>
                    </div>
                </div>
            ) : (
                <article className="w-full h-full relative">
                    <div className="bg-cover bg-center bg-no-repeat h-[85%]">
                        <img
                            src={cover}
                            alt={`${title} - ${artist} - Image`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            style={{
                                maskImage:
                                    "linear-gradient(black 90%, transparent)",
                            }}
                        />
                        <button
                            className="absolute top-2 left-4 text-3xl font-medium grid place-content-center text-gray-200 pt-3 transition duration-300 rounded-full"
                            onClick={() => setDrop(!drop)}
                        >
                            <i className="ri-arrow-left-s-line"></i>
                        </button>
                    </div>

                    <div className="w-full flex justify-between items-center px-5 my-5 relative">
                        <div className="max-w-[50%]">
                            <h3 className="text-xl font-semibold truncate ... overflow-hidden">
                                {title}
                            </h3>
                            <p className="text-zinc-500 truncate ... overflow-hidden">
                                {artist}
                            </p>
                        </div>
                        <div
                            onClick={() => setLike(!like)}
                            className="text-3xl"
                        >
                            <i className={`ri-heart-2-${classIconHeart}`}></i>
                        </div>
                    </div>
                </article>
            )}
        </>
    );
}
