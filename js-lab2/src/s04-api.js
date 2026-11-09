
// Section 04 — fetch and the network

// Build the URL for GET /api/courses with optional filters.
export function buildCoursesUrl({ department = "", q = "" } = {}) {
  const params = new URLSearchParams();

  if (department.trim() !== "") {
    params.set("department", department);
  }

  if (q.trim() !== "") {
    params.set("q", q);
  }

  const queryString = params.toString();

  return queryString
    ? `/api/courses?${queryString}`
    : "/api/courses";
}

// GET a URL and return the parsed JSON body.
export async function getJSON(url, fetchFn = fetch) {
  const res = await fetchFn(url);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
}

// The courses matching some filters: build the URL, then getJSON it.
export function fetchCourses(filters, fetchFn = fetch) {
  const url = buildCoursesUrl(filters);

  return getJSON(url, fetchFn);
}
