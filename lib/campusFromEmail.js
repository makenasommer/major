/**
 * Maps known .edu email domains to a readable campus name.
 * Add more schools here as Major expands to new campuses.
 * Unrecognized .edu domains fall back to a title-cased guess from the domain.
 */
const KNOWN_CAMPUSES = {
  "ucla.edu": "UCLA",
  "berkeley.edu": "UC Berkeley",
  "usc.edu": "USC",
  "stanford.edu": "Stanford",
  "nyu.edu": "NYU",
  "umich.edu": "University of Michigan",
  "fordham.edu": "Fordham",
  "student.smc.edu": "Santa Monica College",
};

export function isEduEmail(email) {
  return /\.edu$/i.test(email.trim().split("@")[1] || "");
}

export function campusFromEmail(email) {
  const domain = (email.trim().split("@")[1] || "").toLowerCase();
  if (KNOWN_CAMPUSES[domain]) return KNOWN_CAMPUSES[domain];

  // Fallback: turn "someschool.edu" into "Someschool"
  const base = domain.replace(/\.edu$/i, "");
  return base ? base.charAt(0).toUpperCase() + base.slice(1) : "Unknown Campus";
}
