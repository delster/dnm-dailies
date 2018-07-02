document.addEventListener("DOMContentLoaded", () => {
  // Cache references to relevant DOM Elements.
  const clockTag = document.querySelector(".countdown");

  // Global variables (for now? Could be in a Clock class)
  let now, resetTime;

  // Initialize the reset countdown.
  const initClock = () => {
    updateTime();
    startClock();
  };

  // Update Time by calling setNowTime() and setResetTime().
  const updateTime = () => {
    setNowTime();
    setResetTime();
  };

  // Helper to get "now" as UTC moment.
  const setNowTime = () => {
    now = moment.utc();
  };

  // Helper to get the "reset time" as UTC moment.
  const setResetTime = () => {
    // Compare now vs 9am today: set reset to today or tomorrow.
    resetTime =
      now.valueOf() < moment.utc({ hours: 9 }).valueOf()
        ? moment.utc({ hours: 9 })
        : moment.utc({ hours: 9 }).add(1, "d");
  };

  // "Tick" the countdown timer.
  const tickClock = () => {
    // Get the new "now" and "reset time".
    updateTime();

    // Determine the difference in time, format it as HH:MM:SS string.
    let dura = moment.duration(resetTime.diff(now));
    let h = String(dura.hours()).padStart(2, "0");
    let m = String(dura.minutes()).padStart(2, "0");
    let s = String(dura.seconds()).padStart(2, "0");
    let duraStr = `${h}:${m}:${s}`;
    // Set that string to the clock's text content on the front end.
    clockTag.textContent = duraStr;
  };

  // Tells the clock to update every 1/2 sec (good accuracy:performance trade).
  const startClock = () => {
    setInterval(tickClock, 500);
  };

  // Get the whole thing rolling.
  initClock();
});
