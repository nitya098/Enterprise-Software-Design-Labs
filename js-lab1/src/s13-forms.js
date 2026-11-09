
// Section 13 — the pure half of the form exercise

// values: { code, title, department, credits }
// Complete when every field has non-blank text and credits is a whole number 1–6.
export function isComplete(values) {
  const fields = ["code", "title", "department", "credits"];

  const allFilled = fields.every(
    (field) => typeof values[field] === "string" && values[field].trim() !== ""
  );

  if (!allFilled) return false;

  const credits = Number(values.credits);

  return Number.isInteger(credits) && credits >= 1 && credits <= 6;
}

// Turn form values into a course object (the shape the API uses).
export function toCourse(values, nextId) {
  return {
    id: nextId(),
    code: values.code.trim().toUpperCase(),
    title: values.title.trim(),
    department: values.department.trim(),
    credits: Number(values.credits.trim()),
    description: null,
    capacity: 60,
    seatsLeft: 60
  };
}
