// Data source for app/resources/page.js
// Shape expected: CAMPUS_RESOURCES[campusName] = { reuse, donation, ewaste }
// where each is { url, label }. Campus name keys must match campusFromEmail.js exactly.

export const CAMPUS_RESOURCES = {
  // University of California
  "UC Berkeley": {
    reuse: { url: "https://reuse.studentorg.berkeley.edu/about-page/", label: "Cal Student Store Reuse Program" },
    donation: { url: "https://berkeleyca.gov/community-recreation/news/reduce-reuse-recycle-students-move-out-keep-berkeley-clean-0", label: "City of Berkeley Move-Out Guide" },
    ewaste: { url: "https://facilities.berkeley.edu/operating-units/campus-operations/cal-zero-waste/zero-waste-programs/reuse", label: "Cal Zero Waste Reuse Program" },
  },
  "UC Davis": {
    reuse: { url: "https://housing.ucdavis.edu/sustainability/move-out/", label: "UC Davis Housing Move-Out Guide" },
    donation: { url: "https://www.cityofdavis.org/city-hall/public-works/recycling-and-waste-management", label: "City of Davis Recycling & Waste" },
    ewaste: { url: "https://sustainability.ucdavis.edu/recycling-a-z/bulk-recycle", label: "UC Davis Bulk Recycling" },
  },
  "UC Irvine": {
    reuse: { url: "https://sites.uci.edu/housingsustainability/modd/", label: "UCI Move-Out Donation Drive" },
    donation: { url: "https://basicneeds.uci.edu/", label: "UCI Basic Needs Center" },
    ewaste: { url: "https://housing.uci.edu/ug-move-out/", label: "UCI Housing Move-Out Info" },
  },
  "UCLA": {
    reuse: { url: "https://sustain.ucla.edu/move-out-resources/", label: "UCLA Move-Out Resources" },
    donation: { url: "https://sustain.ucla.edu/zero-waste/surplus-stop/", label: "UCLA Surplus Stop" },
    ewaste: { url: "https://www.ladwp.com/community-environment/safe-centers", label: "LADWP E-Waste Safe Centers" },
  },
  "UC Merced": {
    reuse: { url: "https://sustainability.ucmerced.edu/", label: "UC Merced Sustainability" },
    donation: { url: "https://housing.ucmerced.edu/", label: "UC Merced Housing" },
    ewaste: { url: "https://calrecycle.ca.gov/electronics/", label: "CalRecycle E-Waste Program" },
  },
  "UC Riverside": {
    reuse: { url: "https://sustainability.ucr.edu/", label: "UC Riverside Sustainability" },
    donation: { url: "https://housing.ucr.edu/", label: "UC Riverside Housing" },
    ewaste: { url: "https://calrecycle.ca.gov/electronics/", label: "CalRecycle E-Waste Program" },
  },
  "UC San Diego": {
    reuse: { url: "https://studentsustainability.ucsd.edu/sustainable-move-out/index.html", label: "UCSD Sustainable Move-Out" },
    donation: { url: "https://thehub.ucsd.edu/donate/index.html", label: "UCSD The Hub Donations" },
    ewaste: { url: "https://studentsustainability.ucsd.edu/sustainable-move-out/index.html", label: "UCSD Sustainable Move-Out" },
  },
  "UC San Francisco": {
    reuse: { url: "https://supplychain.ucsf.edu/surplus-property", label: "UCSF Surplus Property" },
    donation: { url: "https://www.goodwill.org/locator/", label: "Goodwill Donation Locator" },
    ewaste: { url: "https://calrecycle.ca.gov/electronics/", label: "CalRecycle E-Waste Program" },
  },
  "UC Santa Barbara": {
    reuse: { url: "https://www.dls.ucsb.edu/surplus-sales/move-out2026", label: "UCSB Move-Out Surplus Sales" },
    donation: { url: "https://islavistacsd.ca.gov/move-out-2026", label: "Isla Vista Move-Out Guide" },
    ewaste: { url: "https://www.dls.ucsb.edu/surplus-sales", label: "UCSB Surplus Sales" },
  },
  "UC Santa Cruz": {
    reuse: { url: "https://housing.ucsc.edu/dates-deadlines/move-out/", label: "UCSC Housing Move-Out" },
    donation: { url: "https://goodwillcentralcoast.org/", label: "Goodwill Central Coast" },
    ewaste: { url: "https://www2.santacruzcounty.us/iwma/", label: "Santa Cruz County Waste Management" },
  },

  // California State University
  "CSU Bakersfield": {
    reuse: { url: "https://www.csub.edu/sustainability/", label: "CSUB Sustainability" },
    donation: { url: "https://www.goodwill.org/locator/", label: "Goodwill Donation Locator" },
    ewaste: { url: "https://calrecycle.ca.gov/electronics/", label: "CalRecycle E-Waste Program" },
  },
  "CSU Channel Islands": {
    reuse: { url: "https://www.csuci.edu/sustainability/", label: "CSUCI Sustainability" },
    donation: { url: "https://www.goodwill.org/locator/", label: "Goodwill Donation Locator" },
    ewaste: { url: "https://calrecycle.ca.gov/electronics/", label: "CalRecycle E-Waste Program" },
  },
  "Chico State": {
    reuse: { url: "https://www.csuchico.edu/sustainability/", label: "Chico State Sustainability" },
    donation: { url: "https://www.goodwill.org/locator/", label: "Goodwill Donation Locator" },
    ewaste: { url: "https://www.buttecounty.net/733/Recycling", label: "Butte County Recycling" },
  },
  "CSU Dominguez Hills": {
    reuse: { url: "https://www.csudh.edu/sustainability/", label: "CSUDH Sustainability" },
    donation: { url: "https://www.goodwill.org/locator/", label: "Goodwill Donation Locator" },
    ewaste: { url: "https://pw.lacounty.gov/epd/hhw/", label: "LA County Household Hazardous Waste" },
  },
  "CSU East Bay": {
    reuse: { url: "https://www.csueastbay.edu/sustainability/", label: "CSU East Bay Sustainability" },
    donation: { url: "https://www.goodwill.org/locator/", label: "Goodwill Donation Locator" },
    ewaste: { url: "https://www.stopwaste.org/at-home/household-hazardous-waste", label: "StopWaste Household Hazardous Waste" },
  },
  "Fresno State": {
    reuse: { url: "https://sustainability.fresnostate.edu/", label: "Fresno State Sustainability" },
    donation: { url: "https://goodwillsjv.org/", label: "Goodwill San Joaquin Valley" },
    ewaste: { url: "https://www.fresnocountyca.gov/Departments/Public-Works-and-Planning/Division-of-Resources-Recycling-and-Recovery", label: "Fresno County Recycling & Recovery" },
  },
  "Cal State Fullerton": {
    reuse: { url: "https://sustainability.fullerton.edu/", label: "CSUF Sustainability" },
    donation: { url: "https://www.ocgoodwill.org/donate/", label: "OC Goodwill Donations" },
    ewaste: { url: "https://www.oclandfills.com/hazardous-waste", label: "OC Landfills Hazardous Waste" },
  },
  "Cal Poly Humboldt": {
    reuse: { url: "https://www.humboldt.edu/wrrap/donation-dash", label: "Humboldt WRRAP Donation Dash" },
    donation: { url: "https://www.humboldt.edu/wrrap", label: "Humboldt WRRAP Program" },
    ewaste: { url: "https://humboldtgov.org/265/Household-Hazardous-Waste", label: "Humboldt County Household Hazardous Waste" },
  },
  "Cal State Long Beach": {
    reuse: { url: "https://www.csulb.edu/sustainability", label: "CSULB Sustainability" },
    donation: { url: "https://longbeach.gov/lbrecycles/waste-reduction/reduce-waste/donation-guide/", label: "Long Beach Donation Guide" },
    ewaste: { url: "https://longbeach.gov/lbrecycles/waste-reduction/household-hazardous-waste/", label: "Long Beach Household Hazardous Waste" },
  },
  "Cal State LA": {
    reuse: { url: "https://www.calstatela.edu/housing/spring-move-out-closing-information", label: "Cal State LA Move-Out Info" },
    donation: { url: "https://www.goodwill.org/locator/", label: "Goodwill Donation Locator" },
    ewaste: { url: "https://www.ladwp.com/community-environment/safe-centers", label: "LADWP E-Waste Safe Centers" },
  },
  "Cal Maritime": {
    reuse: { url: "https://www.csum.edu/sustainability/", label: "Cal Maritime Sustainability" },
    donation: { url: "https://www.goodwill.org/locator/", label: "Goodwill Donation Locator" },
    ewaste: { url: "https://calrecycle.ca.gov/electronics/", label: "CalRecycle E-Waste Program" },
  },
  "CSU Monterey Bay": {
    reuse: { url: "https://csumb.edu/sustainability/", label: "CSUMB Sustainability" },
    donation: { url: "https://goodwillcentralcoast.org/", label: "Goodwill Central Coast" },
    ewaste: { url: "https://www.co.monterey.ca.us/government/departments-i-z/public-works/maintenance-and-utilities/solid-waste-and-recycling", label: "Monterey County Solid Waste & Recycling" },
  },
  "CSUN": {
    reuse: { url: "https://www.csun.edu/sustainability/facilities-sustainability/zero-waste/matador-move-move-out", label: "CSUN Matador Move Move-Out" },
    donation: { url: "https://www.goodwill.org/locator/", label: "Goodwill Donation Locator" },
    ewaste: { url: "https://www.ladwp.com/community-environment/safe-centers", label: "LADWP E-Waste Safe Centers" },
  },
  "Cal Poly Pomona": {
    reuse: { url: "https://www.cpp.edu/sustainability/", label: "Cal Poly Pomona Sustainability" },
    donation: { url: "https://www.habitat.org/restores", label: "Habitat for Humanity ReStore" },
    ewaste: { url: "https://calrecycle.ca.gov/electronics/", label: "CalRecycle E-Waste Program" },
  },
  "Sacramento State": {
    reuse: { url: "https://www.csus.edu/experience/sustainability/", label: "Sacramento State Sustainability" },
    donation: { url: "https://goodwillsacto.org/", label: "Goodwill Sacramento" },
    ewaste: { url: "https://wmr.saccounty.gov/Pages/default.aspx", label: "Sacramento County Waste Management" },
  },
  "Cal State San Bernardino": {
    reuse: { url: "https://www.csusb.edu/sustainability", label: "CSUSB Sustainability" },
    donation: { url: "https://www.goodwill.org/locator/", label: "Goodwill Donation Locator" },
    ewaste: { url: "https://www.sandiegocounty.gov/content/sdc/dpw/recycling.html", label: "San Diego County Recycling" },
  },
  "San Diego State": {
    reuse: { url: "https://housing.sdsu.edu/about/sustainability", label: "SDSU Housing Sustainability" },
    donation: { url: "https://sdgoodwill.org/donate/", label: "San Diego Goodwill" },
    ewaste: { url: "https://www.sandiego.gov/environmental-services/recycling/events", label: "City of San Diego Recycling Events" },
  },
  "San Francisco State": {
    reuse: { url: "https://sustain.sfsu.edu/", label: "SF State Sustainability" },
    donation: { url: "https://sfgoodwill.org/donate/", label: "San Francisco Goodwill" },
    ewaste: { url: "https://www.recology.com/recology-san-francisco/", label: "Recology San Francisco" },
  },
  "San José State": {
    reuse: { url: "https://www.sjsu.edu/sustainability/", label: "SJSU Sustainability" },
    donation: { url: "https://www.sanjoseca.gov/your-government/departments-offices/environmental-services/recycling-garbage/residents/how-to-recycle-right/donate-your-stuff", label: "City of San José Donate Your Stuff" },
    ewaste: { url: "https://recyclestuff.org/", label: "RecycleStuff.org" },
  },
  "Cal Poly San Luis Obispo": {
    reuse: { url: "https://afd.calpoly.edu/sustainability/campus-action/zero-waste/cp-thrift", label: "Cal Poly Thrift" },
    donation: { url: "https://www.slocity.org/government/department-directory/public-works/clean-city/solid-waste-reduction/donate-unwanted-items", label: "SLO City Donation Guide" },
    ewaste: { url: "https://afd.calpoly.edu/sustainability/campus-action/zero-waste/", label: "Cal Poly Zero Waste Program" },
  },
  "CSU San Marcos": {
    reuse: { url: "https://www.csusm.edu/sustainability/", label: "CSUSM Sustainability" },
    donation: { url: "https://sdgoodwill.org/donate/", label: "San Diego Goodwill" },
    ewaste: { url: "https://www.sandiegocounty.gov/content/sdc/dpw/recycling.html", label: "San Diego County Recycling" },
  },
  "Sonoma State": {
    reuse: { url: "https://housing.sonoma.edu/node/576", label: "Sonoma State Housing Move-Out" },
    donation: { url: "https://zerowastesonoma.gov/", label: "Zero Waste Sonoma" },
    ewaste: { url: "https://zerowastesonoma.gov/materials/household-hazardous-waste", label: "Zero Waste Sonoma Household Hazardous Waste" },
  },
  "Stanislaus State": {
    reuse: { url: "https://www.csustan.edu/sustainability", label: "Stanislaus State Sustainability" },
    donation: { url: "https://goodwillsjv.org/", label: "Goodwill San Joaquin Valley" },
    ewaste: { url: "https://www.stancounty.com/publicworks/recycling.shtm", label: "Stanislaus County Recycling" },
  },
  // Add this as a new section, after the CSU block (before the closing `};`)
// in lib/campusResources.js. I used "USC" as the key, following the same
// short-name convention as your "UCLA" and "CSUN" entries — confirm this
// matches whatever campusFromEmail.js actually outputs for usc.edu addresses.

  // Private Universities
  "USC": {
    reuse: { url: "https://sustainability.usc.edu/take-action/waste-resources/", label: "USC Sustainability — Waste & Reuse Resources" },
    donation: { url: "https://studentbasicneeds.usc.edu/programs-and-services/tommys-closet/", label: "Tommy's Closet (Student Basic Needs)" },
    ewaste: { url: "https://sustainability.usc.edu/take-action/waste-resources/", label: "E-Waste, Batteries & Ink Recycling" },
  },
};
