// ─────────────────────────────────────────────────────────────────────────────
// Cyber Threat Watch — content data
// All content is bundled at build time so the site works without a database.
// ─────────────────────────────────────────────────────────────────────────────

const UNSPLASH = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

// ── NEWS ─────────────────────────────────────────────────────────────────────
export const NEWS = [
  { id: 1, cat: "Threat Intel", color: "var(--cyber-red)", title: "Critical Zero-Day in Apache HTTP Server Actively Exploited", date: "Apr 22, 2025", read: "4 min", summary: "Security researchers have confirmed active exploitation of a critical RCE vulnerability in Apache HTTP Server affecting millions of web servers globally.", tags: ["CVE-2025", "RCE", "Apache"], icon: "⚠️" },
  { id: 2, cat: "Data Breach", color: "#ff6b35", title: "Major Healthcare Provider Exposes 12M Patient Records", date: "Apr 21, 2025", read: "3 min", summary: "A misconfigured cloud storage bucket exposed sensitive patient data including SSNs, medical histories, and insurance details for over 12 million individuals.", tags: ["Healthcare", "Cloud", "PII"], icon: "🏥" },
  { id: 3, cat: "AI Security", color: "var(--accent)", title: "LLM Prompt Injection Attacks Surge 340% in Q1 2025", date: "Apr 20, 2025", read: "5 min", summary: "New threat intelligence report reveals dramatic increase in AI-targeted attacks as enterprises accelerate LLM adoption without adequate security controls.", tags: ["AI", "LLM", "Prompt Injection"], icon: "🤖" },
  { id: 4, cat: "Tools", color: "var(--cyber-green)", title: "CISA Releases Updated Vulnerability Scanning Framework", date: "Apr 19, 2025", read: "3 min", summary: "The Cybersecurity and Infrastructure Security Agency published an enhanced version of their vulnerability scanning toolkit with improved detection for modern attack vectors.", tags: ["CISA", "Scanning", "Framework"], icon: "🛡️" },
  { id: 5, cat: "Ransomware", color: "var(--cyber-red)", title: "LockBit 4.0 Targets Critical Infrastructure in Europe", date: "Apr 18, 2025", read: "6 min", summary: "LockBit's latest variant employs advanced evasion techniques and has successfully compromised 23 critical infrastructure organizations across seven European nations.", tags: ["Ransomware", "LockBit", "Critical Infra"], icon: "🔒" },
  { id: 6, cat: "Nation State", color: "#9b5de5", title: "APT41 Campaign Targets Semiconductor Supply Chain", date: "Apr 17, 2025", read: "7 min", summary: "Mandiant researchers attribute a sophisticated 8-month espionage campaign targeting semiconductor manufacturers to Chinese state-sponsored threat actor APT41.", tags: ["APT41", "Espionage", "Supply Chain"], icon: "🌐" },
];

// ── BLOG POSTS (with full content) ───────────────────────────────────────────
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  author: string;
  date: string;
  read: string;
  cat: string;
  summary: string;
  img: string;
  cover: string;
  featured: boolean;
  content: { heading: string; body: string }[];
}

export const BLOGS: BlogPost[] = [
  {
    id: 1,
    slug: "zero-trust-architecture-implementation-guide",
    title: "Zero Trust Architecture: A Practical Implementation Guide",
    author: "Dr. Sarah Chen", date: "Apr 20, 2025", read: "12 min",
    cat: "Architecture",
    summary: "Zero Trust is no longer optional. This guide walks through implementing ZTA in legacy enterprise environments — identity, microsegmentation, and continuous verification.",
    img: "🏗️", featured: true,
    cover: UNSPLASH("1550751827-4bd374c3f58b"),
    content: [
      { heading: "Why Zero Trust Now", body: "Perimeter-based security collapses the moment an attacker gets a foothold inside the network. Zero Trust replaces the implicit trust granted to internal traffic with explicit, per-request verification of identity, device posture, and context. With cloud, SaaS, and remote work, the perimeter is gone — Zero Trust is simply how modern networks must operate." },
      { heading: "The Five Pillars", body: "NIST SP 800-207 frames Zero Trust around five pillars: identity, devices, network, applications and workloads, and data. Mature programs add visibility/analytics and automation/orchestration as cross-cutting capabilities. Treat each pillar as a roadmap, not a checklist — partial wins compound." },
      { heading: "Identity First", body: "Identity is the new perimeter. Roll out phishing-resistant MFA (FIDO2/WebAuthn) across every workforce account, federate SaaS via SSO, and remove standing privileges with Just-In-Time access. Service-to-service traffic should authenticate with workload identities (SPIFFE/SPIRE, OIDC) instead of long-lived API keys." },
      { heading: "Microsegmentation Without Tears", body: "Don't try to segment the entire data center on day one. Start with crown-jewel applications: identify the smallest blast radius that protects them, write explicit allow rules, and log everything else as deny-by-default. Identity-aware proxies make this far easier than IP/port firewalls." },
      { heading: "Continuous Verification", body: "Authentication is not a one-time event. Pull device posture, geolocation, behavior signals, and risk score into every authorization decision. Tools like Google BeyondCorp, Cloudflare Access, and Tailscale operationalize this for HTTP and SSH respectively." },
      { heading: "90-Day Quick Wins", body: "1) Enforce MFA everywhere. 2) Inventory and tag all identities (human + machine). 3) Replace VPN access to one critical app with an identity-aware proxy. 4) Turn on conditional access policies. 5) Stand up a logging pipeline so you can measure what's happening." },
    ],
  },
  {
    id: 2,
    slug: "anatomy-of-modern-phishing-campaign",
    title: "The Anatomy of a Modern Phishing Campaign",
    author: "Marcus Webb", date: "Apr 18, 2025", read: "8 min",
    cat: "Threat Analysis",
    summary: "Breaking down a real-world spear-phishing operation from initial recon to credential harvesting — and how defenders can identify each stage.",
    img: "🎣", featured: false,
    cover: UNSPLASH("1563013544-824ae1b704d3"),
    content: [
      { heading: "Reconnaissance", body: "Modern phishing rarely starts with a generic blast. Operators scrape LinkedIn, GitHub, and breach corpuses to map org charts, working hours, and tooling. Expect attackers to know your CEO's assistant, your payroll vendor, and the SSO portal you use." },
      { heading: "Infrastructure", body: "Look-alike domains are typo-squatted via Punycode (xn--), Cloudflare-fronted, and rotated weekly. Phishing kits are shipped as turnkey reverse proxies (evilginx, Modlishka) that capture not just credentials but session cookies — bypassing MFA in many cases." },
      { heading: "The Lure", body: "The most effective lures are mundane: shared documents, expense approvals, calendar invites. Generative AI eliminates the broken English that used to be a tell. Voice and video deepfakes are now in the kit." },
      { heading: "Delivery and Evasion", body: "HTML attachments rendered in-browser, QR codes that move the click off the corporate device, and OAuth consent grants that don't trigger 'phishing site' filters at all are common evasion patterns." },
      { heading: "Detection Signals", body: "Newly registered domains, anomalous OAuth grants, MFA prompts at unusual hours, and impossible-travel sign-ins remain the highest-signal indicators. Funnel them into a SOAR playbook so analysts triage minutes instead of hours." },
    ],
  },
  {
    id: 3,
    slug: "kubernetes-security-hardening",
    title: "Kubernetes Security Hardening: Beyond the Basics",
    author: "Aisha Patel", date: "Apr 15, 2025", read: "15 min",
    cat: "Cloud Security",
    summary: "Most K8s deployments are misconfigured by default. A deep-dive into RBAC, network policies, secrets management, and runtime security.",
    img: "☸️", featured: false,
    cover: UNSPLASH("1558494949-ef010cbdcc31"),
    content: [
      { heading: "RBAC Done Right", body: "Default service accounts should never be used by workloads. Create one ServiceAccount per workload, bind the smallest possible Role, and audit ClusterRoleBindings monthly. Tools like rakkess and rback visualize the effective permission graph." },
      { heading: "Network Policies", body: "Without NetworkPolicies, every pod can talk to every other pod. Adopt a default-deny policy in each namespace and explicitly allow required flows. Cilium's Hubble UI makes the actual east-west traffic visible." },
      { heading: "Secrets and Image Security", body: "Use external secrets operators backed by a real KMS. Sign images with cosign and enforce verification with Kyverno or OPA Gatekeeper. Pin digests, never tags." },
      { heading: "Runtime Defense", body: "Falco and Tetragon detect anomalous syscalls in real time — for example, a web server suddenly spawning a shell. Pair with admission controllers that block privileged containers and host mounts at deploy time." },
    ],
  },
  {
    id: 4,
    slug: "building-a-soc-from-scratch",
    title: "Building a SOC From Scratch in 90 Days",
    author: "James Okonkwo", date: "Apr 12, 2025", read: "20 min",
    cat: "Blue Team",
    summary: "A realistic roadmap for standing up a functional Security Operations Center with limited budget — covering tooling, processes, and people.",
    img: "🖥️", featured: true,
    cover: UNSPLASH("1518770660439-4636190af475"),
    content: [
      { heading: "Define the Mission", body: "A SOC without a clear mission becomes a ticket queue. Pick three measurable outcomes for the first quarter — for example: detect lateral movement within 30 minutes, contain phishing within 1 hour, baseline asset visibility at 95%." },
      { heading: "Tooling on a Budget", body: "Open-source stack: Wazuh or Elastic for SIEM, TheHive + Cortex for case management, MISP for threat intel, Velociraptor for endpoint visibility. Total license cost: $0. The hard part is operating it, not buying it." },
      { heading: "People and Shifts", body: "Three analysts will burn out trying to cover 24/7. Start business-hours, partner with an MSSP for off-hours, and grow as detection volume justifies it. Always pair on-call with a documented playbook." },
      { heading: "Detection Engineering", body: "Prioritize detections by MITRE ATT&CK coverage of techniques actually relevant to your environment. Sigma rules give you a portable, vendor-neutral starting point. Test detections with Atomic Red Team before relying on them." },
    ],
  },
  {
    id: 5,
    slug: "bug-bounty-strategies",
    title: "Bug Bounty Strategies That Actually Pay Off",
    author: "Eva Lindqvist", date: "Apr 10, 2025", read: "10 min",
    cat: "Offensive Security",
    summary: "After earning $200K+ in bug bounties, here are the methodologies, target selection, and report tips that separate top earners.",
    img: "💰", featured: false,
    cover: UNSPLASH("1573164574572-cb89e39749b4"),
    content: [
      { heading: "Pick the Right Program", body: "Public programs are crowded. Private invites pay better and have less duplication. Get there by ranking on platform leaderboards in a niche (mobile, GraphQL, OAuth) where competition is thinner." },
      { heading: "Recon Compounds", body: "Build automation that runs continuously: subdomain enumeration, JS file diffing, S3 bucket discovery, port scans. The first hunter to spot a new endpoint usually wins." },
      { heading: "Report Like a Professional", body: "Triagers pay severity-based bounties. Map every finding to OWASP/CWE, describe real business impact, and provide a clean reproduction. A well-written report can move a bug from low to high severity." },
    ],
  },
  {
    id: 6,
    slug: "threat-intel-feeds-signal-vs-noise",
    title: "Threat Intelligence Feeds: Signal vs Noise",
    author: "Raj Iyer", date: "Apr 8, 2025", read: "9 min",
    cat: "Threat Intel",
    summary: "With hundreds of TI feeds available, knowing which to trust and how to operationalize them is critical. Here's an evaluation framework.",
    img: "📡", featured: false,
    cover: UNSPLASH("1551808525-051329d8bdfb"),
    content: [
      { heading: "Quality Over Quantity", body: "More feeds = more false positives. Score each feed on freshness, attribution rigor, false-positive rate, and overlap with what you already have." },
      { heading: "Operationalize or Skip", body: "Indicators that don't end up in a control (firewall, EDR, SIEM correlation) are wasted spend. Wire MISP into your stack before subscribing to anything paid." },
      { heading: "Free Sources Worth Using", body: "AlienVault OTX, abuse.ch (URLhaus, ThreatFox, MalwareBazaar), CISA AIS, and your ISAC are all free and high-signal for most teams." },
    ],
  },
];

// ── INSIGHTS ─────────────────────────────────────────────────────────────────
export interface InsightItem {
  id: number;
  slug: string;
  title: string;
  author: string;
  date: string;
  read: string;
  cat: string;
  key: string;
  img: string;
  cover: string;
  content: { heading: string; body: string }[];
}

export const INSIGHTS: InsightItem[] = [
  {
    id: 1,
    slug: "state-of-ransomware-2025",
    title: "The State of Ransomware 2025: Industrialization of Cybercrime",
    author: "CyberSec Research Team", date: "Apr 22, 2025", read: "18 min",
    cat: "Annual Report",
    key: "Ransomware-as-a-Service ecosystems have matured into enterprise-scale operations with customer support, affiliate programs, and revenue sharing.",
    img: "📊",
    cover: UNSPLASH("1614064641938-3bbee52942c7"),
    content: [
      { heading: "Executive Summary", body: "2025 saw a 47% YoY increase in publicly disclosed ransomware incidents. Average ransom demand: $5.2M. Average payout (when paid): $1.7M. Critical infrastructure is now the #1 target sector, surpassing healthcare for the first time." },
      { heading: "The RaaS Supply Chain", body: "Modern operations look like SaaS companies. Operators provide the encryptor, leak site, negotiation portal, and even 24/7 affiliate support. Affiliates handle initial access — often purchased from Initial Access Brokers (IABs) for $1,500–$10,000 per environment." },
      { heading: "Top Families", body: "LockBit 4.0, RansomHub, Akira, BlackBasta, and Play account for 71% of all incidents tracked. Smaller families fill regional and vertical niches." },
      { heading: "Defender Playbook", body: "Immutable backups, network segmentation, MFA on all remote access, EDR with rollback, and a tested incident response plan reduce blast radius dramatically. Tabletop exercises with executives — not just technical teams — are the single highest-leverage investment." },
      { heading: "Outlook 2026", body: "Expect AI-assisted negotiation, double extortion converging with regulatory threats (GDPR/HIPAA disclosure leverage), and a continued shift away from encryption toward pure data theft." },
    ],
  },
  {
    id: 2,
    slug: "generative-ai-threat-landscape",
    title: "How Generative AI is Reshaping the Threat Landscape",
    author: "Dr. Yuki Tanaka", date: "Apr 18, 2025", read: "14 min",
    cat: "AI Analysis",
    key: "Defenders must now contend with AI-generated malware that mutates to evade signature-based detection in real time.",
    img: "🧠",
    cover: UNSPLASH("1677442136019-21780ecad995"),
    content: [
      { heading: "Phishing at Scale", body: "LLMs eliminate language and cultural friction in social engineering. Spear-phishing that used to take an analyst hours can now be generated in seconds, personalized from public data." },
      { heading: "Polymorphic Malware", body: "Open-weight code models generate functionally equivalent variants on every build. Static signature detection alone is functionally dead — behavioral detection is mandatory." },
      { heading: "Attacks on AI Systems", body: "Prompt injection, model extraction, training data poisoning, and supply-chain attacks on model registries are real and observed. OWASP LLM Top 10 is required reading." },
      { heading: "AI for Defenders", body: "Triage acceleration, malware reverse engineering, log summarization, and detection-as-code generation are mature defender use cases. Keep humans in the loop on response actions." },
    ],
  },
  {
    id: 3,
    slug: "critical-infrastructure-under-siege",
    title: "Critical Infrastructure Under Siege: Lessons from 2024",
    author: "NATO Cyber Centre", date: "Apr 14, 2025", read: "22 min",
    cat: "Policy Brief",
    key: "Nation-state actors increasingly target civilian infrastructure as a low-cost, high-impact tool for geopolitical coercion.",
    img: "⚡",
    cover: UNSPLASH("1473341304170-971dccb5ac1e"),
    content: [
      { heading: "Attack Patterns", body: "Energy, water, and transport saw the largest spike. Initial access via VPN appliances and unpatched OT gateways dominated. Volt Typhoon and Sandworm operations demonstrate pre-positioning for future conflict." },
      { heading: "Policy Response", body: "NIS2 in the EU, CIRCIA in the US, and updated ENISA guidance raise mandatory reporting thresholds and impose board-level accountability for critical sectors." },
      { heading: "Recommendations", body: "Segment IT from OT, monitor east-west traffic, retain authoritative asset inventories, and run cross-sector tabletop exercises with regulators present." },
    ],
  },
  {
    id: 4,
    slug: "ciso-burnout-crisis",
    title: "CISO Burnout Crisis: The Human Cost of Cyber Defense",
    author: "CyberHealth Initiative", date: "Apr 10, 2025", read: "11 min",
    cat: "Industry Trends",
    key: "62% of CISOs report severe burnout, with average tenure dropping to 18 months. The talent retention crisis is becoming a security risk.",
    img: "🧑‍💼",
    cover: UNSPLASH("1551836022-d5d88e9218df"),
    content: [
      { heading: "What the Data Shows", body: "Survey of 1,200 CISOs across 14 countries: 62% meet clinical burnout criteria, 71% have considered leaving the field, average tenure has fallen from 26 months in 2021 to 18 months in 2025." },
      { heading: "Root Causes", body: "Personal liability exposure (SEC disclosure rules, post-incident lawsuits), 24/7 operational responsibility, undersized teams, and unrealistic board expectations top the list." },
      { heading: "Mitigations That Work", body: "Deputy CISO structures, on-call rotation discipline, D&O insurance specifically covering cyber decisions, and pre-agreed crisis communication playbooks reduce sustained stress." },
    ],
  },
];

// ── BOOKS (with full chapter content) ────────────────────────────────────────
export interface BookItem {
  id: number;
  slug: string;
  title: string;
  author: string;
  year: number;
  cat: string;
  desc: string;
  pages: number;
  icon: string;
  cover: string;
  chapters: { title: string; body: string }[];
}

const baseChapter = (n: number, title: string, body: string) => ({ title: `Chapter ${n}: ${title}`, body });

export const BOOKS: BookItem[] = [
  {
    id: 1, slug: "art-of-intrusion", title: "The Art of Intrusion", author: "Kevin Mitnick", year: 2023,
    cat: "Offensive Security", pages: 288, icon: "🔓",
    cover: UNSPLASH("1563013544-824ae1b704d3"),
    desc: "True stories of real hackers who broke into banks, government computers, and the phone system.",
    chapters: [
      baseChapter(1, "The Mindset of an Intruder", "Every successful intrusion begins long before any packet is sent. The intruder studies the target the way a chess player studies an opponent — looking for the small inconsistencies, the cultural assumptions, and the procedural shortcuts that humans take when nobody is watching. This chapter unpacks the mental models attackers use and shows defenders how to invert them."),
      baseChapter(2, "Reconnaissance: The Quiet Hour", "Open-source intelligence is the most under-appreciated phase of an attack. Public S3 buckets, exposed Git repositories, employee LinkedIn updates, and conference talks together form a high-resolution map of any organization. We walk through a real engagement where 100% of initial access came from publicly available information."),
      baseChapter(3, "Social Engineering by Design", "The phone call that compromises a company is rarely a single masterpiece. It is a sequence of small, plausible interactions, each calibrated to extract one more piece of context. Learn the four pillars used by every elite social engineer: pretext, rapport, urgency, and exit."),
      baseChapter(4, "Physical Access", "Tailgating, badge cloning, and lock bypass remain devastatingly effective. Most data centers fail their first physical assessment because the security model assumed badges could not be cloned. RFID cloners now cost under $30."),
      baseChapter(5, "Network Footholds", "Initial code execution is rarely the trophy — it is the starting line. Attackers prioritize persistence, credential harvesting, and lateral movement before they touch anything sensitive. We dissect the kill chain of a 2023 breach that cost a Fortune 500 company $80M."),
      baseChapter(6, "Privilege Escalation", "Misconfigurations, not zero-days, are the workhorse of privilege escalation. SUID binaries, weak service permissions, and overly permissive IAM roles convert a foothold into full domain control. We catalog the top 20 escalation paths observed in 2024 engagements."),
      baseChapter(7, "Persistence and Stealth", "An attacker who can be evicted has not really won. Modern persistence lives in scheduled tasks, container images, OAuth grants, and cloud workload identities. Detection requires comparing what is to what should be — at every layer."),
      baseChapter(8, "Exfiltration", "Data leaves the network through the channels defenders trust the most: HTTPS to legitimate cloud providers, DNS, and OAuth-authorized SaaS apps. Volume-based DLP misses everything that matters."),
      baseChapter(9, "Anti-Forensics", "Sophisticated actors clear logs, time-stomp files, and use living-off-the-land binaries to leave minimal artifacts. Centralized, immutable logging is the single most valuable forensic investment a team can make."),
      baseChapter(10, "Lessons for the Defender", "Every story in this book exists because a defender made an assumption an attacker did not share. Document your assumptions. Test them. Repeat."),
    ],
  },
  {
    id: 2, slug: "hacking-art-of-exploitation", title: "Hacking: The Art of Exploitation", author: "Jon Erickson", year: 2022,
    cat: "Technical", pages: 488, icon: "💻",
    cover: UNSPLASH("1555066931-4365d14bab8c"),
    desc: "A deep dive into exploits, shellcode, network attacks, and cryptographic weaknesses with hands-on examples.",
    chapters: [
      baseChapter(1, "What is Hacking?", "At its core, hacking is the act of finding clever, unintended uses for systems. This chapter sets the philosophical foundation: every system has emergent behavior the designer did not anticipate, and finding it requires reading like an engineer and thinking like an artist."),
      baseChapter(2, "Programming Foundations", "C, assembly, and the memory model. Understand how the stack and heap actually work, why pointers are dangerous, and how the compiler's choices shape the attack surface."),
      baseChapter(3, "Stack-Based Buffer Overflows", "Walk through a vulnerable program byte by byte. Overflow the buffer, overwrite the return address, redirect execution into shellcode. Mitigations (DEP, ASLR, stack canaries) and the techniques that defeat them."),
      baseChapter(4, "Format String Vulnerabilities", "An overlooked but powerful class of bug. Read arbitrary memory, write arbitrary memory, escalate to code execution — all from a single mishandled printf."),
      baseChapter(5, "Heap Exploitation", "Modern heap allocators are intricate. Use-after-free, double-free, and tcache poisoning remain practical against unhardened targets. We rebuild a small allocator to make the internals concrete."),
      baseChapter(6, "Shellcode", "Position-independent assembly that survives whatever environment it lands in. Egg hunters, encoder chains, and how to fit a working payload into the few bytes you actually control."),
      baseChapter(7, "Networking and Sockets", "Raw sockets, TCP/IP internals, and why network protocols leak more state than their authors intended. Build a minimal sniffer in under 100 lines."),
      baseChapter(8, "Cryptographic Weaknesses", "ECB mode patterns, weak random number generators, padding oracle attacks, and length extension. The math is approachable; the consequences are not."),
      baseChapter(9, "Countermeasures and Bypasses", "ROP, JOP, and the long arms race between mitigations and exploitation techniques. The lesson: defense in depth is not a slogan, it's mandatory."),
    ],
  },
  {
    id: 3, slug: "web-application-hackers-handbook", title: "The Web Application Hacker's Handbook", author: "Stuttard & Pinto", year: 2024,
    cat: "Web Security", pages: 912, icon: "🌐",
    cover: UNSPLASH("1526374965328-7f61d4dc18c5"),
    desc: "The definitive guide to finding and exploiting web application security flaws — OWASP Top 10 and beyond.",
    chapters: [
      baseChapter(1, "How Web Apps Fail", "The web stack is a collection of conveniences that defenders pay for. Each layer (browser, framework, ORM, server) trusts data from the layer below in ways the original designers never intended."),
      baseChapter(2, "Mapping the Application", "Before exploiting anything, map every endpoint, parameter, and authentication boundary. Burp Suite Community + a disciplined methodology will out-perform any automated scanner."),
      baseChapter(3, "Authentication Flaws", "Credential stuffing, broken session management, MFA bypass, and OAuth misconfigurations. The state of the art has shifted — but the fundamentals haven't."),
      baseChapter(4, "Injection Attacks", "SQLi is not dead. NoSQL injection, ORM injection, command injection, SSTI, and prototype pollution have inherited its mantle. Parameterized queries are necessary but not sufficient."),
      baseChapter(5, "Cross-Site Scripting", "Stored, reflected, DOM. Modern frameworks reduce — but do not eliminate — XSS risk. CSP is the safety net you cannot skip."),
      baseChapter(6, "Access Control", "Insecure Direct Object References (IDOR) remains the most reported bug class on bounty platforms. Test every parameter that points to a resource, with every role you can obtain."),
      baseChapter(7, "Server-Side Request Forgery", "SSRF is the attack of the cloud era. Metadata services, internal admin panels, and microservice mesh endpoints all become reachable through one badly validated URL parameter."),
      baseChapter(8, "Modern Concerns: GraphQL, gRPC, WebSockets", "Each new protocol re-introduces the same old mistakes in a new wrapper. We give field-tested checklists for each."),
      baseChapter(9, "Reporting and Remediation", "A finding is only as useful as its report. Severity scoring, reproduction steps, and remediation advice that engineers can actually act on."),
    ],
  },
  {
    id: 4, slug: "blue-team-handbook", title: "Blue Team Handbook", author: "Don Murdoch", year: 2023,
    cat: "Blue Team", pages: 204, icon: "🛡️",
    cover: UNSPLASH("1510511459019-5dda7724fd87"),
    desc: "Concise reference for incident responders covering detection, analysis, and response procedures with practical checklists.",
    chapters: [
      baseChapter(1, "Incident Response Lifecycle", "Preparation, detection, containment, eradication, recovery, lessons learned. The structure is simple; living it under pressure is not."),
      baseChapter(2, "Triage Under Pressure", "The first 30 minutes determine the next 30 days. Severity, scope, and stakeholder communication must happen in parallel — not in sequence."),
      baseChapter(3, "Endpoint Forensics", "Memory acquisition, autoruns, timeline reconstruction. Velociraptor and KAPE have made what used to be artisan work tractable for small teams."),
      baseChapter(4, "Network Forensics", "PCAP analysis, NetFlow, Zeek. Storage is cheap; visibility you didn't capture cannot be reconstructed."),
      baseChapter(5, "Log Analysis", "Centralized, time-synchronized, immutable. If two of those three are missing, your investigation will hit a wall."),
      baseChapter(6, "Containment Strategies", "Network isolation, account disable, credential rotation, EDR isolation. Each has trade-offs against business continuity."),
      baseChapter(7, "Eradication and Recovery", "Patch, rebuild, restore from known-good. Re-imaging is faster than confidence in cleanup for any non-trivial compromise."),
      baseChapter(8, "Post-Incident Review", "Blameless retrospectives drive real improvement. Track every action item to closure or it will recur."),
    ],
  },
  {
    id: 5, slug: "threat-intelligence-and-me", title: "Threat Intelligence and Me", author: "Chris Roberts", year: 2024,
    cat: "Threat Intel", pages: 320, icon: "📡",
    cover: UNSPLASH("1614064641938-3bbee52942c7"),
    desc: "A practical guide to building and operationalizing a threat intelligence program from the ground up.",
    chapters: [
      baseChapter(1, "What Threat Intel Actually Is", "Strategic, operational, tactical. Most teams skip strategic and drown in tactical. The result: a stream of indicators with no answer to 'so what?'"),
      baseChapter(2, "Stakeholder Alignment", "Executives, IR, detection engineering, and red team all need different deliverables. Define the audience before producing anything."),
      baseChapter(3, "Collection Sources", "Open source, paid feeds, ISACs, internal telemetry, and law enforcement partnerships. Each has trade-offs in speed, attribution rigor, and cost."),
      baseChapter(4, "Analysis Frameworks", "Diamond Model, Kill Chain, MITRE ATT&CK. Use them as common vocabulary, not as ends in themselves."),
      baseChapter(5, "MISP in Practice", "Stand up an instance, integrate with your SIEM, and curate a sharing community. Open source TI infrastructure that works."),
      baseChapter(6, "Reporting Cadence", "Daily operational, weekly tactical, monthly executive. Anything less and the program becomes invisible to the people who fund it."),
    ],
  },
  {
    id: 6, slug: "zero-trust-networks", title: "Zero Trust Networks", author: "Gilman & Barth", year: 2023,
    cat: "Architecture", pages: 240, icon: "🏗️",
    cover: UNSPLASH("1550751827-4bd374c3f58b"),
    desc: "Building secure systems in untrusted networks. Design principles, protocols, and implementation strategies for ZTA.",
    chapters: [
      baseChapter(1, "Why Perimeters Failed", "VPN, DMZ, and 'trust but verify' were all rational answers to a problem that no longer exists. The network is not the security boundary anymore."),
      baseChapter(2, "Identity at the Core", "Workforce identity, workload identity (SPIFFE), and device identity. Authorization becomes a function of all three plus context."),
      baseChapter(3, "Microsegmentation", "Identity-aware proxies vs. host firewalls vs. service mesh policy. Pick the layer that matches the team that will operate it."),
      baseChapter(4, "Continuous Verification", "Risk score, device posture, and behavioral signals feed every authorization decision. Static policy is the floor, not the ceiling."),
      baseChapter(5, "Migration Strategies", "Brownfield reality: you cannot rebuild from scratch. Strangle the perimeter one application at a time."),
      baseChapter(6, "Operating a Zero Trust Network", "Logging, telemetry, and the operations skills required. The technology is the easy part."),
    ],
  },
  {
    id: 7, slug: "practical-malware-analysis", title: "Practical Malware Analysis", author: "Sikorski & Honig", year: 2022,
    cat: "Malware", pages: 800, icon: "🦠",
    cover: UNSPLASH("1526374965328-7f61d4dc18c5"),
    desc: "The hands-on guide to dissecting malicious software. Tools, techniques, and processes used by professional analysts.",
    chapters: [
      baseChapter(1, "Setting Up a Lab", "Isolated VMs, snapshot discipline, network segmentation. Rule one: assume the malware will try to detect and escape your sandbox."),
      baseChapter(2, "Static Analysis Basics", "Strings, imports, entropy, signature checks. Cheap, fast, often enough to triage."),
      baseChapter(3, "Dynamic Analysis", "Procmon, API monitor, network capture, memory snapshots. What the binary actually does, not what it claims to do."),
      baseChapter(4, "Disassembly with IDA / Ghidra", "Reading optimized assembly, identifying compiler patterns, recovering control flow. Ghidra closed the price gap; the skill remains."),
      baseChapter(5, "Anti-Analysis Techniques", "Packers, anti-debug, anti-VM, control flow obfuscation. The arms race never ends."),
      baseChapter(6, "Shellcode Analysis", "Position-independent code, decoder loops, second-stage payloads. Manual unpacking step by step."),
      baseChapter(7, "Reporting", "What an IR team needs from you in 30 minutes vs. 30 hours. Write for the audience that has to act on the analysis."),
    ],
  },
  {
    id: 8, slug: "social-engineering-human-hacking", title: "Social Engineering: The Science of Human Hacking", author: "Christopher Hadnagy", year: 2023,
    cat: "Social Engineering", pages: 320, icon: "🎭",
    cover: UNSPLASH("1573164574572-cb89e39749b4"),
    desc: "Understanding the psychological principles behind manipulation and how to build human-centered security awareness programs.",
    chapters: [
      baseChapter(1, "The Psychology of Influence", "Cialdini's six principles applied at the keyboard. Reciprocity, scarcity, authority, consistency, liking, social proof — every successful pretext leans on at least two."),
      baseChapter(2, "OSINT for Pretexting", "Public profiles, breach data, conference attendance, even Strava routes. The pretext writes itself once you have enough context."),
      baseChapter(3, "Phishing Campaigns", "Designing emails that pass technical filters and human pattern recognition. The metric that matters is click rate by department, tracked over time."),
      baseChapter(4, "Vishing and Smishing", "Voice and SMS-based attacks. Caller-ID spoofing, voice cloning, and trust transfer techniques. Detection lags badly here."),
      baseChapter(5, "Physical Pretexting", "Tailgating, vendor impersonation, repair-tech disguises. Most badges fail an impersonation test in under five minutes."),
      baseChapter(6, "Building Resilient Humans", "Security awareness that actually changes behavior. Quarterly simulations, immediate just-in-time coaching, and a no-blame reporting culture."),
    ],
  },
];

// ── TICKER ───────────────────────────────────────────────────────────────────
export const TICKER_ITEMS = [
  "⚡ CRITICAL: Apache Zero-Day CVE-2025-1234 under active exploitation",
  "🔴 ALERT: LockBit 4.0 targets EU critical infrastructure",
  "🤖 AI prompt injection attacks up 340% in Q1 2025",
  "🛡️ CISA releases updated vulnerability scanning framework v3.2",
  "🔵 Patch Tuesday: Microsoft addresses 87 vulnerabilities",
  "📊 IBM X-Force: Average breach cost hits $5.3M in 2025",
  "🌐 APT41 active in semiconductor supply chain espionage",
];

export const STATS = [
  { val: "2,365", label: "Cyberattacks/Day", icon: "⚡" },
  { val: "$5.3M", label: "Avg Breach Cost", icon: "💸" },
  { val: "95%", label: "Human Factor", icon: "🧑‍💻" },
  { val: "280", label: "Days to Detect", icon: "🕐" },
];

// ── TOOLS — each links to a real, free cybersecurity platform ────────────────
export interface ToolItem {
  name: string; icon: string; desc: string; url: string; provider: string;
}
export const TOOLS: ToolItem[] = [
  { name: "Threat Map", icon: "🗺️", desc: "Live global cyberattack visualization", url: "https://cybermap.kaspersky.com/", provider: "Kaspersky" },
  { name: "CVE Search", icon: "🔍", desc: "Search the latest vulnerabilities by CVE ID", url: "https://nvd.nist.gov/vuln/search", provider: "NIST NVD" },
  { name: "Hash Checker", icon: "#️⃣", desc: "Verify file integrity and detect malware", url: "https://www.virustotal.com/gui/home/upload", provider: "VirusTotal" },
  { name: "IP Reputation", icon: "🌐", desc: "Check IP addresses against threat feeds", url: "https://www.abuseipdb.com/", provider: "AbuseIPDB" },
  { name: "SSL Inspector", icon: "🔐", desc: "Analyze SSL/TLS certificate security", url: "https://www.ssllabs.com/ssltest/", provider: "Qualys SSL Labs" },
  { name: "News API", icon: "📡", desc: "Live cybersecurity feed aggregator", url: "https://thehackernews.com/", provider: "The Hacker News" },
  { name: "Free VPN", icon: "🛡️", desc: "Open-source VPN for secure connections", url: "https://openvpn.net/community/", provider: "OpenVPN" },
  { name: "Free Antivirus", icon: "🧬", desc: "Free malware protection and scanner", url: "https://www.kaspersky.com/free-antivirus", provider: "Kaspersky" },
  { name: "Have I Been Pwned", icon: "📧", desc: "Check if your email was in a data breach", url: "https://haveibeenpwned.com/", provider: "HIBP" },
  { name: "URL Scanner", icon: "🔗", desc: "Scan and analyze suspicious URLs in real time", url: "https://urlscan.io/", provider: "urlscan.io" },
  { name: "Phishing Reporter", icon: "🎣", desc: "Report and investigate phishing campaigns", url: "https://phishtank.org/", provider: "PhishTank" },
  { name: "MITRE ATT&CK", icon: "⚔️", desc: "Adversary tactics & techniques knowledge base", url: "https://attack.mitre.org/", provider: "MITRE" },
];
