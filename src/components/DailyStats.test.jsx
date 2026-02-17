import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import DailyStats from './DailyStats'

describe('DailyStats', () => {
  const defaultProps = {
    totalCalories: 2400,
    consumedCalories: 1200,
    totalProtein: 120,
    totalCarbs: 200,
    totalFats: 80,
    completedCount: 2,
    totalMeals: 4,
    totalCost: 400,
    budget: 500
  }

  it('renders calorie progress', () => {
    render(<DailyStats {...defaultProps} />)
    expect(screen.getByText('1200')).toBeInTheDocument()
    expect(screen.getByText('2400')).toBeInTheDocument()
    expect(screen.getByText(/calories/)).toBeInTheDocument()
  })

  it('renders macro stats', () => {
    render(<DailyStats {...defaultProps} />)
    expect(screen.getByText('120g')).toBeInTheDocument()
    expect(screen.getByText('200g')).toBeInTheDocument()
    expect(screen.getByText('80g')).toBeInTheDocument()
    expect(screen.getByText('Protein')).toBeInTheDocument()
    expect(screen.getByText('Carbs')).toBeInTheDocument()
    expect(screen.getByText('Fats')).toBeInTheDocument()
  })

  it('renders budget tracker', () => {
    render(<DailyStats {...defaultProps} />)
    expect(screen.getByText(/Budget Tracker/)).toBeInTheDocument()
    expect(screen.getByText(/₱400 \/ ₱500/)).toBeInTheDocument()
    expect(screen.getByText(/remaining/)).toBeInTheDocument()
  })

  it('renders meals completed', () => {
    render(<DailyStats {...defaultProps} />)
    expect(screen.getByText('Meals Completed')).toBeInTheDocument()
    expect(screen.getByText('2/4')).toBeInTheDocument()
  })

  it('shows over budget when cost exceeds budget', () => {
    render(<DailyStats {...defaultProps} totalCost={600} budget={500} />)
    expect(screen.getByText(/over budget/)).toBeInTheDocument()
  })
})
