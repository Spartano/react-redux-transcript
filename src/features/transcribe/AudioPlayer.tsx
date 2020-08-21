import { AppBar, Box, Button, IconButton, makeStyles, Theme, Toolbar } from "@material-ui/core";
import CallMadeIcon from "@material-ui/icons/CallMade";
import Forward10Icon from "@material-ui/icons/Forward10";
import Replay10Icon from "@material-ui/icons/Replay10";
import Audio from "components/Audio";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayIcons from "./audioPlayer/PlayIcons";
import VolumeIcons from "./audioPlayer/VolumeIcons";
import VolumeSpeedMenu from "./audioPlayer/VolumeSpeedMenu";

import {
  selectAudioPlaybackRate,
  selectAudioPlaying,
  selectAudioVolume,
  setAudioCurrentTime,
  setAudioDuration,
  storeAudioRef,
} from "./transcribeSlice";

const track =
  "https://zenprospect-production.s3.amazonaws.com/uploads/phone_call/uploaded_content/59e106639d79684277df770d.wav";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    background: "#eff3f6",
  },
}));

export default function AudioPlayer() {
  const classes = useStyles();

  const isPlaying = useSelector(selectAudioPlaying);

  const volume = useSelector(selectAudioVolume);
  const playbackRate = useSelector(selectAudioPlaybackRate);

  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /**
   * When audio DOM instance mounts store its ref inside extra obj using middleware helper
   */
  useEffect(() => {
    if (!audioRef.current) return;

    dispatch(storeAudioRef(audioRef.current));
  }, [audioRef]);

  /**
   * When audio states change, update the audio DOM instance.
   */
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [audioRef, isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume;
  }, [audioRef, volume]);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.playbackRate = playbackRate;
  }, [audioRef, playbackRate]);

  const handleDuration = (e) => {
    dispatch(setAudioDuration(e.target.duration));
  };

  const handleTimeForward = (e) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime += 10;
    //action used for re-rendering time watchers
    dispatch(setAudioCurrentTime(audioRef.current.currentTime));
  };

  const handleTimeBackward = (e) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime -= 10;
    //action used for re-rendering time watchers
    dispatch(setAudioCurrentTime(audioRef.current.currentTime));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" classes={{ root: classes.appbar }} elevation={0}>
        <Toolbar>
          <IconButton onClick={handleTimeBackward}>
            <Replay10Icon fontSize="small" />
          </IconButton>

          <PlayIcons />

          <IconButton onClick={handleTimeForward}>
            <Forward10Icon fontSize="small" />
          </IconButton>

          <VolumeSpeedMenu />

          <VolumeIcons />

          <Box flexGrow={1} />
          <Button variant="contained" color="primary" startIcon={<CallMadeIcon />}>
            Share
          </Button>
        </Toolbar>
      </AppBar>

      <Audio track={track} ref={audioRef} onLoadedMetadata={handleDuration} />
    </div>
  );
}
