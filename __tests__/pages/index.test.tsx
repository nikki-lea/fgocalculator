import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import SummonCurrency from '../../pages'

jest.mock('react-i18next', () => ({
    useTranslation: () => {
      return {
        t: () => {}
      };
    },
  }));
  
describe('SummonCurrency', () => {
  it('renders a total of 10 fields and headers', () => {
    render(<SummonCurrency />);
    expect(document.querySelectorAll("#outlined-basic").length).toBe(10);
    expect(document.querySelectorAll("h1").length).toBe(2);
  })
})