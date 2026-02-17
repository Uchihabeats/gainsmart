import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App, { getAIRecommendations } from './App'

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('renders header and tagline', () => {
    render(<App />)
    expect(screen.getByText('GainSmart PH')).toBeInTheDocument()
    expect(screen.getByText(/AI-Powered Weight Gain for the Filipino Budget/)).toBeInTheDocument()
  })

  it('shows daily budget badge', () => {
    render(<App />)
    expect(screen.getByText(/Daily Budget:/)).toBeInTheDocument()
    const budgetBadge = screen.getByText(/Daily Budget:/).closest('.hero')
    expect(budgetBadge).toHaveTextContent('₱350')
  })

  it('renders budget input and calorie presets', () => {
    render(<App />)
    expect(screen.getByText(/Daily Budget \(PHP\)/)).toBeInTheDocument()
    expect(screen.getByText(/Target Calories/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '₱350' })).toBeInTheDocument()
    expect(screen.getAllByRole('spinbutton')).toHaveLength(2)
  })

  it('renders LLM recommendation section', () => {
    render(<App />)
    expect(screen.getByText('Kimi AI Meal Planner')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Generate AI Meal Plan/ })).toBeInTheDocument()
  })

  it('shows today\'s meal plan section', () => {
    render(<App />)
    expect(screen.getByText(/Today's AI-Recommended Meal Plan/)).toBeInTheDocument()
  })

  it('displays meal cards from initial plan', () => {
    render(<App />)
    const markButtons = screen.getAllByRole('button', { name: /Mark as Eaten/ })
    expect(markButtons.length).toBeGreaterThanOrEqual(1)
  })

  it('generates AI meal plan when button clicked', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    render(<App />)
    const generateBtn = screen.getByRole('button', { name: /Generate AI Meal Plan/ })
    await user.click(generateBtn)
    expect(screen.getByText(/Kimi AI is analyzing/)).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText(/AI Analysis/)).toBeInTheDocument()
    }, { timeout: 3000 })
    vi.useFakeTimers()
  })

  it('toggles meal complete when Mark as Eaten clicked', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    render(<App />)
    const markButtons = screen.getAllByRole('button', { name: /Mark as Eaten/ })
    await user.click(markButtons[0])
    expect(screen.getByRole('button', { name: '✓ Completed' })).toBeInTheDocument()
    vi.useFakeTimers()
  })
})

describe('getAIRecommendations', () => {
  it('returns up to 5 foods for a category', () => {
    const result = getAIRecommendations(100, 500, 'breakfast')
    expect(result.length).toBeGreaterThanOrEqual(1)
    expect(result.length).toBeLessThanOrEqual(5)
    result.forEach(food => {
      expect(food.category).toBe('breakfast')
      expect(food).toHaveProperty('valueScore')
      expect(food).toHaveProperty('pricePHP')
    })
  })

  it('returns foods sorted by value when no meal type', () => {
    const result = getAIRecommendations(200, 2000, null)
    expect(result.length).toBeLessThanOrEqual(5)
    for (let i = 1; i < result.length; i++) {
      const prev = result[i - 1].valueScore + result[i - 1].protein * 0.5
      const curr = result[i].valueScore + result[i].protein * 0.5
      expect(curr).toBeLessThanOrEqual(prev)
    }
  })

  it('prefers within-budget items', () => {
    const result = getAIRecommendations(80, 400, 'snack')
    const withinBudget = result.filter(f => f.withinBudget)
    const overBudget = result.filter(f => !f.withinBudget)
    expect(withinBudget.length).toBeGreaterThanOrEqual(0)
    if (withinBudget.length && overBudget.length) {
      expect(withinBudget.every((f, i) => {
        const idx = result.indexOf(f)
        return overBudget.every(o => result.indexOf(o) > idx)
      })).toBe(true)
    }
  })
})
