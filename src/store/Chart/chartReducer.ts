import { Curve, ILine } from 'src/types/chart';

import { ADD_LINE_ACTION, CHANGE_CURRENT_LINE, REMOVE_LINE_ACTION, TChartActions } from './chartActions';

export interface IChartReducerStore {
  currentLine: number | string;
  lines: ILine[];
}

const initialState: IChartReducerStore = {
  currentLine: 'corePresets',
  lines: [],
};

export const chartReducer = (store: IChartReducerStore = initialState, action: TChartActions): IChartReducerStore => {
  switch (action.type) {
    case CHANGE_CURRENT_LINE:
      return {
        ...store,
        currentLine: action.id,
      };
    case ADD_LINE_ACTION: {
      const newId = (store.lines[store.lines.length - 1]?.id || 0) + 1;

      return {
        ...store,
        lines: store.lines.concat({
          id: newId,
          color: 'gray',
          data: [],
          curve: Curve.linear,
          label: 'Новая линия',
        }),
        currentLine: newId,
      };
    }
    case REMOVE_LINE_ACTION:
    default:
      return store;
  }
};
