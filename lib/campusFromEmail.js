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

  // University of California
  "ucdavis.edu": "UC Davis",
  "uci.edu": "UC Irvine",
  "ucmerced.edu": "UC Merced",
  "ucr.edu": "UC Riverside",
  "ucsd.edu": "UC San Diego",
  "ucsf.edu": "UC San Francisco",
  "ucsb.edu": "UC Santa Barbara",
  "ucsc.edu": "UC Santa Cruz",

  // California State University
  "csub.edu": "CSU Bakersfield",
  "csuci.edu": "CSU Channel Islands",
  "csuchico.edu": "Chico State",
  "csudh.edu": "CSU Dominguez Hills",
  "csueastbay.edu": "CSU East Bay",
  "fresnostate.edu": "Fresno State", 
  "fullerton.edu": "Cal State Fullerton",
  "humboldt.edu": "Cal Poly Humboldt",
  "csulb.edu": "Cal State Long Beach",
  "calstatela.edu": "Cal State LA",
  "csum.edu": "Cal Maritime",
  "csumb.edu": "CSU Monterey Bay",
  "csun.edu": "CSUN",
  "cpp.edu": "Cal Poly Pomona",
  "csus.edu": "Sacramento State",
  "csusb.edu": "Cal State San Bernardino",
  "sdsu.edu": "San Diego State",
  "sfsu.edu": "San Francisco State",
  "sjsu.edu": "San José State",
  "calpoly.edu": "Cal Poly San Luis Obispo",
  "csusm.edu": "CSU San Marcos",
  "sonoma.edu": "Sonoma State",
  "csustan.edu": "Stanislaus State",
  
  // Private Universities
  "usc.edu": "University of Southern California",
  
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
