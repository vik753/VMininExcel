const CODES = {
  A: 65,
  Z: 90,
};

function toCell(colNumber, rowNumber, content = '') {
  return `
    <div 
      class="cell" 
      data-col="${colNumber}" 
      data-row="${rowNumber}" contenteditable>
          ${content}
    </div>
  `;
}

function toColumn(col) {
  return `
    <div class="column" data-type="resizable">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(index, content) {
  return `
    <div class="row" data-type="resizable">
        <div class="row-info">
        ${index && index}
        ${index && '<div class="row-resize" data-resize="row"></div>'}
    </div>
        <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function createTitleRow(colsCount) {
  return new Array(colsCount).fill('').map(toChar).map(toColumn).join('');
}

function createCells(colsCount, rowNumber) {
  // return new Array(colsCount).fill('').map(toCell).join('');
  return new Array(colsCount)
    .fill('')
    .map((col, i) => toCell(toChar('', i), rowNumber))
    .join('');
}

export function createTable(rowsCount = 50) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const titleCols = createTitleRow(colsCount);

  rows.push(createRow('', titleCols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = createCells(colsCount, i + 1);
    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
}
