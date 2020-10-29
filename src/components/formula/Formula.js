import { ExcelComponent } from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    });
  }

  init() {
    super.init();
    this.$formula = this.$root.querySelector(`[data-type="input"]`);
    this.$on('table:focusin', (text) => {
      this.$formula.text(text);
    });
  }

  storeChanged({ currentText }) {
    this.$formula.text(currentText);
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
