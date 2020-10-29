export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getRange(start, end) {
  if (start > end) {
    [start, end] = [end, start];
  }
  return new Array(end - start + 1).fill('').map((_, index) => start + index);
}

export function matrix($target, current) {
  const $startId = current.dataId(true);
  const $endId = $target.dataId(true);
  const colRange = getRange($startId.col, $endId.col);
  const rowRange = getRange($startId.row, $endId.row);
  return colRange.reduce((acc, col) => {
    rowRange.forEach((row) => acc.push(`${String.fromCharCode(col)}:${row}`));
    return acc;
  }, []);
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}
