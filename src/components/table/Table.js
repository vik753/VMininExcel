import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { createTable } from '@/components/table/table.template';
import {
  resizeColDefault,
  resizeDefaultRow,
  resizeHandler,
} from '@/components/table/table.resize';
import {
  nextSelector,
  shouldDefaultResizeCol,
  shouldDefaultResizeRow,
  shouldResize,
  shouldSelected,
} from '@/components/table/table.functions';
import TableSelection from '@/components/table/TableSelection';
import { matrix } from '@core/utils';
import * as actions from '@/redux/actions';

export class Table extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: Table,
      listeners: ['mousedown', 'keydown', 'input', 'focusin', 'dblclick'],
      ...options,
    });
  }

  static className = 'excel__table';

  toHTML() {
    return createTable(50, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const startSelect = this.$root.querySelector('[data-id="A:1"]');
    this.selection.select(startSelect);

    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
    });
    this.$on('formula:enter', (event) => {
      this.selection.select(this.selection.current);
    });

    this.$subscribe((state) => {
      console.log('TableState', state);
    });
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(event, this.$root);
      console.log(data);
      if (!data.value) return;
      if (data.resizeType === 'col') {
        this.$dispatch(actions.colResize(data));
      } else if (data.resizeType === 'row') {
        this.$dispatch(actions.rowResize(data));
        console.log(data);
      }
    } catch (err) {
      console.warn('Resize ERROR: ', err.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (shouldSelected(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $selectedGroup = matrix(
          $target,
          this.selection.current
        ).map((cell) => this.$root.querySelector(`[data-id="${cell}"]`));
        this.selection.selectGroup($selectedGroup);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'ArrowRight',
      'ArrowLeft',
      'ArrowUp',
      'ArrowDown',
      'Enter',
      'Tab',
      'Home',
    ];
    const key = event.key;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const currentId = this.selection.current.dataId(true);
      const dataAttribute = nextSelector(key, currentId);
      const $next = this.$root.querySelector(dataAttribute);
      this.selection.select($next);
      return true;
    }
  }

  onDblclick(event) {
    if (shouldDefaultResizeCol(event)) {
      const colName = $(event.target.parentNode).text().trim();
      resizeColDefault(colName, $(event.target.parentNode), this.$root);
      const data = { id: colName };
      this.$dispatch(actions.colDefaultResize(data));
    } else if (shouldDefaultResizeRow(event)) {
      resizeDefaultRow(event);
      const rowNumber = event.target.parentNode.textContent.trim();
      this.$dispatch(actions.rowDefaultResize({ rowNumber }));
    }
  }

  onInput(event) {
    if (!event.shiftKey && !event.ctrlKey && !event.altKey) {
      this.$emit('table:input', $(event.target).text());
    }
  }

  onFocusin(event) {
    this.$emit('table:focusin', $(event.target).text());
  }
}
