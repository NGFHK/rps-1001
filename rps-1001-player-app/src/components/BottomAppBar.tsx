import { AppBar, Box, Typography } from '@mui/material'

function BottomAppBar() {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Box display="flex" justifyContent="center" sx={{ p: .5 }}>
        <Typography>
          本網站與LIHKG.com無關，所有內容僅代表作者個人立場。
          🐻🐻🐻
        </Typography>
      </Box>
    </AppBar>
  )
}

export default BottomAppBar
