/**
 * Maps known .edu email domains to a readable campus name.
 * Add more schools here as Major expands to new campuses.
 * Unrecognized .edu domains fall back to a title-cased guess from the domain.
 *
 * SYNCED WITH: Major (iOS app) CampusDirectory.swift — keep these two files'
 * domain -> name pairs identical.
 *
 * KNOWN LIMITATIONS (flagged, not silently ignored):
 * - Oxford: skipped for now. Oxford has no single student email domain —
 *   undergrads get per-college addresses (e.g. @merton.ox.ac.uk,
 *   @keble.ox.ac.uk), which needs suffix-matching logic, not a dictionary
 *   entry. Also non-.edu, so RegistrationView.swift's .edu-only check
 *   needs loosening first regardless.
 * - Central Saint Martins / University of the Arts London: same
 *   non-.edu blocker (arts.ac.uk) — skipped alongside Oxford.
 * - NYU Abu Dhabi: cannot be distinguished from regular NYU — both use
 *   the exact same @nyu.edu domain (confirmed directly by NYU: "only
 *   emails from an @nyu.edu domain are affiliated with NYU Abu Dhabi").
 *   No domain-based fix exists for this one.
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

  // LA-area private
  "usc.edu": "USC",
  "lmu.edu": "LMU",
  "pepperdine.edu": "Pepperdine",
  "oxy.edu": "Occidental College",
  "otis.edu": "Otis College of Art and Design",
  "artcenter.edu": "ArtCenter College of Design",
  "fidm.edu": "FIDM",

  // Orange County private
  "chapman.edu": "Chapman",
  "vanguard.edu": "Vanguard University",
  "cui.edu": "Concordia University Irvine",

  // San Diego private
  "sandiego.edu": "University of San Diego",
  "pointloma.edu": "Point Loma Nazarene University",

  // Stanford / Silicon Valley private
  "stanford.edu": "Stanford",
  "scu.edu": "Santa Clara University",
  "menlo.edu": "Menlo College",

  // Ole Miss
  "olemiss.edu": "University of Mississippi",

  // Women's colleges
  "wellesley.edu": "Wellesley College",
  "smith.edu": "Smith College",
  "mtholyoke.edu": "Mount Holyoke College",
  "brynmawr.edu": "Bryn Mawr College",
  "barnard.edu": "Barnard College",
  "scrippscollege.edu": "Scripps College",
  "agnesscott.edu": "Agnes Scott College",
  "simmons.edu": "Simmons University",
  "hollins.edu": "Hollins University",
  "sbc.edu": "Sweet Briar College",

  // HBCUs
  "spelman.edu": "Spelman College",
  "morehouse.edu": "Morehouse College",
  "hamptonu.edu": "Hampton University",
  "tuskegee.edu": "Tuskegee University",
  "famu.edu": "Florida A&M University",
  "ncat.edu": "North Carolina A&T State University",
  "xula.edu": "Xavier University of Louisiana",
  "fisk.edu": "Fisk University",
  "cau.edu": "Clark Atlanta University",
  "howard.edu": "Howard University",

  // Design schools
  "newschool.edu": "Parsons",
  "scad.edu": "SCAD",
  "fitnyc.edu": "FIT",
  "risd.edu": "RISD",
  "pratt.edu": "Pratt Institute",
  "cca.edu": "California College of the Arts",
  "saic.edu": "School of the Art Institute of Chicago",

  // Global / study abroad
  "aup.edu": "American University of Paris",
  "lse.ac.uk": "London School of Economics",
  // NOTE: arts.ac.uk is shared by ALL SIX University of the Arts London
  // colleges (Central Saint Martins, Chelsea, Camberwell, London College
  // of Fashion, London College of Communication, Wimbledon) — there's no
  // way to tell them apart by domain alone. Every student from any of
  // the six will show as "Central Saint Martins" here. Change to
  // "University of the Arts London" if that's a better fit.
  "arts.ac.uk": "Central Saint Martins",

  // Previously-existing private schools (already live before this list
  // was expanded — kept so any existing signed-up users aren't broken;
  // flag any of these you'd rather remove)
  "nyu.edu": "NYU",
  "umich.edu": "University of Michigan",
  "fordham.edu": "Fordham",
  "pace.edu": "Pace",
  "jjay.cuny.edu": "John Jay",
  "hunter.cuny.edu": "Hunter College",
  "usfca.edu": "University of San Francisco",
  "gatech.edu": "Georgia Tech",
  "uga.edu": "University of Georgia",
  "american.edu": "American University",
  "georgetown.edu": "Georgetown University",

  // Community college — real domain is student.smc.edu, not smc.edu
  "student.smc.edu": "Santa Monica College",
};

export function isEduEmail(email) {
  const domain = (email.trim().split("@")[1] || "").toLowerCase();
  // FIXED: previously required .edu unconditionally, which blocks every
  // non-US school (LSE, Central Saint Martins, Oxford, etc.) regardless
  // of whether we've vetted and added their domain. Now also accepts any
  // domain explicitly listed in KNOWN_CAMPUSES, even if it doesn't end
  // in .edu — this does NOT open the door to arbitrary non-.edu domains,
  // only ones we've deliberately added above.
  return /\.edu$/i.test(domain) || Object.prototype.hasOwnProperty.call(KNOWN_CAMPUSES, domain);
}

export function campusFromEmail(email) {
  const domain = (email.trim().split("@")[1] || "").toLowerCase();
  if (KNOWN_CAMPUSES[domain]) return KNOWN_CAMPUSES[domain];

  const base = domain.replace(/\.edu$/i, "");
  return base ? base.charAt(0).toUpperCase() + base.slice(1) : "Unknown Campus";
}
