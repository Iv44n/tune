import { useState } from "react";
import { useMusicStore } from "../store/musicStore";
import { TYPE_PLAYLIST } from "../consts/playlistType";
import CardPlayButton from "./CardPlayButton";

function CardSongPopular({ id, cover, title, artist }) {
    const [like, setLike] = useState(false);
    const classIconHeart = like ? "fill text-red-600" : "line";

    const { isPlaying, playingMusic } = useMusicStore();

    const isPlayingSong =
        isPlaying &&
        playingMusic?.typePlaylist === TYPE_PLAYLIST.SONGS_POPULAR &&
        playingMusic?.id === id;

    const classPlay = isPlayingSong
        ? "bg-white/60 shadow-lg shadow-blue-500/20 "
        : "";

    return (
        <div
            className={`flex justify-between rounded-full px-3 md:px-5 py-3 ${classPlay}`}
        >
            <div className="flex gap-3 items-center flex-1">
                <CardPlayButton
                    songId={id}
                    typePlaylist={TYPE_PLAYLIST.SONGS_POPULAR}
                />

                <article className="flex flex-1 gap-3 items-center">
                    <img
                        src={cover}
                        alt={title}
                        className="rounded-full"
                        loading="lazy"
                        width="48px"
                        height="48px"
                    />
                    <div className="flex-1 overflow-hidden max-w-[200px]">
                        <h3 className="text-base font-medium truncate overflow-hidden">
                            {title}
                        </h3>
                        <p className="text-zinc-500 text-sm truncate overflow-hidden">
                            {artist}
                        </p>
                    </div>
                </article>
            </div>

            <div className="flex gap-3 items-center w-14">
                <span>3:41</span>
                <span onClick={() => setLike(!like)} className="text-lg">
                    <i className={`ri-heart-2-${classIconHeart}`}></i>
                </span>
            </div>
        </div>
    );
}

export default CardSongPopular;
