import { FALLBACK_AFFILIATE_PAGE } from "@/data/fallbackAffiliate";
import type {
  AffiliateBenefitIcon,
  AffiliateBenefitItem,
  AffiliatePageContent,
  AffiliateProcessStep,
  AffiliateRequirement,
} from "@/data/fallbackAffiliate";
import type { CtaLink, HighlightedHeadline } from "@/lib/homeTypes";
import { isSanityConfigured, sanityClient } from "@/lib/sanity";

const ICON_VALUES: AffiliateBenefitIcon[] = [
  "book",
  "users",
  "award",
  "dumbbell",
  "globe",
  "map-pin",
  "check",
  "shield",
  "star",
  "heart",
];

function asCta(value: Partial<CtaLink> | undefined, fallback: CtaLink): CtaLink {
  if (!value?.label || !value?.href) return fallback;
  return { label: value.label, href: value.href };
}

function asHeadline(
  value: Partial<HighlightedHeadline> | undefined,
  fallback: HighlightedHeadline
): HighlightedHeadline {
  if (!value?.text) return fallback;
  return {
    text: value.text,
    goldPhrase: value.goldPhrase || fallback.goldPhrase,
  };
}

function asIcon(value: unknown, fallback: AffiliateBenefitIcon): AffiliateBenefitIcon {
  return ICON_VALUES.includes(value as AffiliateBenefitIcon)
    ? (value as AffiliateBenefitIcon)
    : fallback;
}

const AFFILIATE_QUERY = `*[_type == "affiliatePage"][0]{
  hero{
    eyebrow,
    headline{text, goldPhrase},
    subtext,
    primaryCta{label, href},
    secondaryCta{label, href},
    stats[]{value, label}
  },
  whatItMeans{
    eyebrow,
    headline{text, goldPhrase},
    body,
    price,
    pricePeriod,
    priceNote,
    priceDescription,
    includesLabel,
    includes
  },
  benefits{
    eyebrow,
    headline{text, goldPhrase},
    subtext,
    items[]{icon, title, description}
  },
  whoQualifies{
    eyebrow,
    headline{text, goldPhrase},
    body,
    primaryCta{label, href},
    secondaryCta{label, href},
    requirements[]{title, description}
  },
  process{
    eyebrow,
    headline{text, goldPhrase},
    subtext,
    steps[]{title, description}
  },
  networkQuote{eyebrow, quote, attribution},
  application{
    eyebrow,
    headline{text, goldPhrase},
    subtext,
    buttonLabel,
    url,
    stickyButtonLabel
  }
}`;

function mapAffiliate(doc: any): AffiliatePageContent {
  const f = FALLBACK_AFFILIATE_PAGE;
  if (!doc) return f;

  const benefitItems: AffiliateBenefitItem[] =
    Array.isArray(doc.benefits?.items) && doc.benefits.items.length
      ? doc.benefits.items
          .filter((item: any) => item?.title && item?.description)
          .slice(0, 10)
          .map((item: any, i: number) => ({
            icon: asIcon(item.icon, f.benefits.items[i]?.icon || "book"),
            title: item.title,
            description: item.description,
          }))
      : f.benefits.items;

  const requirements: AffiliateRequirement[] =
    Array.isArray(doc.whoQualifies?.requirements) && doc.whoQualifies.requirements.length
      ? doc.whoQualifies.requirements
          .filter((item: any) => item?.title && item?.description)
          .slice(0, 5)
          .map((item: any) => ({
            title: item.title,
            description: item.description,
          }))
      : f.whoQualifies.requirements;

  const steps: AffiliateProcessStep[] =
    Array.isArray(doc.process?.steps) && doc.process.steps.length
      ? doc.process.steps
          .filter((item: any) => item?.title && item?.description)
          .slice(0, 5)
          .map((item: any) => ({
            title: item.title,
            description: item.description,
          }))
      : f.process.steps;

  return {
    hero: {
      eyebrow: doc.hero?.eyebrow || f.hero.eyebrow,
      headline: asHeadline(doc.hero?.headline, f.hero.headline),
      subtext: doc.hero?.subtext || f.hero.subtext,
      primaryCta: asCta(doc.hero?.primaryCta, f.hero.primaryCta),
      secondaryCta: asCta(doc.hero?.secondaryCta, f.hero.secondaryCta),
      stats:
        Array.isArray(doc.hero?.stats) && doc.hero.stats.length
          ? doc.hero.stats
              .filter((s: any) => s?.value && s?.label)
              .slice(0, 4)
              .map((s: any) => ({ value: s.value, label: s.label }))
          : f.hero.stats,
    },
    whatItMeans: {
      eyebrow: doc.whatItMeans?.eyebrow || f.whatItMeans.eyebrow,
      headline: asHeadline(doc.whatItMeans?.headline, f.whatItMeans.headline),
      body:
        Array.isArray(doc.whatItMeans?.body) && doc.whatItMeans.body.length
          ? doc.whatItMeans.body.filter(Boolean)
          : f.whatItMeans.body,
      price: doc.whatItMeans?.price || f.whatItMeans.price,
      pricePeriod: doc.whatItMeans?.pricePeriod || f.whatItMeans.pricePeriod,
      priceNote: doc.whatItMeans?.priceNote || f.whatItMeans.priceNote,
      priceDescription: doc.whatItMeans?.priceDescription || f.whatItMeans.priceDescription,
      includesLabel: doc.whatItMeans?.includesLabel || f.whatItMeans.includesLabel,
      includes:
        Array.isArray(doc.whatItMeans?.includes) && doc.whatItMeans.includes.length
          ? doc.whatItMeans.includes.filter(Boolean)
          : f.whatItMeans.includes,
    },
    benefits: {
      eyebrow: doc.benefits?.eyebrow || f.benefits.eyebrow,
      headline: asHeadline(doc.benefits?.headline, f.benefits.headline),
      subtext: doc.benefits?.subtext || f.benefits.subtext,
      items: benefitItems,
    },
    whoQualifies: {
      eyebrow: doc.whoQualifies?.eyebrow || f.whoQualifies.eyebrow,
      headline: asHeadline(doc.whoQualifies?.headline, f.whoQualifies.headline),
      body:
        Array.isArray(doc.whoQualifies?.body) && doc.whoQualifies.body.length
          ? doc.whoQualifies.body.filter(Boolean)
          : f.whoQualifies.body,
      primaryCta: asCta(doc.whoQualifies?.primaryCta, f.whoQualifies.primaryCta),
      secondaryCta: asCta(doc.whoQualifies?.secondaryCta, f.whoQualifies.secondaryCta),
      requirements,
    },
    process: {
      eyebrow: doc.process?.eyebrow || f.process.eyebrow,
      headline: asHeadline(doc.process?.headline, f.process.headline),
      subtext: doc.process?.subtext || f.process.subtext,
      steps,
    },
    networkQuote: {
      eyebrow: doc.networkQuote?.eyebrow || f.networkQuote.eyebrow,
      quote: doc.networkQuote?.quote || f.networkQuote.quote,
      attribution: doc.networkQuote?.attribution || f.networkQuote.attribution,
    },
    application: {
      eyebrow: doc.application?.eyebrow || f.application.eyebrow,
      headline: asHeadline(doc.application?.headline, f.application.headline),
      subtext: doc.application?.subtext || f.application.subtext,
      buttonLabel: doc.application?.buttonLabel || f.application.buttonLabel,
      url: doc.application?.url || f.application.url,
      stickyButtonLabel:
        doc.application?.stickyButtonLabel ||
        doc.hero?.primaryCta?.label ||
        f.application.stickyButtonLabel,
    },
  };
}

export async function fetchAffiliatePage(): Promise<AffiliatePageContent> {
  if (!sanityClient || !isSanityConfigured) return FALLBACK_AFFILIATE_PAGE;
  try {
    const doc = await sanityClient.fetch(AFFILIATE_QUERY);
    return mapAffiliate(doc);
  } catch (err) {
    console.error("Failed to fetch affiliate page from Sanity", err);
    return FALLBACK_AFFILIATE_PAGE;
  }
}
