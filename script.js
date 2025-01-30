let queue = [];
let currentSongIndex = -1;
let loopMode = false;
let shuffleMode = false;

// Select the menu toggle button and sidebar
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const audioPlayer = document.getElementById("player");
const audioSource = document.getElementById("audio-source");
const currentSongTitle = document.getElementById("current-song-title");
const queueList = document.getElementById("queue-list");
const loopBtn = document.getElementById("loop-btn");
const shuffleBtn = document.getElementById("shuffle-btn");

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
document.addEventListener("DOMContentLoaded", function () {
  const queueContainer = document.getElementById("queue-container");
  const queueToggle = document.getElementById("queue-toggle");
  const queueContent = document.getElementById("queue-content");

  queueToggle.addEventListener("click", function () {
      queueContainer.classList.toggle("expanded");

      if (queueContainer.classList.contains("expanded")) {
          queueContent.style.maxHeight = "300px"; // Adjust as needed
          queueToggle.innerHTML = "▲"; // Change arrow to up
      } else {
          queueContent.style.maxHeight = "0";
          queueToggle.innerHTML = "▼"; // Change arrow to down
      }
  });
});

// Play All function
document.getElementById("play-all-btn").addEventListener("click", function() {
  // Clear the current queue before adding all songs
  queue = [];
  updateQueueDisplay();

  // Get all song paths from the song elements and add them to the queue
  const songs = document.querySelectorAll(".song");
  songs.forEach(song => {
      const songPath = song.getAttribute("data-src");
      const songTitle = song.querySelector("h2").innerText.trim();  // FIXED: Get full song name
      addToQueue(songPath, songTitle);  // Add to the queue
  });

  // Start playing the first song
  if (queue.length > 0) {
    playNextSong();  // Start playing the next song after adding them all
}
});