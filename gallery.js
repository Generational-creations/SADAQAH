(function () {
  var fieldImages = [
    "IMG-20261114-WA0127.jpg",
    "IMG-20261114-WA0128.jpg",
    "IMG-20261114-WA0129.jpg",
    "IMG-20261114-WA0130.jpg",
    "IMG-20261114-WA0131.jpg",
    "IMG-20261114-WA0132.jpg",
    "IMG-20261114-WA0133.jpg",
    "IMG-20261114-WA0134.jpg",
    "IMG-20261114-WA0135.jpg",
    "IMG-20261114-WA0137.jpg",
    "IMG-20261114-WA0138.jpg",
    "IMG-20261114-WA0139.jpg",
    "IMG-20261114-WA0140.jpg",
    "IMG-20261114-WA0141.jpg",
    "IMG-20261114-WA0142.jpg",
    "IMG-20261114-WA0143.jpg",
    "IMG-20261114-WA0144.jpg",
    "IMG-20261114-WA0145.jpg",
    "IMG-20261114-WA0146.jpg",
    "IMG-20261114-WA0147.jpg",
    "IMG-20261114-WA0148.jpg",
    "IMG-20261114-WA0151.jpg",
    "IMG-20261114-WA0152.jpg",
    "IMG-20261114-WA0153.jpg",
    "IMG-20261114-WA0179.jpg",
    "IMG-20261114-WA0181.jpg",
  ];
  var grid = document.getElementById("field-gallery");
  var menuButton = document.querySelector(".menu-toggle");
  var primaryNav = document.getElementById("primary-nav");
  var siteHeader = document.querySelector("header");

  function updateHeader() {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 20);
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  fieldImages.forEach(function (name, index) {
    var image = document.createElement("div");
    image.className = "ph";
    image.setAttribute("role", "img");
    image.setAttribute("aria-label", "Field photo " + (index + 1));
    image.style.backgroundImage = 'url("images/' + name + '")';
    grid.appendChild(image);
  });

  function setMenuOpen(open) {
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    primaryNav.classList.toggle("is-open", open);
  }

  menuButton.addEventListener("click", function () {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });
  primaryNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenuOpen(false);
    });
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setMenuOpen(false);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 760) setMenuOpen(false);
  });
})();
