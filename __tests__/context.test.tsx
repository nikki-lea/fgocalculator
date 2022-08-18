import '@testing-library/jest-dom';
import {
    initialState,
    SET_CURRENT_SQ,
    SET_CURRENT_TICKETS,
    SET_START_DATE,
    SET_END_DATE,
    SET_QUEST_SQ,
    REMOVE_TICKETS_FROM_SQ,
    SET_CUMULATIVE_LOGINS_DATA,
    SET_MONTHLY_SHOP_TICKETS,
    SET_EVENT_SQ,
    HANDLE_FORM_SUBMIT,
    SET_FORM_ERRORS,
    reducer,
    AcceptedActions
} from '../contexts';
import { StateType } from '../types/contexts';
import MockStateData from './mockstatedata.json';

describe('reducer', () => {
  const mockActions = [
    {action: {type: SET_CURRENT_SQ, payload: 100}, value: 'currentSQ'},
    {action: {type: SET_CURRENT_TICKETS, payload: 10}, value: 'currentTickets'},
    {action: {type: SET_START_DATE, payload: "2022-10-15"}, value: 'startDate'},
    {action: {type: SET_END_DATE, payload: "2022-10-20"}, value: 'endDate'},
    {action: {type: SET_QUEST_SQ, payload: 120}, value: 'questSQ'},
    {action: {type: SET_CUMULATIVE_LOGINS_DATA, payload: 331}, value: 'cumulativeLoginsCount'},
    {action: {type: REMOVE_TICKETS_FROM_SQ, payload: true}, value: 'removeTicketsFromSQ'},
    {action: {type: SET_MONTHLY_SHOP_TICKETS, payload: 5}, value: 'monthlyShopTickets'},
    {action: {type: SET_EVENT_SQ, payload: 5}, value: 'eventSQ'},
    {action: {type: SET_FORM_ERRORS, payload: true}, value: 'formErrors'}
  ];

  it('sets the correct value to state for each setter action', () => {
    mockActions.forEach(item => {
      const initialStateCopy = {...initialState};
      const result = reducer(initialStateCopy, item.action as AcceptedActions);
      expect(result[item.value as keyof StateType] === item.action.payload);
    });
  });

  it('sets field values on form submit', () => {
    const mockStateCopy = {...MockStateData};
    const result = reducer(mockStateCopy as StateType, {type: HANDLE_FORM_SUBMIT} as AcceptedActions);
    expect(result.totalSQForBanner === 588);
    expect(result.cumulativeLoginsSQ === 50);
  });
});
