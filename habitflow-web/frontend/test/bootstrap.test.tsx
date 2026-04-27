import { describe, it, expect } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../src/App.tsx'

describe('Frontend Bootstrap', () => {
  it('renders the HabitFlow application', () => {
    render(<App />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('HabitFlow')
  })

  it('displays the subtitle', () => {
    render(<App />)
    const subtitle = screen.getByText(/Recovery-first habit tracking/i)
    expect(subtitle).toBeInTheDocument()
  })

  it('app component is properly typed', () => {
    // This test verifies that the Component is properly exported
    expect(App).toBeDefined()
    expect(typeof App).toBe('function')
  })
})
