import { useReducer, createContext, Dispatch } from "react";
import {
  createAction,
  createActionPayload,
  ActionsUnion,
  StateType
} from "../types/contexts";
import calcCumulativeLoginSQ from "../utils/calcCumulativeLoginSQ";
import calcDaysDiffData from "../utils/calcDaysDiffData";
import calcShopTicketSQ from "../utils/calcShopTicketSQ";

type ProviderProps = {
  children: React.ReactNode;
};

export const SET_CURRENT_SQ = "SET_CURRENT_SQ";
export const SET_CURRENT_TICKETS = "SET_CURRENT_TICKETS";
export const SET_START_DATE = "SET_START_DATE";
export const SET_END_DATE = "SET_END_DATE";
export const SET_QUEST_SQ = "SET_QUEST_SQ";
export const REMOVE_TICKETS_FROM_SQ = "REMOVE_TICKETS_FROM_SQ";
export const SET_CUMULATIVE_LOGINS_DATA = "SET_CUMULATIVE_LOGINS_DATA";
export const SET_MONTHLY_SHOP_TICKETS = "SET_MONTHLY_SHOP_TICKETS";
export const SET_EVENT_SQ = "SET_EVENT_SQ";
export const HANDLE_FORM_SUBMIT = "HANDLE_FORM_SUBMIT";
export const SET_FORM_ERRORS = "SET_FORM_ERRORS";

export const AppActions = {
  setCurrentSQ: createActionPayload<typeof SET_CURRENT_SQ, number>(
    SET_CURRENT_SQ
  ),
  setTicketSQ: createActionPayload<typeof SET_CURRENT_TICKETS, number>(
    SET_CURRENT_TICKETS
  ),
  setStartDate: createActionPayload<typeof SET_START_DATE, string>(
    SET_START_DATE
  ),
  setEndDate: createActionPayload<typeof SET_END_DATE, string>(SET_END_DATE),
  setQuestSQ: createActionPayload<typeof SET_QUEST_SQ, number>(SET_QUEST_SQ),
  setCumulativeLoginsData: createActionPayload<
    typeof SET_CUMULATIVE_LOGINS_DATA,
    number
  >(SET_CUMULATIVE_LOGINS_DATA),
  removeTicketsFromSQ: createActionPayload<
    typeof REMOVE_TICKETS_FROM_SQ,
    boolean
  >(REMOVE_TICKETS_FROM_SQ),
  setShopTickets: createActionPayload<typeof SET_MONTHLY_SHOP_TICKETS, number>(
    SET_MONTHLY_SHOP_TICKETS
  ),
  setEventSQ: createActionPayload<typeof SET_EVENT_SQ, number>(SET_EVENT_SQ),
  handleFormSubmit: createAction<typeof HANDLE_FORM_SUBMIT>(HANDLE_FORM_SUBMIT),
  setFormErrors: createActionPayload<typeof SET_FORM_ERRORS, boolean>(
    SET_FORM_ERRORS
  )
};

export type AcceptedActions = ActionsUnion<typeof AppActions>;

export const initialState = {
  currentSQ: 0,
  currentTickets: 0,
  startDate: "",
  endDate: "",
  masterMissions: 0,
  cumulativeLoginsCount: 0,
  cumulativeLoginsSQ: 0,
  dailyLogins: 0,
  monthlyShopTickets: 0,
  questSQ: 0,
  eventSQ: 0,
  removeTicketsFromSQ: false,
  formErrors: false,
  totalSQForBanner: 0,
  shopTicketSQ: 0
};

const FgoContext = createContext<{
  state: StateType;
  dispatch: Dispatch<AcceptedActions>;
}>({
  state: initialState,
  dispatch: () => null
});

// Formats payload to include date based calculations like daily login SQ and mission SQ
export const formatDatePayload = (
  state: StateType,
  date: string,
  isStartDate: boolean
) => {
  let updatedState = isStartDate
    ? {
        ...state,
        startDate: date
      }
    : {
        ...state,
        endDate: date
      };

  if ((isStartDate && state.endDate) || (!isStartDate && state.startDate)) {
    return {
      ...updatedState,
      ...calcDaysDiffData({
        startDate: updatedState.startDate,
        endDate: updatedState.endDate
      })
    };
  } else {
    return updatedState;
  }
};

export const reducer = (state: StateType, action: AcceptedActions): StateType => {
  switch (action.type) {
    case SET_CURRENT_SQ:
      return {
        ...state,
        currentSQ: action.payload
      };
    case SET_CURRENT_TICKETS:
      return {
        ...state,
        currentTickets: action.payload
      };
    case SET_START_DATE:
      return {
        ...formatDatePayload(state, action.payload, true)
      };
    case SET_END_DATE:
      return {
        ...formatDatePayload(state, action.payload, false)
      };
    case SET_QUEST_SQ:
      return {
        ...state,
        questSQ: action.payload
      };
    case REMOVE_TICKETS_FROM_SQ:
      return {
        ...state,
        removeTicketsFromSQ: action.payload
      };
    case SET_CUMULATIVE_LOGINS_DATA:
      return {
        ...state,
        cumulativeLoginsCount: action.payload
      };
    case SET_MONTHLY_SHOP_TICKETS:
      return {
        ...state,
        monthlyShopTickets: action.payload
      };
    case SET_EVENT_SQ:
      return {
        ...state,
        eventSQ: action.payload
      };

    case HANDLE_FORM_SUBMIT:
      const cumulativeLoginsSQ = calcCumulativeLoginSQ(
        state.cumulativeLoginsCount,
        state.dailyLogins
      );
      const shopTicketSQ = calcShopTicketSQ({
        startDate: state.startDate,
        endDate: state.endDate,
        monthlyShopTickets: state.monthlyShopTickets
      });
      const totalSQForBanner =
        cumulativeLoginsSQ +
        state.currentSQ +
        (state.removeTicketsFromSQ ? 0 : 3 * state.currentTickets) +
        state.masterMissions +
        state.dailyLogins +
        (state.removeTicketsFromSQ ? 0 : shopTicketSQ) +
        state.questSQ +
        state.eventSQ;
      return {
        ...state,
        cumulativeLoginsSQ,
        totalSQForBanner
      };
    case SET_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    default:
      return state;
  }
};

const FgoProvider: React.FC<ProviderProps> = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FgoContext.Provider value={{ state, dispatch }}>
      {children}
    </FgoContext.Provider>
  );
};

export { FgoContext, FgoProvider };
