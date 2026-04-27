import type { Habit, HabitConfigurationSnapshot, HabitCreateInput } from './types'

const habits: Habit[] = []

const createId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `habit-${Math.random().toString(36).slice(2, 10)}`
}

const assertDistinctTiers = (input: HabitCreateInput): void => {
  const values = [input.tiers.full.trim(), input.tiers.reduced.trim(), input.tiers.minimum.trim()]
  if (values.some((value) => !value)) {
    throw new Error('All tier values are required')
  }
  if (new Set(values).size !== values.length) {
    throw new Error('Tier values must be distinct')
  }
}

export const createHabit = (input: HabitCreateInput): Habit => {
  if (!input.name.trim()) {
    throw new Error('Habit name is required')
  }
  if (!input.timeWindow.trim()) {
    throw new Error('Time window is required')
  }

  assertDistinctTiers(input)

  const habit: Habit = {
    id: createId(),
    name: input.name.trim(),
    cadence: input.cadence,
    timeWindow: input.timeWindow.trim(),
    tiers: {
      full: input.tiers.full.trim(),
      reduced: input.tiers.reduced.trim(),
      minimum: input.tiers.minimum.trim(),
    },
    configurationVersion: 1,
    configurationHistory: [],
  }

  habits.push(habit)
  return habit
}

export const updateHabit = (habitId: string, input: HabitCreateInput): Habit => {
  if (!habitId.trim()) {
    throw new Error('Habit id is required')
  }
  if (!input.name.trim()) {
    throw new Error('Habit name is required')
  }
  if (!input.timeWindow.trim()) {
    throw new Error('Time window is required')
  }

  assertDistinctTiers(input)

  const habitIndex = habits.findIndex((habit) => habit.id === habitId)

  if (habitIndex === -1) {
    throw new Error('Habit not found')
  }

  const existingHabit = habits[habitIndex]
  const historyEntry: HabitConfigurationSnapshot = {
    name: existingHabit.name,
    cadence: existingHabit.cadence,
    timeWindow: existingHabit.timeWindow,
    tiers: {
      ...existingHabit.tiers,
    },
    version: existingHabit.configurationVersion,
  }

  const updatedHabit: Habit = {
    ...existingHabit,
    name: input.name.trim(),
    cadence: input.cadence,
    timeWindow: input.timeWindow.trim(),
    tiers: {
      full: input.tiers.full.trim(),
      reduced: input.tiers.reduced.trim(),
      minimum: input.tiers.minimum.trim(),
    },
    configurationVersion: existingHabit.configurationVersion + 1,
    configurationHistory: [...existingHabit.configurationHistory, historyEntry],
  }

  habits[habitIndex] = updatedHabit
  return updatedHabit
}

export const getDailyQueue = (): Habit[] => {
  return habits.map((habit) => ({
    ...habit,
    tiers: {
      ...habit.tiers,
    },
    configurationHistory: habit.configurationHistory.map((snapshot) => ({
      ...snapshot,
      tiers: {
        ...snapshot.tiers,
      },
    })),
  }))
}

export const getHabitHistory = (habitId: string): HabitConfigurationSnapshot[] => {
  const habit = habits.find((candidate) => candidate.id === habitId)

  if (!habit) {
    throw new Error('Habit not found')
  }

  return habit.configurationHistory.map((snapshot) => ({
    ...snapshot,
    tiers: {
      ...snapshot.tiers,
    },
  }))
}

export const resetHabitStore = (): void => {
  habits.splice(0, habits.length)
}
