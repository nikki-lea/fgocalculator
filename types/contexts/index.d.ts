import { Actions } from '../../contexts'
  

export interface StateType {
    currentSQ: number
}

export type ActionsType =
 | { type: Actions.setCurrentSQ, value: { currentSQ: number}  }