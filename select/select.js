const getTemplate = (data = [], placeholder) => {
  const title = placeholder ?? 'Placeholder по умолчанию';
  console.log(data);
  return `
  <div class="select-input" data-type="input">
    <span>${title}</span>
    <i class="fas fa-chevron-down" data-type="arrow"></i>
  </div>
  <div class="select-dropdown">
    <ul class="select-list">
      <li class="select-list__item">1</li>
      <li class="select-list__item">2</li>
      <li class="select-list__item">3</li>
      <li class="select-list__item">4</li>
    </ul>
  </div>
`;
};
export class Select {
  constructor(selector, options) {
    this.elem = document.querySelector(selector);
    this.options = options;
    this.#render();
    this.#setup();
  }

  #render() {
    const { data, placeholder } = this.options;
    this.elem.classList.add('select');
    this.elem.innerHTML = getTemplate(data, placeholder);
  }

  #setup() {
    this.clickHundler = this.clickHundler.bind(this);
    this.elem.addEventListener('click', this.clickHundler);
    this.arrow = document.querySelector('[data-type="arrow"]');
  }

  clickHundler(e) {
    const { type } = e.target.dataset;
    if (type === 'input') {
      this.toggle();
    }
    console.log(type);
  }

  get isOpen() {
    return this.elem.classList.contains('open');
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
  }
}
