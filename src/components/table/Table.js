import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { createTable } from '@/components/table/table.template';
import resizeHandler from '@/components/table/table.resize';
import {
  shouldResize,
  shouldSelected,
} from '@/components/table/table.functions';
import TableSelection from '@/components/table/TableSelection';
import { matrix } from '@core/utils';

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: Table,
      listeners: ['mousedown'],
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
}
