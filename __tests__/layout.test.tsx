import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Layout from '../pages/components/layout'
import { useRef } from 'react';

jest.mock('next/future/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}));


jest.mock("react-resize-detector", () => ({
  useResizeDetector: () => {return {width: 100, ref: useRef<HTMLDivElement>(null)}},
}));

describe('Layout', () => {
  it('renders a heading and background image', () => {
    render(<Layout><div data-testid="child"/></Layout>)

    const heading = screen.getByText('Fate/Grand Savings');
    const image = screen.getByAltText('FGO SQ Savings Calculator BG Mobile');

    expect(heading).toBeInTheDocument()
    expect(image).toBeInTheDocument()
  })
})