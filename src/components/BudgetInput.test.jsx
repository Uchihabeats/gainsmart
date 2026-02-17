import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BudgetInput from './BudgetInput'

describe('BudgetInput', () => {
  it('renders budget and calorie inputs', () => {
    const setBudget = vi.fn()
    const setTargetCalories = vi.fn()
    render(
      <BudgetInput
        budget={350}
        setBudget={setBudget}
        targetCalories={2500}
        setTargetCalories={setTargetCalories}
      />
    )
    const inputs = screen.getAllByRole('spinbutton')
    expect(inputs).toHaveLength(2)
    expect(screen.getByText(/Daily Budget \(PHP\)/)).toBeInTheDocument()
    expect(screen.getByText(/Target Calories/)).toBeInTheDocument()
  })

  it('displays current budget value', () => {
    render(
      <BudgetInput budget={350} setBudget={() => {}} targetCalories={2500} setTargetCalories={() => {}} />
    )
    const inputs = screen.getAllByRole('spinbutton')
    expect(inputs[0]).toHaveValue(350)
  })

  it('displays current target calories', () => {
    render(
      <BudgetInput budget={350} setBudget={() => {}} targetCalories={2500} setTargetCalories={() => {}} />
    )
    const inputs = screen.getAllByRole('spinbutton')
    expect(inputs[1]).toHaveValue(2500)
  })

  it('calls setBudget when preset clicked', async () => {
    const user = userEvent.setup()
    const setBudget = vi.fn()
    render(
      <BudgetInput budget={350} setBudget={setBudget} targetCalories={2500} setTargetCalories={() => {}} />
    )
    await user.click(screen.getByRole('button', { name: '₱500' }))
    expect(setBudget).toHaveBeenCalledWith(500)
  })

  it('calls setTargetCalories when calorie preset clicked', async () => {
    const user = userEvent.setup()
    const setTargetCalories = vi.fn()
    render(
      <BudgetInput budget={350} setBudget={() => {}} targetCalories={2500} setTargetCalories={setTargetCalories} />
    )
    await user.click(screen.getByRole('button', { name: '3000' }))
    expect(setTargetCalories).toHaveBeenCalledWith(3000)
  })
})
