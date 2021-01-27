const getTemplate = (data = [], placeholder, selectedId) => {
  let title = placeholder ?? 'Placeholder по умолчанию';
  const items = data.map((item) => {
    let cls = '';
    if (item.id == selectedId) {
      title = item.value;
      cls = 'selected';
    }
    return `
        <li class="select-list__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>    
      `;
  });
  return `
      <div class="select-backdrop" data-type="backdrop"></div>
      <div class="select-input" data-type="input">
        <span data-type="value">${title}</span>
        <i class="fas fa-chevron-down" data-type="arrow"></i>
      </div>
      <div class="select-dropdown">
        <ul class="select-list">
          ${items.join('')}
        </ul>
      </div>
      
  `;
};
export class Select {
  constructor(selector, options) {
    this.elem = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;
    this.#render();
    this.#setup();
  }

  #render() {
    const { data, placeholder } = this.options;
    this.elem.classList.add('select');
    this.elem.innerHTML = getTemplate(data, placeholder, this.selectedId);
  }

  #setup() {
    this.clickHundler = this.clickHundler.bind(this);
    this.elem.addEventListener('click', this.clickHundler);
    this.arrow = this.elem.querySelector('[data-type="arrow"]');
    this.valuee = this.elem.querySelector('[data-type="value"]');
  }

  clickHundler(e) {
    const { type } = e.target.dataset;
    if (type === 'input') {
      this.toggle();
    } else if (type === 'item') {
      const id = e.target.dataset.id;
      this.select(id);
    } else if (type === 'backdrop') {
      this.close();
    }
  }

  get isOpen() {
    return this.elem.classList.contains('open');
  }

  get current() {
    return this.options.data.find((item) => item.id === this.selectedId);
  }

  select(id) {
    this.selectedId = id;
    this.valuee.textContent = this.current.value;
    this.elem.querySelectorAll('[data-type="item"]').forEach((item) => {
      item.classList.remove('selected');
    });
    this.elem.querySelector(`[data-id="${id}"]`).classList.add('selected');
    this.options.onSelect ? this.options.onSelect(this.current) : null;
    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.elem.classList.add('open');
    this.arrow.classList.remove('fa-chevron-down');
    this.arrow.classList.add('fa-chevron-up');
  }

  close() {
    this.elem.classList.remove('open');
    this.arrow.classList.add('fa-chevron-down');
    this.arrow.classList.remove('fa-chevron-up');
  }

  destroy() {
    this.elem.removeEventListener('click', this.clickHundler);
    this.elem.innerHTML = '';
  }
}
