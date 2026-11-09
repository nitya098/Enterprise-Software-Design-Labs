
// Section 05 — State as a state machine

export const initialState = Object.freeze({
  status: "idle",
  courses: [],
  error: null,
  departments: [],
  department: "",
  query: "",
  planner: [],
  grades: {},
});

export function transition(state, event) {
  switch (event.type) {

    case "LOAD_START":
      return {
        ...state,
        status: "loading",
        error: null,
      };

    case "LOAD_OK": {
      const departments =
        state.departments.length === 0
          ? [...new Set(event.courses.map((c) => c.department))].sort()
          : state.departments;

      return {
        ...state,
        status: "ready",
        courses: event.courses,
        error: null,
        departments,
      };
    }

    case "LOAD_FAIL":
      return {
        ...state,
        status: "error",
        error: event.message,
      };

    case "SET_DEPARTMENT":
      if (state.department === event.department) {
        return state;
      }

      return {
        ...state,
        department: event.department,
      };

    case "SET_QUERY":
      if (state.query === event.query) {
        return state;
      }

      return {
        ...state,
        query: event.query,
      };

    case "ADD": {
      const course = event.course;

      if (state.planner.some((c) => c.id === course.id)) {
        return state;
      }

      // Refuse a full course.
      if (course.seatsLeft <= 0) {
        return state;
      }

      // Refuse if total credits would exceed 24.
      const currentCredits = state.planner.reduce(
        (total, c) => total + c.credits,
        0
      );

      if (currentCredits + course.credits > 24) {
        return state;
      }

      const newCourse = {
        id: course.id,
        code: course.code,
        title: course.title,
        credits: course.credits,
      };

      return {
        ...state,
        planner: [...state.planner, newCourse],
      };
    }

    case "REMOVE": {
      const exists = state.planner.some((c) => c.id === event.id);

      if (!exists) {
        return state;
      }

      const planner = state.planner.filter(
        (c) => c.id !== event.id
      );

      const grades = { ...state.grades };
      delete grades[event.id];

      return {
        ...state,
        planner,
        grades,
      };
    }

    case "SET_GRADE": {
      const currentGrade = state.grades[event.id] || "";

      if (currentGrade === event.grade) {
        return state;
      }

      const grades = { ...state.grades };

      if (event.grade === "") {
        delete grades[event.id];
      } else {
        grades[event.id] = event.grade;
      }

      return {
        ...state,
        grades,
      };
    }

    default:
      return state;
  }
}
