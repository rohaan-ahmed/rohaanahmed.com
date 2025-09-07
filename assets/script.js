// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
navToggle.addEventListener('click', () => {
const open = navMenu.classList.toggle('open');
navToggle.setAttribute('aria-expanded', String(open));
});
}


// Theme toggle (light/dark) with localStorage
const themeToggle = document.getElementById('themeToggle');
const STORAGE_KEY = 'theme-preference';


function getPreferredTheme() {
const stored = localStorage.getItem(STORAGE_KEY);
if (stored) return stored;
return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}


function setTheme(theme) {
document.documentElement.dataset.theme = theme; // not used in CSS but left for extension
localStorage.setItem(STORAGE_KEY, theme);
}


if (themeToggle) {
let current = getPreferredTheme();
setTheme(current);
themeToggle.addEventListener('click', () => {
current = current === 'dark' ? 'light' : 'dark';
setTheme(current);
themeToggle.setAttribute('aria-pressed', String(current === 'dark'));
});
}


// Year in footer
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
