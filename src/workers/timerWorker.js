let isRunning = false;

self.onmessage = function (event) {
  if (isRunning) return;

  isRunning = true;

  const { millisecondsRemaining, activeTask } = event.data;

  const endDate = activeTask.startDate + millisecondsRemaining;
  const now = Date.now();
  let countDownMilliseconds = Math.ceil(endDate - now);

  function tick() {
    self.postMessage(countDownMilliseconds);

    const now = Date.now();
    countDownMilliseconds = Math.ceil(endDate - now);

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
};
