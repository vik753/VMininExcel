import { $ } from '@core/dom';

export const resizeColDefault = (colName, $title, $root) => {
  $title.css({ width: '120px' });
  const colCells = $root.querySelectorAll(`[data-col=${colName}]`);
  colCells.forEach((col) => $(col).css({ width: '120px' }));
};

export const resizeDefaultRow = (event) => {
  const row = $(event.target.parentNode.parentNode);
  row.css({ height: '24px' });
};

export const resizeHandler = (event, $root) => {
  return new Promise((resolve) => {
    event.target.style.opacity = '1';

    const rootElOffsetTop = $root.$el.offsetTop;
    const resizeType = event.target.dataset.resize;
    const MEASURES = {
      col: { measure: 'width', pageAxis: 'pageX', way: 'left' },
      row: { measure: 'height', pageAxis: 'pageY', way: 'top' },
    };
    const way = MEASURES[resizeType].way;
    const measure = MEASURES[resizeType].measure;
    const axisStart = event[MEASURES[resizeType].pageAxis];

    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.coords;
    const colName = resizeType === 'col' && $parent.innerText;
    const colCells =
      resizeType === 'col' &&
      Array.from($root.querySelectorAll(`[data-col="${colName}"]`));
    let value;

    $root.css({
      cursor: resizeType === 'col' ? 'col-resize' : 'row-resize',
    });

    document.onmousemove = (e) => {
      const axisEnd = e[MEASURES[resizeType].pageAxis];
      const delta = axisEnd - axisStart;
      value = coords[measure] + delta;
      const wayValue = way === 'left' ? axisEnd + 'px' : e.clientY + 'px';

      $resizer.css({
        position: 'fixed',
        zIndex: '1000',
        [way]: wayValue,
        [way === 'left' && 'top']: `${rootElOffsetTop}px`,
        opacity: 1,
      });
    };

    document.onmouseup = () => {
      $resizer.css({
        position: '',
        zIndex: '',
        left: '',
        top: '',
        bottom: '',
        opacity: '',
      });

      $parent.css({ [measure]: value + 'px' });
      if (resizeType === 'col' && colCells.length) {
        colCells.forEach((cell) => {
          $(cell).css({ width: value + 'px' });
        });
      }

      const rowId =
        resizeType === 'row' && event.target.parentNode.textContent.trim();
      resolve({
        value,
        resizeType,
        id: resizeType === 'col' ? $parent.innerText : rowId,
      });

      $root.css({ cursor: '' });

      document.onmousemove = null;
      document.onmouseup = null;
    };
  });
};
