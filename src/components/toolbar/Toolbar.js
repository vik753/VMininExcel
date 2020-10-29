import { createToolbar } from '@/components/toolbar/toolbar.template';
import { $ } from '@core/dom';
import { ExcelStateComponent } from '@core/ExcelStateComponent';

export class Toolbar extends ExcelStateComponent {
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    });
  }
  static className = 'excel__toolbar';

  prepare() {
    const initialState = {
      textAlign: 'left',
      fontWeight: 'normal',
      textDecoration: 'none',
      fontStyle: 'normal',
    };
    this.initState(initialState);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data().type === 'button') {
      const value = JSON.parse($target.data().value);
      this.setState(value);
    }
  }
}
