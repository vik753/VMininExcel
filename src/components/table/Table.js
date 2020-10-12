import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import resizeHandler from '@/components/table/table.resize';
import { shouldResize } from '@/components/table/table.functions';
import TableSelection from '@/components/table/TableSelection';

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
    }
  }
}
