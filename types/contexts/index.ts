/*
 * Boilerplate reducer typing lifted from Ryan Desjardins Blog
 */
export interface StateType {
  currentSQ: number;
  currentTickets: number;
  startDate: string;
  endDate: string;
  masterMissions: number;
  questSQ: number;
  cumulativeLoginsCount: number;
  cumulativeLoginsSQ: number;
  dailyLogins: number;
  monthlyShopTickets: number;
  eventSQ: number;
  formErrors: boolean;
  totalSQForBanner: number;
  shopTicketSQ: number;
  excludeOptions: Set<string>;
}

export function createActionPayload<TypeAction, TypePayload>(
  actionType: TypeAction
): (payload: TypePayload) => ActionsWithPayload<TypeAction, TypePayload> {
  return (p: TypePayload): ActionsWithPayload<TypeAction, TypePayload> => {
    return {
      payload: p,
      type: actionType
    };
  };
}

export function createAction<TypeAction>(
  actionType: TypeAction
): () => ActionsWithoutPayload<TypeAction> {
  return (): ActionsWithoutPayload<TypeAction> => {
    return {
      type: actionType
    };
  };
}

export interface ActionsWithPayload<TypeAction, TypePayload> {
  type: TypeAction;
  payload: TypePayload;
}

export interface ActionsWithoutPayload<TypeAction> {
  type: TypeAction;
}

interface ActionCreatorsMapObject {
  [key: string]: (
    ...args: any[]
  ) => ActionsWithPayload<any, any> | ActionsWithoutPayload<any>;
}

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<
  A[keyof A]
>;
