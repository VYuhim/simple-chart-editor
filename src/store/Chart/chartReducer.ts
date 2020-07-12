import { Curve, FillType, ILine } from 'src/types/chart';
import { CORE_PRESETS_ID } from 'src/components/Menu/Menu';

import {
  ADD_LINE_ACTION,
  CHANGE_CURRENT_LINE,
  REMOVE_LINE_ACTION,
  TChartActions,
  UPDATE_LINE_ACTION,
} from './chartActions';

export interface IChartReducerStore {
  currentLine: number | string;
  lines: ILine[];
}

const initialState: IChartReducerStore = {
  currentLine: CORE_PRESETS_ID,
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
          fillType: FillType.full,
        }),
        currentLine: newId,
      };
    }
    case REMOVE_LINE_ACTION: {
      let currentLine: any = CORE_PRESETS_ID;
      const lines = store.lines.filter((line, idx, arr) => {
        const check = line.id !== action.id;

        if (check && arr[idx]?.id) {
          currentLine = arr[idx].id;
        }

        return check;
      });

      return {
        ...store,
        lines,
        currentLine,
      };
    }
    case UPDATE_LINE_ACTION:
      return {
        ...store,
        lines: store.lines.map((line) =>
          line.id === action.id
            ? {
                ...line,
                ...action.settings,
              }
            : line,
        ),
      };
    default:
      return store;
  }
};
