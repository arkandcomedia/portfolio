// All site copy lives here so ARK can edit text without touching components.

export const CONTACT = {
  email: "arkandco.media@gmail.com",
  phoneDisplay: "+91 91245 50351",
  phoneHref: "tel:+919124550351",
  whatsapp: "https://wa.me/919124550351",
  hours: "Mon – Sat, 10am to 7pm",
  // placeholders — replace with ARK's real profiles
  instagram: "#",
  linkedin: "#",
  facebook: "#",
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/career", label: "Career" },
];

export const ALL_PAGES = [
  { href: "/contact", label: "Contact" },
  { href: "/work/vayu-halloween-takeover", label: "Work Details" },
  { href: "/blog/small-details-big-impact", label: "Blog Details" },
  { href: "/coming-soon", label: "Coming Soon" },
  { href: "/404", label: "404" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-condition", label: "Terms & Conditions" },
];

export const TICKER = [
  "Hospitality Marketing",
  "Brand Strategy",
  "Experience Design",
  "Social & Content",
  "Trend Analytics",
  "Launch Campaigns",
  "Theme Nights",
];

export const HERO_STATS = [
  { value: "100%", label: "Hospitality-focused" },
  { value: "360°", label: "Floor-to-feed coverage" },
  { value: "1 team", label: "From setup to final touch" },
];

export const HERO_PILLS = ["Clarity in positioning", "Experience design", "Content that sells", "Growth systems"];

export const VENUE_TYPES = [
  "Vayu",
  "Rooftop cafés",
  "Fine dining",
  "Boutique stays",
  "Lounges & bars",
  "Cloud kitchens",
  "Banquets & events",
];

export const PROCESS = [
  {
    n: "01",
    title: "Analyse",
    text: "We study your venue, menu, reviews, competitors and local trends, and every guest touchpoint in between.",
    img: "/img/crop-02.jpg",
  },
  {
    n: "02",
    title: "Find the USP",
    text: "We dig through the details until we find the one thing only you can offer, then sharpen it into a story.",
    img: "/img/crop-03.jpg",
  },
  {
    n: "03",
    title: "Design the moment",
    text: "Themed nights, décor, lighting and service touches, planned and set up by our own team.",
    img: "/img/crop-04.jpg",
  },
  {
    n: "04",
    title: "Amplify",
    text: "We capture it, post it and promote it, then track reservations, footfall and repeat visits.",
    img: "/img/crop-01.jpg",
  },
];

export const VALUES = [
  {
    title: "Details over decoration",
    text: "Every corner gets a little character and a reason for being there. We'd rather get ten small things right than one big thing loud.",
    icon: "detail",
  },
  {
    title: "Guests first, always",
    text: "If it doesn't make a guest feel something, we don't ship it. Every idea is tested against the person walking through your door.",
    icon: "guest",
  },
  {
    title: "Measure everything",
    text: "Good vibes are great. Good vibes that fill tables are better. We track what works, drop what doesn't and report it all clearly.",
    icon: "measure",
  },
];

export type Service = {
  slug: string;
  title: string;
  category: string;
  img: string;
  lead: string;
  text: string;
  items: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "hospitality-marketing",
    title: "Hospitality Marketing",
    category: "Growth Service",
    img: "/img/crop-02.jpg",
    lead: "Always-on growth",
    text: "Always-on marketing built around how guests actually choose where to eat, drink and stay.",
    items: ["Footfall campaigns", "Google & review strategy", "Festive calendars"],
  },
  {
    slug: "branding-identity",
    title: "Branding & Identity",
    category: "Design Service",
    img: "/img/logo.jpg",
    lead: "A USP you can see",
    text: "Names, logos, menus, signage and a voice that makes your USP impossible to miss.",
    items: ["Positioning & story", "Visual identity", "Menu & signage"],
  },
  {
    slug: "experience-event-design",
    title: "Experience & Event Design",
    category: "On-ground Service",
    img: "/img/crop-04.jpg",
    lead: "Moments guests photograph",
    text: "Theme nights, festive takeovers and ambience upgrades, designed, sourced and set up by our team.",
    items: ["Concepts & mood boards", "Décor, lighting & styling", "Event production"],
  },
  {
    slug: "social-media-content",
    title: "Social Media & Content",
    category: "Content Service",
    img: "/img/crop-06.jpg",
    lead: "Posts people save",
    text: "Reels, carousels and stories that make people save the post and book the table.",
    items: ["Content calendars", "On-site shoots", "Community management"],
  },
  {
    slug: "trend-growth-analytics",
    title: "Trend & Growth Analytics",
    category: "Data Service",
    img: "/img/crop-03.jpg",
    lead: "Decisions backed by data",
    text: "We track the details others skip, so every decision is backed by what your guests are doing.",
    items: ["Trend reports", "Campaign tracking", "Guest feedback analysis"],
  },
  {
    slug: "launches-relaunches",
    title: "Launches & Relaunches",
    category: "Strategy Service",
    img: "/img/crop-07.jpg",
    lead: "Full house on day one",
    text: "New opening or a fresh chapter: one playbook from pre-launch buzz to a full house on day one.",
    items: ["Pre-launch teasers", "Influencer previews", "Opening-night experience"],
  },
];

export type Work = {
  slug: string;
  title: string;
  client: string;
  services: string[];
  category: string;
  period: string;
  img: string;
  cover: string;
  summary: string;
  facts: { value: string; label: string }[];
  challenge: string[];
  approach: string[];
  gallery: string[];
  outcome: string[];
};

export const WORK: Work[] = [
  {
    slug: "vayu-halloween-takeover",
    title: "Vayu Halloween Takeover",
    client: "Vayu",
    services: ["Experience Design", "Styling"],
    category: "Experience Design",
    period: "Halloween season",
    img: "/img/crop-04.jpg",
    cover: "/img/crop-05.jpg",
    summary:
      "A complete theme takeover: concept, décor, lighting and on-ground set-up that turned a dining space into a night guests talked about.",
    facts: [
      { value: "1 venue", label: "Fully themed, indoor to rooftop" },
      { value: "7 frames", label: "Story told across socials" },
      { value: "1 team", label: "Concept to final touch" },
      { value: "100%", label: "Set up in-house" },
    ],
    challenge: [
      "Vayu already had a strong space and a loyal crowd. The goal for Halloween was to give guests a reason to come specifically that week, and to talk about it after.",
      "That meant the theme had to feel immersive without getting in the way of dinner: spooky enough to photograph, comfortable enough to stay for dessert.",
    ],
    approach: [
      "Concept: 'A little spooky. A lot of hospitality.' A playful theme instead of a horror set.",
      "Lighting: purple and pink washes across the thatch, entrance and rooftop to set the mood the moment guests arrived.",
      "Details: skulls, chalkboards, pumpkins and bats placed where guests naturally pause, so every corner had a photo moment.",
      "Set-up: our team installed everything on site, from the entrance reaper to the final finishing touch.",
    ],
    gallery: ["/img/crop-04.jpg", "/img/crop-03.jpg", "/img/crop-05.jpg", "/img/crop-01.jpg"],
    outcome: [
      "A venue that felt like an event for the whole season, not just one night.",
      "A ready-made library of on-brand moments for Vayu's social channels.",
    ],
  },
  {
    slug: "vayu-halloween-carousel",
    title: "The 7-Part Story",
    client: "Vayu",
    services: ["Social & Content", "Copywriting"],
    category: "Content",
    period: "Halloween season",
    img: "/img/slide-01.jpg",
    cover: "/img/crop-01.jpg",
    summary:
      "A seven-slide carousel that walked followers through the whole experience: from the first idea to the people who made it happen.",
    facts: [
      { value: "7 slides", label: "One story, start to finish" },
      { value: "1 voice", label: "Consistent Vayu tone" },
      { value: "3 pillars", label: "Hospitality · Branding · Experiences" },
      { value: "100%", label: "Shot on site" },
    ],
    challenge: [
      "Event posts usually show the décor and stop there. We wanted followers to feel the night, and to see the care behind it.",
    ],
    approach: [
      "Narrative: each slide is a chapter — the mood, the imagination, the details, the vibe, the ambience, the team, the guests.",
      "Design system: a consistent frame, serif headlines and a pink accent so the series reads as one piece in the feed.",
      "Copy: short, warm lines that sell hospitality first and Halloween second.",
    ],
    gallery: ["/img/slide-01.jpg", "/img/slide-02.jpg", "/img/slide-03.jpg", "/img/slide-04.jpg", "/img/slide-05.jpg", "/img/slide-06.jpg", "/img/slide-07.jpg"],
    outcome: [
      "A carousel that doubles as a case study for Vayu's hospitality, not just a holiday post.",
    ],
  },
  {
    slug: "vayu-behind-the-scenes",
    title: "Behind the Experience",
    client: "Vayu",
    services: ["Planning", "On-ground Team"],
    category: "Production",
    period: "Halloween season",
    img: "/img/crop-06.jpg",
    cover: "/img/crop-07.jpg",
    summary:
      "Good experiences take a team. A look at the planning, set-up and the people who turned the concept into a finished venue.",
    facts: [
      { value: "Plan", label: "Mood boards & checklists" },
      { value: "Source", label: "Props, lighting & décor" },
      { value: "Set up", label: "On-site installation" },
      { value: "Host", label: "Ready for guests" },
    ],
    challenge: [
      "Theme nights fall apart in execution: late props, rushed lighting, staff who don't know the story. We wanted Vayu's team to be able to just open the doors.",
    ],
    approach: [
      "Planning: every element listed, placed and timed before a single prop arrived.",
      "Set-up: our team handled the build, from the entrance installation to the last bat on the wall.",
      "Hand-over: a quick walkthrough so Vayu's staff knew the story behind the theme and could share it with guests.",
    ],
    gallery: ["/img/crop-06.jpg", "/img/crop-02.jpg", "/img/crop-07.jpg"],
    outcome: ["A smooth opening with zero last-minute scrambling, and a team that could focus on hospitality."],
  },
];

export const MOMENTS = [
  { kicker: "Ark Hospitality presents", line: "A little spooky. A lot of hospitality.", img: "/img/slide-01.jpg" },
  { kicker: "Behind the experience", line: "It starts with a little imagination.", img: "/img/slide-02.jpg" },
  { kicker: "The details", line: "Small details. Big impact.", img: "/img/slide-03.jpg" },
  { kicker: "Set the mood", line: "A vibe that stays with you.", img: "/img/slide-04.jpg" },
  { kicker: "The ambience", line: "Not just a meal. An experience.", img: "/img/slide-05.jpg" },
  { kicker: "The people behind it", line: "Good experiences take a team.", img: "/img/slide-06.jpg" },
  { kicker: "Made for guests", line: "We create moments that matter.", img: "/img/slide-07.jpg" },
];

export type Plan = {
  name: string;
  for: string;
  hot?: boolean;
  price: { project: string; monthly: string };
  unit: { project: string; monthly: string };
  features: string[];
};

// No public prices yet — the "price" line shows the engagement shape. Swap in numbers when ARK is ready.
export const PLANS: Plan[] = [
  {
    name: "Spark",
    for: "For a single moment that needs to land",
    price: { project: "Event", monthly: "Theme" },
    unit: { project: "/ one-off", monthly: "/ month" },
    features: ["Concept & mood board", "Décor & styling set-up", "Event-day content shoot", "1 carousel + 2 reels", "Email support"],
  },
  {
    name: "Growth Partner",
    for: "For venues that want steady, measurable growth",
    hot: true,
    price: { project: "Sprint", monthly: "Retainer" },
    unit: { project: "/ quarter", monthly: "/ month" },
    features: ["USP audit & positioning", "Monthly content calendar", "Social management & ads", "Theme night every month", "Growth report & review call"],
  },
  {
    name: "Signature",
    for: "For launches, relaunches & multi-venue groups",
    price: { project: "Launch", monthly: "Dedicated" },
    unit: { project: "/ to day 90", monthly: "/ team" },
    features: ["Brand identity system", "Pre-launch & PR campaign", "Opening-night experience", "Influencer programme", "Ongoing analytics"],
  },
];

export const COMPARE: { feature: string; values: (string | boolean | "double")[] }[] = [
  { feature: "USP & positioning", values: ["Light", "Full audit", "Full audit + identity"] },
  { feature: "Experience design", values: ["One event", "Monthly theme", "Launch + ongoing"] },
  { feature: "Content production", values: ["Event shoot", "Monthly shoots", "Dedicated team"] },
  { feature: "Social management", values: [false, true, "double"] },
  { feature: "Paid ads", values: [false, true, "double"] },
  { feature: "Influencer & PR", values: [false, "Light", "Full programme"] },
  { feature: "Reporting", values: ["Recap", "Monthly", "Weekly + monthly"] },
];

export type Faq = { q: string; a: string };
export const FAQS: Record<string, Faq[]> = {
  General: [
    { q: "What exactly does ARK do?", a: "We're a hospitality marketing and experience studio. We analyse your venue, find your USP, then design the brand, the on-ground experiences and the content that sells it." },
    { q: "Do you only work with restaurants?", a: "We work across hospitality: restaurants, cafés, rooftop lounges, bars, boutique hotels, banquets and stays. If guests walk in, we can help more of them walk in." },
    { q: "How are you different from a social media agency?", a: "Social agencies post about your venue. We also change what happens inside it, with themes, styling and service moments, so there's always something worth posting." },
  ],
  Process: [
    { q: "How do we get started?", a: "With a discovery call and a venue visit. We audit the details, scan trends and competitors, and come back with your USP and a plan." },
    { q: "Do you handle the physical set-up for events?", a: "Yes. Our team designs, sources and sets up décor, lighting and styling, from setup to the final finishing touch." },
    { q: "How long does a theme night take to plan?", a: "Usually two to three weeks from concept to launch, depending on scale. Shorter timelines are possible when the calendar allows." },
  ],
  Pricing: [
    { q: "How much does it cost?", a: "Every venue is different, so we quote after a short discovery call. Tell us what you need on the contact page and we'll come back within a day." },
    { q: "Can we start with a single event?", a: "Absolutely. Many venues start with a Spark engagement and move to a monthly partnership once they see the results." },
  ],
  Results: [
    { q: "How do you measure success?", a: "Reach and saves are only the start. We track reservations, footfall on campaign days, review sentiment and repeat visits, and share it all in a clear report." },
    { q: "When will we see results?", a: "Event buzz is immediate. Brand and footfall growth usually compound over 60–90 days of consistent work." },
  ],
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  img: string;
  read: string;
  body: { h: string; p: string[] }[];
};

export const POSTS: Post[] = [
  {
    slug: "small-details-big-impact",
    title: "Small Details, Big Impact: What Guests Actually Remember",
    excerpt: "Guests rarely remember the menu font. They remember the moment. Here's how to design for it.",
    category: "Experience Design",
    img: "/img/crop-03.jpg",
    read: "5 min read",
    body: [
      { h: "Guests remember moments, not floor plans", p: ["Ask someone about a great night out and they won't describe the layout. They'll tell you about the candle on the table, the way the host remembered their name, or the corner they took a photo in.", "Those small, deliberate details are what turn a visit into a memory, and a memory into a recommendation."] },
      { h: "Design the pauses", p: ["Look at where guests naturally stop: the entrance, the wait for a table, the walk to the washroom, the moment the bill arrives. Each pause is an opportunity for a small surprise.", "A chalkboard with a handwritten line, a styled corner, a lighting change. None of these are expensive, and all of them get noticed."] },
      { h: "Make it photographable", p: ["If a detail is worth noticing, it's worth photographing. Good light, a clean background and a clear focal point make it easy for guests to share, and every share is free reach."] },
      { h: "Conclusion", p: ["Big renovations are rare. Small details can change every week. Start with three pauses in your venue and design one moment for each."] },
    ],
  },
  {
    slug: "finding-your-usp",
    title: "Finding Your USP: What Makes a Venue Unforgettable",
    excerpt: "A view, a story or a vibe. How to pick the one thing only you have, and own it.",
    category: "Brand Strategy",
    img: "/img/crop-05.jpg",
    read: "6 min read",
    body: [
      { h: "The problem: trying to be everything", p: ["Most venues describe themselves the same way: great food, great ambience, great service. When everyone says it, nobody hears it.", "A USP is not a list of good things. It's the one thing guests can't get anywhere else."] },
      { h: "Where USPs hide", p: ["Look at your reviews: what do people mention without being asked? Look at your photos: what do guests choose to capture? Look at your team: who has a story worth telling?", "The answer is usually already there. It just hasn't been said clearly."] },
      { h: "Say it in one line", p: ["If your USP takes a paragraph, it isn't sharp enough yet. 'The rooftop where golden hour turns strangers into regulars' is a USP. 'Multi-cuisine dining with a pleasant ambience' is not."] },
      { h: "Then build around it", p: ["Once you have the line, everything follows: the décor that frames the view, the events timed to sunset, the content that shows it off. That's when a USP stops being a slogan and starts selling."] },
    ],
  },
  {
    slug: "theme-nights-that-pay",
    title: "Theme Nights That Pay for Themselves",
    excerpt: "Planning festive takeovers that drive footfall, not just likes.",
    category: "Marketing",
    img: "/img/crop-06.jpg",
    read: "4 min read",
    body: [
      { h: "Start with the guest, not the theme", p: ["A theme only works if it gives a specific group of guests a reason to come that week. Decide who you're inviting before you decide what to hang on the walls."] },
      { h: "Plan the content before the décor", p: ["Know which shots you want before you build the set. That way every installation doubles as a content backdrop, and your social calendar fills itself."] },
      { h: "Set up early, host calmly", p: ["The best theme nights look effortless because the set-up happened the day before. A quick staff walkthrough means your team can tell the story behind the theme."] },
      { h: "Measure what matters", p: ["Track covers, average bill and new versus returning guests on the theme nights compared to a normal week. That's how you know if it paid for itself."] },
    ],
  },
  {
    slug: "from-floor-to-feed",
    title: "From Floor to Feed: Turning Experiences into Content",
    excerpt: "Why the best hospitality content starts with something real happening on the floor.",
    category: "Content",
    img: "/img/crop-07.jpg",
    read: "5 min read",
    body: [
      { h: "Content can't fix an empty moment", p: ["You can't edit your way to a great experience. If nothing special is happening in the venue, the feed will show it."] },
      { h: "Build the moment first", p: ["We design the experience on the floor, then capture it. That order matters: real moments make content that feels warm, not staged."] },
      { h: "Tell it as a story", p: ["A single photo is a post. Seven frames that walk from imagination to the final guest are a story people swipe through and save."] },
      { h: "Close the loop", p: ["Every post should point back to the venue: book a table, see the menu, come this weekend. Floor to feed, and back to the floor."] },
    ],
  },
];

export const JOBS = [
  { title: "Content Creator & Photographer", meta: "On site · Full time · Shoots, reels & edits" },
  { title: "Social Media Executive", meta: "On site · Full time · Calendars, captions & community" },
  { title: "Event & Experience Designer", meta: "On site · Full time · Concepts, décor & set-up" },
  { title: "Hospitality Marketing Strategist", meta: "On site · Full time · Audits, USP & campaigns" },
  { title: "Marketing Intern", meta: "On site · 3–6 months · Learn the floor-to-feed method" },
];

export const BELIEFS = [
  { n: "01", title: "The table comes first", text: "Marketing starts with what guests feel inside the venue." },
  { n: "02", title: "One USP, said clearly", text: "A venue that tries to be everything is remembered for nothing." },
  { n: "03", title: "Real moments make real content", text: "We build it on the floor before we post it on the feed." },
  { n: "04", title: "Small details compound", text: "Ten small things done right beat one big thing done loud." },
  { n: "05", title: "If we can't measure it, we improve it", text: "Every campaign is tracked, reported and made sharper." },
];

export const SERVICE_OPTIONS = [
  ...SERVICES.map((s) => s.title),
  "Full partnership",
  "Career / Join the team",
  "Something else",
];
