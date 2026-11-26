/** Single editable source for calculator ranges, guides, and labels. */

export const WEBSITE_COST_CALCULATOR_CONFIG = {
  multipliers: {
    extraLow: 0.05,
    extraHigh: 0.15,
    pageOverageLow: 0.1,
    pageOverageHigh: 0.25,
    urgent: 0.15,
  },

  pageTiers: [
    { id: "up_to_5", label: "Up to 5" },
    { id: "6_to_15", label: "6 to 15" },
    { id: "16_to_40", label: "16 to 40" },
    { id: "40_plus", label: "40+" },
  ],

  extras: [
    { id: "booking_forms", label: "Booking or forms" },
    { id: "online_payments", label: "Online payments" },
    { id: "login_accounts", label: "Login accounts" },
    { id: "multi_language", label: "Multi-language" },
    { id: "custom_design", label: "Custom design (not a template)" },
  ],

  timelines: [
    { id: "flexible", label: "Flexible" },
    { id: "within_2_months", label: "Within 2 months" },
    { id: "urgent", label: "Urgent" },
  ],

  countries: {
    singapore: {
      label: "Singapore",
      currency: "SGD",
      symbol: "S$",
      costGuide: {
        href: "/blog/website-development-cost-singapore",
        linkText: "Read our Singapore website cost guide",
      },
    },
    malaysia: {
      label: "Malaysia",
      currency: "MYR",
      symbol: "RM",
      costGuide: {
        href: "/blog/website-development-cost-malaysia",
        linkText: "Read our Malaysia website cost guide",
      },
    },
    australia: {
      label: "Australia",
      currency: "AUD",
      symbol: "A$",
      costGuide: {
        href: "/blog/website-development-cost-australia",
        linkText: "Read our Australia website cost guide",
      },
    },
    other: {
      label: "Other",
      currency: "USD",
      symbol: "USD",
      costGuide: {
        href: "/blog/web-development-cost",
        linkText: "Read our website development cost guide",
      },
    },
  },

  siteTypes: {
    basic_informational: {
      label: "Basic informational",
      defaultPageTier: "up_to_5",
      ranges: {
        SGD: [1500, 4000],
        MYR: [3000, 8000],
        AUD: [1500, 3500],
        USD: [1000, 3000],
      },
    },
    small_business: {
      label: "Small business site",
      defaultPageTier: "6_to_15",
      ranges: {
        SGD: [3000, 10000],
        MYR: [6000, 20000],
        AUD: [3000, 10000],
        USD: [2000, 8000],
      },
    },
    custom_corporate: {
      label: "Custom corporate site",
      defaultPageTier: "6_to_15",
      ranges: {
        SGD: [10000, 30000],
        MYR: [20000, 60000],
        AUD: [8000, 25000],
        USD: [7000, 20000],
      },
    },
    online_store: {
      label: "Online store",
      defaultPageTier: "6_to_15",
      ranges: {
        SGD: [8000, 35000],
        MYR: [15000, 70000],
        AUD: [10000, 30000],
        USD: [6000, 30000],
      },
    },
    custom_web_app: {
      label: "Custom web app",
      defaultPageTier: "16_to_40",
      ranges: {
        SGD: [30000, 100000],
        MYR: [60000, 200000],
        AUD: [30000, 100000],
        USD: [20000, 80000],
      },
    },
  },
};

export const CALCULATOR_CONTACT_PREFILL_KEY = "mayonity_calculator_contact_prefill";