import { AppBar, Box, Typography } from '@mui/material'

function BottomAppBar() {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Box display="flex" justifyContent="center" sx={{ p: .5 }}>
        <Typography>Roarrrrr 🐻</Typography>
      </Box>
    </AppBar>
  )
}

export default BottomAppBar