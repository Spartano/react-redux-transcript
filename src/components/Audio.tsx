import React, { forwardRef } from "react";

interface Props {
  track: string;
  onLoadedMetadata: (e: any) => void;
  onTimeUpdate?: (e: any) => void;
  onPause?: (e: any) => void;
  onPlay?: (e: any) => void;
}

const Audio = forwardRef(
  ({ track, onLoadedMetadata, onTimeUpdate, onPause, onPlay }: Props, ref: any) => {
    return (
      <audio
        ref={ref}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onPause={onPause}
        onPlay={onPlay}
      >
        <source src={track} />
      </audio>
    );
  }
);

export default Audio;
