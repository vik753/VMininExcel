import { storage } from '@core/utils';

const preState = {
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
};

const initialState = storage('excel-state') || preState;

export default initialState;
