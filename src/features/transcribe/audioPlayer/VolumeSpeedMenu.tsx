import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { selectAudioPlaybackRate, setAudioPlaybackRate } from "../transcribeSlice";
import { convertSpeed } from "util/numHelpers";

function VolumeSpeedMenu() {
  const playbackRate = useSelector(selectAudioPlaybackRate);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (newSpeed: 0.5 | 0.75 | 1 | 1.5 | 2) => () => {
    setAnchorEl(null);
    dispatch(setAudioPlaybackRate(newSpeed));
  };

  return (
    <div>
      <Button onClick={handleClick}>{convertSpeed(playbackRate)}</Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem onClick={handleMenuItemClick(0.5)}>0.5x</MenuItem>
        <MenuItem onClick={handleMenuItemClick(0.75)}>0.75x</MenuItem>
        <MenuItem onClick={handleMenuItemClick(1)}>1.0x</MenuItem>
        <MenuItem onClick={handleMenuItemClick(1.5)}>1.5x</MenuItem>
        <MenuItem onClick={handleMenuItemClick(2)}>2.0x</MenuItem>
      </Menu>
    </div>
  );
}

export default memo(VolumeSpeedMenu);
