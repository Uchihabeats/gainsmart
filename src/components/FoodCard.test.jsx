import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FoodCard from './FoodCard'

const mockFood = {
  id: 1,
  name: 'Tapsilog (Beef Tapa + Rice + Egg)',
  calories: 650,
  protein: 32,
  carbs: 68,
  fats: 28,
  image: '🍳',
  category: 'breakfast',
  description: 'Marinated beef tapa with garlic fried rice and sunny-side-up egg',
  pricePHP: 120,
  location: 'Carinderia/Fast Food',
  aiRecommendation: 'High-protein Filipino breakfast staple'
}

describe('FoodCard', () => {
  it('renders food name and description', () => {
    render(<FoodCard food={mockFood} isCompleted={false} onToggle={() => {}} />)
    expect(screen.getByText(mockFood.name)).toBeInTheDocument()
    expect(screen.getByText(mockFood.description)).toBeInTheDocument()
  })

  it('shows calories, protein, carbs, fats', () => {
    render(<FoodCard food={mockFood} isCompleted={false} onToggle={() => {}} />)
    expect(screen.getByText('650')).toBeInTheDocument()
    expect(screen.getByText('32g')).toBeInTheDocument()
    expect(screen.getByText('68g')).toBeInTheDocument()
    expect(screen.getByText('28g')).toBeInTheDocument()
  })

  it('shows price in PHP', () => {
    render(<FoodCard food={mockFood} isCompleted={false} onToggle={() => {}} />)
    expect(screen.getByText('₱120')).toBeInTheDocument()
  })

  it('shows Mark as Eaten when not completed', () => {
    render(<FoodCard food={mockFood} isCompleted={false} onToggle={() => {}} />)
    expect(screen.getByRole('button', { name: /Mark as Eaten/ })).toBeInTheDocument()
  })

  it('shows Completed when completed', () => {
    render(<FoodCard food={mockFood} isCompleted={true} onToggle={() => {}} />)
    expect(screen.getByRole('button', { name: '✓ Completed' })).toBeInTheDocument()
  })

  it('calls onToggle when button clicked', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(<FoodCard food={mockFood} isCompleted={false} onToggle={onToggle} />)
    await user.click(screen.getByRole('button', { name: /Mark as Eaten/ }))
    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it('shows AI recommendation when present', () => {
    render(<FoodCard food={mockFood} isCompleted={false} onToggle={() => {}} />)
    expect(screen.getByText(mockFood.aiRecommendation)).toBeInTheDocument()
  })

  it('shows value score', () => {
    render(<FoodCard food={mockFood} isCompleted={false} onToggle={() => {}} />)
    expect(screen.getByText(/Value Score:/)).toBeInTheDocument()
  })
})
