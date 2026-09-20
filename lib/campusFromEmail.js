/**
 * Maps known .edu email domains to a readable campus name.
 * Add more schools here as Major expands to new campuses.
 * Unrecognized .edu domains fall back to a title-cased guess from the domain.
 *
 * SYNCED WITH: Major (iOS app) CampusDirectory.swift — keep these two files'
 * domain -> name pairs identical, or the same campus will show different
 * names (and therefore not match each other's listings) between platforms.
 * This was a real bug before this update: "usc.edu" was defined twice below
 * with two different names, and the iOS app used a third, different name —
 * meaning USC students on the app and USC students on the site couldn't see
 * each other's listings. Fixed here: one canonical name per domain, matched
 * exactly in CampusDirectory.swift.
 */
const KNOWN_CAMPUSES = {
  // University of California (all 10, including UCSF which is grad/health only)
  "berkeley.edu": "UC Berkeley",
  "ucla.edu": "UCLA",
  "uci.edu": "UC Irvine",
  "ucdavis.edu": "UC Davis",
  "ucmerced.edu": "UC Merced",
  "ucr.edu": "UC Riverside",
  "ucsd.edu": "UC San Diego",
  "ucsf.edu": "UC San Francisco",
  "ucsb.edu": "UC Santa Barbara",
  "ucsc.edu": "UC Santa Cruz",

  // California State University (all 23 campuses)
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

  // Ivy League (all 8)
  "harvard.edu": "Harvard",
  "yale.edu": "Yale",
  "princeton.edu": "Princeton",
  "columbia.edu": "Columbia",
  "upenn.edu": "UPenn",
  "brown.edu": "Brown",
  "dartmouth.edu": "Dartmouth",
  "cornell.edu": "Cornell",

  // Art & design
  "newschool.edu": "Parsons",
  "scad.edu": "SCAD",
  "fitnyc.edu": "FIT",

  // Other private / notable schools
  "usc.edu": "USC",
  "stanford.edu": "Stanford",
  "nyu.edu": "NYU",
  "umich.edu": "University of Michigan",
  "fordham.edu": "Fordham",
  "pace.edu": "Pace",
  "jjay.cuny.edu": "John Jay",
  "hunter.cuny.edu": "Hunter College",
  "lmu.edu": "LMU",
  "usfca.edu": "University of San Francisco",
  "pepperdine.edu": "Pepperdine",
  "chapman.edu": "Chapman",
  "uconn.edu": "University of Connecticut",
  "fau.edu": "Florida Atlantic University",
  "fsu.edu": "Florida State University",
  "ufl.edu": "University of Florida",
  "miami.edu": "University of Miami",
  "gatech.edu": "Georgia Tech",
  "uga.edu": "University of Georgia",
  "howard.edu": "Howard University",
  "american.edu": "American University",
  "georgetown.edu": "Georgetown University",
  "northeastern.edu": "Northeastern",
  "bu.edu": "Boston University",
  "bc.edu": "Boston College",

  // Community college — NOTE: real domain is student.smc.edu, not smc.edu
  // (the iOS app previously had this wrong as smc.edu — fixed there too)
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
