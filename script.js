/* ===== Menu data ===== */
const menuItems = [
  { img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80", name: "The Classic Smash", price: "$8.50", tag: "classic", tagLabel: "Classic", desc: "Single smashed patty, American cheese, pickles, onion & house sauce." },
  { img: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=600&q=80", name: "Double Cheese Stack", price: "$11.00", tag: "classic", tagLabel: "Popular", desc: "Two juicy patties, double cheese, caramelized onions on brioche." },
  { img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80", name: "Firecracker Burger", price: "$10.50", tag: "spicy", tagLabel: "Spicy", desc: "Jalapeños, pepper jack, sriracha mayo & crispy onion strings." },
  { img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=600&q=80", name: "Smokehouse BBQ", price: "$12.00", tag: "classic", tagLabel: "Loaded", desc: "Smoked bacon, cheddar, onion rings & tangy BBQ glaze." },
  { img: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=600&q=80", name: "Garden Smash", price: "$9.50", tag: "veg", tagLabel: "Veggie", desc: "Plant-based patty, avocado, lettuce, tomato & vegan aioli." },
  { img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=600&q=80", name: "Brunch Burger", price: "$11.50", tag: "classic", tagLabel: "New", desc: "Fried egg, bacon, cheddar & maple-pepper sauce. All-day breakfast vibes." },
  { img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80", name: "Loaded Fries", price: "$6.00", tag: "veg", tagLabel: "Side", desc: "Crispy fries smothered in cheese sauce, scallions & crispy onions." },
  { img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80", name: "Hand-Spun Shake", price: "$5.50", tag: "classic", tagLabel: "Drink", desc: "Thick & creamy. Vanilla, chocolate, strawberry or salted caramel." }
];

/* ===== Render menu ===== */
const grid = document.getElementById("menuGrid");
grid.innerHTML = menuItems.map(item => `
  <article class="menu-card reveal">
    ${item.img
      ? `<div class="menu-photo"><img src="${item.img}" alt="${item.name}" loading="lazy" /></div>`
      : `<div class="menu-emoji">${item.emoji}</div>`}
    <div class="menu-body">
      <span class="tag tag-${item.tag}">${item.tagLabel}</span>
      <div class="row">
        <h3>${item.name}</h3>
        <span class="menu-price">${item.price}</span>
      </div>
      <p>${item.desc}</p>
      <button class="add-btn" data-name="${item.name}">Add to Order +</button>
    </div>
  </article>
`).join("");

/* ===== Cart / toast ===== */
let cartCount = 0;
const toast = document.createElement("div");
toast.className = "toast";
document.body.appendChild(toast);
let toastTimer;

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

grid.addEventListener("click", e => {
  const btn = e.target.closest(".add-btn");
  if (!btn) return;
  cartCount++;
  btn.textContent = "Added ✓";
  btn.classList.add("added");
  setTimeout(() => {
    btn.textContent = "Add to Order +";
    btn.classList.remove("added");
  }, 1200);
  showToast(`${btn.dataset.name} added! 🛒 ${cartCount} item${cartCount > 1 ? "s" : ""}`);
});

/* ===== Navbar scroll + mobile menu ===== */
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.addEventListener("click", e => {
  if (e.target.tagName === "A") navLinks.classList.remove("open");
});

/* ===== Contact form ===== */
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");
form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  note.textContent = `Thanks, ${name || "friend"}! We'll be in touch soon. 🍔`;
  form.reset();
  setTimeout(() => (note.textContent = ""), 5000);
});

/* ===== Reveal on scroll ===== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".feature, .menu-card, .about-inner, .contact-inner")
  .forEach(el => { el.classList.add("reveal"); observer.observe(el); });

/* ===== Footer year ===== */
document.getElementById("year").textContent = new Date().getFullYear();
