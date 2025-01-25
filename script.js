// JavaScript file can be used for future enhancements (e.g., animations, or song lists)
// Select the menu toggle button and sidebar
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");

// Add a click event to toggle the sidebar
menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});