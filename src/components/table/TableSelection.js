export default class TableSelection {
  constructor() {
    this.group = [];
  }
  // $el instanceof DOM
  select($el) {
    $el.addClass('selected');
    this.group.push($el);
  }

  selectGroup() {}
}
