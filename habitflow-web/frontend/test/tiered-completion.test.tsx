import { beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../src/App'
import { resetHabitStore } from '../src/features/tiered-completion/habitsApi'

describe('Story 1.1 tiered habit creation', () => {
  beforeEach(() => {
    resetHabitStore()
  })

  it('creates a habit from add-habit form input and shows it in daily queue', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('Habit name'), {
      target: { value: 'Hydration' },
    })
    fireEvent.change(screen.getByLabelText('Time window'), {
      target: { value: 'Morning' },
    })
    fireEvent.change(screen.getByLabelText('Full target'), {
      target: { value: 'Drink 64oz water' },
    })
    fireEvent.change(screen.getByLabelText('Reduced target'), {
      target: { value: 'Drink 32oz water' },
    })
    fireEvent.change(screen.getByLabelText('Minimum target'), {
      target: { value: 'Drink 8oz water' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Create habit' }))

    expect(screen.getByText('Hydration')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Cadence: daily · Window: Morning · Full: Drink 64oz water · Reduced: Drink 32oz water · Minimum: Drink 8oz water'
      )
    ).toBeInTheDocument()
  })

  it('shows an error when tier values are not distinct', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('Habit name'), {
      target: { value: 'Walk' },
    })
    fireEvent.change(screen.getByLabelText('Time window'), {
      target: { value: 'Evening' },
    })
    fireEvent.change(screen.getByLabelText('Full target'), {
      target: { value: '30 minutes' },
    })
    fireEvent.change(screen.getByLabelText('Reduced target'), {
      target: { value: '15 minutes' },
    })
    fireEvent.change(screen.getByLabelText('Minimum target'), {
      target: { value: '15 minutes' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Create habit' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Tier values must be distinct')
  })

  it('edits an existing habit and keeps prior configuration visible', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('Habit name'), {
      target: { value: 'Hydration' },
    })
    fireEvent.change(screen.getByLabelText('Time window'), {
      target: { value: 'Morning' },
    })
    fireEvent.change(screen.getByLabelText('Full target'), {
      target: { value: 'Drink 64oz water' },
    })
    fireEvent.change(screen.getByLabelText('Reduced target'), {
      target: { value: 'Drink 32oz water' },
    })
    fireEvent.change(screen.getByLabelText('Minimum target'), {
      target: { value: 'Drink 8oz water' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Create habit' }))

    fireEvent.click(screen.getByRole('button', { name: 'Edit habit' }))

    fireEvent.change(screen.getByLabelText('Time window'), {
      target: { value: 'Evening' },
    })
    fireEvent.change(screen.getByLabelText('Full target'), {
      target: { value: 'Drink 80oz water' },
    })
    fireEvent.change(screen.getByLabelText('Reduced target'), {
      target: { value: 'Drink 40oz water' },
    })
    fireEvent.change(screen.getByLabelText('Minimum target'), {
      target: { value: 'Drink 12oz water' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }))

    expect(screen.getByRole('status')).toHaveTextContent('Saved updated habit configuration')
    expect(
      screen.getByText(
        'Cadence: daily · Window: Evening · Full: Drink 80oz water · Reduced: Drink 40oz water · Minimum: Drink 12oz water'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('Previous configurations remain visible')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Version 1: daily · Morning · Full Drink 64oz water · Reduced Drink 32oz water · Minimum Drink 8oz water'
      )
    ).toBeInTheDocument()
  })
})
