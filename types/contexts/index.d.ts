import { Actions } from '../../contexts'
  

export interface StateType {
    currentSQ?: number,
    ticketSQ?: number,
    startDate?: string,
    endDate?: string,
    masterMissions?: number,
    questSQ?: number,
    cumulativeLoginsCount?: number,
    cumulativeLoginsSQ?: number,
    dailyLogins?: number,
    shopTickets?: number,
    eventSQ?: number,
    removeTicketsFromSQ?: boolean
}


export type ActionsType =
 | { type: Actions.setCurrentSQ, value: StateType}
 | { type: Actions.setTicketSQ, value: StateType}
 | { type: Actions.setStartDate, value: StateType}
 | { type: Actions.setEndDate, value: StateType}
 | { type: Actions.setQuestSQ, value: StateType}
 | { type: Actions.removeTicketsFromSQ, value: StateType}
 | { type: Actions.setCumulativeLoginsData, value: StateType}
 | { type: Actions.setShopTickets, value: StateType}
 | { type: Actions.setEventSQ, value: StateType}