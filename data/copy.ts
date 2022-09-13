const copy = {
  header: "Fate/Grand Savings",
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
    detail: "SQ gained from events"
  },
  login: {
    both: "Cumulative and daily login sq",
    total: {
      label: "Cumulative Logins",
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
        "Adjust the sliders to allocate a budget for each campaign. Calculated probabilities are for at least 1 copy of the rate up target.  NP markers indicate the number of SQ required for a 50% chance of obtaining the NP value. ",
      subheaderDisclaimer:
        "These calculations DO NOT incorporate ten pull guaranteed 4*. Campaigns with multiple rate ups of the same rarity assume that percentages are split equally. For servants, the sliders by default end at the MAXIMUM amount of SQ you could have by the end of the campaign if you have spent none beforehand. Therefore, if you budget (and then spend) for a servant prior, you will not have the maximum listed. To accommodate for purchased SQ, modify your current SQ on step 1.",
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
  welcome: "An FGO SQ Savings Calculator with NA 2022 Summon Rates",
  description:
    "Add your current summon currency, your summon targets, and figure out how much you need to save for multiple summon targets.",
  dateinvalid:
    "This servant doesn't have any banners during your savings timeframe.",
  updates:
    "Updates: Site last updated 09/13/2022 with per target SQ projections. If you encounter any issues you may need to fill out steps 1 and 2 again."
};

export default copy;
