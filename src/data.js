// Public portfolio content — edit this file to update the site.
// Sources: Alan's LinkedIn export (November 2026), previous portfolio, SSRN records.
export const me = {
  name: 'Alan Xiao',
  school: 'Thornlea Secondary School',
  location: 'Greater Toronto Area, Canada',
  email: '01alanxiao@gmail.com',
  linkedin: 'https://www.linkedin.com/in/alanyx/',
  cyfa: 'https://cyfacanada.org/',
};

export const stats = [
  { value: 2500, suffix: '+', label: 'students reached through CYFA' },
  { value: 5, suffix: '', label: 'research papers written' },
  { value: 8, suffix: '', label: 'competition placements' },
  { value: 4, suffix: '', label: 'projects built and launched' },
];

// img: optional — papers without one get a generated typographic cover.
export const publications = [
  {
    category: 'Law', year: '2026', status: 'SSRN preprint',
    title: 'Judicial Activism vs. Parliamentary Sovereignty: Assessing the Boundaries of ECHR Climate Jurisprudence',
    summary: 'Where does rights protection end and elected authority begin? A look at the European Court of Human Rights and the new wave of climate litigation.',
    tags: ['ECHR', 'Climate litigation', 'Constitutional law'],
    link: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7495138',
    img: '/images/echr.webp', imgAlt: 'European Court of Human Rights building in Strasbourg',
  },
  {
    category: 'Economics', year: '2026', status: 'SSRN preprint',
    title: 'Who Pays for Expiring Money? The Hidden Regressivity of Demurrage and CBDC Expiry',
    summary: 'Money that loses value over time sounds neutral. It isn’t. This paper traces who actually carries the cost, from 1930s stamp scrip to programmable digital currency.',
    tags: ['CBDCs', 'Demurrage', 'Distribution'],
    link: 'https://doi.org/10.2139/ssrn.7134182',
    img: '/images/worgl-note.webp', imgAlt: 'Wörgl stamp-scrip note from the 1932–33 demurrage experiment', small: true,
  },
  {
    category: 'Finance', year: '2026', status: 'SSRN preprint',
    title: 'Impact of Federal Reserve Monetary Policy Cycles on Regional versus Large-Cap Bank Stock Valuations: An Event Study (2022–2025)',
    summary: 'An event study of how regional and large-cap bank stocks reacted to every Fed decision through the 2022–2025 hiking and cutting cycle.',
    tags: ['Monetary policy', 'Equities', 'Event study'],
    link: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7037941',
    img: '/images/federal-reserve.webp', imgAlt: 'Federal Reserve Eccles Building in Washington, D.C.',
  },
  {
    category: 'Technology', year: '2026', status: 'SSRN preprint',
    title: 'Scale-Invariant Economic Security in Sampled-Audit Proof-of-Useful-Work',
    summary: 'When is cheating a computation network never worth it? Incentives, audit costs and verification risk, worked out formally.',
    tags: ['Mechanism design', 'Computation', 'Security'],
    link: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7088821',
    img: '/images/servers.webp', imgAlt: 'Rows of fibre-optic server racks in a data centre',
  },
  {
    category: 'Law', year: '2026', status: 'Working paper',
    title: 'Beyond Intelligibility: Verifying Credit-Scoring Explanations under the GDPR after CK',
    summary: 'How can a court check that an explanation of an automated credit decision is the real one? A proposal for discrepancy-triggered verification after CK (C-203/22).',
    tags: ['GDPR', 'Algorithmic accountability', 'EU law'],
    link: null,
    img: '/images/scales.webp', imgAlt: 'Scales of justice over a network of binary data',
  },
];

export const projects = [
  {
    key: 'cyfa', name: 'Canadian Youth Finance Alliance', role: 'Co-founder & President', state: 'National non-profit · since 2026',
    body: 'A national, student-run non-profit bringing financial literacy, competitions and leadership to young Canadians. What started as an idea is now a country-wide network of executive teams and school chapters, and one of the largest student-led finance organizations you’ll find if you search for it.',
    features: ['Free financial-literacy guides and workshops', 'National investing and trading competitions', 'Executive teams and school chapters across Canada'],
    metrics: [['2,500+', 'students reached'], ['1,000', 'free guides'], ['$0', 'to take part']],
    link: 'https://cyfacanada.org/', linkLabel: 'Visit CYFA',
  },
  {
    key: 'civory', name: 'Civory', role: 'Founder & CEO', state: 'Free public beta',
    body: 'A free search engine for public records. Ask a question the way you’d ask a person, like “How much does Canada spend on healthcare?” or “Did that border bill pass?”, and Civory searches official sources and answers in plain English, with links to the original documents.',
    features: ['Official sources from Canada, the US, the UK, Australia and New Zealand, plus data on 190+ countries', 'Government records first; news after, with a bias warning', 'Explains bills from both sides and says whether they became law', 'Document previews and citations for school work'],
    metrics: [['190+', 'countries of data'], ['Free', 'no account, no ads']],
    link: 'https://civory-beta.vercel.app/', linkLabel: 'Try Civory',
  },
  {
    key: 'spendleak', name: 'SpendLeak', role: 'Founder & CEO', state: 'Beta',
    body: 'A financial intelligence and expense-auditing platform that helps businesses find, investigate and recover money lost to overlooked billing errors. It compares invoices against contract terms, flags discrepancies, and turns them into evidence-backed investigations.',
    features: ['Catches duplicate invoices, supplier overcharges and wrong contract pricing', 'Finds unused credits and unnecessary subscriptions', 'AI-assisted analysis, evidence reports and recovery tracking'],
    metrics: [['Find', 'money that leaked'], ['Stop', 'it happening again']],
    link: 'https://spendleakbeta.vercel.app/', linkLabel: 'Try SpendLeak',
  },
  {
    key: 'trading', name: 'CYFA Trading', role: 'Product lead', state: 'Live',
    body: 'A practice market for CYFA’s student competitions: team leaderboards, live charts and simulated orders, all with virtual funds. Students learn how markets move without risking a dollar.',
    features: ['Team leaderboards and live charts', 'Simulated orders with virtual funds only'],
    metrics: [['Virtual', 'funds only'], ['Teams', 'and leaderboards']],
    link: 'https://cyfacanada.org/compete', linkLabel: 'See the competition',
  },
];

export const experience = [
  { date: 'Sep 2026 – now', role: 'Investment Analyst Intern', org: 'Finance Interview Coach · Wall Street Elite',
    desc: 'Equity research on an undisclosed public company for a potential seven-figure investment by a private firm managing a $40M fund. I built the multi-year revenue model and worked through financials, earnings, competitive positioning, catalysts and risks to reach a recommendation.',
    img: '/images/nyse-floor.webp', imgAlt: 'Trading floor of the New York Stock Exchange', tone: 'sky' },
  { date: '2026 – now', role: 'Founder & CEO', org: 'Civory',
    desc: 'Building a free search engine for public records that turns hard-to-find government information into clear answers with sources, across five countries and data on 190+ more.',
    logoImg: '/images/civory-mark.png', logoAlt: 'Civory logo', tone: 'glacier', light: true },
  { date: '2026 – now', role: 'Founder & CEO', org: 'SpendLeak',
    desc: 'Building an expense-auditing platform that helps businesses catch duplicate invoices, overcharges and wasted spending, then recover the money with evidence-backed reports.',
    logoImg: '/images/spendleak-mark.png', logoAlt: 'SpendLeak logo', tone: 'sage', light: true },
  { date: 'Jan 2026 – now', role: 'Co-founder & President', org: 'Canadian Youth Finance Alliance',
    desc: 'Leading a national non-profit that has reached 2,500+ students, from strategic operations to programming and chapter growth.',
    logo: true, tone: 'ink' },
  { date: 'Jul 2026', former: true, role: 'Law Youth Summer Program', org: 'Corporate Law · University of Toronto, Jackman Faculty of Law',
    desc: 'An intensive corporate-law program at U of T Law on legal frameworks, business transactions and legal analysis, through case studies and simulations led by lawyers and faculty.',
    img: '/images/jackman-law.webp', imgAlt: 'Jackman Law Building at the University of Toronto', tone: 'lilac' },
  { date: 'Aug 2026 – now', role: 'GTA Chapter Trainer', org: 'Future Business Leaders of America',
    logoImg: '/images/fbla-logo.png', logoAlt: 'FBLA logo', desc: 'Training students for business and finance competitions after representing Team Canada myself at the National Leadership Conference in San Antonio.',
    tone: 'sage' },
  { date: 'May – Sep 2025', former: true, role: 'Legal Assistant', org: 'JX Law Professional Corporation', logoImg: '/images/jx-law.png', logoAlt: 'JX Law logo', logoTile: true,
    desc: 'Drafted documents, letters, contracts and forms under supervision. Researched case law and public records, gathered evidence, and summarized statutes and regulations for the lawyers.',
    tone: 'glacier' },
  { date: '2025 – Sep 2026', former: true, role: 'President, Mock Trial', org: 'VP Mock Trials', logoImg: '/images/vp-mock-trial.png', logoAlt: 'Victoria Park Mock Trial seal', logoTile: true,
    desc: 'Led case preparation, argument building and member training after a year as a member.',
    tone: 'ivory' },
  { date: '2025 – Sep 2026', former: true, role: 'Chapter Executive', org: 'HOSA · Future Health Professionals, VPCI chapter',
    desc: 'Helped run the school chapter and competed in Medical Law & Ethics, placing 14th at the HOSA Canada Fall Leadership Conference.',
    logoImg: '/images/hosa-logo.png', logoAlt: 'HOSA Canada logo', tone: 'ivory', white: true },
];

export const awards = [
  { rank: '2nd', title: 'National Financial Planners Conference', event: 'Target Alpha, personal finance', year: '2025' },
  { rank: 'Top 3', title: 'National Stock Trading Competition', event: 'Target Alpha', year: '2026' },
  { rank: 'Top 6', title: 'Securities & Investments', event: 'FBLA, for Team Canada at NLC in San Antonio', year: '2026' },
  { rank: 'Top 7', title: 'Accounting & Auditing', event: 'Target Alpha National FPC', year: '2026' },
  { rank: 'Semi', title: 'Harvard UCP Pitch Competition', event: 'Harvard Undergraduate Capital Partners', year: '2026' },
  { rank: 'Final', title: 'National Stock Pitch Competition', event: 'Target Alpha, pitched Magna International', year: '2025' },
  { rank: 'Final', title: 'Founders Den', event: 'Startup competition', year: '2026' },
  { rank: '14th', title: 'Medical Law & Ethics', event: 'HOSA Canada Fall Leadership Conference', year: '2025' },
];

export const involvement = [
  { name: 'Target Alpha', role: 'Member & competitor', period: 'Since 2024' },
  { name: 'FBLA', role: 'Competitor, then trainer', period: 'Since 2025' },
  { name: 'HOSA', role: 'VPCI executive & competitor', period: '2025 – 2026' },
  { name: 'DECA', role: 'Principles of Finance', period: '2026' },
  { name: 'Peer tutoring', role: 'Across academic subjects', period: 'Volunteer' },
  { name: 'Canadian Young Physicists’ Tournament', role: 'Event coordination', period: 'Volunteer' },
];

export const learning = [
  { title: 'Royal Conservatory of Music', body: 'Level 7 & 8 piano with Honours with Distinction, and Level 8 theory with First Class Honours with Distinction.' },
  { title: 'Education', body: 'Thornlea Secondary School, after the IB Diploma Programme at Victoria Park Collegiate (2024–2026).' },
  { title: 'Safety', body: 'Emergency First Aid with CPR-B and the Bronze Medallion, Lifesaving Society Canada.' },
];

// Online course certificates (LinkedIn, 2025)
export const certificates = [
  { title: 'Economics of Money and Banking', org: 'Columbia University', date: 'Aug 2025' },
  { title: 'Foundations of Finance', org: 'University of Cambridge', date: 'Aug 2025' },
  { title: 'Fundamentals of Quantitative Modeling', org: 'University of Pennsylvania', date: 'Aug 2025' },
  { title: 'Cryptocurrency and Blockchain', org: 'University of Pennsylvania', date: 'Aug 2025' },
  { title: 'Microeconomics: When Markets Fail', org: 'University of Pennsylvania', date: 'Jul 2025' },
  { title: 'Narrative Economics', org: 'Yale University', date: 'Jul 2025' },
];

export const socials = [
  { name: 'LinkedIn', handle: 'alanyx', url: 'https://www.linkedin.com/in/alanyx/' },
  { name: 'X', handle: '@1AlanXiao', url: 'https://x.com/1AlanXiao' },
  { name: 'Instagram', handle: '@01alanxiao', url: 'https://www.instagram.com/01alanxiao/' },
  { name: 'GitHub', handle: 'AlanXiao01', url: 'https://github.com/AlanXiao01' },
  { name: 'Discord', handle: 'Message me', url: 'https://discordapp.com/users/778648479387484190' },
  { name: 'WhatsApp', handle: 'Chat', url: 'https://wa.me/16478527263' },
];

export const books = [
  { title: 'The Wealth of Nations', author: 'Adam Smith', img: '/images/book-wealth.webp', ar: '5/8',
    note: 'The one that keeps pulling me back to markets, incentives, and how societies organize wealth.' },
  { title: 'The Psychology of Money', author: 'Morgan Housel', img: '/images/book-psychology.webp', ar: '647/1000',
    note: 'Money through behaviour and human nature, not just numbers.' },
  { title: 'Harry Potter', author: 'J.K. Rowling', img: '/images/book-potter.webp', ar: '250/389',
    note: 'Not everything has to be about the economy. The world-building still holds up.' },
];
