const CODES = {
  A: 65,
  Z: 90,
};

function toCell(content = '') {
  return `
    <div class="cell " contenteditable>${content}</div>
  `;
}

function toColumn(col) {
  return `
    <div class="column">${col}</div>
  `;
}

function createRow(index = '', content) {
  return `
    <div class="row">
        <div class="row-info">${index}</div>
        <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function createTitleRow(colsCount) {
  return new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('');
}

function createCells(colsCount) {
  return new Array(colsCount)
    .fill('')
    .map(toCell)
    .join('');
}

export function createTable(rowsCount = 100) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const titleCols = createTitleRow(colsCount);

  rows.push(createRow('', titleCols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = createCells(colsCount);
    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
}
