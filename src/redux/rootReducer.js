import { CHANGE_FOCUS, CHANGE_TEXT, DEF_RESIZE, RESIZE } from '@/redux/types';

export function rootReducer(state, action) {
  const resizeType = action.data ? action.data.resizeType : {};
  const stateType = action.data
    ? resizeType === 'col'
      ? 'colState'
      : 'rowState'
    : {};
  let tempData;

  console.log('Action', action);

  switch (action.type) {
    case RESIZE:
      tempData = state[stateType] || {};
      tempData[action.data.id] = action.data.value;
      return { ...state, [stateType]: tempData };
    case DEF_RESIZE:
      tempData = state[stateType] || {};
      tempData = Object.entries(tempData).reduce((acc, curr) => {
        if (curr[0] !== action.data.id) {
          acc[curr[0]] = curr[1];
        }
        return acc;
      }, {});
      return { ...state, [stateType]: tempData };
    case CHANGE_TEXT:
      tempData = state['dataState'] || {};
      tempData[action.data.id] = action.data.value;
      if (!action.data.value) {
        delete tempData[action.data.id];
      }
      return { ...state, currentText: action.data.value, dataState: tempData };
    case CHANGE_FOCUS:
      tempData = state['dataState'] || {};
      return { ...state, currentText: tempData[action.data.id] || '' };
    default:
      return state;
  }
}
