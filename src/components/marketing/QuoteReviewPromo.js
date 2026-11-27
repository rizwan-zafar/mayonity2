import Link from "next/link";

export const QUOTE_REVIEW_CONTACT_PATH = "/contact?source=quote-review";

export const QUOTE_REVIEW_SERVICE_OPTION = "I have a quote and want a second opinion";

export const COST_GUIDE_SLUGS_WITH_QUOTE_PROMO = [
  "website-development-cost-singapore",
  "website-development-cost-malaysia",
  "website-development-cost-australia",
  "web-development-cost",
];

export function QuoteReviewPromo({ className = "" }) {
  return (
    <p className={`text-sm text-muted ${className}`.trim()}>
      Got a quote you are not sure about?{" "}
      <Link href={QUOTE_REVIEW_CONTACT_PATH} className="text-cyan hover:underline">
        Send it to us and we will tell you what to check.
      </Link>
    </p>
  );
}