import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MealPlan from './MealPlan'

const mockFoods = [
  { id: 1, name: 'Tapsilog', category: 'breakfast', pricePHP: 120 },
  { id: 2, name: 'Adobo', category: 'lunch', pricePHP: 110 },
  { id: 3, name: 'Bistek', category: 'dinner', pricePHP: 160 },
  { id: 4, name: 'Taho', category: 'snack', pricePHP: 30 }
]

describe('MealPlan', () => {
  it('renders section title and toggle button', () => {
    render(<MealPlan foods={mockFoods} dailyBudget={350} />)
    expect(screen.getByText(/Filipino Food Database/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /View All 4 Foods/ })).toBeInTheDocument()
  })

  it('expands and shows filters when toggle clicked', async () => {
    const user = userEvent.setup()
    render(<MealPlan foods={mockFoods} dailyBudget={350} />)
    await user.click(screen.getByRole('button', { name: /View All 4 Foods/ }))
    expect(screen.getByText('Meal Type:')).toBeInTheDocument()
    expect(screen.getByText('Price Range:')).toBeInTheDocument()
  })

  it('shows category filter buttons when expanded', async () => {
    const user = userEvent.setup()
    render(<MealPlan foods={mockFoods} dailyBudget={350} />)
    await user.click(screen.getByRole('button', { name: /View All 4 Foods/ }))
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Breakfast' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Lunch' })).toBeInTheDocument()
  })
})
