/**
 * Centralized landing page content.
 * Edit this file to update all copy across the page.
 */

export const siteConfig = {
  name: "GridGPT",
  description:
    "Access decision makers in seconds. Find unique contact details and in-depth company data to make B2B sales always hit the best prospects. Automated.",
  url: "https://gridgpt.com",
  ogImage: "/og-image.png",
};

export const navigation = {
  logo: "GridGPT",
  ctaText: "CTA",
  ctaHref: "#waitlist",
};

export const hero = {
  headline: "Access decision makers in seconds",
  subheadline:
    "Find unique contact details and in-depth company data to make B2B sales always hit the best prospects. Automated.",
  primaryCta: "See how it works",
  primaryCtaHref: "#features",
  secondaryCta: "Join waitlist",
  secondaryCtaHref: "#waitlist",
};

export const valueProposition = {
  headline: "Every data you need for sales outreach in one place",
  description:
    "Access all sales data from over 100+ sources with a single search on a 24-hour delay.",
  stats: [
    { value: "$299M", label: "Verified company data" },
    { value: "100+", label: "Data sources" },
    { value: "24h", label: "Data freshness" },
  ],
  features: [
    {
      title: "Company profiles",
      description: "Revenue, funding, tech stack, org charts",
    },
    {
      title: "Contact data",
      description: "Direct dials, verified emails, LinkedIn",
    },
    {
      title: "Intent signals",
      description: "Hiring trends, news, funding rounds",
    },
  ],
};

export const saveHours = {
  headline: "Save hours wasted on research",
  description:
    "Focus on sales and outreach. AI finds data and curates it for you.",
  stat: {
    value: "65.8%",
    label: "of sales reps' time is spent on non-selling activities like research",
  },
  chartLabels: {
    prospecting: "prospecting",
    selling: "selling",
  },
};

export const pipeline = {
  headline: "Billion records scanned live to deliver actionable leads list",
  columns: [
    {
      title: "Easy searching",
      description: "Natural language search",
      items: ["Industry filters", "Revenue range", "Location", "Tech stack"],
      highlight: "GridGPT",
    },
    {
      title: "Lead matching transformed",
      description: "AI matches your ICP to the best prospects",
      items: ["Company signals", "Intent data", "Buying committees"],
    },
    {
      title: "List of ICP prospects",
      description: "prioritised and ready to reach out in your CRM",
      items: [
        "Ranked list of prospects with phone, email and context",
        "Synced to your CRM",
      ],
    },
  ],
};

export const gridGptFeatures = [
  {
    badge: "100+ sources scanned in seconds",
    headline: "not a database but an engine",
    points: [
      "an inside man",
      "getting smarter with each search",
    ],
    description:
      "Stop paying per record. Search as many prospects as you need – because GridGPT delivers it live from public sources and your CRM.",
    mediaAlt: "GridGPT engine visualization",
  },
  {
    badge: "100+ sources scanned in seconds",
    headline: "not a database but an engine",
    points: [
      "an inside man",
      "getting smarter with each search",
    ],
    description:
      "Save days on prospecting: don't search – just describe who you want to reach, and let AI pick the best-fit companies and titles.",
    mediaAlt: "GridGPT search demonstration",
  },
  {
    badge: "500+ sources scanned in seconds",
    headline: "not a database but an engine",
    points: [
      "data you won't find on google",
      "getting smarter with each search",
    ],
    description:
      "Every search result is explained: why this company, why this person, what recent signal makes them a good fit.",
    mediaAlt: "GridGPT insights panel",
  },
  {
    badge: "100+ sources scanned in seconds",
    headline: "not a database but an engine",
    points: [
      "an inside man",
      "getting smarter with each search",
    ],
    description:
      "GridGPT learns what works: every reply, every booked meeting feeds back into ranking so your next list is even better.",
    mediaAlt: "GridGPT learning visualization",
  },
];

export const testimonials = {
  headline: "Testimonials",
  items: [
    {
      quote:
        "GridGPT cut our prospecting time by 70%. We now spend more time selling and less time researching.",
      author: "Sarah Chen",
      role: "VP Sales",
      company: "TechCorp",
    },
    {
      quote:
        "The AI-powered search is incredible. It finds prospects we never would have discovered manually.",
      author: "Michael Rodriguez",
      role: "SDR Manager",
      company: "GrowthCo",
    },
    {
      quote:
        "Finally, a tool that actually understands our ICP and delivers relevant leads consistently.",
      author: "Emily Watson",
      role: "Head of Revenue",
      company: "ScaleUp Inc",
    },
    {
      quote:
        "The data quality is outstanding. We've seen a 3x improvement in our email response rates.",
      author: "David Kim",
      role: "Sales Director",
      company: "Enterprise Solutions",
    },
    {
      quote:
        "GridGPT transformed how our team approaches outbound. It's like having a research assistant for each rep.",
      author: "Lisa Thompson",
      role: "CRO",
      company: "FastGrowth",
    },
  ],
};

export const finalCta = {
  headline: "Turn your lead list into a sales asset – not a liability.",
  description:
    "If your sales team spends too much time researching instead of selling, this is for you.",
  placeholder: "Enter your email",
  buttonText: "Submit",
  successMessage: "You're on the list! We'll be in touch soon.",
  errorMessage: "Something went wrong. Please try again.",
};

export const faq = {
  headline: "FAQs",
  items: [
    {
      question: "How is GridGPT different from other sales intelligence tools?",
      answer:
        "Unlike traditional databases that charge per record and go stale, GridGPT is a live search engine. It scans 100+ sources in real-time to deliver fresh, relevant prospects every search. You pay for unlimited searches, not per lead.",
    },
    {
      question: "What data sources does GridGPT use?",
      answer:
        "GridGPT aggregates data from public company websites, LinkedIn, news outlets, job boards, SEC filings, funding announcements, and over 100 other sources. All data is collected in compliance with terms of service and privacy regulations.",
    },
    {
      question: "How accurate is the contact information?",
      answer:
        "We verify emails and phone numbers through multiple validation layers. Our average email deliverability rate is over 95%. Invalid contacts are automatically flagged and removed from results.",
    },
    {
      question: "Can I integrate GridGPT with my CRM?",
      answer:
        "Yes! GridGPT integrates with Salesforce, HubSpot, Pipedrive, and other major CRMs. Leads sync automatically with all enrichment data attached, so your team can start outreach immediately.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "We're currently in private beta. Join the waitlist to get early access and a free trial when we launch. Early adopters will also receive priority support and input on our roadmap.",
    },
  ],
};

export const footer = {
  copyright: `© ${new Date().getFullYear()} GridGPT. All rights reserved.`,
  links: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
