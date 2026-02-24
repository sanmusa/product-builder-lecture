
class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'wrapper');

    const button = document.createElement('button');
    button.textContent = 'Generate Numbers';
    button.addEventListener('click', () => this.generateNumbers());

    const numbersContainer = document.createElement('div');
    numbersContainer.setAttribute('class', 'numbers');

    const style = document.createElement('style');
    style.textContent = `
      .wrapper {
        padding: 20px;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        background-color: var(--container-bg);
        transition: all 0.3s;
      }
      .numbers {
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }
      .number {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        margin: 0 5px;
        border-radius: 50%;
        background-color: var(--ball-bg);
        color: var(--ball-text);
        font-size: 18px;
        border: 1px solid var(--border-color);
        transition: all 0.3s;
      }
      button {
        padding: 8px 16px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid var(--border-color);
        background-color: var(--bg-color);
        color: var(--text-color);
        font-weight: bold;
        transition: all 0.3s;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(button);
    wrapper.appendChild(numbersContainer);

    this.numbersContainer = numbersContainer;
  }

  generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    this.displayNumbers(Array.from(numbers));
  }

  displayNumbers(numbers) {
    this.numbersContainer.innerHTML = '';
    for (const number of numbers) {
      const numberElement = document.createElement('div');
      numberElement.setAttribute('class', 'number');
      numberElement.textContent = number;
      this.numbersContainer.appendChild(numberElement);
    }
  }
}

customElements.define('lotto-generator', LottoGenerator);

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
}

themeToggle.addEventListener('click', () => {
    let theme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
});
