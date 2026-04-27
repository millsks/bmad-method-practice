import React from 'react'
import { Container, Typography, Box } from '@mui/material'
import TieredHabitCreatePanel from './features/tiered-completion/TieredHabitCreatePanel'

/**
 * Root component for HabitFlow application
 */
function App(): React.ReactElement {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          HabitFlow
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Recovery-first habit tracking for better continuity
        </Typography>
      </Box>
      <TieredHabitCreatePanel />
    </Container>
  )
}

export default App
