import {
  COL_DEF_RESIZE,
  COL_RESIZE,
  ROW_DEF_RESIZE,
  ROW_RESIZE,
} from '@/redux/types';

export function colResize(data) {
  return {
    type: COL_RESIZE,
    data,
  };
}

export function rowResize(data) {
  return {
    type: ROW_RESIZE,
    data,
  };
}

export function colDefaultResize(data) {
  return {
    type: COL_DEF_RESIZE,
    data,
  };
}

export function rowDefaultResize(data) {
  return {
    type: ROW_DEF_RESIZE,
    data,
  };
}
