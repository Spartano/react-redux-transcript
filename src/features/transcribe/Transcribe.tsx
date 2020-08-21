import { makeStyles, Theme } from "@material-ui/core";
import React from "react";
import AudioPlayer from "./AudioPlayer";
import Watch from "./Watch";
import AudioDuration from "./AudioDuration";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export function Transcribe() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AudioPlayer />
      <AudioDuration />
      <div>Transcript</div>
    </div>
  );
}
