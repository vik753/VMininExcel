import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.prepare();
  }

  /**
   * Function to return html template
   * @return {String} return html
   * */
  toHTML() {
    return '';
  }

  prepare() {}

  init() {
    this.initDomListeners();
  }

  removeListeners() {
    this.removeDomListeners();
  }
}
