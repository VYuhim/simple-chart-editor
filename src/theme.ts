import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  overrides: {
    MuiTabs: {
      root: {
        height: '64px',
      },
      scroller: {
        overflowY: 'hidden',
      },
      scrollButtons: {
        width: '30px',
      },
    },
    MuiTab: {
      wrapper: {
        fontSize: '10px',
      },
      labelIcon: {
        minWidth: 'auto',
      },
      textColorPrimary: {
        '&$selected': {
          color: '#1976d2',
        },
      },
    },
    MuiButton: {
      containedPrimary: {
        backgroundColor: '#1976d2',
        '&:hover': {
          backgroundColor: '#1768ba',
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: 'transparent',
      },
    },
  },
});
