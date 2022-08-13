import { useReducer, createContext, Dispatch} from 'react';
import { ActionsType, StateType } from '../types/contexts';

type ProviderProps = {
    children: React.ReactNode;
}

export const Actions = {
    setCurrentSQ: "SET_CURRENT_SQ"
};


const initialState = {
    currentSQ: 0
  };

const FgoContext = createContext<{
    state: StateType;
    dispatch: Dispatch<ActionsType>;
  }>({
    state: initialState,
    dispatch: () => null
});


const reducer = (state: StateType, action: ActionsType): StateType => {
  switch (action.type) {
    case Actions.setCurrentSQ:
      return {
        ...state,
        currentSQ: action.value.currentSQ
      };
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