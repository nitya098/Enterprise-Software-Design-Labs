
// Section 15 — Build your own useState

// A tiny version of React's useState.
export function useState(initial, onChange) {
  let state = initial;

  function getState() {
    return state;
  }

  function setState(next) {
    const newValue =
      typeof next === "function" ? next(state) : next;

    // If the value hasn't changed, do nothing.
    if (Object.is(state, newValue)) {
      return;
    }

    // Update the state.
    state = newValue;

    // Trigger the screen update.
    onChange();
  }

  return [getState, setState];
}
