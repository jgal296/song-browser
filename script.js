// JavaScript file can be used for future enhancements (e.g., animations, or song lists)
// Select the menu toggle button and sidebar
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");

// Add a click event to toggle the sidebar
menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

// Page transitions
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("a"); // Select all links
  
    links.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default navigation
  
        // Add fade-out class to main content
        const mainContent = document.getElementById("main-content");
        mainContent.classList.add("fade-out");
  
        // Wait for the animation to finish (500ms)
        setTimeout(() => {
          window.location.href = link.href; // Navigate to the new page
        }, 500);
      });
    });
  
    // Apply fade-in animation when the page loads
    const mainContent = document.getElementById("main-content");
    mainContent.classList.add("fade-in");
});

// Queue expansion
document.addEventListener("DOMContentLoaded", () => {
  const queueContainer = document.getElementById("queue-container");
  const queueList = document.getElementById("queue-list");

  queueContainer.addEventListener("click", () => {
      queueContainer.classList.toggle("expanded");

      if (queueContainer.classList.contains("expanded")) {
          // Add a delay before showing each queue item
          const items = queueList.querySelectorAll("li");
          items.forEach((item, index) => {
              item.style.transitionDelay = `${index * 0.1}s`;
          });
      }
  });
});
