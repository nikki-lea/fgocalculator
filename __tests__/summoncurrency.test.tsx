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
  ADD_EXCLUDE_OPTION,
  ExcludeOptions,
} from '../contexts';
import MockStateData from '../data/mockstatedata';
import MockFgoProvider from '../data/mockProvider';
import { StateType } from '../types/contexts';
import copy from '../data/copy';

const renderWithProvider = ({mockDispatch, mockState = initialState} : { mockDispatch: jest.Mock, mockState?: StateType}) => (
  render(
  <MockFgoProvider
    state={mockState}
    dispatch={mockDispatch}
    >
      <SummonCurrency />
  </MockFgoProvider>
  )
)

describe('SummonCurrency', () => {
  const basicSetterValues = [
    ["currentsq", 23, SET_CURRENT_SQ],
    ["currentticket", 10, SET_CURRENT_TICKETS],
    ["savingsstart", "2022-08-15", SET_START_DATE],
    ["savingsend", "2022-12-10", SET_END_DATE],
    ["quest", 12, SET_QUEST_SQ],
    ["cumulative", 331, SET_CUMULATIVE_LOGINS_DATA],
    ["shopticket", 5, SET_MONTHLY_SHOP_TICKETS]
  ]

  it('renders a total of 8 fields', () => {
    render(<SummonCurrency />);
    expect(document.querySelectorAll("#outlined-basic").length).toBe(8);
    cleanup();
  })

  it('emits dispatch events to set values to state', () => {
    basicSetterValues.forEach((item) => {
      let dispatchSpy = jest.fn();
      const { getByTestId } = renderWithProvider({mockDispatch: dispatchSpy});
      fireEvent.change(getByTestId(item[0]), {target: {value: item[1]}})
      expect(dispatchSpy).toHaveBeenCalledWith(({type: item[2], payload: item[1] }))
      cleanup();
    })
  })

  it('add options if checked', () => {
    let dispatchSpy = jest.fn();
    const { getByText} = renderWithProvider({mockState: MockStateData, mockDispatch: dispatchSpy});
    fireEvent.click(getByText(copy["alltickets"]))
    expect(dispatchSpy).toHaveBeenCalledWith(({type: ADD_EXCLUDE_OPTION, payload: ExcludeOptions.tickets}))
  })
})