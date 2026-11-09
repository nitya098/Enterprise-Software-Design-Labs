
// Section 09 — Out-of-order responses

// Returns a function track(promise).
// Only the most recent call's result counts.
export function createLatestOnly() {
  let latestCall = 0;

  return async function track(promise) {
    const callNumber = ++latestCall;

    try {
      const value = await promise;

      if (callNumber !== latestCall) {
        return { stale: true };
      }

      return {
        stale: false,
        value,
      };

    } catch (error) {
      if (callNumber !== latestCall) {
        return { stale: true };
      }

      throw error;
    }
  };
}

// STRETCH — debounce(fn, ms)
export function debounce(fn, ms) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, ms);
  };
}
