import '@testing-library/jest-dom';
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
import { StateType } from '../types/contexts';
import MockStateData from '../data/mockstatedata';

describe('reducer', () => {
  const mockActions = [
    {action: {type: SET_CURRENT_SQ, payload: 100}, value: 'currentSQ'},
    {action: {type: SET_CURRENT_TICKETS, payload: 10}, value: 'currentTickets'},
    {action: {type: SET_START_DATE, payload: "2022-10-15"}, value: 'startDate'},
    {action: {type: SET_END_DATE, payload: "2022-10-20"}, value: 'endDate'},
    {action: {type: SET_QUEST_SQ, payload: 120}, value: 'questSQ'},
    {action: {type: SET_CUMULATIVE_LOGINS_DATA, payload: 331}, value: 'cumulativeLoginsCount'},
    {action: {type: SET_MONTHLY_SHOP_TICKETS, payload: 5}, value: 'monthlyShopTickets'},
    {action: {type: SET_EVENT_SQ, payload: 5}, value: 'eventSQ'},
    {action: {type: SET_FORM_ERRORS, payload: true}, value: 'formErrors'}
  ];

  it('sets the correct value to state for each setter action', () => {
    mockActions.forEach(item => {
      const initialStateCopy = {...initialState};
      const result = reducer(initialStateCopy, item.action as AcceptedActions);
      expect(result[item.value as keyof StateType]).toEqual(item.action.payload);
    });
  });
  
  it('adds exclude options', () => {
    const mockStateCopy = {...MockStateData};
    const result = reducer(mockStateCopy as StateType, {type: ADD_EXCLUDE_OPTION, payload: ExcludeOptions.tickets} as AcceptedActions);
    expect(result.excludeOptions.has(ExcludeOptions.tickets)).toBe(true);
  });

  it('removes exclude options', () => {
    const mockStateCopy = {...MockStateData, excludeOptions: new Set([ExcludeOptions.tickets])};
    const result = reducer(mockStateCopy as StateType, {type: REMOVE_EXCLUDE_OPTION, payload: ExcludeOptions.tickets} as AcceptedActions);
    expect(result.excludeOptions.has(ExcludeOptions.tickets)).toBe(false);
  });

  it('sets field values on form submit', () => {
    const mockStateCopy = {...MockStateData, dailyLoginTickets: 12, shopTicketSQ: 15, currentTickets: 10};
    const result = reducer(mockStateCopy as StateType, {type: HANDLE_FORM_SUBMIT} as AcceptedActions);
    expect(result.totalSQForBanner).toEqual(708);
    expect(result.cumulativeLoginsSQ).toEqual(30);
  });

  it('calculates the right amount when tickets are excluded but login bonuses are not', () => {
    const mockStateCopy = {...MockStateData, dailyLoginTickets: 12, shopTicketSQ: 15, currentTickets: 10, excludeOptions: new Set([ExcludeOptions.tickets])};
    const result = reducer(mockStateCopy as StateType, {type: HANDLE_FORM_SUBMIT} as AcceptedActions);
    expect(result.totalSQForBanner).toEqual(642);
    expect(result.cumulativeLoginsSQ).toEqual(30);
  });

  it('calculates the right amount when tickets are excluded', () => {
    const mockStateCopy = {...MockStateData, dailyLoginsTickets: 12, shopTicketSQ: 15, currentTickets: 10, excludeOptions: new Set([ExcludeOptions.tickets])};
    const result = reducer(mockStateCopy as StateType, {type: HANDLE_FORM_SUBMIT} as AcceptedActions);
    expect(result.totalSQForBanner).toEqual(618);
  });

  it('calculates the right amount when login bonuses are excluded', () => {
    const mockStateCopy = {...MockStateData, dailyLoginsTickets: 12, excludeOptions: new Set([ExcludeOptions.loginBonuses])};
    const result = reducer(mockStateCopy as StateType, {type: HANDLE_FORM_SUBMIT} as AcceptedActions);
    expect(result.totalSQForBanner).toEqual(588);
  });

  it('calculates the right amount when master mission bonuses are excluded', () => {
    const mockStateCopy = {...MockStateData, masterMissions: 500, excludeOptions: new Set([ExcludeOptions.masterMissions])};
    const result = reducer(mockStateCopy as StateType, {type: HANDLE_FORM_SUBMIT} as AcceptedActions);
    expect(result.totalSQForBanner).toEqual(618);
  });
});

describe('formatDatePayload', () => {
  it('adds the master mission and total login data if start date is set and an end date exists', () => {
    const mockStateCopy = {...MockStateData, startDate: "", endDate: "2022-11-25"};
    const result = formatDatePayload(mockStateCopy, "2022-08-22", true);
    expect(result.masterMissions).toEqual(41);
    expect(result.dailyLogins).toEqual(95);
    expect(result.startDate).toEqual("2022-08-22");
  });

  it('adds the master mission and total login data if end date is set and a start date exists', () => {
    const mockStateCopy = {...MockStateData, endDate: "", startDate: "2022-08-22"};
    const result = formatDatePayload(mockStateCopy, "2022-11-25", false);
    expect(result.masterMissions).toEqual(41);
    expect(result.dailyLogins).toEqual(95);
    expect(result.endDate).toEqual("2022-11-25");
  });

  it('adds only the start date if the end date is not set', () => {
    const mockStateCopy = {...MockStateData, dailyLogins: 0, endDate: ""};
    const result = formatDatePayload(mockStateCopy, "2022-08-22", true  );
    expect(result.startDate).toEqual("2022-08-22");
    expect(result.masterMissions).toEqual(0);
    expect(result.dailyLogins).toEqual(0);
  });
  
  it('adds only the end date if the start date is not set', () => {
    const mockStateCopy = {...MockStateData, dailyLogins: 0, startDate: ""};
    const result = formatDatePayload(mockStateCopy, "2022-11-25", false);
    expect(result.endDate).toEqual("2022-11-25");
    expect(result.masterMissions).toEqual(0);
    expect(result.dailyLogins).toEqual(0);
  });
});

