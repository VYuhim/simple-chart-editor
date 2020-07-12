export const CHANGE_CURRENT_LINE = 'CHANGE_CURRENT_LINE';
export const ADD_LINE_ACTION = 'ADD_LINE_ACTION';
export const REMOVE_LINE_ACTION = 'REMOVE_LINE_ACTION';

interface IChangeCurrentLineAction {
  type: typeof CHANGE_CURRENT_LINE;
  id: number | string;
}

export const changeCurrentLineAction = (id: number | string): IChangeCurrentLineAction => ({
  type: CHANGE_CURRENT_LINE,
  id,
});

interface IAddLineAction {
  type: typeof ADD_LINE_ACTION;
}

export const addLineAction = (): IAddLineAction => ({
  type: ADD_LINE_ACTION,
});

interface IRemoveLineAction {
  type: typeof REMOVE_LINE_ACTION;
  id: number | string;
}

export const removeLineAction = (id: number | string): IRemoveLineAction => ({
  type: REMOVE_LINE_ACTION,
  id,
});

export type TChartActions = IChangeCurrentLineAction | IAddLineAction | IRemoveLineAction;
