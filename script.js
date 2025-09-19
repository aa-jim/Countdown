let countdownInterval;
let targetDateTime;

// Set default date and time to tomorrow at current time
function setDefaultDateTime() {
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const dateStr = tomorrow.toISOString().split("T")[0];
  const timeStr = now.toTimeString().slice(0, 5);

  document.getElementById("target-date").value = dateStr;
  document.getElementById("target-time").value = timeStr;
}

function startCountdown() {
  const dateInput = document.getElementById("target-date").value;
  const timeInput = document.getElementById("target-time").value;

  if (!dateInput || !timeInput) {
    alert("Please select both date and time!");
    return;
  }

  targetDateTime = new Date(`${dateInput}T${timeInput}`);

  if (targetDateTime <= new Date()) {
    alert("Please select a future date and time!");
    return;
  }

  // Show countdown display
  document.getElementById("countdown-display").style.display = "grid";
  document.getElementById("status-message").style.display = "none";

  // Clear any existing interval
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  // Start the countdown with high precision
  countdownInterval = setInterval(updateCountdown, 10); // Update every 10ms for smooth milliseconds
  updateCountdown(); // Initial update
}

function createFloatingIcons() {
    const icons = document.querySelectorAll('.floating-icons .icon');
    
    icons.forEach(icon => {
        const startX = Math.random() * window.innerWidth;
        const delay = Math.random() * 0; // seconds
        const duration = 4 + Math.random() * 5; // 5-10s
        
        icon.style.left = startX + "px";
        icon.style.animationDuration = duration + "s";
        icon.style.animationDelay = delay + "s";
    });
}

// Call this once on load
window.addEventListener('load', createFloatingIcons);


function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDateTime.getTime() - now;

  if (distance < 0) {
    clearInterval(countdownInterval);

    // Reset display
    document.getElementById('days').textContent = '000';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    document.getElementById('milliseconds').textContent = '000';

    // Show finished message
    const statusMsg = document.getElementById('status-message');
    statusMsg.style.display = "block"; 
    statusMsg.classList.add('finished');
    return;
}


  // Calculate time units
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((distance % 1000) / 10); // Show centiseconds for smoother display

  // Update display with proper formatting
  document.getElementById("days").textContent = days
    .toString()
    .padStart(3, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");
  document.getElementById("milliseconds").textContent = milliseconds
    .toString()
    .padStart(2, "0");
}

function stopCountdown() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }

  // Reset display
  document.getElementById("days").textContent = "000";
  document.getElementById("hours").textContent = "00";
  document.getElementById("minutes").textContent = "00";
  document.getElementById("seconds").textContent = "00";
  document.getElementById("milliseconds").textContent = "000";

  // Show a status message
  const statusMsg = document.getElementById("status-message");
  statusMsg.textContent = "⏹ Countdown Stopped!";
  statusMsg.classList.add("finished");
  statusMsg.style.display = "block";
}

// Initialize with default date/time when page loads
window.addEventListener("load", setDefaultDateTime);
