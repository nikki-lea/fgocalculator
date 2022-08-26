import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Layout from '../pages/components/layout'
import English from '../i18n/en/translation.json';

const translations = English.common;

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => translations[str as keyof typeof translations],
      i18n: {
        language: 'en'
      }
    };
  },
}));

describe('Layout', () => {
  it('renders a heading and background image', () => {
    render(<Layout><div data-testid="child"/></Layout>)

    const heading = screen.getByText('Fate Grand Order Probability Calculator');
    const image = screen.getByAltText('Cute Ereshkigal Background');

    expect(heading).toBeInTheDocument()
    expect(image).toBeInTheDocument()
  })
})