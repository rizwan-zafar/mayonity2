"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CALCULATOR_CONTACT_PREFILL_KEY,
  WEBSITE_COST_CALCULATOR_CONFIG as CFG,
} from "@/lib/websiteCostCalculatorConfig";
import { computeEstimate, isEstimateComplete } from "@/lib/websiteCostCalculator";
import { QuoteReviewPromo } from "@/components/marketing/QuoteReviewPromo";
import { trackEvent } from "@/lib/trackEvent";

const DEFAULT_STATE = {
  country: "singapore",
  siteType: "small_business",
  pageTier: "6_to_15",
  extras: [],
  timeline: "flexible",
};

export function WebsiteCostCalculator() {
  const [state, setState] = useState(DEFAULT_STATE);
  const startedRef = useRef(false);
  const lastResultKeyRef = useRef("");

  const patch = useCallback((partial) => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("calculator_start");
    }
    setState((prev) => ({ ...prev, ...partial }));
  }, []);

  const toggleExtra = (id) => {
    setState((prev) => {
      if (!startedRef.current) {
        startedRef.current = true;
        trackEvent("calculator_start");
      }
      const exists = prev.extras.includes(id);
      return {
        ...prev,
        extras: exists ? prev.extras.filter((x) => x !== id) : [...prev.extras, id],
      };
    });
  };

  const estimate = useMemo(() => {
    if (!isEstimateComplete(state)) return null;
    return computeEstimate(state);
  }, [state]);

  useEffect(() => {
    if (!estimate || !isEstimateComplete(state)) return;
    const key = `${state.country}:${state.siteType}:${estimate.low}:${estimate.high}`;
    if (lastResultKeyRef.current === key) return;
    lastResultKeyRef.current = key;
    trackEvent("calculator_result", {
      country: state.country,
      site_type: state.siteType,
    });
  }, [estimate, state.country, state.siteType, state]);

  const country = CFG.countries[state.country];
  const contactHref = `/contact?source=calculator&type=${encodeURIComponent(state.siteType)}&country=${encodeURIComponent(state.country)}`;

  const onCtaClick = () => {
    trackEvent("calculator_cta_click");
    if (!estimate) return;
    try {
      sessionStorage.setItem(
        CALCULATOR_CONTACT_PREFILL_KEY,
        JSON.stringify({
          type: state.siteType,
          country: state.country,
          range: estimate.formattedRange,
        }),
      );
    } catch {
      // no-op
    }
  };

  return (
    <div className="glass grid gap-8 rounded-[1.8rem] p-6 md:p-8">
      <div className="grid gap-6">
        <Fieldset legend="Country">
          <OptionGrid
            options={Object.entries(CFG.countries).map(([id, c]) => ({ id, label: c.label }))}
            value={state.country}
            onChange={(country) => patch({ country })}
            name="country"
          />
        </Fieldset>

        <Fieldset legend="Type of site">
          <OptionGrid
            options={Object.entries(CFG.siteTypes).map(([id, t]) => ({ id, label: t.label }))}
            value={state.siteType}
            onChange={(siteType) => patch({ siteType })}
            name="siteType"
            columns="md:grid-cols-2"
          />
        </Fieldset>

        <Fieldset legend="Number of pages">
          <OptionGrid
            options={CFG.pageTiers.map((t) => ({ id: t.id, label: t.label }))}
            value={state.pageTier}
            onChange={(pageTier) => patch({ pageTier })}
            name="pageTier"
            columns="md:grid-cols-2"
          />
        </Fieldset>

        <Fieldset legend="Extras">
          <div className="grid gap-3 sm:grid-cols-2">
            {CFG.extras.map((extra) => (
              <label
                key={extra.id}
                className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm transition hover:border-cyan/30"
              >
                <input
                  type="checkbox"
                  className="mt-1 accent-cyan"
                  checked={state.extras.includes(extra.id)}
                  onChange={() => toggleExtra(extra.id)}
                />
                <span>{extra.label}</span>
              </label>
            ))}
          </div>
        </Fieldset>

        <Fieldset legend="Timeline">
          <OptionGrid
            options={CFG.timelines.map((t) => ({ id: t.id, label: t.label }))}
            value={state.timeline}
            onChange={(timeline) => patch({ timeline })}
            name="timeline"
            columns="md:grid-cols-3"
          />
        </Fieldset>
      </div>

      {estimate ? (
        <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">Typical range</p>
          <p className="display mt-3 text-3xl text-white md:text-4xl">{estimate.formattedRange}</p>
          <p className="mt-4 text-sm text-muted">{estimate.priceDriverLine}</p>

          <div className="mt-8 space-y-3 text-sm text-muted">
            <p>Ranges come from published guides and our own experience. This is not a quote.</p>
            <p>Our smallest projects start at USD 1,000.</p>
            <QuoteReviewPromo />
          </div>

          <Link
            href={contactHref}
            onClick={onCtaClick}
            className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
          >
            Share your budget
          </Link>

          {country?.costGuide ? (
            <p className="mt-6 text-sm">
              <a href={country.costGuide.href} className="text-cyan hover:underline">
                {country.costGuide.linkText}
              </a>
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function Fieldset({ legend, children }) {
  return (
    <fieldset className="grid gap-3 border-0 p-0">
      <legend className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{legend}</legend>
      {children}
    </fieldset>
  );
}

function OptionGrid({ options, value, onChange, name, columns = "md:grid-cols-2" }) {
  return (
    <div className={`grid gap-2 ${columns}`}>
      {options.map((opt) => {
        const selected = value === opt.id;
        return (
          <label
            key={opt.id}
            className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
              selected
                ? "border-cyan/50 bg-cyan/10 text-white"
                : "border-white/10 bg-white/[0.02] text-white/90 hover:border-white/20"
            }`}
          >
            <input
              type="radio"
              name={name}
              className="accent-cyan"
              checked={selected}
              onChange={() => onChange(opt.id)}
            />
            <span>{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
}
