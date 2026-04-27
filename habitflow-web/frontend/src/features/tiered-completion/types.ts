export type Cadence = 'daily' | 'flexible'

export interface TierTargets {
  full: string
  reduced: string
  minimum: string
}

export interface Habit {
  id: string
  name: string
  cadence: Cadence
  timeWindow: string
  tiers: TierTargets
  configurationVersion: number
  configurationHistory: HabitConfigurationSnapshot[]
}

export interface HabitCreateInput {
  name: string
  cadence: Cadence
  timeWindow: string
  tiers: TierTargets
}

export interface HabitConfigurationSnapshot {
  name: string
  cadence: Cadence
  timeWindow: string
  tiers: TierTargets
  version: number
}
