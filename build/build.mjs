// Run: node build/build.mjs  (from the site root). Writes services/*, plans/*, founders/, sitemap.xml, robots.txt, llms.txt
// and refreshes the sections block in index.html between the SERVICES markers (services, process, standards, founders, sample, plans, questions, closing).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { services, SITE, EMAIL, planGroups, planCopy, founders, homeFounders, sample, homeFaq, homeFaqCopy, footerCopy } from './content.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = s => s.replace(/<[^>]+>/g, '');
const url = s => `${SITE}/services/${s.slug}`;
const ARROW = '<svg class="arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 11.5l7-7M5.5 4.5h6v6"/></svg>';
const DESK = '<figure class="desk-illustration"><picture><source media="(min-width: 768px)" srcset="/assets/img/dotted-desk-illustration-transparent.png" width="1024" height="572"><img src="/assets/img/dotted-desk-illustration-mobile.png" width="1080" height="1920" alt="Illustration of a man seated at a desk with a computer monitor and keyboard, drawn in dotted lines." loading="lazy" decoding="async"></picture></figure>';
const ORG_ID = `${SITE}/#organization`;

const org = {
  '@type': 'Organization', '@id': ORG_ID, name: 'Afteroids Vision', url: `${SITE}/`,
  logo: `${SITE}/logo-navy.png`, email: EMAIL, slogan: 'Creations that impact',
  description: 'A founder-led YouTube video editing and motion graphics studio for creators and brands.',
};

const ld = o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;

const nav = (cur) => `<header class="nav nav--static" data-state="open">
  <nav class="slab" aria-label="Primary">
    <a class="brand" href="/" aria-label="Afteroids Vision home, built by NOOR Productions"><img src="/nav-mark.png" alt="" width="27" height="22"><span class="brand-t"><span translate="no">Afteroids Vision</span><small>Built by NOOR Productions</small></span></a>
    <div class="rest">
      <div class="rest-in">
        <ul class="links">
          <li style="--k:0"><a href="/#work">Work</a></li>
          <li style="--k:1"><a href="/#services"${cur ? ' aria-current="page"' : ''}>Services</a></li>
          <li style="--k:2"><a href="/#process">Process</a></li>
          <li style="--k:3"><a href="/#faq">FAQ</a></li>
          <li style="--k:4"><a href="/#developer">Developer</a></li>
        </ul>
        <div class="cell" style="--k:5"><a class="btn btn--sm" href="/#book">Book a call</a></div>
      </div>
    </div>
  </nav>
</header>`;

const footer = () => `<footer class="foot foot--light"><div class="wm wm--h" aria-hidden="true"><span>AFTEROIDS VISION</span></div>${DESK}<div class="wrap">
  <div class="foot-grid foot-grid--4">
    <div><a class="brand" href="/"><img src="/nav-mark.png" alt="" width="27" height="22"><span translate="no">Afteroids Vision<i>.</i></span></a><p class="tagline">${esc(footerCopy.tagline)}</p><p class="built"><img src="/assets/img/noor-logo.png" alt="" width="40" height="40"><span>Built by <a href="https://noorproductions.in/" target="_blank" rel="noopener" translate="no">NOOR Productions</a></span></p></div>
    <nav aria-label="Site"><h2>Explore</h2><ul><li><a href="/#work">Work</a></li><li><a href="/#services">Services</a></li><li><a href="/#process">Process</a></li><li><a href="/founders/">Founders</a></li><li><a href="/#faq">Questions</a></li></ul></nav>
    <nav aria-label="Services"><h2>Services</h2><ul>${services.map(s => `<li><a href="/services/${s.slug}">${esc(s.name)}</a></li>`).join('')}</ul></nav>
    <div><h2>Contact</h2><ul><li><a href="mailto:${EMAIL}">${EMAIL}</a></li><li><a href="/#sample-form">Get a free sample edit</a></li></ul></div>
  </div>
  <p class="copy">© 2026 <span translate="no">Afteroids Vision</span></p>
</div></footer>`;

function timeline(s) {
  const tracks = s.clips.map(t => `<div class="tl-track">${t.map(([l, w, k]) => `<span class="clip ${k}" style="left:${l}%;width:${w}%"></span>`).join('')}</div>`).join('');
  return `<div class="tl" aria-hidden="true">
  <div class="tl-ruler"><span>00:00</span><span>00:10</span><span>00:20</span><span>00:30</span><span>00:40</span><span>00:50</span></div>
  <div class="tl-tracks">${tracks}<span class="playhead"></span></div>
  <dl class="glance">${s.glance.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
</div>`;
}

const rows = items => `<ol class="rows">${items.map(([t, d], i) => `<li><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('')}</ol>`;
const checks = items => `<ul class="checks">${items.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;

function engagements(s, cls) {
  if (!s.engagements) return '';
  return `<section class="${cls}" id="engagements" aria-labelledby="eng-h"><div class="wrap">
  <div class="split"><div class="sticky"><p class="kicker">Engagements</p><h2 id="eng-h">The right scope for your channel.</h2><p class="sub">Every project is scoped individually. We share a clear quote on your discovery call.</p></div>
  <ul class="plans-list">${s.engagements.map(([n, c, tag, f]) => `<li><div><span class="tag">${esc(tag)}</span><h3>${esc(n)}</h3></div><div><span class="cnt">${esc(c)}</span><small>Scoped to your goals · Shared on a call</small></div><ul>${f.map(x => `<li>${esc(x)}</li>`).join('')}</ul></li>`).join('')}</ul></div>
</div></section>`;
}

function plansTable(s, cls) {
  const p = s.plans; if (!p) return '';
  return `<section class="${cls}" id="plans" aria-labelledby="plans-h"><div class="wrap">
  <p class="kicker">Plans</p><h2 id="plans-h">${esc(p.h)}</h2>
  <div class="tbl-wrap" tabindex="0" role="region" aria-labelledby="plans-h"><table><caption>${esc(p.h)}</caption>
  <thead><tr><th scope="col">Per month</th>${p.cols.map(c => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead>
  <tbody>${p.rows.map(([a, ...r]) => `<tr><th scope="row">${esc(a)}</th>${r.map(x => `<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
  <p class="tnote">${esc(p.note)}</p>
</div></section>`;
}

function extra(s, cls) {
  if (!s.extra) return '';
  return `<section class="${cls}" aria-labelledby="extra-h"><div class="wrap"><div class="split"><div class="sticky"><p class="kicker">Repurposing</p><h2 id="extra-h">${esc(s.extraH)}</h2></div>${rows(s.extra.map((t, i) => [['Review', 'Re-cut', 'Grow'][i] || 'Step', t]))}</div></div></section>`;
}

const shell = ({ title, desc, u, graph, main }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${u}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<meta name="theme-color" content="#0A0F1F">
<meta property="og:type" content="website"><meta property="og:site_name" content="Afteroids Vision">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${u}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(desc)}">
<link rel="icon" href="/favicon.ico" sizes="any"><link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png"><link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/AfteroidsSans-VF.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/AfteroidsSans-VF-Italic.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/site.css">
<link rel="stylesheet" href="/assets/nav.css">
<link rel="stylesheet" href="/assets/sections.css">
${ld(graph)}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${nav(true)}
${main}
${footer()}
<script src="/assets/sections.js" defer></script>
</body>
</html>
`;

function page(s) {
  const u = url(s);
  const others = services.filter(x => x !== s);
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      org,
      { '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'Afteroids Vision', publisher: { '@id': ORG_ID } },
      { '@type': 'WebPage', '@id': `${u}#webpage`, url: u, name: s.title, description: s.desc, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${u}#service` }, breadcrumb: { '@id': `${u}#breadcrumb` } },
      { '@type': 'Service', '@id': `${u}#service`, name: s.name, serviceType: s.name, description: strip(s.lead), provider: { '@id': ORG_ID }, areaServed: 'Worldwide', url: u },
      { '@type': 'BreadcrumbList', '@id': `${u}#breadcrumb`, itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE}/#services` },
        { '@type': 'ListItem', position: 3, name: s.name, item: u }] },
      { '@type': 'FAQPage', '@id': `${u}#faq`, mainEntity: s.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    ],
  };
  const dk = (extraCls) => `z z-dark ${extraCls}`;
  let first = true; let faqS;
  const nextCls = (g) => { const k = dk(g + (first ? ' up-dark' : '')); first = false; return k; };
  const mkFaq = () => `<section class="${nextCls('g-r')}" id="faq" aria-labelledby="faq-h"><div class="wrap faq"><div class="split">
  <div class="sticky"><p class="kicker">Questions</p><h2 id="faq-h">Good questions. Clear answers.</h2><p class="sub">No fine print. Just what you need to know before we start.</p></div>
  <div>${s.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
</div></div></section>`;
  const parts = [s.extra ? extra(s, nextCls('g-l')) : '', s.engagements ? engagements(s, nextCls('g-l')) : '', s.plans ? plansTable(s, nextCls('g-l')) : ''];
  faqS = mkFaq();
  const darkGroup = parts.join('\n') + '\n' + faqS + `
<section class="z z-dark g-l pre" aria-labelledby="more-h"><div class="wrap"><div class="split">
  <div class="sticky"><p class="kicker">Also from the studio</p><h2 id="more-h">More ways we work.</h2></div>
  <nav class="more" aria-label="Other services">${others.map(o => `<a href="/services/${o.slug}"><div>${esc(o.name)}<span>${esc(o.card)}</span></div>${ARROW}</a>`).join('')}</nav>
</div></div></section>

<section class="z z-white up-white closer" id="book" aria-labelledby="close-h"><div class="wm" aria-hidden="true"><span>AFTEROIDS VISION</span></div><div class="wrap">
  <p class="kicker">Your next video starts here</p>
  <h2 id="close-h">Let’s build something worth remembering.</h2>
  <div class="cta"><a class="btn" href="mailto:${EMAIL}?subject=Discovery%20call">Book a discovery call ${ARROW.replace('class="arrow"', '')}</a><a class="btn btn--sample" href="/#sample-form">Get a free sample edit</a></div>
</div></section>`;
  const main = `<main id="main">
<section class="z z-dark g-l phero"><div class="wrap">
  <nav aria-label="Breadcrumb"><ol class="crumbs"><li><a href="/">Home</a></li><li><a href="/#services">Services</a></li><li aria-current="page">${esc(s.name)}</li></ol></nav>
  <div class="phero-grid">
    <div>
      <p class="eyebrow">${esc(s.eyebrow)}</p>
      <h1>${s.h1}</h1>
      <p class="lead">${esc(s.lead)}</p>
      <div class="cta"><a class="btn" href="/#book">Book a call ${ARROW.replace('class="arrow"', '')}</a><a class="btn btn--ghost" href="/#sample-form">Get a free sample edit</a></div>
    </div>
    ${timeline(s)}
  </div>
</div></section>

<section class="z z-dark g-r pre" aria-labelledby="work-h"><div class="wrap"><div class="split">
  <div class="sticky"><p class="kicker">01 · The work</p><h2 id="work-h">${esc(s.workH)}</h2></div>
  ${rows(s.work)}
</div></div></section>

<section class="z z-white up-white pre-s" aria-labelledby="story-h"><div class="wm" aria-hidden="true"><span>AFTEROIDS VISION</span></div><div class="wrap">
  <div class="split">
    <div class="sticky"><p class="kicker">02 · The approach</p><h2 id="story-h">${esc(s.storyH)}</h2></div>
    <div class="prose">${s.story.map(p => `<p>${esc(p)}</p>`).join('')}</div>
  </div>
  <ol class="steps" aria-label="How a project runs"><li><b>01<i>.</i></b>Send your footage and a short brief</li><li><b>02<i>.</i></b>First cut within 48 hours</li><li><b>03<i>.</i></b>Refine together until it’s right</li></ol>
  <a class="btn btn--sample pill" href="/#sample-form">Get a free sample edit</a>
</div></section>

<section class="z z-ivory up-ivory pre-d" aria-label="Included and audience"><div class="wrap"><div class="two">
  <div><div class="rule"></div><p class="kicker">03 · Included</p><h2>${esc(s.inclH)}</h2>${checks(s.incl)}</div>
  <div><div class="rule"></div><p class="kicker">04 · Audience</p><h2>${esc(s.whoH)}</h2>${checks(s.who)}</div>
</div></div></section>

${darkGroup}
</main>`;
  return shell({ title: s.title, desc: s.desc, u, graph, main });
}

// ---------------------------------------------------------------- shared bits for new sections
const ARROW_BTN = ARROW.replace('class="arrow"', '');
const mail = (subject) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;
const lcFirst = t => t.charAt(0).toLowerCase() + t.slice(1);
const planUrl = (pl) => `${SITE}/plans/${pl.slug}/`;
const planSubject = (g, pl) => `Talk about ${pl.name} (${g.crumb})`;

// ---------------------------------------------------------------- home: founders (04)
const homeFoundersSection = `<section class="z z-dark g-l up-dark pre" id="founders" aria-labelledby="fnd-h"><div class="wrap">
  <p class="lead founders-line">${esc(homeFounders.line)}</p>
  <div class="split">
  <div class="sticky"><p class="kicker">${esc(homeFounders.kicker)}</p><h2 id="fnd-h">${esc(homeFounders.h)}</h2><p class="sub">${esc(homeFounders.text)}</p><a class="btn pill" href="/founders/">${esc(homeFounders.link)} ${ARROW_BTN}</a></div>
  <ol class="rows">${founders.people.map((p, i) => `<li><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${esc(p.name)}, ${esc(p.role)}</h3><p>${esc(p.short)}</p><p><em>“${esc(p.shortQuote)}”</em></p></li>`).join('')}</ol>
</div></div></section>`;

// ---------------------------------------------------------------- home: free sample (05). Front-end only for now.
const f = sample.fields;
const homeSampleSection = `<section class="z z-white up-white pre-d" id="sample-form" aria-labelledby="smp-h"><div class="wm" aria-hidden="true"><span>AFTEROIDS VISION</span></div><div class="wrap"><div class="split">
  <div class="sticky"><p class="kicker">${esc(sample.kicker)}</p><h2 id="smp-h">${esc(sample.h)}</h2><p class="sub">${esc(sample.text)}</p>${checks(sample.assure)}</div>
  <form class="form" id="sample-request" method="post" action="#sample-form" data-endpoint="">
    <div class="field"><label for="sf-name">${esc(f.name)}</label><input class="input" id="sf-name" name="name" type="text" autocomplete="name" required></div>
    <div class="field"><label for="sf-email">${esc(f.email)}</label><input class="input" id="sf-email" name="email" type="email" autocomplete="email" required></div>
    <div class="field"><label for="sf-channel">${esc(f.channel)}</label><input class="input" id="sf-channel" name="channel" type="text" inputmode="url" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="youtube.com/@yourchannel" required></div>
    <div class="field"><label for="sf-help">${esc(f.help)}</label><select class="input select" id="sf-help" name="help" required><option value="" selected disabled>Choose one</option>${sample.helpOptions.map(o => `<option value="${esc(o)}">${esc(o)}</option>`).join('')}</select></div>
    <div class="field"><label for="sf-site">${esc(f.website)} <span class="opt">(optional)</span></label><input class="input" id="sf-site" name="website" type="text" inputmode="url" autocapitalize="off" autocorrect="off" spellcheck="false"></div>
    <button class="btn" type="submit">${esc(sample.button)} ${ARROW_BTN}</button>
    <p class="form-msg" data-kind="ok" role="status" hidden>${esc(sample.ok)}</p>
    <p class="form-msg" data-kind="error" role="alert" hidden>${esc(sample.fail)}</p>
  </form>
</div></div></section>`;

// ---------------------------------------------------------------- home: plans (06)
function planCard(g, pl) {
  return `<li><div><span class="tag">${esc(pl.tag)}</span><h3><a href="/plans/${pl.slug}/">${esc(pl.name)} ${ARROW}</a></h3></div><div><span class="cnt">${esc(pl.size)}</span><small>${esc(planCopy.scoped)}</small><a class="btn btn--sm btn--ghost" href="${mail(planSubject(g, pl))}">${esc(planCopy.button)}</a></div><ul>${pl.included.map(x => `<li>${esc(x)}</li>`).join('')}</ul></li>`;
}
function channelTable(g) {
  const cols = g.plans;
  return `<div class="tbl-wrap" tabindex="0" role="region" aria-labelledby="ph-${g.id}"><table><caption>${esc(g.tab)}</caption>
  <thead><tr><th scope="col">Plan</th>${cols.map(pl => `<th scope="col"><a href="/plans/${pl.slug}/">${esc(pl.name)}</a></th>`).join('')}</tr></thead>
  <tbody>${g.rows.map(([a, ...r]) => `<tr><th scope="row">${esc(a)}</th>${r.map(x => `<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody>
  <tfoot><tr><td></td>${cols.map(pl => `<td><small>${esc(planCopy.scoped)}</small><a class="btn btn--sm btn--ghost" href="${mail(planSubject(g, pl))}">${esc(planCopy.button)}</a></td>`).join('')}</tr></tfoot></table></div>`;
}
const everyNote = g => `<p class="plan-note"><b>${esc(g.everyH)}:</b> ${g.every.map(x => esc(lcFirst(x))).join(' · ')}</p>`;
const homePlansSection = `<section class="z z-dark g-r up-dark" id="plans" aria-labelledby="pln-h"><div class="wrap"><div class="split fit">
  <div class="sticky"><p class="kicker">${esc(planCopy.kicker)}</p><h2 id="pln-h">${esc(planCopy.h)}</h2><p class="sub">${esc(planCopy.sub)}</p></div>
  <div>
    <div class="tabs" data-tabs aria-label="Plan types">${planGroups.map(g => `<a class="tab" id="tab-${g.id}" href="#plans-${g.id}" data-panel="plans-${g.id}">${esc(g.tab)}${g.addon ? ` <span class="tag">${esc(planCopy.addonLabel)}</span>` : ''}</a>`).join('')}</div>
    ${planGroups.map(g => `<div class="panel" id="plans-${g.id}"><h3 class="panel-h" id="ph-${g.id}">${esc(g.panelH)}${g.addon ? ` · ${esc(planCopy.addonLabel)}` : ''}</h3>
    ${g.channel ? channelTable(g) : `<ul class="plans-list">${g.plans.map(pl => planCard(g, pl)).join('')}</ul>`}
    ${g.every ? everyNote(g) : ''}</div>`).join('\n    ')}
  </div>
</div></div></section>
<script src="/assets/sections.js" defer></script>`;

// ---------------------------------------------------------------- home: questions (07)
const homeFaqSection = `<section class="z z-dark g-l pre" id="faq" aria-labelledby="faq-h"><div class="wrap faq"><div class="split">
  <div class="sticky"><p class="kicker">${esc(homeFaqCopy.kicker)}</p><h2 id="faq-h">${esc(homeFaqCopy.h)}</h2></div>
  <div>${homeFaq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
</div></div></section>
${ld({ '@context': 'https://schema.org', '@type': 'FAQPage', '@id': `${SITE}/#faq`, mainEntity: homeFaq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) })}`;

// home block
const ticker = ['Long-form editing', 'Motion graphics', 'Color and finishing', 'Sound', 'Animated captions', 'Channel management'];
const tickRun = ticker.map(t => `<span>${t} ·</span>`).join('');
const homeBlock = `<!--SERVICES:START-->
<section class="z z-dark byus" id="developer" aria-labelledby="by-h"><div class="wrap byus-in">
  <img class="byus-logo" src="/assets/img/noor-logo.png" alt="NOOR Productions logo" width="72" height="72" loading="lazy" decoding="async">
  <div class="byus-copy"><p class="kicker">Designed &amp; built by</p><h2 id="by-h" class="shine" translate="no">NOOR Productions</h2><p>A web design studio crafting fast, polished websites, software and web apps for brands that want to stand out. This site was designed and built by us.</p></div>
  <a class="btn btn--ghost" href="https://noorproductions.in/" target="_blank" rel="noopener">Visit NOOR Productions ${ARROW_BTN}</a>
</div></section>
<section class="z z-dark g-top svc pre" id="services" aria-labelledby="svc-h"><div class="ticker" aria-hidden="true"><div class="ticker-track">${tickRun.repeat(4)}</div></div><div class="wrap"><div class="split">
  <div class="sticky"><p class="kicker">01 · What we make</p><h2 id="svc-h">Your ideas.<br> A sharper cut.</h2><p class="sub">From your first frame to your next upload, the craft stays consistent.</p></div>
  <ol class="svc-list">${services.map((s, i) => `<li><a href="/services/${s.slug}"><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${esc(s.name)}</h3>${ARROW}<p>${esc(s.card)}</p><span class="tg">${s.tags.map(t => `<span>${esc(t)}</span>`).join('')}</span></a></li>`).join('')}</ol>
</div></div></section>
<section class="z z-white up-white pre-s" id="process" aria-labelledby="proc-h"><div class="wm" aria-hidden="true"><span>AFTEROIDS VISION</span></div><div class="wrap">
  <p class="kicker">02 · Process</p>
  <h2 id="proc-h">A clear path from <em>raw to ready.</em></h2>
  <ol class="steps big"><li><b>01<i>.</i></b><h3>Send footage and brief</h3><p>Share your raw files, references, and what you want the video to achieve.</p></li><li><b>02<i>.</i></b><h3>First cut in 48 hours</h3><p>Your story takes shape with editing, motion, color, and sound.</p></li><li><b>03<i>.</i></b><h3>Refine until it’s right</h3><p>Send your notes. We revise until you’re happy to publish.</p></li></ol>
  <a class="btn pill" href="#sample-form">Get my free sample edit ${ARROW_BTN}</a>
</div></section>
<section class="z z-ivory up-ivory pre-d" id="standards" aria-labelledby="std-h"><div class="wrap"><div class="split">
  <div class="sticky"><div class="rule"></div><p class="kicker">03 · Craft standards</p><h2 id="std-h">Less noise. <em>More intention.</em></h2><p class="sub">Not a production line. A small studio that treats your video like it matters.</p></div>
  ${rows([['Pacing that keeps viewers watching', 'Every cut earns its place. We shape the hook, rhythm, and story around the viewer.'], ['Intentional motion', 'Graphics clarify the idea. Nothing moves just to fill the frame.'], ['Documentary-grade color', 'A considered finish that supports the mood and keeps your footage consistent.'], ['Clean, balanced audio', 'Clear dialogue, deliberate sound design, and music that serves the story.'], ['One point of contact', 'Direct conversations with the people doing the work. No handoff maze.']])}
</div>
</div></section>
${homeFoundersSection}
${homeSampleSection}
${homePlansSection}
${homeFaqSection}
<section class="z z-white up-white closer" id="book" aria-labelledby="close-h"><div class="wm" aria-hidden="true"><span>AFTEROIDS VISION</span></div><div class="wrap">
  <p class="kicker">Your next video starts here</p>
  <h2 id="close-h">Let’s build something worth remembering.</h2>
  <div class="cta"><a class="btn" href="mailto:${EMAIL}?subject=Discovery%20call">Book a discovery call ${ARROW_BTN}</a><a class="btn btn--sample" href="/#sample-form">Get a free sample edit</a></div>
</div></section>
<!--SERVICES:END-->`;

// ---------------------------------------------------------------- generic page parts for plan + founders pages
const crumbsHtml = (items) => `<nav aria-label="Breadcrumb"><ol class="crumbs">${items.map(([n, h], i) => i === items.length - 1 ? `<li aria-current="page">${esc(n)}</li>` : `<li><a href="${h}">${esc(n)}</a></li>`).join('')}</ol></nav>`;
const timelineHtml = (clips, glance) => timeline({ clips, glance });
const baseGraph = (u, name, desc, extra, crumbList) => ({
  '@context': 'https://schema.org',
  '@graph': [org,
    { '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'Afteroids Vision', publisher: { '@id': ORG_ID } },
    { '@type': 'WebPage', '@id': `${u}#webpage`, url: u, name, description: desc, isPartOf: { '@id': `${SITE}/#website` }, breadcrumb: { '@id': `${u}#breadcrumb` } },
    ...extra,
    { '@type': 'BreadcrumbList', '@id': `${u}#breadcrumb`, itemListElement: crumbList.map(([n, item], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item })) }],
});
const closerHtml = (cls, buttons, h = 'Let’s build something worth remembering.', kicker = 'Your next video starts here', lead = '') => `<section class="z z-white ${cls} closer" id="book" aria-labelledby="close-h"><div class="wm" aria-hidden="true"><span>AFTEROIDS VISION</span></div><div class="wrap">
  <p class="kicker">${esc(kicker)}</p>
  <h2 id="close-h">${esc(h)}</h2>${lead ? `\n  <p class="lead">${esc(lead)}</p>` : ''}
  <div class="cta">${buttons}</div>
</div></section>`;

// ---------------------------------------------------------------- plan pages
function planPage(g, pl, idx) {
  const u = planUrl(pl);
  const title = `${pl.name} plan, ${g.crumb.toLowerCase()} | Afteroids Vision`;
  const desc = `${g.crumb}, ${pl.name} plan. ${pl.headline} ${pl.who}`;
  const tabHref = `/#plans-${g.id}`;
  const crumbList = [['Home', `${SITE}/`], ['Plans', `${SITE}${tabHref}`], [`${g.crumb}: ${pl.name}`, u]];
  const graph = baseGraph(u, title, desc, [{ '@type': 'Service', '@id': `${u}#service`, name: `${g.crumb}: ${pl.name}`, serviceType: g.crumb, description: `${pl.headline} ${pl.who}`, provider: { '@id': ORG_ID }, areaServed: 'Worldwide', url: u }], crumbList);
  const eyebrow = g.channel ? `Channel management · ${pl.name}` : `${g.crumb} · ${pl.tag}`;
  const glance = g.channel
    ? [['Contact', 'Dedicated channel manager'], ['Starts with', 'A kickoff call'], ['Scope', 'Quoted on a call']]
    : [['Size', pl.size], ['First cut', pl.firstCut || g.firstCut], ['Scope', 'Quoted on a call']];
  const included = g.channel
    ? g.rows.filter(r => r[1 + pl.col] !== 'No').map(r => r[1 + pl.col] === 'Yes' ? r[0] : `${r[0]}: ${r[1 + pl.col]}`)
    : pl.included;
  const steps = g.channel
    ? ['Kickoff call', 'Channel check-up', 'We run it, you review it']
    : ['Send your footage and a short brief', pl.steps2 || 'Get your first cut in 48 hours', 'Send notes until it is right'];
  const talk = `Talk about ${pl.name}`;
  const talkBtn = `<a class="btn" href="${mail(planSubject(g, pl))}">${esc(talk)} ${ARROW_BTN}</a>`;
  const incl = g.every
    ? `<div class="two">
  <div><div class="rule"></div><p class="kicker">03 · Included</p><h2>What is included</h2>${checks(included)}</div>
  <div><div class="rule"></div><p class="kicker">04 · Every plan</p><h2>${esc(g.everyH)}</h2>${checks(g.every)}</div>
</div>`
    : `<div class="split"><div class="sticky"><div class="rule"></div><p class="kicker">03 · Included</p><h2>What is included</h2></div>${checks(included)}</div>`;
  const main = `<main id="main">
<section class="z z-dark g-l phero"><div class="wrap">
  ${crumbsHtml([['Home', '/'], ['Plans', tabHref], [`${g.crumb}: ${pl.name}`, '']])}
  <div class="phero-grid">
    <div>
      <p class="eyebrow">${esc(eyebrow)}</p>
      <h1>${esc(pl.headline)}</h1>
      <div class="cta">${talkBtn}<a class="btn btn--ghost" href="${tabHref}">Back to the plans</a></div>
    </div>
    ${timelineHtml(g.clips.map((_, i) => g.clips[(i + idx) % g.clips.length]), glance)}
  </div>
</div></section>

<section class="z z-dark g-r pre" aria-labelledby="who-h"><div class="wrap"><div class="split">
  <div class="sticky"><p class="kicker">01 · The plan</p><h2 id="who-h">Who it is for</h2></div>
  <div class="prose"><p>${esc(pl.who)}</p></div>
</div></div></section>

<section class="z z-white up-white pre-s" aria-labelledby="how-h"><div class="wm" aria-hidden="true"><span>AFTEROIDS VISION</span></div><div class="wrap">
  <p class="kicker">02 · How it works</p><h2 id="how-h">How it works</h2>
  <ol class="steps big" aria-label="How this plan runs">${steps.map((t, i) => `<li><b>0${i + 1}<i>.</i></b><h3>${esc(t)}</h3></li>`).join('')}</ol>
  <a class="btn pill" href="${mail(planSubject(g, pl))}">${esc(talk)} ${ARROW_BTN}</a>
</div></section>

<section class="z z-ivory up-ivory" aria-label="What is included"><div class="wrap">${incl}</div></section>

${closerHtml('from-ivory', `${talkBtn}<a class="btn btn--sample" href="/#sample-form">Get a free sample edit</a><a class="btn btn--ghost" href="${tabHref}">Back to the plans</a>`)}
</main>`;
  return shell({ title, desc, u, graph, main });
}

// ---------------------------------------------------------------- founders page
function foundersPage() {
  const u = `${SITE}/founders/`;
  const graph = baseGraph(u, founders.title, founders.desc, [
    ...founders.people.map(p => ({ '@type': 'Person', '@id': `${u}#${p.name.toLowerCase()}`, name: p.name, jobTitle: p.role, worksFor: { '@id': ORG_ID } })),
  ], [['Home', `${SITE}/`], ['Founders', u]]);
  graph['@graph'][2]['@type'] = 'AboutPage';
  const main = `<main id="main">
<section class="z z-dark g-l phero"><div class="wrap">
  ${crumbsHtml([['Home', '/'], ['Founders', '']])}
  <div class="phero-grid">
    <div>
      <p class="eyebrow">${esc(founders.pageH)}</p>
      <h1>${founders.h1}</h1>
      <p class="lead">${esc(founders.lead)}</p>
      <div class="cta"><a class="btn" href="/#sample-form">Get my free sample edit ${ARROW_BTN}</a><a class="btn btn--ghost" href="/#book">Book a call</a></div>
    </div>
    ${timelineHtml(founders.clips, founders.glance)}
  </div>
</div></section>

<section class="z z-dark g-r pre" aria-labelledby="ppl-h"><div class="wrap"><div class="split">
  <div class="sticky"><p class="kicker">01 · The founders</p><h2 id="ppl-h">Nishant and Ayush.</h2></div>
  <ol class="rows">${founders.people.map((p, i) => `<li><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${esc(p.name)}, ${esc(p.role)}</h3><p>${esc(p.body)}</p><p><em>“${esc(p.quote)}”</em></p><p><mark>${esc(p.placeholder)}</mark></p></li>`).join('')}</ol>
</div></div></section>

<section class="z z-white up-white pre-s" aria-labelledby="tog-h"><div class="wm" aria-hidden="true"><span>AFTEROIDS VISION</span></div><div class="wrap"><div class="split">
  <div class="sticky"><p class="kicker">02 · Together</p><h2 id="tog-h">How we work together</h2></div>
  <div class="prose">${founders.together.map(t => `<p>${esc(t)}</p>`).join('')}</div>
</div></div></section>

<section class="z z-ivory up-ivory" aria-labelledby="std-h"><div class="wrap"><div class="split">
  <div class="sticky"><div class="rule"></div><p class="kicker">03 · Principles</p><h2 id="std-h">What we stand for</h2></div>
  ${checks(founders.stand)}
</div></div></section>

${closerHtml('from-ivory', `<a class="btn" href="/#book">Book a call ${ARROW_BTN}</a><a class="btn btn--sample" href="/#sample-form">Get a free sample edit</a>`, founders.closeH, 'Your next video starts here', founders.closeLine)}
</main>`;
  return shell({ title: founders.title + ' | Afteroids Vision', desc: founders.desc, u, graph, main });
}

// ---------------------------------------------------------------- write
for (const s of services) {
  mkdirSync(`services/${s.slug}`, { recursive: true });
  writeFileSync(`services/${s.slug}/index.html`, page(s));
}
const allPlans = [];
for (const g of planGroups) g.plans.forEach((pl, i) => {
  mkdirSync(`plans/${pl.slug}`, { recursive: true });
  writeFileSync(`plans/${pl.slug}/index.html`, planPage(g, pl, i));
  allPlans.push([g, pl]);
});
mkdirSync('founders', { recursive: true });
writeFileSync('founders/index.html', foundersPage());

let home = readFileSync('index.html', 'utf8');
home = home.replace(/<!--SERVICES:START-->[\s\S]*<!--SERVICES:END-->/, () => homeBlock);
home = home.replace(/<!--FOOTER:START-->[\s\S]*<!--FOOTER:END-->/, () => `<!--FOOTER:START-->${footer()}<!--FOOTER:END-->`);
writeFileSync('index.html', home);

const today = new Date().toISOString().slice(0, 10);
const pages = [`${SITE}/`, ...services.map(url), `${SITE}/founders/`, ...allPlans.map(([, pl]) => planUrl(pl))];
writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(l => `  <url><loc>${l}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
writeFileSync('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
writeFileSync('llms.txt', `# Afteroids Vision\n\n> Founder-led YouTube video editing and motion graphics studio for creators and brands. Cinematic long-form edits, first cut in 48 hours, revisions until it's right. Free sample edit available.\n\n## Services\n\n${services.map(s => `- [${s.name}](${url(s)}): ${s.desc}`).join('\n')}\n\n## Plans\n\n${allPlans.map(([g, pl]) => `- [${g.crumb}: ${pl.name}](${planUrl(pl)}): ${pl.headline} ${pl.who}`).join('\n')}\n\n## About\n\n- [${founders.title}](${SITE}/founders/): ${founders.desc}\n\n## Contact\n\n- ${EMAIL}\n`);
console.log('built', services.length, 'service pages,', allPlans.length, 'plan pages, founders page');
