import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { createTable } from '@/components/table/table.template';
import resizeHandler from '@/components/table/table.resize';
import {
  nextSelector,
  shouldResize,
  shouldSelected,
} from '@/components/table/table.functions';
import TableSelection from '@/components/table/TableSelection';
import { matrix } from '@core/utils';

export class Table extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: Table,
      listeners: ['mousedown', 'keydown', 'input', 'focusin'],
      ...options,
    });
  }

  static className = 'excel__table';

  toHTML() {
    return createTable();
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
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root);
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

  onInput(event) {
    if (!event.shiftKey && !event.ctrlKey && !event.altKey) {
      this.$emit('table:input', $(event.target).text());
    }
  }

  onFocusin(event) {
    this.$emit('table:focusin', $(event.target).text());
  }
}
