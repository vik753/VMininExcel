export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function shouldDefaultResizeCol(event) {
  return event.target.dataset.resize === 'col';
}

export function shouldDefaultResizeRow(event) {
  return event.target.dataset.resize === 'row';
}

export function shouldSelected(event) {
  return event.target.dataset.select;
}

export function nextSelector(key, { col, row }) {
  const minCol = 65;
  const maxCol = 90;
  const minRow = 1;
  const maxRow = 50;

  switch (key) {
    case 'ArrowRight':
    case 'Tab':
      col = col === maxCol ? col : col + 1;
      break;
    case 'ArrowLeft':
      col = col === minCol ? col : col - 1;
      break;
    case 'ArrowUp':
      row = row === minRow ? row : row - 1;
      break;
    case 'ArrowDown':
    case 'Enter':
      row = row === maxRow ? row : row + 1;
      break;
    case 'Home':
      [col, row] = [minCol, minRow];
      break;
  }
  return `[data-id="${String.fromCharCode(col)}:${row}"]`;
}
