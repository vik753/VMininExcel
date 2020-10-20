import { TABLE_RESIZE } from './types';

export function rootReducer(state, action) {
  let tempData;
  switch (action.type) {
    case TABLE_RESIZE:
      tempData = state.colState || {};
      tempData[action.data.id] = action.data.value;
      return { ...state, colState: tempData };
    default:
      return state;
  }
}
