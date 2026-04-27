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
  Chip,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { createHabit, getDailyQueue, updateHabit } from './habitsApi'
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
  const [saveState, setSaveState] = useState<string>('')
  const [editingHabitId, setEditingHabitId] = useState<string | null>(null)

  const hasQueueItems = useMemo(() => queue.length > 0, [queue.length])

  const updateField = (field: keyof FormState, value: string): void => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setError('')
    setSaveState('Saving…')

    try {
      const input = {
        name: form.name,
        cadence: form.cadence,
        timeWindow: form.timeWindow,
        tiers: {
          full: form.full,
          reduced: form.reduced,
          minimum: form.minimum,
        },
      }

      if (editingHabitId) {
        updateHabit(editingHabitId, input)
        setSaveState('Saved updated habit configuration')
      } else {
        createHabit(input)
        setSaveState('Saved new habit configuration')
      }

      setQueue(getDailyQueue())
      setForm(initialFormState)
      setEditingHabitId(null)
    } catch (submitError) {
      setSaveState('Retry')
      if (submitError instanceof Error) {
        setError(submitError.message)
      } else {
        setError('Unable to create habit')
      }
    }
  }

  const startEditing = (habit: Habit): void => {
    setEditingHabitId(habit.id)
    setError('')
    setSaveState('')
    setForm({
      name: habit.name,
      cadence: habit.cadence,
      timeWindow: habit.timeWindow,
      full: habit.tiers.full,
      reduced: habit.tiers.reduced,
      minimum: habit.tiers.minimum,
    })
  }

  const cancelEditing = (): void => {
    setEditingHabitId(null)
    setForm(initialFormState)
    setError('')
    setSaveState('')
  }

  return (
    <Stack spacing={3}>
      <Card component="section" variant="outlined">
        <CardContent>
          <Typography variant="h2" component="h2" gutterBottom>
            {editingHabitId ? 'Edit Habit' : 'Add Habit'}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {editingHabitId
              ? 'Update cadence, time window, and tier targets without losing visible history.'
              : 'Create a habit with full, reduced, and minimum targets.'}
          </Typography>

          {saveState ? (
            <Alert severity={saveState === 'Retry' ? 'error' : 'success'} sx={{ mb: 2 }} role="status">
              {saveState}
            </Alert>
          ) : null}

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
                <Stack direction="row" spacing={2}>
                  <Button type="submit" variant="contained">
                    {editingHabitId ? 'Save changes' : 'Create habit'}
                  </Button>
                  {editingHabitId ? (
                    <Button type="button" variant="outlined" onClick={cancelEditing}>
                      Cancel edit
                    </Button>
                  ) : null}
                </Stack>
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
                  <Stack spacing={1} sx={{ width: '100%' }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="space-between">
                      <ListItemText
                        primary={habit.name}
                        secondary={`Cadence: ${habit.cadence} · Window: ${habit.timeWindow} · Full: ${habit.tiers.full} · Reduced: ${habit.tiers.reduced} · Minimum: ${habit.tiers.minimum}`}
                      />
                      <Button type="button" variant="text" onClick={() => startEditing(habit)}>
                        Edit habit
                      </Button>
                    </Stack>

                    {habit.configurationHistory.length > 0 ? (
                      <Stack spacing={1} aria-label={`${habit.name} configuration history`}>
                        <Typography variant="caption" color="text.secondary">
                          Previous configurations remain visible
                        </Typography>
                        {habit.configurationHistory.map((snapshot) => (
                          <Chip
                            key={`${habit.id}-history-${snapshot.version}`}
                            label={`Version ${snapshot.version}: ${snapshot.cadence} · ${snapshot.timeWindow} · Full ${snapshot.tiers.full} · Reduced ${snapshot.tiers.reduced} · Minimum ${snapshot.tiers.minimum}`}
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    ) : null}
                  </Stack>
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
