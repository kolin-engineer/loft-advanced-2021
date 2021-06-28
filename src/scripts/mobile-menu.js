const triggerElements = document.querySelectorAll("[data-target-element]");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuHiddenClass = "aside--hidden";

triggerElements.forEach((el) => {
  el.onclick = function(ev) {
    const targetEl = document.querySelector(el.dataset.targetElement);
    const hideCLass = targetEl.dataset.hideClass;
    targetEl.classList.toggle(hideCLass);
  };
});
