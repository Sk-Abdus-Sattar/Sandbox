// Source of truth for service pages. Copy comes from the client's live pages; edit here, then run `node build/build.mjs`.
export const SITE = 'https://afteroidsvision.site';
export const EMAIL = 'afteroidsvision@gmail.com';

const SAMPLE_FAQ = ['What’s in the free sample edit?',
  'A short edit using a clip from your footage, so you can judge the pacing, motion and finish before committing. Share your channel link and we’ll reply within 24 hours to arrange the sample.'];

export const services = [
  {
    slug: 'youtube-video-editing',
    name: 'Long-Form YouTube Editing',
    card: 'Story-led cuts. Pacing that earns the next second.',
    tags: ['Documentary', 'Video essays', 'Interviews and talking to camera', 'Vlogs'],
    title: 'Long-Form YouTube Video Editing Service | Afteroids Vision',
    desc: 'Cinematic long-form YouTube editing with pacing that keeps viewers watching, motion graphics, color and sound. First cut in 48 hours. Get a free sample edit.',
    eyebrow: 'Long-form YouTube editing',
    h1: 'YouTube video editing built <em>to keep viewers watching.</em>',
    lead: 'A long-form editing service for creators and brands that treat their channel as a growth engine. You get a dedicated editor and creative director, with cinematic pacing, motion graphics, sound design and a signature look meant to keep viewers watching to the end.',
    glance: [['First cut', 'Within 48 hours'], ['Revisions', 'Until it’s right'], ['Scope', 'Quoted on a call']],
    clips: [[[0, 22, 'a'], [24, 30, 'b'], [56, 18, 'a'], [76, 20, 'c']], [[4, 34, 'c'], [40, 24, 'a'], [66, 30, 'b']], [[0, 60, 'b'], [64, 32, 'a']]],
    workH: 'What goes into the work',
    work: [
      ['Pacing that keeps viewers watching', 'A strong opening hook and purposeful story structure, so every cut earns the next second.'],
      ['Extra footage, motion and moving text', 'Extra footage (b-roll) found and placed, plus motion graphics and animated text that serve the story.'],
      ['Cinematic color and sound', 'Cinematic color work and broadcast-quality sound design.'],
      ['Style-guide onboarding', 'We build a style guide from your best-performing videos, so each edit matches your channel.'],
      ['Individually scoped engagements', 'Every project is scoped on a discovery call, with revisions until you’re happy.'],
      ['First cut in 48 hours', 'Your first cut arrives within 48 hours of receiving footage and a brief.'],
    ],
    storyH: 'Long-form editing that keeps people watching',
    story: [
      'On YouTube, the edit is the product. A strong topic or a great camera can’t rescue a weak hook or a sagging middle.',
      'The goal is watch time. Cuts, sound cues and motion elements all work to keep people watching, and the direction comes from your references and footage: a coherent story, not a pile of effects.',
    ],
    inclH: 'Included with every video',
    incl: [
      'Rough cut, fine cut and final delivery',
      'Extra footage (b-roll) research and placement',
      'Custom motion graphics and lower thirds',
      'Cinematic color work, including footage shot in a flat, wide-range camera profile',
      'Full sound design: sound effects, background music, dialogue cleanup and volume leveled for YouTube',
      'Chapters, end screens and thumbnail-ready still exports',
      'Delivery in your channel’s video shape, volume level and file type',
    ],
    whoH: 'Who it’s for',
    who: [
      'Personal-brand creators publishing 1–4 long-form videos a month',
      'Founders and executives building thought-leadership presences',
      'Companies running documentary-style brand channels',
      'Established YouTubers scaling from solo editing to a full studio',
      'Creators making 10-, 15- or 30-minute videos',
    ],
    engagements: [
      ['Explore', '1 long-form video', 'An introduction', ['1 cinematic long-form edit', 'Motion graphics & captions', 'Color & audio correction', 'Revisions until you’re happy']],
      ['Trending', '4 long-form videos', 'A consistent rhythm', ['4 cinematic long-form edits', 'Dedicated editor & manager', 'Custom motion graphics & visual effects', '48-hour turnaround', 'Premium stock footage']],
      ['Viral', '8 long-form videos', 'A fuller vision', ['8 cinematic long-form edits', 'Priority creative direction', 'Custom sound design', 'Film-quality color', 'Weekly strategy sync']],
    ],
    faq: [
      ['How much does long-form YouTube editing cost?', 'Every project is individually scoped. We share a clear quote on your discovery call, based on your goals, footage and creative direction.'],
      ['How fast is the turnaround?', 'Your first cut arrives within 48 hours of receiving your footage and brief. We agree on the scope upfront, and rush options can be discussed on the call.'],
      ['Which kinds of channels do you edit for?', 'Commentary, education, business, tech reviews, vlogs, documentary, faceless channels and gaming.'],
      ['Can you match my channel’s style?', 'Yes. We build a style guide from your best-performing videos, covering pacing, sound, motion and typography.'],
      ['Do you make thumbnails and titles?', 'They’re included in Channel Management plans and available as add-ons for editing-only clients.'],
      ['How do revisions work?', 'Give us clear feedback on the first cut and we’ll refine the edit until you’re happy. The brief keeps us aligned on direction throughout.'],
      ['What if I only need one video?', 'Start with Explore for a single edit, with no long-term commitment.'],
      SAMPLE_FAQ,
    ],
  },
  {
    slug: 'motion-graphics',
    name: 'Motion Graphics',
    card: 'Ideas made visible. Movement with a reason.',
    tags: ['Moving type', 'Logo stings', 'Explainers', 'Visual effects'],
    title: 'Motion Graphics & Visual Effects for YouTube | Afteroids Vision',
    desc: 'Custom motion graphics and visual effects for YouTube videos, brand films and launches: moving type, logo stings, explainers and UI motion. Get a free sample.',
    eyebrow: 'Motion graphics & visual effects',
    h1: 'Motion graphics that <em>elevate the whole cut.</em>',
    lead: 'Motion graphics and visual effects for YouTube videos, brand films and launches. Moving type, logo stings, explainer animation, app and website motion and cinematic visual-effects shots that make a channel’s videos look distinctly its own.',
    glance: [['Brief', 'Every project starts here'], ['Storyboard', 'On anything over 15 seconds'], ['Scope', 'Quoted on a call']],
    clips: [[[0, 14, 'c'], [18, 26, 'a'], [48, 12, 'b'], [64, 30, 'c']], [[6, 40, 'b'], [50, 16, 'c'], [70, 24, 'a']], [[0, 30, 'a'], [34, 18, 'c'], [56, 38, 'b']]],
    workH: 'What goes into the work',
    work: [
      ['Moving type', 'On-brand type that moves with the voice.'],
      ['Logo animation and stings', 'Studio-quality intros and stings.'],
      ['Explainer animation', '60–90 second explainers with storyboard and voiceover sync.'],
      ['App and website motion', 'Animated product walkthroughs and interface motion.'],
      ['Cinematic visual effects', 'Replacing screens, following moving objects and cleaning up shots.'],
      ['Motion identity systems', 'Lower thirds, transitions and callouts that form a full brand kit in motion.'],
    ],
    storyH: 'Motion design as a growth lever, not a decoration',
    story: [
      'Motion can condense a complex idea into seconds, and it signals production quality before a viewer consciously notices.',
      'Intentional motion clarifies an idea and gives your opening a distinct identity. A well-branded lower third can make a talking-head video feel like a recognizable show. We treat motion as strategy.',
    ],
    inclH: 'What we deliver',
    incl: [
      'Rendered animations in the format and file type you need',
      'Optional project files for in-house teams',
      'Storyboards and style frames for anything over 15 seconds',
      'For retainer clients: a motion identity kit (logo animations, lower thirds, transitions, end cards) for consistent visuals across future edits',
    ],
    whoH: 'Who it’s for',
    who: [
      'Creators looking to raise their production level',
      'Software and product companies making explainer or launch videos',
      'Agencies needing a reliable motion partner on retainer',
      'YouTubers wanting a consistent brand system across uploads, not one-off graphics',
    ],
    faq: [
      ['What kinds of motion graphics do you create?', 'Moving type, logo animations and stings, explainers, app and website motion mockups, on-screen data visualization, animated lower thirds, brand transitions and cinematic visual effects.'],
      ['Which tools do you use?', 'After Effects is the primary tool, with Cinema 4D and Element 3D for 3D work. You receive a rendered file, or a project file if you need editable source.'],
      ['Can you add motion graphics to a video edited elsewhere?', 'Yes. We can add logo animations, moving type, overlays, callouts and transitions to footage edited by someone else.'],
      ['Do you include concept and storyboarding?', 'Yes. Every project starts with a creative brief. Anything over 15 seconds also gets a style frame and storyboard round, so the look is approved before any animation is built.'],
      ['How long does a motion project take?', 'We agree scope and schedule on the discovery call and confirm milestones before work starts.'],
      ['How much does it cost?', 'Every project is individually scoped. We share a clear quote on your discovery call.'],
      SAMPLE_FAQ,
    ],
  },
  {
    slug: 'short-form-video-editing',
    name: 'Short-Form Video Editing',
    card: 'Reels, Shorts and TikTok. A strong hook, a clean finish.',
    tags: ['Reels', 'Shorts', 'TikTok', 'Repurposing'],
    title: 'Reels, Shorts & TikTok Video Editing | Afteroids Vision',
    desc: 'Short-form video editing for Instagram Reels, YouTube Shorts and TikTok: hook-first edits, dynamic captions and sound design. First cut in 48 hours.',
    eyebrow: 'Short-form video editing',
    h1: 'Short-form editing that <em>stops the scroll.</em>',
    lead: 'Vertical video editing for Instagram Reels, YouTube Shorts and TikTok. Edits built to hold attention from the first seconds, with strong hooks, easy-to-read captions and sound design that encourages rewatching.',
    glance: [['Hook', 'Within the first 1.5 seconds'], ['First cut', 'Within 48 hours'], ['Clips', 'Scoped batches']],
    clips: [[[0, 12, 'a'], [14, 10, 'c'], [26, 14, 'b'], [42, 10, 'a'], [54, 16, 'c'], [72, 24, 'b']], [[0, 20, 'c'], [22, 12, 'b'], [36, 18, 'a'], [56, 14, 'c'], [72, 24, 'a']], [[8, 16, 'b'], [26, 22, 'a'], [50, 12, 'c'], [64, 32, 'b']]],
    workH: 'What goes into the work',
    work: [
      ['Hook engineering', 'A hook inside the first 1.5 seconds, with no dead air or warm-up.'],
      ['Dynamic captions', 'Precisely timed captions in on-brand typography.'],
      ['A repurposing engine', 'Long-form podcasts, YouTube videos and keynotes turned into weekly shorts.'],
      ['Platform-specific exports', 'Sized for Reels, Shorts and TikTok safe zones.'],
      ['Sound and rhythm', 'Sound design, sound effects, transitions, jump cuts and zooms.'],
      ['Scoped clip batches', 'A clear delivery schedule for every batch.'],
    ],
    storyH: 'Why most short-form fails in the first three seconds',
    story: [
      'Short-form depends on the hook. If the opening doesn’t hold viewers, the platform’s algorithm never gets a chance to distribute the video.',
      'We build edits backward from the hook: on-screen text, framing, an audio spike and a pattern break first, then a middle and an ending shaped to keep the story moving.',
    ],
    inclH: 'Included with every edit',
    incl: [
      'Hook engineering, dynamic captions and sound design',
      'Sound effects, jump cuts, zooms and reframes',
      'On-brand typography',
      'Platform-specific exports for Reels, Shorts and TikTok',
    ],
    whoH: 'Who it’s for',
    who: [
      'Podcasters who want weekly clip releases',
      'Founders posting daily on LinkedIn and Instagram',
      'Coaches and educators building a regular distribution habit',
      'YouTubers adding Shorts to their channel',
      'Brands with existing long-form content in their archives',
    ],
    extraH: 'Repurposing long-form into shorts',
    extra: [
      'We review your raw footage and mark the highest-hook moments.',
      'Each moment is re-cut into a standalone vertical clip with its own hook, caption pass and platform-tuned export.',
      'You grow discovery without scheduling another shoot day.',
    ],
    faq: [
      ['How much does short-form editing cost?', 'Pricing is scoped to your goals and the clips you need. We share a clear quote on the discovery call.'],
      ['Do you repurpose long-form videos?', 'Yes, as an add-on. We turn podcasts, keynotes and long-form YouTube videos into 30–60 second vertical clips, choosing the highest-hook moments for each platform.'],
      ['What’s included in a short-form edit?', 'Hook engineering, dynamic captions, sound design, sound effects, jump cuts, zooms, reframes, on-brand typography and platform-specific exports.'],
      ['How fast is the turnaround?', 'The first cut arrives within 48 hours of receiving footage and a brief. We agree a schedule before a batch begins.'],
      ['Do you write hooks and captions?', 'Yes. The on-screen hook and caption timing are shaped around your message, and we can scope alternate versions when useful.'],
      ['Can I mix long-form and short-form?', 'Yes. Combine long-form editing with vertical clips and motion graphics in one engagement.'],
      SAMPLE_FAQ,
    ],
  },
  {
    slug: 'youtube-channel-management',
    name: 'Channel Management',
    card: 'From the content plan to the publish button.',
    tags: ['Strategy', 'Thumbnails and titles', 'Search', 'Analytics'],
    title: 'YouTube Channel Management Service | Afteroids Vision',
    desc: 'Full-service YouTube channel management: strategy, editing, thumbnails, titles, publishing and analytics, run by a dedicated channel manager. You record; we run it.',
    eyebrow: 'YouTube channel management',
    h1: 'YouTube channel management, <em>done for you.</em>',
    lead: 'We run your channel end to end: creative direction, editing, thumbnails, titles, publishing and analytics. You record; we run the channel. Every client gets a dedicated channel manager as a single point of contact.',
    glance: [['Your role', 'Record the video'], ['Contact', 'One channel manager'], ['Ownership', 'You own the channel']],
    clips: [[[0, 18, 'b'], [20, 18, 'a'], [40, 14, 'c'], [56, 18, 'b'], [76, 20, 'a']], [[0, 30, 'a'], [32, 30, 'c'], [64, 32, 'b']], [[10, 24, 'c'], [36, 20, 'b'], [58, 36, 'a']]],
    workH: 'What goes into the work',
    work: [
      ['Strategy and planning', 'A quarterly channel strategy, a monthly content roadmap and a weekly production plan.'],
      ['Full-cycle editing', 'Editing paced to keep viewers watching.'],
      ['Thumbnails and packaging', 'Thumbnail ideas, tests of two versions, and packaging (how a video looks and reads before it is clicked).'],
      ['Titles and search', 'Titles, descriptions, tags and chapters written so people can find your videos.'],
      ['Publishing and community', 'Scheduled publishing, a plan for replying to your community and end-screen setup.'],
      ['Analytics', 'Monthly reviews of how viewers find your videos and how long they keep watching, plus the next 90 days.'],
    ],
    storyH: 'What full-service YouTube management looks like',
    story: [
      'A channel is a system, not a run of lucky uploads. The retainer gives you a roadmap tied to your business goals, a production line on a fixed cadence and a feedback loop from analytics into future briefs.',
      'We treat thumbnails and titles as a product line: rounds of fresh ideas, studies of competitors, tests of two versions and swaps after publishing for videos that underperform.',
    ],
    inclH: 'How it differs from hiring an editor',
    incl: [
      'An editor executes cuts. A channel manager owns growth outcomes: packaging, cadence, finding out why viewers stop watching, and the roadmap.',
      'Work happens in your own accounts (Google, Frame.io, Notion).',
      'You keep every asset if the relationship ends.',
    ],
    whoH: 'Who it’s for',
    who: [
      'Founders using YouTube to bring in customers and hires',
      'Personal-brand creators outgrowing solo editing',
      'Companies running branded documentary channels',
      'Coaches, authors and consultants',
    ],
    plans: {
      h: 'Compare channel plans',
      note: 'Starter covers channel operations, Pro adds strategy, and Done-For-You includes production. Quotes are shared on a call.',
      cols: ['Starter', 'Pro', 'Done-For-You'],
      rows: [
        ['1-on-1 strategy calls', '1 / month', '2 / month', '2 / month'],
        ['Video uploading', 'Up to 24 / mo', 'Up to 56 / mo', 'Up to 56 / mo'],
        ['Comment replies', 'Up to 50 / mo', 'Up to 150 / mo', 'Up to 150 / mo'],
        ['Community posts', '2 / mo', '8 / mo', '8 / mo'],
        ['Competitor engagement', '—', 'Up to 25 / mo', 'Up to 25 / mo'],
      ],
    },
    faq: [
      ['What does YouTube channel management include?', 'Strategy, planning, scripting support, editing, thumbnails, titles, search words, publishing, a plan for replying to your community and monthly analytics. You only record.'],
      ['How is this different from hiring an editor?', 'An editor executes cuts. A channel manager owns growth outcomes, including packaging, cadence, finding out why viewers stop watching, and the roadmap.'],
      ['How long until I see growth?', 'Growth depends on your audience, your content and your consistency. We make no timeline or subscriber promises.'],
      ['Do you handle thumbnails and titles?', 'Yes, scoped within your channel plan.'],
      ['Who owns the channel and the files?', 'You do. Work happens in your own accounts (Google, Frame.io, Notion), and you keep every asset if the relationship ends.'],
      ['What are the channel plans?', 'Starter covers channel operations, Pro adds strategy, and Done-For-You includes production. Every plan has a dedicated channel manager.'],
      ['How is my project quoted?', 'Every project is scoped individually. We share a clear quote on your discovery call.'],
    ],
  },
];

/* ------------------------------------------------------------------
   Plans. Plan names live ONLY here (PLAN_NAMES): rename "Viral" with a one-line change.
   ------------------------------------------------------------------ */
export const PLAN_NAMES = { explore: 'Explore', trending: 'Trending', viral: 'Viral' };
const N = PLAN_NAMES;
const L = (name, size, tag, included, headline, who, extra = {}) => ({ name, size, tag, included, headline, who, ...extra });

export const planGroups = [
  {
    id: 'long', tab: 'Long videos', addon: false, crumb: 'Long videos', slugPrefix: 'long-form',
    panelH: 'Long videos',
    everyH: 'Included in every long-video plan',
    every: ['Cinematic editing', 'Custom motion graphics', 'Color and sound finishing', 'Animated captions', 'First cut in 48 hours'],
    firstCut: 'Within 48 hours',
    plans: [
      L(N.explore, '1 video', 'An introduction', ['One full edit', 'Graphics and captions', 'Color and sound cleanup', 'Changes until you are happy'],
        'Try us on one video.', 'Creators and brands who want to see the full quality of our work before committing to more.'),
      L(N.trending, '4 videos', 'A consistent rhythm', ['Four full edits', 'A dedicated editor and project lead', 'Custom graphics and visual effects', 'First cut in 48 hours', 'Stock footage included'],
        'A steady rhythm of videos, made with one team.', 'Channels that post regularly and want the same editor on every video.'),
      L(N.viral, '8 videos', 'A fuller vision', ['Eight full edits', 'First in line for creative direction', 'Custom sound design', 'Film-quality color', 'A planning call every week'],
        'Our fullest plan, for channels ready to go all in.', 'Creators and brands with a lot to publish and a goal to grow.'),
    ],
    clips: [[[0, 40, 'a'], [44, 30, 'b']], [[10, 30, 'c'], [44, 40, 'a']], [[0, 24, 'b'], [30, 30, 'a'], [66, 28, 'c']]],
  },
  {
    id: 'short', tab: 'Short videos', addon: true, crumb: 'Short videos', slugPrefix: 'short-form',
    panelH: 'Short videos',
    everyH: null, every: null,
    firstCut: 'Within 48 hours',
    plans: [
      L(N.explore, '1 short video', 'An introduction', ['One vertical edit for Reels, Shorts or TikTok', 'Animated captions', 'Music and sound-effects library', 'Changes until you are happy'],
        'Try us on one short video.', 'Creators who want to see how we handle Reels, Shorts and TikTok.'),
      L(N.trending, '15 short videos', 'A consistent rhythm', ['15 vertical edits', 'Advanced visual effects and transitions', 'A dedicated editor', '24-hour turnaround', 'Long videos cut into shorts'],
        'A steady stream of short videos.', 'Channels that post short videos often and want a fast turnaround.', { firstCut: 'Within 24 hours', steps2: 'Get your first cut in 24 hours' }),
      L(N.viral, '30 short videos', 'A fuller vision', ['30 vertical edits', 'Custom motion templates', 'Advice on trends and strong openings', 'Priority delivery', 'A weekly look at how your videos are doing'],
        'Our fullest short-video plan.', 'Creators who want to publish short videos every day.'),
    ],
    clips: [[[0, 12, 'a'], [16, 12, 'c'], [34, 14, 'b']], [[0, 14, 'c'], [18, 12, 'b'], [36, 14, 'a'], [56, 14, 'c'], [74, 20, 'a']], [[0, 10, 'b'], [12, 12, 'a'], [26, 10, 'c'], [40, 12, 'b'], [56, 12, 'a'], [72, 22, 'c']]],
  },
  {
    id: 'channel', tab: 'Channel management', addon: false, crumb: 'Channel management', slugPrefix: 'channel',
    panelH: 'Channel management',
    everyH: 'In every channel plan',
    every: ['A dedicated channel manager', 'A kickoff call', 'A 30-point check-up of your channel', 'One-on-one strategy calls', 'Uploading and publishing', 'Titles, descriptions and tags written so people can find your videos', 'Thumbnail testing', 'Playlist tidy-up', 'Replies to comments', 'Community posts'],
    channel: true,
    plans: [
      L('Starter', null, null, null, 'We handle the day-to-day of your channel.', 'Creators who have the videos but not the time to run the channel.', { slug: 'starter', col: 0 }),
      L('Pro', null, null, null, 'The day-to-day, plus a plan for growth.', 'Channels that want someone to think about what to do next, not only keep things running.', { slug: 'pro', col: 1 }),
      L('Done for you', null, null, null, 'We run the channel and make the videos too.', 'Brands and founders who want a working channel without managing the work.', { slug: 'done-for-you', col: 2 }),
    ],
    // rows: label, then one value per plan (Starter, Pro, Done for you). "No" rows are left out of each plan page's ticked list.
    rows: [
      ['Best for', 'We run the day-to-day', 'Day-to-day plus a growth plan', 'We make the videos too'],
      ['Strategy calls', '1 a month', '2 a month', '2 a month'],
      ['Videos uploaded', 'Up to 24', 'Up to 56', 'Up to 56'],
      ['Comment replies', 'Up to 50', 'Up to 150', 'Up to 150'],
      ['Community posts', '2', '8', '8'],
      ['Outreach on competitor channels', 'No', 'Up to 25', 'Up to 25'],
      ['Video scripts, production and AI presenter videos', 'No', 'No', 'Yes'],
    ],
    clips: [[[0, 30, 'a'], [34, 24, 'c'], [62, 32, 'b']], [[6, 26, 'c'], [36, 28, 'a'], [68, 26, 'b']], [[0, 18, 'b'], [22, 22, 'a'], [48, 20, 'c'], [72, 24, 'b']]],
  },
];
planGroups[0].plans.forEach((p, i) => { p.slug = `long-form-${['explore', 'trending', 'viral'][i]}`; });
planGroups[1].plans.forEach((p, i) => { p.slug = `short-form-${['explore', 'trending', 'viral'][i]}`; });
planGroups[2].plans.forEach(p => { p.slug = `channel-${p.slug}`; });

export const planCopy = {
  kicker: '06 · Working together',
  h: 'Pick a size. We will shape it to you.',
  sub: 'Every channel is different, so we do not post a price list. Tell us your goals on a short call and you get a clear quote. Here is what each plan includes.',
  scoped: 'Scoped to your goals · Shared on a call',
  button: 'Talk about this plan',
  addonLabel: 'Add-on',
};

/* ------------------------------------------------------------------ Founders */
export const founders = {
  slug: 'founders',
  title: 'The people behind Afteroids Vision',
  desc: 'Meet Nishant and Ayush, the two founders of Afteroids Vision. You work with them directly, from the first message to the final file.',
  pageH: 'The people behind Afteroids Vision',
  h1: 'A small studio, run by the two people who <em>do the work.</em>',
  lead: 'When you hire us, you do not get passed down a line. You get Nishant and Ayush, from the first message to the final file.',
  people: [
    { name: 'Nishant', role: 'Founder & Lead Editor',
      body: 'Nishant shapes the story and the rhythm of your video: what comes first, what gets cut, where the pace speeds up and where it slows down.',
      quote: 'Every cut should earn the next second. Pacing is the whole story.',
      short: 'Shapes the story and the rhythm of every edit.', shortQuote: 'Every cut should earn the next second.',
      placeholder: '[PLACEHOLDER: 1–2 lines on Nishant’s background, from his X profile. Coming from the designer.]' },
    { name: 'Ayush', role: 'Co-Founder & Creative Director',
      body: 'Ayush decides how your video looks and moves: the graphics, the color, the feel.',
      quote: 'Motion should carry meaning, or it should go.',
      short: 'Decides how each video looks and moves.', shortQuote: 'Motion should carry meaning, or it should go.',
      placeholder: '[PLACEHOLDER: 1–2 lines on Ayush’s background, from his X profile. Coming from the designer.]' },
  ],
  together: ['Nishant builds the story. Ayush gives it a look. You talk to both of us, and you always know who is working on your video.'],
  stand: ['Every cut earns its place.', 'Motion needs a reason.', 'Quality over quantity.'],
  closeH: 'Want to see how we work?',
  closeLine: 'Get a free sample edit on your own footage.',
  clips: [[[0, 28, 'a'], [32, 30, 'c'], [66, 28, 'b']], [[8, 36, 'b'], [48, 40, 'a']], [[0, 20, 'c'], [24, 34, 'a'], [62, 32, 'b']]],
  glance: [['Story', 'Nishant'], ['Look', 'Ayush'], ['Your contact', 'Both founders']],
};

export const homeFounders = {
  kicker: '04 · The people behind the cut',
  line: 'We don’t only edit your video. We help your idea land. Careful work over fast volume.',
  h: 'You work with the founders, not a queue.',
  text: 'Afteroids Vision is a small studio. The people who started it are the people on your project. You talk to them directly, and they have seen your footage.',
  link: 'Meet the founders',
};

/* ------------------------------------------------------------------ Free sample (frontend only for now) */
export const sample = {
  kicker: '05 · Free sample edit',
  h: 'See our work on your own footage. Free.',
  text: 'Send us a link to your channel. We will edit a short clip of your footage, so you can judge the pacing, the motion and the finish before you spend anything.',
  assure: ['No commitment.', 'We reply within 24 hours.', 'You talk to the founders.'],
  fields: { name: 'Your name', email: 'Email', channel: 'Link to your YouTube channel', help: 'What do you need help with?', website: 'Your website' },
  helpOptions: ['Long videos', 'Motion graphics', 'Short videos', 'Running my channel', 'Not sure yet'],
  button: 'Send me my free sample',
  ok: 'Got it. We will reply within 24 hours to set up your sample.',
  fail: 'Something went wrong. Please email afteroidsvision@gmail.com and we will sort it out.',
};

/* ------------------------------------------------------------------ Home questions */
export const homeFaq = [
  ['What happens after I send my footage?', 'You send your raw files and tell us what the video should do. You get a first cut within 48 hours. You send notes, and we keep refining until you are happy to publish.'],
  ['How fast will I get my first cut?', 'Within 48 hours of receiving your footage and a short brief. Need it faster? Ask on the call and we will tell you what is possible.'],
  ['How much does it cost?', 'Every project is different, so we do not list prices. After a short call about your goals and footage, you get a clear quote. The sample edit is free.'],
  ['What is in the free sample?', 'A short edit made from a clip of your own footage. Send your channel link and we reply within 24 hours.'],
  ['How many changes can I ask for?', 'Send your notes on the first cut and we keep refining until you are happy to publish.'],
  ['I only need one video. Is that fine?', 'Yes. Start with the Explore plan. If you later want help with your channel, we can add that separately.'],
  ['Can I get long and short videos together?', 'Yes. We can mix them in one project.'],
  ['Can you run my whole channel?', 'Yes. Starter covers the day-to-day. Pro adds a growth plan. Done for you adds making the videos too.'],
  ['Who will I talk to?', 'The founders, Nishant and Ayush. No handoffs.'],
];
export const homeFaqCopy = { kicker: '07 · Questions', h: 'Good questions. Straight answers.' };

export const footerCopy = { tagline: 'Creations that impact. A small studio for YouTube editing and motion graphics.' };
