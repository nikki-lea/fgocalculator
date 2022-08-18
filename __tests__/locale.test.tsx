import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Locale from '../pages/components/locale'
import English from '../i18n/en/translation.json';

const translations = English.common;

const changeLanguageMock = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => translations[str as keyof typeof translations],
      i18n: {
        language: 'en',
        changeLanguage: changeLanguageMock
      }
    };
  },
}));

describe('Locale', () => {
  it('renders flag and language', () => {
    render(<Locale />);

    const lang = screen.getByText('EN');
    const flag = screen.getByAltText('en');

    expect(lang).toBeInTheDocument()
    expect(flag).toBeInTheDocument()
  });

  it('changes the language on click', () => {
    render(<Locale />);
    fireEvent.click(screen.getByText('EN'));
    expect(changeLanguageMock).toHaveBeenCalledTimes(1);
  })
})