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
    },
  },
});
