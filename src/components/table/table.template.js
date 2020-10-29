const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_SIZES = {
  col: 120,
  row: 24,
};

function toCell(
  colNumber,
  rowNumber,
  colSize = DEFAULT_SIZES.col,
  content = ''
) {
  // console.log(colNumber, rowNumber, colSize, content);
  return `
    <div 
      class="cell" 
      data-col="${colNumber}" 
      data-id="${colNumber}:${rowNumber}"
      data-select="cell"
      style = "width: ${colSize}px;"
      contenteditable 
    >
          ${content}
    </div>
  `;
}

function toColumn(col, colSize) {
  return `
    <div class="column" 
       data-type="resizable" 
       data-id="col-${col}"
       style = "width: ${colSize}px;"
    >
          ${col}
          <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(index, content, rowHeight) {
  return `
    <div class="row" data-type="resizable" style="height: ${rowHeight}px">
        <div class="row-info" data-info="row-info" data-id="row-${index || 0}">
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

function createTitleRow(colsCount, colState = {}) {
  return new Array(colsCount)
    .fill('')
    .map(toChar)
    .map((col) => {
      return toColumn(col, colState[col] ? colState[col] : DEFAULT_SIZES.col);
    })
    .join('');
}

function createCells(colsCount, rowNumber, colState = {}, dataState = {}) {
  return new Array(colsCount)
    .fill('')
    .map((col, i) => {
      const char = toChar('', i);
      const content = dataState[`${char}:${rowNumber}`];
      return toCell(char, rowNumber, colState[char], content);
    })
    .join('');
}

export function createTable(rowsCount = 50, store = {}) {
  const { colState, rowState, dataState } = store;
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const titleCols = createTitleRow(colsCount, colState);

  rows.push(createRow('', titleCols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = createCells(colsCount, row + 1, colState, dataState);
    const rowHeight = rowState[row + 1] || DEFAULT_SIZES.row;
    rows.push(createRow(row + 1, cells, rowHeight));
  }

  return rows.join('');
}
