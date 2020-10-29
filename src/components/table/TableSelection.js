// import {$} from "@core/dom";

export default class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
    this.$root = null;
  }
  // $el instanceof DOM
  select($el, $root) {
    const id = $el.dataId().split(':');
    const colId = id[0];
    const rowId = id[1];
    const $rowInfoEl = $root.querySelector(`[data-id="row-${rowId}"]`);
    const $colInfoEl = $root.querySelector(`[data-id="col-${colId}"]`);

    this.clear();
    $el.focus().addClass(TableSelection.className);
    $rowInfoEl.addClass(TableSelection.className);
    $colInfoEl.addClass(TableSelection.className);
    this.group.push($el, $rowInfoEl, $colInfoEl);
    this.current = $el;
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass(TableSelection.className));
    this.group = [];
  }

  selectGroup(group = []) {
    this.clear();
    this.group = group;
    group.forEach(($el) => $el.addClass(TableSelection.className));
  }
}
