class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  get coords() {
    return this.$el.getBoundingClientRect();
  }

  get innerText() {
    return this.$el.innerText;
  }

  querySelector(selector) {
    return $(this.$el.querySelector(selector));
  }

  querySelectorAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => (this.$el.style[key] = styles[key]));
  }

  addClass(className) {
    return $(this.$el.classList.add(className));
  }

  removeClass(className) {
    return $(this.$el.classList.remove(className));
  }
}

export function $(selector) {
  return new Dom(selector);
}

/**
 * Create Dom Node by tag and with classes
 * @param {String} tagName - Tag name like "#id" or ".class"
 * @param {String} classes - classes for this Node. Format "class1 class2"
 * @return {Object} node element
 * */
$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);

  if (classes) {
    const cl = classes.split(' ').map((cls) => cls.trim());
    cl.forEach((cls) => {
      if (cls) {
        el.classList.add(cls);
      }
    });
  }
  return $(el);
};
