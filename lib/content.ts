// ============================================================
//  SAYTNING BARCHA SHAXSIY MA'LUMOTLARI SHU FAYLDA.
//  Placeholderlar [KVADRAT QAVS] ichida yoki "Your ..." ko'rinishida.
//  O'z ma'lumotlaringni kiritsang, butun sayt yangilanadi.
// ============================================================

export const me = {
  firstName: "Your",
  lastName: "Name",
  fullName: "Your Name",
  initials: "YN", // EG o'rniga — menu bar, avatar, footer
  role: "Product Lead", // "Head of Product" o'rniga
  tagline: "A placeholder version of a PM.", // footer'dagi qisqa tagline
  email: "you@example.com",
  company: { name: "YourCompany", url: "#" },

  // Hero: "I'm Elena." / "I lead product at Arrive."
  heroLine1: "I'm Your Name.",
  heroLine2Pre: "I lead product at ",
  heroLine2Link: "YourCompany",
  heroSub:
    "Managing engineers, customers, and building agent loops and graphs to make every person in my team more efficient.",

  // Menu bar soati boshiga shahar (MIAMI o'rniga)
  clockCity: "TASHKENT",

  // Ob-havo vidjeti (statik placeholder — keyin shaharingnomani yozing)
  weatherCity: "Tashkent",
  weather: [
    { day: "We", temp: 31, icon: "☀️" },
    { day: "Th", temp: 33, icon: "☀️" },
    { day: "Fr", temp: 29, icon: "⛅" },
    { day: "Sa", temp: 28, icon: "⛅" },
    { day: "Su", temp: 30, icon: "☀️" },
    { day: "Mo", temp: 32, icon: "☀️" },
    { day: "Tu", temp: 27, icon: "⛅" },
  ],

  // Musiqa player (shu iTunes preview URL — o'z sevimli qo'shigingizni aytasiz)
  song: {
    title: "Psycho Killer",
    artist: "Talking Heads — Talking Heads: 77",
    audioUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/77/3d/5c/773d5c07-9fc9-72aa-1a6d-54bd7d37fadb/mzaf_6074514444011910273.plus.aac.p.m4a",
    cover: "/album-psycho.jpg", // o'zingizning albom muqovangiz
  },

  photo: "/selfie.jpg", // "Me and my dog" — o'z fotosingiz

  // Terminaldagi persona (elena-5 o'rniga)
  shellUser: "visitor@yourname",
  shellModel: "you-1",
};

// ---------- Havolalar ----------
export const links = {
  cv: "#", // Notion yoki PDF havolangiz
  booking: "#", // Calendly / Google Calendar booking
  linkedin: "#",
  x: "#",
  github: "#", // agar bo'lsa
};

// Desktop'dagi o'ng tomondagi papkalar (case study'larga)
export const folders = [
  { label: "QA Agent Loop", href: "/work/qa-agent-loop" },
  { label: "Eleyyva", href: "/work/eleyyva" },
  { label: "Engineering", href: "/work/engineering" },
  { label: "Product Mgmt", href: "/work/product-management" },
  { label: "Customer Success", href: "/work/customer-success" },
];

// ---------- Achievements (5 ta karta) ----------
export const achievements = [
  {
    icon: "🎓",
    g1: "#4A9DF8",
    g2: "#2E7CF6",
    title: "Thesis",
    desc: "1,600+ downloads, cited internationally",
    href: "#",
  },
  {
    icon: "🅵",
    g1: "#9DB8A6",
    g2: "#7E9C87",
    title: "Friends of Figma",
    desc: "Founder of FoF Remote Designers",
    href: "#",
  },
  {
    icon: "🔬",
    g1: "#B06AF8",
    g2: "#8B3DF6",
    title: "Independent researcher",
    desc: "Part-time researcher with 100K readers",
    href: "",
  },
  {
    icon: "📖",
    g1: "#F85D7A",
    g2: "#F92D50",
    title: "Technical reviewer",
    desc: "Technical reviewer on published books",
    href: "",
  },
  {
    icon: "🏆",
    g1: "#FFC94A",
    g2: "#F5A623",
    title: "Hackathon judge",
    desc: "Judged multiple hackathons",
    href: "",
  },
];

// ---------- In the press (bo'lmasa — bo'sh array [] qiling) ----------
export const press = [
  {
    logo: "/press/ibtimes.svg",
    title: "Bridging the gap between AI innovation and user-centered design",
    url: "#",
  },
  {
    logo: "/press/techbullion.png",
    title: "Transforming design leadership and building global communities",
    url: "#",
  },
  {
    logo: "/press/techtimes.svg",
    title: "Your headline in the tech media",
    url: "#",
  },
  {
    logo: "/press/gritdaily.png",
    title: "Another press appearance about you",
    url: "#",
  },
];

// ---------- 4 ta Superpower bo'limi ----------
export const pillars = [
  {
    tab: "AI Systems",
    no: "Superpower nº1",
    heading: "Agent loops and graphs that make everyone more efficient.",
    desc: "Building and running an autonomous agent fleet: a hybrid workforce of humans and agents shipping into the same production codebase.",
    buttons: [
      { label: "QA Agent Loop", href: "/work/qa-agent-loop" },
      { label: "Internal LMS", href: "/work/eleyyva" },
    ],
    note: [
      { t: "QA agent loop", d: "418 PRs merged to production at 87% acceptance, ~135 a month" },
      { t: "Eleyyva", d: "RAG assistant unifying the knowledgebase, financials, and team metrics" },
      { t: "Automated release notes", d: "weekly, zero manual effort" },
    ],
  },
  {
    tab: "Product",
    no: "Superpower nº2",
    heading: "Managing OKRs for engineers and agents.",
    desc: "Whatever the team, the stack, or the constraints, I find the way to ship. Right now that means running engineers and an agent fleet on one roadmap, one board, one process.",
    buttons: [{ label: "Full case study", href: "/work/product-management" }],
    note: [
      { t: "1,404 tickets coordinated", d: "on the roadmap board, 710 of them bugs" },
      { t: "804 feature behaviors specified", d: "763 passing baseline, a 95% pass rate" },
      { t: "20.4h median from filed to merged", d: "in production, 72% ship within 48 hours" },
    ],
  },
  {
    tab: "Engineering",
    no: "Superpower nº3",
    heading: "Writing specs and shipping code.",
    desc: "Owning the onboarding and AI repos as an individual contributor, not just a coordinator.",
    buttons: [{ label: "Full case study", href: "/work/engineering" }],
    note: [
      { t: "191 PRs authored, 162 merged", d: "533 commits across the Arrive repos, as of Sep 15" },
      { t: "20 active personal repos", d: "onboarding tooling, advisory formulas sandbox, arrive lms chatbot, and more" },
      { t: "Advisory formulas engine", d: "verified at 45 of 45 golden tests" },
    ],
  },
  {
    tab: "Customer Success",
    no: "Superpower nº4",
    heading: "Handling customer success for a better product.",
    desc: "After feeling the manual onboarding pain firsthand, built the tooling that automated it. And still running it.",
    buttons: [{ label: "Full case study", href: "/work/customer-success" }],
    note: [
      { t: "Onboarding tooling", d: "built it, own it, run it" },
      { t: "25+ firms onboarded", d: "200+ power users across firms of 5 to 15 people" },
      { t: "Time to onboard", d: "from 60 to 90 days down to 14 to 30" },
    ],
  },
];

// ---------- Venture studio ro'yxati ----------
export const ventures = [
  { name: "Inventory Tracker", desc: "AI-powered mobile inventory system. Shipped a complex module in 5 weeks by breaking traditional design handoffs." },
  { name: "BPV's Design System", desc: "Design system + AI-powered implementation that cut product delivery time 50% across the entire venture portfolio." },
  { name: "Eetwell", desc: "Mobile app aggregating independent restaurant deliveries, bypassing platforms like Uber and DoorDash." },
  { name: "Burger King", desc: "UX/UI design for self-service kiosks across Spain and Portugal." },
  { name: "Serial Cut", desc: "PEST analysis turning governmental and internal data into a strategic roadmap for a creative studio." },
  { name: "Chef Xport", desc: "Connected private chefs with celebrity clients." },
  { name: "Dart", desc: "LinkedIn meets Tinder: swipe-based matching between students and employers." },
  { name: "ESG", desc: "Custom event-builder platform for an event company, like Eventbrite with heavy AI and workflow automation." },
  { name: "Lab18", desc: "Platform for a golfing facility." },
  { name: "Legal Bid", desc: "Attorneys bid on cases so clients could competitively choose their lawyer." },
  { name: "MIQ", desc: "Mattress management for hotels, with tax advantages for sustainability." },
  { name: "Open Access", desc: "Education for founders from real investors, guiding them through the equity journey." },
  { name: "Partake", desc: "A golf app to play golf and share it, social media built for golfers." },
  { name: "Ravent", desc: "Home device management and support for luxury brands." },
];

// ---------- about-me.txt oynasi ----------
export const about = {
  then: "Starting as a product designer, shipping 0 to 1 products end to end. The seat kept widening on its own: research, then prototypes, then the roadmap, then the product itself.",
  now: "Head of Product, leading an 18-person cross-functional team. Shipping production code, running the team's operating system, talking to customers directly, and building the AI infrastructure that makes everyone around me faster.",
  future:
    "Return to my perfect form: ideal weight (18kg), glass skin, 12h of sleep, and not a single gray hair.",
};

// ---------- Playground ----------
export const playground = {
  heading: "Old work, side projects & earlier gigs.",
  sub: "My personal gallery. Dropping random stuff I've done and things I like. My little corner of the internet.",
  sticky:
    "I love whiteboarding. It's the closest thing to how my brain operates. If whiteboarding is your jam too, we are already friends.",
  stickySign: "Your",
  hint: "Drag to pan. More coming to this board soon.",
};

// ---------- Terminal (desktop + playground) javoblari ----------
export const terminalIntro = [
  "Last login: just now on ttys001",
  "you-1 shell. Ask anything about me, or type `help`.",
];

export const terminalAnswers: { keys: string[]; lines: string[] }[] = [
  {
    keys: ["help"],
    lines: [
      "Available commands:",
      "  about    — who I am",
      "  work     — what I'm building",
      "  contact  — how to reach me",
      "  socials  — links",
      "  joke     — a random one",
      "  clear    — clear the screen",
    ],
  },
  {
    keys: ["about", "who", "whois"],
    lines: [
      "Your Name — Product Lead at YourCompany.",
      "I ship production code, run the team's operating system,",
      "and build the AI infrastructure around me.",
    ],
  },
  {
    keys: ["work", "building", "project"],
    lines: [
      "Currently: agent loops and graphs at YourCompany.",
      "Open a folder on the desktop to read a case study.",
    ],
  },
  {
    keys: ["contact", "email", "reach"],
    lines: ["Email: you@example.com", "Or book a meeting from the footer."],
  },
  {
    keys: ["socials", "links", "linkedin"],
    lines: ["LinkedIn: linkedin.com/in/you", "X: x.com/you"],
  },
  {
    keys: ["joke", "fun"],
    lines: ["Why did the PM cross the roadmap?", "To prioritize the other side."],
  },
];

export const terminalFallback = [
  "Hmm, I don't know that one yet.",
  "Try `help` to see what I can answer.",
];
