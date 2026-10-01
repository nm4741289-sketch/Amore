// Navbar: mobile toggle and border on scroll
var nav = document.getElementById('nav');
var toggle = document.getElementById('menu-toggle');
var links = document.getElementById('nav-links');
toggle.addEventListener('click', function () {
  var open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
links.addEventListener('click', function (e) {
  if (e.target.tagName === 'A') {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});
window.addEventListener('scroll', function () {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// Menu tabs with placeholder dishes (replace after verifying the real menu)
var categories = ['Starters', 'BBQ', 'Main Course', 'Sides', 'Desserts', 'Drinks'];
var tabs = document.getElementById('tabs');
var list = document.getElementById('menu-list');

function renderPanel() {
  var html = '';
  for (var i = 0; i < 6; i++) {
    html += '<div class="item"><div class="row"><span class="name">Dish Name</span><span class="dots"></span><span class="price">Rs. XXXX</span></div><p>Short description of the dish</p></div>';
  }
  list.innerHTML = html;
}

function select(index) {
  var buttons = tabs.querySelectorAll('.tab');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].setAttribute('aria-selected', i === index ? 'true' : 'false');
    buttons[i].tabIndex = i === index ? 0 : -1;
  }
  list.setAttribute('aria-label', categories[index]);
  renderPanel();
}

categories.forEach(function (name, i) {
  var b = document.createElement('button');
  b.className = 'tab';
  b.type = 'button';
  b.setAttribute('role', 'tab');
  b.textContent = name;
  b.addEventListener('click', function () { select(i); });
  b.addEventListener('keydown', function (e) {
    var next = null;
    if (e.key === 'ArrowRight') next = (i + 1) % categories.length;
    if (e.key === 'ArrowLeft') next = (i - 1 + categories.length) % categories.length;
    if (next !== null) { select(next); tabs.children[next].focus(); }
  });
  tabs.appendChild(b);
});
select(0);
