import { Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { myRefStore } from "app/refMiddleware";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  convertTranscriptTime,
  isPhraseInTimeRange,
  isPhraseTextInTimeRange,
} from "util/timeHelpers";
import { selectAudioCurrentTime, selectAudioPlaying, setAudioCurrentTime } from "./transcribeSlice";
import { transcript_text, word_timings } from "./transcripts/test.json";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: 16,
    display: "flex",
    flexDirection: "column",
  },
  phraseContainer: {
    padding: 16,
    marginLeft: 16,
    display: "flex",
    maxWidth: "70%",
  },
  phraseContainerHighlighted: {
    background: "#eff3f6",
  },
  phraseContainerOdd: {
    marginLeft: 64,
  },
  phraseDivider: {
    background: "#bad9f0",
    width: 2,
    marginLeft: 16,
    marginRight: 16,
  },
  phraseDividerOdd: {
    background: theme.palette.divider,
  },
  phraseTextContainer: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  phraseText: {
    marginLeft: 2,
    paddingRight: 2,
    paddingLeft: 2,
    cursor: "pointer",
  },
  phraseTextHighlighted: {
    background: "#bde1fc",
    borderRadius: 2,
  },
}));

export default function Transcript() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [, setTick] = useState(0);

  const isPlaying = useSelector(selectAudioPlaying);
  //re-render if time skipped manualy
  const newCurrentTime = useSelector(selectAudioCurrentTime);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTick((tick) => tick + 1);
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);

  const handleTextClick = (startTime: string) => () => {
    if (!myRefStore.audioRef) return;
    const [time] = startTime.split("s");

    myRefStore.audioRef.currentTime = Number(time);

    //action used for re-rendering time watchers if audio is paused
    dispatch(setAudioCurrentTime(Number(time)));
  };

  const currentTime = myRefStore.audioRef?.currentTime || 0;

  return (
    <div className={classes.root}>
      {transcript_text.map((text, i) => {
        const phrase = word_timings[i];
        const firstWord = phrase[0];
        const isOdd = i % 2 !== 0;
        const isPhraseHighlighted = isPhraseInTimeRange(phrase, currentTime);

        const containerClassName = classNames({
          [classes.phraseContainer]: true,
          [classes.phraseContainerOdd]: isOdd,
          [classes.phraseContainerHighlighted]: isPhraseHighlighted,
        });

        const dividerClassName = classNames({
          [classes.phraseDivider]: true,
          [classes.phraseDividerOdd]: isOdd,
        });

        return (
          <div className={containerClassName} key={i}>
            <Typography color={!isOdd ? "primary" : "textPrimary"}>
              {convertTranscriptTime(firstWord.startTime)}
            </Typography>

            <div className={dividerClassName}></div>

            <div className={classes.phraseTextContainer}>
              {phrase.map((text, i) => {
                const isTextHighlighted = isPhraseTextInTimeRange(text, currentTime);
                const phraseTextClassName = classNames({
                  [classes.phraseText]: true,
                  [classes.phraseTextHighlighted]: isTextHighlighted,
                });

                return (
                  <div
                    className={phraseTextClassName}
                    key={i}
                    onClick={handleTextClick(text.startTime)}
                  >
                    <Typography>{text.word}</Typography>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
