const primary = "#1196f4";
const secondary = "#FF5C93";
const warning = "#FFC260";
const success = "#3CD4A0";
const info = "#9013FE";

export default {
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    warning: {
      main: warning,
    },
    success: {
      main: success,
    },
    info: {
      main: info,
    },
  },

  overrides: {
    MuiIconButton: {
      root: {
        color: "#556c86",
        "&:hover": {
          color: primary,
        },
      },
    },
    MuiMenu: {
      paper: {
        boxShadow: "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
      },
    },
    MuiSelect: {
      icon: {
        color: "#556c86",
      },
    },
  },
};
