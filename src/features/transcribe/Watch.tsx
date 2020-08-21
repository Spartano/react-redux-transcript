import { myRefStore } from "app/refMiddleware";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAudioPlaying, selectAudioCurrentTime } from "./transcribeSlice";

export default function Watch() {
  const [, setTick] = useState(0);

  const isPlaying = useSelector(selectAudioPlaying);
  //re-render if time skipped
  const newCurrentTime = useSelector(selectAudioCurrentTime);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTick((tick) => tick + 1);
    }, 700);

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);

  const currentTime = myRefStore.audioRef?.currentTime || 0;
  return <div>{Math.floor(currentTime)}</div>;
}
