import { RESIZE, DEF_RESIZE, CHANGE_TEXT, CHANGE_FOCUS } from '@/redux/types';

export function resize(data) {
  return {
    type: RESIZE,
    data,
  };
}

export function defaultResize(data) {
  return {
    type: DEF_RESIZE,
    data,
  };
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  };
}

export function changeFocus(data) {
  return {
    type: CHANGE_FOCUS,
    data,
  };
}
