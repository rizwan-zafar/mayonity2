import { WEBSITE_COST_CALCULATOR_CONFIG as CFG } from "@/lib/websiteCostCalculatorConfig";

function roundToHundred(value) {
  return Math.round(value / 100) * 100;
}

function formatMoney(amount, symbol, currency) {
  const formatted = amount.toLocaleString("en-US");
  if (currency === "USD" && symbol === "USD") {
    return `USD ${formatted}`;
  }
  return `${symbol}${formatted}`;
}

function pageTierIndex(tierId) {
  return CFG.pageTiers.findIndex((t) => t.id === tierId);
}

/**
 * @param {{
 *   country: string;
 *   siteType: string;
 *   pageTier: string;
 *   extras: string[];
 *   timeline: string;
 * }} input
 */
export function computeEstimate(input) {
  const country = CFG.countries[input.country];
  const siteType = CFG.siteTypes[input.siteType];
  if (!country || !siteType) return null;

  const range = siteType.ranges[country.currency];
  if (!range) return null;

  let low = range[0];
  let high = range[1];

  const { extraLow, extraHigh, pageOverageLow, pageOverageHigh, urgent } = CFG.multipliers;
  const extraCount = (input.extras || []).length;

  for (let i = 0; i < extraCount; i++) {
    low *= 1 + extraLow;
    high *= 1 + extraHigh;
  }

  const selectedTierIdx = pageTierIndex(input.pageTier);
  const defaultTierIdx = pageTierIndex(siteType.defaultPageTier);
  const hasPageOverage = selectedTierIdx > defaultTierIdx && selectedTierIdx >= 0;
  if (hasPageOverage) {
    low *= 1 + pageOverageLow;
    high *= 1 + pageOverageHigh;
  }

  const isUrgent = input.timeline === "urgent";
  if (isUrgent) {
    low *= 1 + urgent;
    high *= 1 + urgent;
  }

  low = roundToHundred(low);
  high = roundToHundred(high);
  if (high < low) high = low;

  const formattedRange = `${formatMoney(low, country.symbol, country.currency)}–${formatMoney(high, country.symbol, country.currency)}`;

  return {
    low,
    high,
    formattedRange,
    currency: country.currency,
    symbol: country.symbol,
    priceDriverLine: buildPriceDriverLine(input, { hasPageOverage, extraCount, isUrgent }),
  };
}

/**
 * @param {ReturnType<typeof computeEstimate>} estimate
 * @param {string} countryId
 * @param {string} siteTypeId
 */
export function isEstimateComplete(input) {
  return Boolean(
    input?.country &&
      input?.siteType &&
      input?.pageTier &&
      input?.timeline &&
      CFG.countries[input.country] &&
      CFG.siteTypes[input.siteType],
  );
}

function buildPriceDriverLine(input, { hasPageOverage, extraCount, isUrgent }) {
  const drivers = [];

  if (extraCount > 0) {
    const labels = (input.extras || [])
      .map((id) => CFG.extras.find((e) => e.id === id)?.label)
      .filter(Boolean);
    const names = labels.length <= 2 ? labels.join(" and ") : `${labels.slice(0, 2).join(", ")} and other features`;
    drivers.push({ weight: extraCount * 10, line: `${names} usually push the top of the range up.` });
  }

  if (hasPageOverage) {
    const tierLabel = CFG.pageTiers.find((t) => t.id === input.pageTier)?.label || "More pages";
    drivers.push({
      weight: 8,
      line: `${tierLabel} compared with a typical site of this type often adds scope and cost.`,
    });
  }

  if (isUrgent) {
    drivers.push({ weight: 7, line: "A tight timeline usually increases cost because teams need to prioritise your work." });
  }

  if (!drivers.length) {
    return "Scope and integrations are the main levers — tell us what you need on the contact form for a tighter figure.";
  }

  drivers.sort((a, b) => b.weight - a.weight);
  return drivers[0].line;
}

export function getSiteTypeLabel(id) {
  return CFG.siteTypes[id]?.label || id;
}

export function getCountryLabel(id) {
  return CFG.countries[id]?.label || id;
}