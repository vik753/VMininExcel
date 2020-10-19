import { ExcelComponent } from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  init() {
    super.init();
    const $input = this.$root.querySelector(`[data-type="input"]`);

    this.$on('table:input', (text) => $input.text(text));
    this.$on('table:focusin', (text) => $input.text(text));
  }

  toHTML() {
    return `
        <div class="info">fx</div>
        <div 
            class="input" 
            spellcheck="false" 
            data-type="input" 
            contenteditable 
        >
        </div>
    `;
  }

  onInput(event) {
    this.$emit('formula:input', event.target.textContent);
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:enter', event);
    }
  }
}
