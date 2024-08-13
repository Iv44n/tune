import { useEffect, useState } from "react";

export default function SongControl({ audio, drop }) {
    const [currentTime, setCurrentTime] = useState(0);
    const [volumeIcon, setVolumeIcon] = useState("ri-volume-up-line");

    useEffect(() => {
        audio.current?.addEventListener("timeupdate", audioTimeUpdate);

        return () => {
            audio.current?.removeEventListener("timeupdate", audioTimeUpdate);
        };
    }, []);

    const audioTimeUpdate = () => {
        setCurrentTime(audio.current?.currentTime);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const duration = audio.current?.duration ?? 0;
    const result =
        typeof duration === "number" && !isNaN(duration) ? duration : 0;

    const volumeIcons = {
        down: "ri-volume-down-line",
        up: "ri-volume-up-line",
        mute: "ri-volume-mute-line",
    };

    const handleVolume = (e) => {
        const newVolume = parseInt(e.target.value);

        if (newVolume === 0) {
            setVolumeIcon(volumeIcons.mute);
        } else if (newVolume < 50) {
            setVolumeIcon(volumeIcons.down);
        } else {
            setVolumeIcon(volumeIcons.up);
        }
        audio.current.volume = newVolume / 100;
    };

    return (
        <>
            <div
                className={`
                w-full md:w-[350px] lg:w-[500px] items-center gap-4 flex relative
                ${drop ? "h-[30px] pb-24" : ""}
            `}
            >
                <span className={`w-8 ${drop && "absolute top-4"}`}>
                    {formatTime(currentTime)}
                </span>
                <input
                    type="range"
                    className="h-[5px] w-full appearance-none bg-slate-200 [&::-moz-range-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-[13px] [&::-webkit-slider-thumb]:bg-blue-600/90 [&::-webkit-slider-thumb]:rounded-full rounded-full"
                    value={currentTime}
                    min="0"
                    max={result}
                    onChange={(e) => {
                        const newCurrentTime = e.target.value;
                        audio.current.currentTime = newCurrentTime;
                    }}
                />

                <span className={`w-8 ${drop && "absolute top-4 right-0"}`}>
                    {duration ? formatTime(duration) : "0:00"}
                </span>
            </div>
            <div className="hidden md:flex items-center text-lg">
                <span className="w-5">
                    <i className={volumeIcon}></i>
                </span>
                <input
                    type="range"
                    className="ml-2 h-[5px] appearance-none max-w-20 bg-slate-200 [&::-moz-range-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-[13px] [&::-webkit-slider-thumb]:bg-blue-600/90 [&::-webkit-slider-thumb]:rounded-full rounded-full"
                    max={100}
                    min={0}
                    defaultValue={100}
                    onChange={(e) => handleVolume(e)}
                />
            </div>
        </>
    );
}
