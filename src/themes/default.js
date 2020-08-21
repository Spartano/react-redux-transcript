const primary = "#1196f4";

export default {
  palette: {
    primary: {
      main: primary,
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
    MuiSelect: {
      icon: {
        color: "#556c86",
      },
    },
  },
};
