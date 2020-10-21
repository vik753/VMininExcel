import {
  COL_DEF_RESIZE,
  COL_RESIZE,
  ROW_DEF_RESIZE,
  ROW_RESIZE,
} from '@/redux/types';

export function rootReducer(state, action) {
  let tempData;
  switch (action.type) {
    case COL_RESIZE:
      tempData = state.colState || {};
      tempData[action.data.id] = action.data.value;
      return { ...state, colState: tempData };
    case ROW_RESIZE:
      tempData = state.rowState || {};
      tempData[action.data.id] = action.data.value;
      return { ...state, rowState: tempData };
    case COL_DEF_RESIZE:
      tempData = state.colState || {};
      // delete tempData[action.data.id];
      tempData = Object.entries(tempData).reduce((acc, cur) => {
        if (cur[0] !== action.data.id) {
          acc[cur[0]] = cur[1];
        }
        return acc;
      }, {});
      return { ...state, colState: tempData };
    case ROW_DEF_RESIZE:
      tempData = state.rowState || {};
      tempData = Object.entries(tempData).reduce((acc, cur) => {
        if (cur[0] !== action.data.rowNumber) {
          acc[cur[0]] = cur[1];
        }
        return acc;
      }, {});
      return { ...state, rowState: tempData };
    default:
      return state;
  }
}
