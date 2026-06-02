// Mobile nav drawer toggle. Flips data-menu-open on the nav root; the
// drawer's open/closed visual state is driven from CSS via that attribute.
const header = document.querySelector("[data-nav-root]");
if (header) {
  const toggle = header.querySelector("[data-nav-toggle]");
  const drawer = header.querySelector("[data-nav-drawer]");
  if (toggle && drawer) {
    const setOpen = (open) => {
      header.dataset.menuOpen = open ? "true" : "false";
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      const iconOpen = toggle.querySelector("[data-icon-open]");
      const iconClose = toggle.querySelector("[data-icon-close]");
      if (iconOpen && iconClose) {
        iconOpen.classList.toggle("hidden", open);
        iconClose.classList.toggle("hidden", !open);
      }
    };
    toggle.addEventListener("click", () => {
      const isOpen = header.dataset.menuOpen === "true";
      setOpen(!isOpen);
    });
    // Close when a link inside the drawer is clicked.
    drawer.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
  }
}
