import { Dispatch } from 'react';
import { FgoContext, AcceptedActions} from "../contexts";
import { StateType } from "../types/contexts";

type ProviderProps = {
    state: StateType;
    dispatch: Dispatch<AcceptedActions>;
    children: React.ReactNode;
  };

const MockFgoProvider: React.FC<ProviderProps> = ({ state, dispatch, children }: ProviderProps) => {
    return (
      <FgoContext.Provider value={{ state, dispatch }}>
        {children}
      </FgoContext.Provider>
    );
  };

  export default MockFgoProvider;