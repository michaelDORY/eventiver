import { createTheme } from '@mui/material'

export const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #fff',
        },
      },
    },
  },
})
