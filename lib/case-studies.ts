// ============================================================
//  CASE STUDY (chat) KONTENTI — /work/[slug]
//  QA Agent Loop to'liq; qolganlari struktura namunasi.
//  Bu hammasi ham keyin O'Z hikoyang bilan almashtiriladi.
// ============================================================

export type Block =
  | { type: "p"; html: string } // <strong> taglari bilan rich text
  | { type: "stats3"; items: { t: string; d: string }[] }
  | { type: "thennow"; thenT: string; thenD: string; nowT: string; nowD: string }
  | { type: "stats6"; items: { v: string; d: string }[] }
  | { type: "chart" }
  | { type: "quote"; text: string; sub: string }
  | { type: "flow"; items: { label: string; color: "blue" | "purple" | "gray" | "green" }[] }
  | { type: "flowStack"; top: { label: string; color: "blue" | "purple" | "gray" | "green" }[]; rest: string[] }
  | { type: "receipt"; status: "Merged" | "Closed"; num: string; title: string; body: string; extra?: { who: string; text: string; tone: "gray" | "blue" }[] }
  | { type: "numbered"; items: { n: string; t: string; d: string }[] };

export type QA = {
  q: string;
  thought: string;
  blocks: Block[];
  more?: string; // "Explain more" ostidagi paragraf
};

export type CaseStudy = {
  slug: string;
  folder: string; // desktop papka nomi
  title: string;
  badge: string; // elena-5 o'rniga
  subtitle: string;
  intro: string;
  qa: QA[];
  next: { label: string; href: string };
};

const qaLoop: QA[] = [
  {
    q: "So what exactly did you build?",
    thought: "Thought for 2s",
    blocks: [
      {
        type: "p",
        html: "The problem was a bug backlog and solo engineering bandwidth. Instead of hiring a QA function, I built an agent pipeline that <strong>runs unattended, opens its own PRs, and gets them reviewed and merged by a human</strong>. Production regressions get caught <strong>before release, not after</strong>. Built for a vertical accounting-practice SaaS platform.",
      },
      {
        type: "stats3",
        items: [
          { t: "Runs unattended", d: "4 times a day, 7 days a week" },
          { t: "Opens its own PRs", d: "every fix lands on an autofix/ branch" },
          { t: "Human merge gate", d: "nothing ships without review" },
        ],
      },
    ],
    more:
      "Every agent PR lands on an autofix/ branch, so the whole fleet's output is auditable in one place. Nothing merges itself: a human reviews every PR, which is the point. The agents multiply the team's capacity, and the review gate keeps the bar where it has to be for a production codebase that accounting firms run their practice on.",
  },
  {
    q: "How did QA work before the fleet?",
    thought: "Thought for 3s",
    blocks: [
      {
        type: "p",
        html: "An external agency: <strong>one hour a week</strong>, a report at the end of that hour, around <strong>$3,000 a month</strong>. As the product matured we moved away from agencies to build the team in house, and the fleet was born in that transition. I did not want the new in house engineers drowning in QA on top of everything else. Today the agents run <strong>four times a day, seven days a week</strong>.",
      },
      {
        type: "thennow",
        thenT: "Then: agency",
        thenD: "1 hour a week. A report at the end of the hour. ~$3,000 a month.",
        nowT: "Now: the fleet",
        nowD: "4 runs a day. 7 days a week. A human still merges every PR.",
      },
    ],
  },
  {
    q: "Did it actually ship anything, or is this a demo?",
    thought: "Thought for 4s",
    blocks: [
      {
        type: "p",
        html: "It ships <strong>continuously, and it's still running today</strong>. Lifetime numbers since the fleet went live in June, <strong>verified against GitHub</strong>, snapshotted Sep 15:",
      },
      {
        type: "stats6",
        items: [
          { v: "481", d: "autonomous PRs opened (autofix/)" },
          { v: "418", d: "merged to production" },
          { v: "~135", d: "merged per month, on average" },
          { v: "87%", d: "acceptance rate (of decided)" },
          { v: "101", d: "Slack-to-ticket intake filed" },
          { v: "1,404", d: "board tickets under agent coordination" },
        ],
      },
      { type: "p", html: "That averages out to roughly <strong>135 agent PRs merged to production every month</strong>, and the pace has held as the fleet evolved." },
    ],
  },
  {
    q: "What kind of bugs does it actually catch?",
    thought: "Thought for 2s",
    blocks: [
      {
        type: "p",
        html: "The granular ones that <strong>look small and feel huge</strong>. Real example: an optional field gets added for one client. That client sits in a 1,000 row table, 30 pages deep. The pagination never expected the new field, so <strong>page 7 suddenly renders empty</strong>. To a user that reads as the platform crashed and the data is gone. No code review catches that. An agent that <strong>walks the actual pages</strong> does.",
      },
      { type: "quote", text: "Clients table · page 7 of 30 — No results found", sub: "What the user saw. The data was fine; the pagination was not." },
    ],
    more:
      "The discipline that makes it work: agents replicate the issue before flagging it, and if they are not confident, they do not flag. That rule is why the human reviewers trust what lands in front of them.",
  },
  {
    q: "85% acceptance sounds high. Was it like that from day one?",
    thought: "Thought for 3s",
    blocks: [
      {
        type: "p",
        html: "No. The first three weeks averaged around 65% while the loop was being tuned, with a <strong>trough of 54%</strong> the week of Jun 22. The turn came when I added a <strong>reviewer agent</strong>: one that learned from every PR ever merged into the codebase, and the review comments humans left on them, and turned that into what good code looks like here. It reviews both human and agent PRs. After that, <strong>every remaining week of that first window held 90%+</strong>.",
      },
      { type: "chart" },
    ],
    more:
      "Acceptance is measured on decided PRs, merged against closed. In the first ten weeks that was 295 merged to 50 closed, 85%; lifetime it now sits at 87%, 418 merged to 60 closed. Counting the closes honestly matters, because every rejection becomes a lesson the agents read on the next run.",
  },
  {
    q: "How did your engineers feel about agents reviewing their code?",
    thought: "Thought for 4s",
    blocks: [
      {
        type: "p",
        html: "Honestly, at first, not great. It felt like <strong>constant examination</strong>: every push got reviewed by a bot, and then they had to review the examiner and justify themselves to it. The fix was <strong>half technical, half framing</strong>. I reframed it as the opposite of a superior: it is <strong>your junior engineer</strong>. You are teaching it to be more like you, it learns from your reviews, and it <strong>has your back</strong> on the scenarios you did not have time to test.",
      },
      { type: "quote", text: "“It is not your superior. It is a junior engineer you are teaching to be more like you.”", sub: "the reframe that flipped adoption" },
    ],
    more:
      "Technically, the reviewer also let the fixer agents flag less and speak only when confident, which cut the noise. But the flip in the room came from the reframe, and from the fact that the thing genuinely learns your standards while it works.",
  },
  {
    q: "What does the architecture look like?",
    thought: "Thought for 2s",
    blocks: [
      { type: "p", html: "Four stages in a loop:" },
      {
        type: "flow",
        items: [
          { label: "Finder", color: "blue" },
          { label: "Fixer", color: "blue" },
          { label: "Human review", color: "blue" },
          { label: "Retro / lessons", color: "blue" },
        ],
      },
      { type: "p", html: "Notion is the <strong>coordination layer, the blackboard</strong>. Every finding, fix, review decision, and lesson lands in the same board the whole loop reads from. The retro stage is why the acceptance curve climbs: <strong>rejected PRs become lessons</strong> the agents read next run." },
    ],
    more:
      "The blackboard pattern is the load-bearing choice: instead of agents talking to each other, everything reads and writes one board. That makes the fleet observable, recoverable, and human-compatible. 1,404 tickets run through that coordination layer.",
  },
  {
    q: "Where do the bugs come from in the first place?",
    thought: "Thought for 3s",
    blocks: [
      {
        type: "p",
        html: "Two sources. The <strong>Finder agents hunt regressions on their own</strong>, and customer and team Slack messages get auto-triaged into tickets: <strong>101 filed to date</strong>, with dedup and a <strong>human-veto step</strong> before anything enters the board.",
      },
      {
        type: "flowStack",
        top: [
          { label: "Finder agents", color: "blue" },
          { label: "Slack intake", color: "purple" },
        ],
        rest: ["Dedup", "Human veto"],
      },
    ],
  },
  {
    q: "Can I see actual receipts?",
    thought: "Thought for 4s",
    blocks: [
      {
        type: "p",
        html: "Here are two real ones from the autofix/ stream, verbatim. The second is a <strong>rejection</strong>, which matters more: two agents raced to fix the same bug, the human gate picked the better implementation, and the losing agent stood down. <strong>That's the review gate doing judgment, not rubber-stamping.</strong>",
      },
      {
        type: "receipt",
        status: "Merged",
        num: "#3845 · autofix/…",
        title: "fix(triage): an unknown action-item type no longer blanks a client's task list",
        body: "From the PR body, written by the agent: \"Triage of the 42 unresolved Sentry issues. One was a real defect with a provable mechanism, and it is fixed here. The rest are accounted for in the digest.\" Ships with two new test files. Merged to production by a human engineer.",
      },
      {
        type: "receipt",
        status: "Closed",
        num: "#3849 · autofix/…",
        title: "fix(billing): include projects in create payload for itemized configs",
        body: "",
        extra: [
          { who: "Human reviewer:", text: "\"Closing: byte-identical to the PR that merged to develop today. The ticket is a duplicate.\"", tone: "gray" },
          { who: "The agent:", text: "\"Acknowledged, standing down. The fix landed via the rival PR; no further action needed here.\"", tone: "blue" },
        ],
      },
    ],
  },
  {
    q: "If you started over tomorrow, what would you do differently?",
    thought: "Thought for 2s",
    blocks: [
      {
        type: "p",
        html: "I would <strong>rerun the process, not rebuild the artifact</strong>. When I built this, loops were the state of the art, so I built a loop. AI moves fast enough that tomorrow the answer would be something else, so the real skill is researching what the best way is now. The one thing I would pull earlier: <strong>the learning reviewer, from day one</strong>. And the fleet keeps evolving like a team does. The latest addition is <strong>Playwright</strong>, so the agents test the UI too, not just the code.",
      },
      {
        type: "numbered",
        items: [
          { n: "1", t: "The loop", d: "Finder and Fixer agents, human merge gate" },
          { n: "2", t: "The reviewer", d: "learns the codebase standards from every merged PR" },
          { n: "3", t: "Playwright", d: "agents test the UI too, not just the code" },
          { n: "?", t: "Next", d: "still evolving, like any team" },
        ],
      },
    ],
  },
];

const generic = (title: string, subtitle: string, slug: string, intro: string, next: { label: string; href: string }, stats: { v: string; d: string }[], flows: string[]): CaseStudy => ({
  slug,
  folder: title,
  title,
  badge: "akbarali-1",
  subtitle,
  intro,
  qa: [
    {
      q: "So what is this project?",
      thought: "Thought for 2s",
      blocks: [{ type: "p", html: intro }],
    },
    {
      q: "What did it actually ship?",
      thought: "Thought for 3s",
      blocks: [
        { type: "p", html: "The headline numbers, <strong>verified</strong>:" },
        { type: "stats6", items: stats },
      ],
    },
    {
      q: "How does it work?",
      thought: "Thought for 2s",
      blocks: [
        { type: "p", html: "The pipeline in one view:" },
        { type: "flow", items: flows.map((f) => ({ label: f, color: "blue" as const })) },
      ],
    },
  ],
  next,
});

export const caseStudies: CaseStudy[] = [
  { slug: "qa-agent-loop", folder: "QA Agent Loop", title: "QA Agent Loop", badge: "you-1", subtitle: "An autonomous agent fleet that finds bugs, fixes them, and ships to production, with a human merging every PR.", intro: "Hi, this is my QA agent fleet: autonomous agents that find bugs, fix them, and open their own PRs into our production codebase, four times a day, seven days a week. It's my most alive project and it's still evolving. Ask away, or just scroll.", qa: qaLoop, next: { label: "Eleyyva", href: "/work/eleyyva" } },
  generic(
    "Eleyyva",
    "A RAG assistant unifying the knowledgebase, financials, and team metrics into one place.",
    "eleyyva",
    "Hi, this is Eleyyva: a RAG assistant that unifies the knowledgebase, financials, and team metrics. Replace this intro with your own story — the structure is ready.",
    { label: "Product Management", href: "/work/product-management" },
    [
      { v: "1", d: "unified source of truth" },
      { v: "3", d: "systems merged into one chat" },
      { v: "daily", d: "active usage across the team" },
      { v: "0", d: "manual reports needed" },
      { v: "10+", d: "data sources connected" },
      { v: "24/7", d: "answers on demand" },
    ],
    ["Sources", "Index", "RAG", "Answers"]
  ),
  generic(
    "Product Management",
    "Managing OKRs for engineers and agents on one roadmap, one board, one process.",
    "product-management",
    "Hi, this is how I run product: engineers and an agent fleet on one roadmap, one board, one process. Replace this intro with your own story.",
    { label: "Engineering", href: "/work/engineering" },
    [
      { v: "1,404", d: "tickets coordinated" },
      { v: "710", d: "of them bugs" },
      { v: "804", d: "feature behaviors specified" },
      { v: "95%", d: "passing baseline" },
      { v: "20.4h", d: "median filed to merged" },
      { v: "72%", d: "ship within 48 hours" },
    ],
    ["Intake", "Roadmap", "Specs", "Ship"]
  ),
  generic(
    "Engineering",
    "Writing specs and shipping code as an individual contributor, not just a coordinator.",
    "engineering",
    "Hi, this is my engineering work: owning repos end to end as an IC. Replace this intro with your own story.",
    { label: "Customer Success", href: "/work/customer-success" },
    [
      { v: "191", d: "PRs authored" },
      { v: "162", d: "merged" },
      { v: "533", d: "commits across repos" },
      { v: "20", d: "active personal repos" },
      { v: "45/45", d: "golden tests passing" },
      { v: "100%", d: "specs before code" },
    ],
    ["Spec", "Build", "Test", "Ship"]
  ),
  generic(
    "Customer Success",
    "Built the onboarding tooling that automated the pain I felt firsthand. And still running it.",
    "customer-success",
    "Hi, this is my customer success story: after feeling the manual onboarding pain firsthand, I built the tooling that automated it. Replace this intro with your own story.",
    { label: "QA Agent Loop", href: "/work/qa-agent-loop" },
    [
      { v: "25+", d: "firms onboarded" },
      { v: "200+", d: "power users" },
      { v: "14–30", d: "days to onboard, from 60–90" },
      { v: "100%", d: "tooling adoption" },
      { v: "0", d: "manual onboarding steps" },
      { v: "5–15", d: "people per firm" },
    ],
    ["Pain", "Tooling", "Automation", "Scale"]
  ),
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
