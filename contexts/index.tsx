import { useReducer, createContext, Dispatch} from 'react';
import { ActionsType, StateType } from '../types/contexts';
import calcCumulativeLoginSQ from '../utils/calcCumulativeLoginSQ';
import calcDaysDiffData from '../utils/calcDaysDiff';

type ProviderProps = {
    children: React.ReactNode;
}

export const Actions = {
    setCurrentSQ: "SET_CURRENT_SQ",
    setTicketSQ: "SET_TICKET_SQ",
    setStartDate: "SET_START_DATE",
    setEndDate: "SET_END_DATE",
    setQuestSQ: "SET_QUEST_SQ",
    removeTicketsFromSQ: "REMOVE_TICKETS_FROM_SQ",
    setCumulativeLoginsData: "SET_CUMULATIVE_LOGINS_DATA",
    setShopTickets: "SET_SHOP_TICKETS",
    setEventSQ: "SET_EVENT_SQ",
    handleFormSubmit: "HANDLE_FORM_SUBMIT",
    setFormErrors: "SET_FORM_ERRORS"
}


const initialState = {
    currentSQ: 0,
    ticketSQ: 0,
    startDate: "",
    endDate: "",
    masterMissions: 0,
    cumulativeLoginsCount: 0,
    cumulativeLoginsSQ: 0,
    dailyLogins: 0,
    shopTickets: 0,
    questSQ: 0,
    eventSQ: 0,
    removeTicketsFromSQ: false,
    formErrors: false,
    totalSQForBanner: 0
  };

const FgoContext = createContext<{
    state: StateType;
    dispatch: Dispatch<ActionsType>;
  }>({
    state: initialState,
    dispatch: () => null
});


// Formats payload to include date based calculations like daily login SQ and mission SQ
const formatDatePayload = (state: StateType, date: string | undefined, isStartDate: boolean) => {
  let updatedState = isStartDate ? 
  {
    ...state,
    startDate: date
  } : 
  {
    ...state,
    endDate: date
  };
  if ((isStartDate && state.endDate) || (!isStartDate && state.startDate)) {
     return {
      ...updatedState,
      ...calcDaysDiffData({startDate: state.startDate, endDate: state.endDate})
     }
  } else {
    return updatedState;
  }
}


const reducer = (state: StateType, action: ActionsType): StateType => {
  switch (action.type) {
    case Actions.setCurrentSQ:
      return {
        ...state,
        currentSQ: action.value.currentSQ
      };
      case Actions.setStartDate:
        return {
          ...formatDatePayload(state, action.value.startDate, true)
        };
      case Actions.setEndDate:
        return {
          ...formatDatePayload(state, action.value.endDate, false)
        }
      case Actions.setQuestSQ:
        return {
          ...state,
          questSQ: action.value.questSQ
        }
      case Actions.removeTicketsFromSQ:
        return {
          ...state,
          removeTicketsFromSQ: action.value.removeTicketsFromSQ
        }
      case Actions.removeTicketsFromSQ:
        return {
          ...state,
          removeTicketsFromSQ: action.value.removeTicketsFromSQ
        }
      case Actions.setCumulativeLoginsData:
        return {
          ...state,
          cumulativeLoginsCount: action.value.cumulativeLoginsCount
        }
      case Actions.setShopTickets:
        return {
          ...state,
          shopTickets: action.value.shopTickets
        }
      case Actions.setEventSQ:
        return {
          ...state,
          eventSQ: action.value.eventSQ
        }
      case Actions.removeTicketsFromSQ:
        return {
          ...state,
          removeTicketsFromSQ: action.value.removeTicketsFromSQ
        }
      case Actions.handleFormSubmit:
        const cumulativeLoginsSQ = calcCumulativeLoginSQ(state.cumulativeLoginsCount, state.dailyLogins)
        const totalSQForBanner =
          cumulativeLoginsSQ +
          (state.currentSQ ?? 0) +
          (state.removeTicketsFromSQ ? 0) +
          (state.masterMissions ?? 0) +
          (state.ticketSQ ?? 0) +
        return {
          ...state,
          cumulativeLoginsSQ
        }
      case Actions.setFormErrors:
        return {
          ...state,
          formErrors: true
        }
    default:
      return state;
  }
};

const FgoProvider: React.FC<ProviderProps> = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FgoContext.Provider value={{state, dispatch}}>
      {children}
    </FgoContext.Provider>
  )
}

export { FgoContext, FgoProvider };