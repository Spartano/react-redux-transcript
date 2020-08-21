import { IconButton } from "@material-ui/core";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pauseAudioPlaying, selectAudioPlaying, startAudioPlaying } from "../transcribeSlice";

function PlayIcons() {
  const isPlaying = useSelector(selectAudioPlaying);

  const dispatch = useDispatch();

  const toggleAudio = () => {
    isPlaying ? dispatch(pauseAudioPlaying()) : dispatch(startAudioPlaying());
  };

  return (
    <>
      {isPlaying ? (
        <IconButton color="primary" onClick={toggleAudio}>
          <PauseCircleFilledIcon fontSize="large" />
        </IconButton>
      ) : (
        <IconButton color="primary" onClick={toggleAudio}>
          <PlayCircleFilledIcon fontSize="large" />
        </IconButton>
      )}
    </>
  );
}

export default memo(PlayIcons);
