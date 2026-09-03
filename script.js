// -----------------------------
// Traffic Density Simulator
// -----------------------------

let running = false;
let simulationInterval;

let vehicleCount = 10;
let density = 25;

let signalIndex = 0;

const signals = ["GREEN", "YELLOW", "RED"];

// Get HTML elements

const vehicleDisplay = document.getElementById("vehicleCount");
const densityDisplay = document.getElementById("density");
const statusDisplay = document.getElementById("status");
const signalDisplay = document.getElementById("signalStatus");

const progressBar = document.getElementById("progressBar");
const message = document.getElementById("message");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const redLight = document.getElementById("red");
const yellowLight = document.getElementById("yellow");
const greenLight = document.getElementById("green");


// -----------------------------
// Update Dashboard
// -----------------------------

function updateDashboard() {

    vehicleDisplay.textContent = vehicleCount;
    densityDisplay.textContent = density + "%";

    // Determine traffic status

    if (density < 40) {

        statusDisplay.textContent = "LOW";

    } else if (density < 70) {

        statusDisplay.textContent = "MEDIUM";

    } else {

        statusDisplay.textContent = "HIGH";
    }

    // Update progress bar

    progressBar.style.width = density + "%";

    // Update message

    if (density < 40) {

        message.textContent = "Traffic is flowing smoothly.";

    } else if (density < 70) {

        message.textContent = "Moderate traffic detected.";

    } else {

        message.textContent = "⚠ Heavy traffic detected!";
    }
}


// -----------------------------
// Generate Random Traffic
// -----------------------------

function generateTraffic() {

    if (!running) {
        return;
    }

    // Random vehicle count

    vehicleCount = Math.floor(Math.random() * 41) + 10;

    // Convert vehicles to density

    density = Math.floor((vehicleCount / 50) * 100);

    if (density > 100) {
        density = 100;
    }

    updateDashboard();
}


// -----------------------------
// Traffic Signal
// -----------------------------

function changeSignal() {

    if (!running) {
        return;
    }

    signalIndex++;

    if (signalIndex >= signals.length) {
        signalIndex = 0;
    }

    const currentSignal = signals[signalIndex];

    signalDisplay.textContent = currentSignal;

    // Remove active class

    redLight.classList.remove("active");
    yellowLight.classList.remove("active");
    greenLight.classList.remove("active");

    // Activate current signal

    if (currentSignal === "RED") {

        redLight.classList.add("active");

    } else if (currentSignal === "YELLOW") {

        yellowLight.classList.add("active");

    } else {

        greenLight.classList.add("active");
    }
}


// -----------------------------
// Start Simulation
// -----------------------------

startBtn.addEventListener("click", function () {

    if (running) {
        return;
    }

    running = true;

    message.textContent = "🚦 Simulation is running...";

    simulationInterval = setInterval(function () {

        generateTraffic();
        changeSignal();

    }, 2000);
});


// -----------------------------
// Pause Simulation
// -----------------------------

pauseBtn.addEventListener("click", function () {

    running = false;

    clearInterval(simulationInterval);

    message.textContent = "⏸ Simulation paused.";
});


// -----------------------------
// Reset Simulation
// -----------------------------

resetBtn.addEventListener("click", function () {

    running = false;

    clearInterval(simulationInterval);

    vehicleCount = 10;
    density = 25;

    signalIndex = 0;

    signalDisplay.textContent = "GREEN";

    redLight.classList.remove("active");
    yellowLight.classList.remove("active");
    greenLight.classList.add("active");

    updateDashboard();

    message.textContent = "Simulation reset. Click Start!";
});


// Initial dashboard

updateDashboard();