import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Layout from '../pages/components/layout'

describe('Layout', () => {
  it('renders a heading and background image', () => {
    render(<Layout><div data-testid="child"/></Layout>)

    const heading = screen.getByText('Fate Grand Order Probability Calculator');
    const image = screen.getByAltText('Cute Ereshkigal Background');

    expect(heading).toBeInTheDocument()
    expect(image).toBeInTheDocument()
  })
})