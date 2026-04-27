import { useMemo, useState, type FormEvent } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { createHabit, getDailyQueue } from './habitsApi'
import type { Cadence, Habit } from './types'

interface FormState {
  name: string
  cadence: Cadence
  timeWindow: string
  full: string
  reduced: string
  minimum: string
}

const initialFormState: FormState = {
  name: '',
  cadence: 'daily',
  timeWindow: '',
  full: '',
  reduced: '',
  minimum: '',
}

function TieredHabitCreatePanel(): JSX.Element {
  const [form, setForm] = useState<FormState>(initialFormState)
  const [queue, setQueue] = useState<Habit[]>(() => getDailyQueue())
  const [error, setError] = useState<string>('')

  const hasQueueItems = useMemo(() => queue.length > 0, [queue.length])

  const updateField = (field: keyof FormState, value: string): void => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setError('')

    try {
      createHabit({
        name: form.name,
        cadence: form.cadence,
        timeWindow: form.timeWindow,
        tiers: {
          full: form.full,
          reduced: form.reduced,
          minimum: form.minimum,
        },
      })
      setQueue(getDailyQueue())
      setForm(initialFormState)
    } catch (submitError) {
      if (submitError instanceof Error) {
        setError(submitError.message)
      } else {
        setError('Unable to create habit')
      }
    }
  }

  return (
    <Stack spacing={3}>
      <Card component="section" variant="outlined">
        <CardContent>
          <Typography variant="h2" component="h2" gutterBottom>
            Add Habit
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Create a habit with full, reduced, and minimum targets.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Habit name"
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Cadence"
                  value={form.cadence}
                  onChange={(event) => updateField('cadence', event.target.value)}
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="flexible">Flexible</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Time window"
                  value={form.timeWindow}
                  onChange={(event) => updateField('timeWindow', event.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Full target"
                  value={form.full}
                  onChange={(event) => updateField('full', event.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Reduced target"
                  value={form.reduced}
                  onChange={(event) => updateField('reduced', event.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Minimum target"
                  value={form.minimum}
                  onChange={(event) => updateField('minimum', event.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained">
                  Create habit
                </Button>
              </Grid>
            </Grid>
          </Box>

          {error ? (
            <Alert severity="error" sx={{ mt: 2 }} role="alert">
              {error}
            </Alert>
          ) : null}
        </CardContent>
      </Card>

      <Card component="section" variant="outlined">
        <CardContent>
          <Typography variant="h2" component="h2" gutterBottom>
            Daily Queue
          </Typography>

          {hasQueueItems ? (
            <List>
              {queue.map((habit) => (
                <ListItem key={habit.id} divider>
                  <ListItemText
                    primary={habit.name}
                    secondary={`Cadence: ${habit.cadence} · Window: ${habit.timeWindow} · Full: ${habit.tiers.full} · Reduced: ${habit.tiers.reduced} · Minimum: ${habit.tiers.minimum}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2">No habits in queue yet.</Typography>
          )}
        </CardContent>
      </Card>
    </Stack>
  )
}

export default TieredHabitCreatePanel
