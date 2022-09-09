import { useReducer, createContext, Dispatch } from "react";
import {
  createAction,
  createActionPayload,
  ActionsUnion,
  StateType,
  TargetDataType
} from "../types/contexts";
import calcCumulativeLoginSQ from "../utils/calcCumulativeLoginSQ";
import calcDaysDiffData from "../utils/calcDaysDiffData";
import calcShopTicketSQ from "../utils/calcShopTicketSQ";
import { getLocalStorageItem, hasParseableLocalStorageItem, setLocalStorageItem } from "./localStorage";

type ProviderProps = {
  children: React.ReactNode;
};

export const ExcludeOptions = {
  tickets: "TICKETS",
  masterMissions: "MASTER_MISSIONS",
  loginBonuses: "LOGIN_BONUSES"
};

export const TargetOptions = {
  servant: "SERVANT",
  ce: "CE"
};

export const SET_CURRENT_SQ = "SET_CURRENT_SQ";
export const SET_CURRENT_TICKETS = "SET_CURRENT_TICKETS";
export const SET_START_DATE = "SET_START_DATE";
export const SET_END_DATE = "SET_END_DATE";
export const SET_QUEST_SQ = "SET_QUEST_SQ";
export const SET_CUMULATIVE_LOGINS_DATA = "SET_CUMULATIVE_LOGINS_DATA";
export const SET_MONTHLY_SHOP_TICKETS = "SET_MONTHLY_SHOP_TICKETS";
export const SET_EVENT_SQ = "SET_EVENT_SQ";
export const HANDLE_FORM_SUBMIT = "HANDLE_FORM_SUBMIT";
export const SET_FORM_ERRORS = "SET_FORM_ERRORS";
export const ADD_EXCLUDE_OPTION = "ADD_EXCLUDE_OPTION";
export const REMOVE_EXCLUDE_OPTION = "REMOVE_EXCLUDE_OPTION";
export const ADD_TARGET_DATA = "ADD_TARGET_DATA";
export const REMOVE_TARGET_DATA = "REMOVE_TARGET_DATA";

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
  setShopTickets: createActionPayload<typeof SET_MONTHLY_SHOP_TICKETS, number>(
    SET_MONTHLY_SHOP_TICKETS
  ),
  setEventSQ: createActionPayload<typeof SET_EVENT_SQ, number>(SET_EVENT_SQ),
  handleFormSubmit: createAction<typeof HANDLE_FORM_SUBMIT>(HANDLE_FORM_SUBMIT),
  setFormErrors: createActionPayload<typeof SET_FORM_ERRORS, boolean>(
    SET_FORM_ERRORS
  ),
  addExcludeOption: createActionPayload<typeof ADD_EXCLUDE_OPTION, string>(
    ADD_EXCLUDE_OPTION
  ),
  removeExcludeOption: createActionPayload<
    typeof REMOVE_EXCLUDE_OPTION,
    string
  >(REMOVE_EXCLUDE_OPTION),
  addTargetData: createActionPayload<typeof ADD_TARGET_DATA, TargetDataType>(
    ADD_TARGET_DATA
  ),
  removeTargetData: createActionPayload<typeof REMOVE_TARGET_DATA, string>(
    REMOVE_TARGET_DATA
  )
};

export type AcceptedActions = ActionsUnion<typeof AppActions>;


export const initialState = {
  currentSQ: parseInt(getLocalStorageItem("currentSQ") || "0"),
  currentTickets: parseInt(getLocalStorageItem("currentTickets") || "0"),
  startDate: getLocalStorageItem("startDate") || "",
  endDate: getLocalStorageItem("endDate") || "",
  masterMissions: parseInt(getLocalStorageItem("masterMissions") || "0"),
  cumulativeLoginsCount: parseInt(getLocalStorageItem("cumulativeLoginsCount") || "0"),
  cumulativeLoginsSQ: parseInt(getLocalStorageItem("cumulativeLoginsSQ") || "0"),
  dailyLogins: parseInt(getLocalStorageItem("dailyLogins") || "0"),
  monthlyShopTickets: parseInt(getLocalStorageItem("monthlyShopTickets") || "0"),
  questSQ: parseInt(getLocalStorageItem("questSQ") || "0"),
  eventSQ: parseInt(getLocalStorageItem("eventSQ") || "0"),
  formErrors: false,
  totalSQForBanner: parseInt(getLocalStorageItem("totalSQForBanner") || "0"),
  shopTicketSQ: parseInt(getLocalStorageItem("shopTicketSQ") || "0"),
  excludeOptions: hasParseableLocalStorageItem("excludeOptions") ? new Set(JSON.parse(getLocalStorageItem("excludeOptions"))):  new Set(""),
  targetData: hasParseableLocalStorageItem("targetData") ? JSON.parse(getLocalStorageItem("targetData")): [],
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

export const reducer = (
  state: StateType,
  action: AcceptedActions
): StateType => {
  switch (action.type) {
    case SET_CURRENT_SQ:
      setLocalStorageItem("currentSQ", action.payload.toString());
      return {
        ...state,
        currentSQ: action.payload
      };
    case SET_CURRENT_TICKETS:
      setLocalStorageItem("currentTickets", action.payload.toString())
      return {
        ...state,
        currentTickets: action.payload
      };
    case SET_START_DATE:
      const startDateData = formatDatePayload(state, action.payload, true);
      setLocalStorageItem("startDate", action.payload);
      if (startDateData.masterMissions) {
        setLocalStorageItem("masterMissions", startDateData.masterMissions.toString());
        setLocalStorageItem("dailyLogins", startDateData.dailyLogins.toString());
      }
      return {
        ...startDateData
      };
    case SET_END_DATE:
      const endDateData = formatDatePayload(state, action.payload, false);
      setLocalStorageItem("endDate", action.payload);
      if (endDateData.masterMissions) {
        setLocalStorageItem("masterMissions", endDateData.masterMissions.toString());
        setLocalStorageItem("dailyLogins", endDateData.dailyLogins.toString());
      }
      return {
        ...endDateData
      };
    case SET_QUEST_SQ:
      setLocalStorageItem("questSQ", action.payload.toString());
      return {
        ...state,
        questSQ: action.payload
      };

    case SET_CUMULATIVE_LOGINS_DATA:
      setLocalStorageItem("cumulativeLoginsCount", action.payload.toString());
      return {
        ...state,
        cumulativeLoginsCount: action.payload
      };
    case SET_MONTHLY_SHOP_TICKETS:
      setLocalStorageItem("monthlyShopTickets", action.payload.toString());
      return {
        ...state,
        monthlyShopTickets: action.payload
      };
    case SET_EVENT_SQ:
      setLocalStorageItem("eventSQ", action.payload.toString());
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
        (state.excludeOptions?.has(ExcludeOptions.loginBonuses)
          ? 0
          : cumulativeLoginsSQ) +
        state.currentSQ +
        (state.excludeOptions?.has(ExcludeOptions.tickets)
          ? 0
          : 3 * state.currentTickets) +
        (state.excludeOptions?.has(ExcludeOptions.masterMissions)
          ? 0
          : state.masterMissions) +
        (state.excludeOptions?.has(ExcludeOptions.loginBonuses)
          ? 0
          : state.dailyLogins) +
        (state.excludeOptions?.has(ExcludeOptions.tickets) ? 0 : shopTicketSQ) +
        state.questSQ +
        state.eventSQ;
        setLocalStorageItem("cumulativeLoginsSQ", cumulativeLoginsSQ.toString());
        setLocalStorageItem("totalSQForBanner", totalSQForBanner.toString());
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
      case ADD_EXCLUDE_OPTION:
        const setArray= [
          ...Array.from(state.excludeOptions),
          action.payload
        ];
        setLocalStorageItem("excludeOptions", JSON.stringify(setArray));
        return {
          ...state,
          excludeOptions: new Set(setArray)
        };
      case REMOVE_EXCLUDE_OPTION:
        state.excludeOptions.delete(action.payload);
        const setWithoutArray = [...Array.from(state.excludeOptions)];
        setLocalStorageItem("excludeOptions", JSON.stringify(setWithoutArray));
        return {
          ...state,
          excludeOptions: new Set(setWithoutArray)
        };
    case ADD_TARGET_DATA:
      const targetDataCopy = state.targetData ? [...state.targetData, action.payload] : state.targetData;
      setLocalStorageItem("targetData", JSON.stringify(targetDataCopy));
      return {
        ...state,
        targetData: targetDataCopy
      };
    case REMOVE_TARGET_DATA:
      const { targetData } = state;
      const listWithRemoval = targetData.filter(item => item.name !== action.payload);
      setLocalStorageItem("targetData", JSON.stringify(listWithRemoval));
      return {
        ...state,
        targetData: listWithRemoval
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
