import { makeStyles, Theme } from "@material-ui/core/styles";
import { myRefStore } from "app/refMiddleware";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAudioCurrentTime, selectAudioDuration, selectAudioPlaying } from "./transcribeSlice";
import { convertTime } from "util/timeHelpers";
import { Typography, Box } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    height: 64,
    alignItems: "center",
    paddingLeft: 32,
  },
  container: {
    display: "flex",
    borderRadius: 3,
    backgroundColor: "#eff3f6",
    padding: 4,
  },
}));

export default function AudioDuration() {
  const classes = useStyles();

  const duration = useSelector(selectAudioDuration);
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

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography color="textPrimary">{convertTime(currentTime)}</Typography>
        <Box ml={1} mr={1}>
          <Typography color="textSecondary">/</Typography>
        </Box>
        <Typography color="textSecondary">{convertTime(duration)}</Typography>
      </div>
    </div>
  );
}
