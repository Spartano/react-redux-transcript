import { IconButton } from "@material-ui/core";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAudioVolume, setAudioVolume } from "../transcribeSlice";

function VolumeIcons() {
  const volume = useSelector(selectAudioVolume);
  const dispatch = useDispatch();

  const toggleMute = () => {
    let newVolume = volume ? 0 : 1;
    dispatch(setAudioVolume(newVolume));
  };

  return (
    <>
      {(!volume && (
        <IconButton size="medium" onClick={toggleMute}>
          <VolumeOffIcon fontSize="small" />
        </IconButton>
      )) || (
        <IconButton size="medium" onClick={toggleMute}>
          <VolumeUpIcon fontSize="small" />
        </IconButton>
      )}
    </>
  );
}

export default memo(VolumeIcons);
