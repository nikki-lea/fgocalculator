const copy = {
  header: "FGO SQ Calculator",
  subheader: "Current SQ and Savings Timeframe",
  current: {
    general: "Current Summon Currency",
    sq: "Current SQ",
    ticket: "Current tickets",
    error: "Savings start date and campaign end date are required."
  },
  alltickets: "Shop and current tickets",
  savings: {
    begin: "Savings start date",
    end: "End of savings timeframe"
  },
  sq: {
    name: "SQ",
    earned: "Sources for Earning SQ",
    addevent: "Add event SQ gained based on JP event history",
    future: "SQ Available by Timeframe End"
  },
  mission: {
    label: "Master Missions",
    detail: "3 SQ Weekly"
  },
  quest: "Quests, Maintenance, etc",
  event: {
    label: "Events",
    detail: "Based on SQ data up until 02/2025"
  },
  login: {
    both: "Total and daily login sq",
    total: {
      label: "Total Logins",
      detail: "Indicated under Master Profile"
    },
    daily: {
      label: "Daily Logins",
      detail: "Avg 1 SQ per day"
    }
  },
  shop: {
    label: "Shop Summon Tickets",
    detail: "Avg shop tickets bought monthly"
  },
  rateup: {
    chance: {
      header: "Rate-up Probability",
      subheader:
        "Adjust the sliders to allocate a budget for each campaign. The maximum allocation supported is 4000 SQ for a given servant due to CPU precompute limitations and bundle size. The probability calculated is for getting at LEAST the NP specified. Shared banners aren't precomputed so they may take some time, especially for large SQ.",
      subheaderDisclaimer:
        "Assumes a 0.8% SSR rate and 1.5% SR rate for a single rate up. These calculations DO NOT incorporate ten pull guaranteed 4*. Pity is not included in the NP2+ calculations. Campaigns with multiple rate ups of the same rarity assume that percentages are split equally. For servants, the sliders by default end at the MAXIMUM amount of SQ you could have by the end of the campaign if you have spent none beforehand. To accommodate for purchased SQ, modify your current SQ on step 1. Note that these are only estimates. Master missions and login bonuses are based on weeks elapsed in your timeframe. Event SQ is calculated on a monthly basis, so it assumes that you have access to all event SQ for the month regardless of start/end date of the savings timeframe. NP1 uses a geometric probability, NP2+ uses cumulative binomial probability",
      probability: "Probability"
    },
    upcoming: "Upcoming summoning campaigns based on FGO JP"
  },
  target: {
    type: "Target Summon",
    multiple: "Budget for multiple roll targets",
    header: "Summon Targets",
    subheader:
      "Add your summon targets to calculate probabilities for getting each",
    error: "Type, rarity and shared rate up are required.",
    add: "Add",
    rarity: "Rarity",
    sharedtext: "Number of same type and rarity on rate up"
  },
  craftessence: "Craft Essence",
  servant: "Servant",
  next: "Next",
  back: "Back",
  excludeoptions: "Exclude from SQ applied for campaign:",
  servantname: "Servant Name",
  bannerlist: "Upcoming Banners based on JP",
  totalspent: "Total SQ Spent",
  credits: {
    banners: "Banner data from ",
    bannersLink: "Officer and Rat's Upcoming Banners Sheet. ",
    event: "Event saint quartz data from ",
    eventLink: "Zuth's FGO Event Compendium. ",
    wiki: "All images sourced from the most excellent ",
    wikiLink: "Fate/Grand Order Fandom Wiki."
  },
  disclaimer:
    "fgosavings.com is in no way affiliated with Lasengle, Aniplex or Type-Moon. ",
  contact: "Contact for feature requests and bug reports.",
  welcome: "Save SQ Using NA 2023 Summon Rates",
  description:
    "Add your current summon currency, your summon targets, and figure out how much you need to save for multiple summon targets at varying NP levels.",
  dateinvalid:
    "This servant doesn't have any banners during your savings timeframe.",
  updates: "Updates: 3/12/23 Probability for NP2+, bug fixes."
};

export default copy;
