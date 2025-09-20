// export const sanitizeString = (str) => {
//   return str
//     .replace(/[^a-zA-Z0-9 _.,@-]/g, "") // allow alphanumerics, space, underscore, dot, comma, @, hyphen
//     .replace(/[\t\n\r\f\v]/g, " "); // replace control characters with space
//   // .trim(); // remove leading/trailing whitespace
// };

// export const trimming = (string, res, lower, sanitize = true) => {
//   if (typeof lower !== "boolean" || typeof sanitize !== "boolean") {
//     return res
//       .status(400)
//       .json({ message: "lower and sanitize must be a boolean" });
//   }
//   const trimmedString = Boolean(lower)
//     ? string.trim().toLowerCase()
//     : string.trim();
//   const sanitizedTrimmedString = sanitizeString(trimmedString);
//   if (!sanitizedTrimmedString) {
//     return res.status(400).json({ message: "All fields are required!" });
//   }
//   return Boolean(sanitize) ? sanitizedTrimmedString : trimmedString;
// };

// utils/trimAndSanitize.js
export const sanitizeString = (str) => {
  return str
    .replace(/[^a-zA-Z0-9 _.,@-]/g, "") // allow alphanumerics, space, underscore, dot, comma, @, hyphen
    .replace(/[\t\n\r\f\v]/g, " "); // replace control characters with space
};

export const trimming = (string, lower, sanitize = true) => {
  if (typeof lower !== "boolean" || typeof sanitize !== "boolean") {
    throw new Error("lower and sanitize must be a boolean");
  }

  if (typeof string !== "string") {
    throw new Error("Invalid input type");
  }

  const trimmedString = lower ? string.trim().toLowerCase() : string.trim();
  const sanitizedTrimmedString = sanitizeString(trimmedString);

  if (!sanitizedTrimmedString) {
    throw new Error("All fields are required!");
  }

  return sanitize ? sanitizedTrimmedString : trimmedString;
};
