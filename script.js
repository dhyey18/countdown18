const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownBtn = document.getElementById("countdown-button");
const countdownElTitle = document.getElementById("countdown-title");
/* querySelectorAll --> return all the element inside an array
In our case all the span elements */
const timeEl = document.querySelectorAll("span");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;
let savedCountdown;

let compeleteEl = document.getElementById("compelete");
let colpeleteInfoEl = document.getElementById("complete-info");
let compeleteButton = document.getElementById("compelete-button");

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set date input to today's date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Populate the countDown
function updateDom() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // hidden input
    inputContainer.hidden = true;

    // Show countdown
    if (distance < 0) {
      colpeleteInfoEl.textContent = `${countdownTitle} is finished on ${countdownDate}`;
      clearInterval(countdownActive);
      countdownEl.hidden = true;
      compeleteEl.hidden = false;
    } else {
      // Else , show countdown element
      countdownElTitle.textContent = `${countdownTitle}`;
      timeEl[0].textContent = days;
      timeEl[1].textContent = hours;
      timeEl[2].textContent = minutes;
      timeEl[3].textContent = seconds;
      countdownEl.hidden = false;
      compeleteEl.hidden = true;
    }
  }, second);
}

// Take value from input
function updateCountdown(e) {
  /*By default submit will pass this value to backEnd hence we are a
   preventing the default process , we don't whant to pass anyWhere
   hence this will return an event */
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  console.log(savedCountdown);
  localStorage.setItem("countdown", JSON.stringify(savedCountdown));

  if (countdownDate === "") {
    alert("Please select a date for countdown");
  } else {
    // Get time left to reach the , give date (in mili second) from
    // 1970/01/01
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }
}

function reset() {
  // hide countdown & display input
  countdownEl.hidden = true;
  inputContainer.hidden = false;
  compeleteEl.hidden = true;
  // Stop countdown
  clearInterval(countdownActive);
  // Reset value
  countdownDate = "";
  countdownTitle = "";
  localStorage.removeItem("countdown");
}

function restorePreviousCount() {
  // Get countdown from localStorage if available
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }
}

// Event-Listner
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
compeleteButton.addEventListener("click", reset);

// on load
restorePreviousCount();
