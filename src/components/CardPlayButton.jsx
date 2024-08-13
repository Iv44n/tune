import { useMusicStore } from "../store/musicStore";

function CardPlayButton({ songId, typePlaylist, isNormalButton = true }) {
    const {
        isPlaying,
        setIsPlaying,
        playingMusic,
        setIsLoading,
        fetchSong
    } = useMusicStore();

    const isPlayingSong =
        isPlaying &&
        playingMusic?.typePlaylist === typePlaylist &&
        playingMusic?.id === songId;

    const playNewSong = async () => {
        setIsLoading(true);
        setIsPlaying(false);

        await fetchSong({
            lib: typePlaylist,
            id: songId,
        });

        setIsPlaying(true);
        setIsLoading(false);
    };

    const handleClick = () => {
        if (
            playingMusic?.id === songId &&
            playingMusic.typePlaylist === typePlaylist
        ) {
            setIsPlaying(!isPlaying);
            return;
        }
        playNewSong();
    };

    const classBut = isPlayingSong ? "text-blue-600" : "text-slate-950/75";

    return isNormalButton ? (
        <button
            onClick={handleClick}
            className={`${classBut} text-2xl cursor-pointer`}
        >
            <span>
                <i
                    className={isPlayingSong ? "ri-pause-line" : "ri-play-line"}
                ></i>
            </span>
        </button>
    ) : (
        <button
            className="absolute text-blue-600 text-7xl bottom-16 right-2 opacity-0 group-hover:opacity-100 transition-all duration-500"
            onClick={handleClick}
        >
            {isPlayingSong ? (
                <i className="ri-pause-circle-fill onplay"></i>
            ) : (
                <i className="ri-play-circle-fill onplay"></i>
            )}
        </button>
    );
}

export default CardPlayButton;
