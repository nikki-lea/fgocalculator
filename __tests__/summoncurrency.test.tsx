import { render, fireEvent, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import SummonCurrency from '../pages'
import {
  initialState,
  SET_CURRENT_SQ,
  SET_CURRENT_TICKETS,
  SET_START_DATE,
  SET_END_DATE,
  SET_QUEST_SQ,
  SET_CUMULATIVE_LOGINS_DATA,
  SET_MONTHLY_SHOP_TICKETS,
  SET_EVENT_SQ,
  HANDLE_FORM_SUBMIT,
  SET_FORM_ERRORS,
  reducer,
  AcceptedActions,
  formatDatePayload,
  ADD_EXCLUDE_OPTION,
  ExcludeOptions,
  REMOVE_EXCLUDE_OPTION
} from '../contexts';
import English from '../i18n/en/translation.json';
import MockFgoProvider from '../data/mockProvider';

const renderWithProvider = (mockDispatch: jest.Mock) => (
  render(
  <MockFgoProvider
    state={initialState}
    dispatch={mockDispatch}
    >
      <SummonCurrency />
  </MockFgoProvider>
  )
)

jest.mock('react-i18next', () => ({
    useTranslation: () => {
      return {
        t: () => {}
      };
    },
  }));

describe('SummonCurrency', () => {
  const basicSetterValues = [
    ["currentsq", 23, SET_CURRENT_SQ],
    ["currentticket", 10, SET_CURRENT_TICKETS],
    ["savingsstart", "2022-08-15", SET_START_DATE],
    ["savingsend", "2022-12-10", SET_END_DATE],
    ["quest", 12, SET_QUEST_SQ],
    ["cumulative", 331, SET_CUMULATIVE_LOGINS_DATA],
    ["shopticket", 5, SET_MONTHLY_SHOP_TICKETS],
    ["event", 120, SET_EVENT_SQ]
  ]

  it('renders a total of 10 fields and headers', () => {
    render(<SummonCurrency />);
    expect(document.querySelectorAll("#outlined-basic").length).toBe(8);
    expect(document.querySelectorAll("h1").length).toBe(2);
    cleanup();
  })

  it('emits dispatch events to set values to state', () => {
    basicSetterValues.forEach((item) => {
      let dispatchSpy = jest.fn();
      const { getByTestId } = renderWithProvider(dispatchSpy);
      fireEvent.change(getByTestId(item[0]), {target: {value: item[1]}})
      expect(dispatchSpy).toHaveBeenLastCalledWith(({type: item[2], payload: item[1] }))
      cleanup();
    })
  })
})