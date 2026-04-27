import type { Habit, HabitCreateInput } from './types'

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
  }

  habits.push(habit)
  return habit
}

export const getDailyQueue = (): Habit[] => {
  return habits.map((habit) => ({
    ...habit,
    tiers: {
      ...habit.tiers,
    },
  }))
}

export const resetHabitStore = (): void => {
  habits.splice(0, habits.length)
}
