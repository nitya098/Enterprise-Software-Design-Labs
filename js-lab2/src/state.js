
// useState — Section 01

export function useState(initial, onChange) {
  let state = initial;

  function getState() {
    return state;
  }

  function setState(next) {
    const newState =
      typeof next === "function"
        ? next(state)
        : next;

    // Do nothing if the state hasn't changed.
    if (Object.is(state, newState)) {
      return;
    }

    // Store the new state.
    state = newState;

    // Trigger render.
    onChange();
  }

  return [getState, setState];
}
