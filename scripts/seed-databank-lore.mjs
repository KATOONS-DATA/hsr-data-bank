#!/usr/bin/env node
/**
 * Seed Data Bank lore from summarized in-game / Fandom reference material.
 * Run: node scripts/seed-databank-lore.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(ROOT, 'src', 'content');

function md(fm, body) {
  const lines = Object.entries(fm)
    .map(([k, v]) => `${k}: ${typeof v === 'string' && /[:#"'[\]]/.test(v) ? JSON.stringify(v) : v}`)
    .join('\n');
  return `---\n${lines}\n---\n\n${body.trim()}\n`;
}

async function write(collection, slug, fm, body) {
  const dir = path.join(CONTENT, collection);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, `${slug}.md`), md(fm, body), 'utf8');
}

const factions = [
  {
    slug: 'astral-express',
    fm: {
      title: 'Astral Express',
      description: 'The train that rides the star rail — inherited from Akivili the Trailblaze.',
      associatedPath: 'Trailblaze',
      alignment: 'Allied',
      status: 'Active',
      draft: false,
    },
    body: `## Overview

After Akivili fell, the Trailblazing will lived on in the Nameless — and in the Express the Aeon once rode. Star rails corrupted by the Cancer of All Worlds forced the train to limp between obstructed routes for years, until a red-haired engineer restored it and set it traveling again.

The Express stops at stations across the cosmos. Passengers board and leave; agendas differ, but the voyage is shared. Himeko and the crew open the doors to anyone willing to ride.

> *"Choo! Choo! Sit tight, no one fight, warp jump watch your head."*
> — Astral Express Safety Instructions (Pom-Pom version)

## Known crew

- [Himeko](../characters/himeko/)
- [Welt](../characters/welt/)
- [Dan Heng](../characters/dan-heng/)
- [March 7th](../characters/march-7th/)
- [Trailblazer](../characters/trailblazer/)

## At the table

Your campaign's version of the Express — who the party has met and what they know.`,
  },
  {
    slug: 'stellaron-hunters',
    fm: {
      title: 'Stellaron Hunters',
      description: 'Elite operatives who chase Stellarons across worlds — motives unknown.',
      associatedPath: 'Nihility',
      alignment: 'Unknown',
      status: 'Active',
      draft: false,
    },
    body: `## Overview

When the Cancer of All Worlds rippled across the stars, Stellarons appeared — gems of destruction in corrosive mud. Death followed them. Yet a fearless few travel between worlds to obtain them anyway. They call themselves Stellaron Hunters.

No one knows which Aeon they serve or what they want with the Stellaron. Rumors fill the cosmos; only one thing is certain: though few in number, each Hunter holds incredible power.

> *"...Blade, Silver Wolf, Sam... The four mentioned above, dead or alive; do not hurt Destiny's Slave."*
> — IPC wanted notice

## Known members

- [Kafka](../characters/kafka/)
- [Blade](../characters/blade/)
- [Silver Wolf](../characters/silver-wolf/)
- [Sparkle](../characters/sparkle/)

## At the table

Only include what your players have confirmed in play.`,
  },
  {
    slug: 'the-nameless',
    fm: {
      title: 'The Nameless',
      description: 'Adventurers who follow the Path of Trailblaze across the silver rail.',
      associatedPath: 'Trailblaze',
      alignment: 'Varied',
      status: 'Active',
      draft: false,
    },
    body: `## Overview

A thousand years ago Akivili laid star rails linking worlds and left legends of exploration. The curious followed — the Nameless — riding the Express and surveying planets on the silver rail.

When Akivili fell, loyal Nameless carried on. They believe Trailblaze will one day connect the entire universe. The Express still hurries between stars, said to be powered by the fallen Aeon's heart as it repairs rails tainted by Stellarons.

> *"Mysterious strangers were seen to come and go in many worlds."*
> — Fables About the Stars

## At the table

Which Nameless has the party met? Who still walks the Path?`,
  },
  {
    slug: 'xianzhou-alliance',
    fm: {
      title: 'Xianzhou Alliance',
      description: 'Six flagships united under The Hunt — hunters of Abundance and its abominations.',
      associatedPath: 'The Hunt',
      alignment: 'Neutral',
      status: 'Active',
      draft: false,
    },
    body: `## Overview

Ancient Xianzhou ships once sought the elixir of immortality. Yaoshi's gift brought sorrow, war, and undeath — until Lan the Hunt returned and shattered the Ambrosial Arbor. The Alliance formed under The Hunt, fielding the Cloud Knights to eradicate Abominations of Abundance.

They patrol worlds that once worshiped Abundance and destroy undead threats. Civilizations that crave immortality learn to fear the red line the Xianzhou represents.

## Related locations

- [Xianzhou Luofu](../locations/xianzhou-luofu/)

## At the table

Party standing with the Alliance and Luofu authorities.`,
  },
  {
    slug: 'galaxy-rangers',
    fm: {
      title: 'Galaxy Rangers',
      description: 'Heroes who roam the cosmos upholding justice on the Path of The Hunt.',
      associatedPath: 'The Hunt',
      alignment: 'Neutral',
      status: 'Active',
      draft: false,
    },
    body: `## Overview

Not every devotee of The Hunt despises Abundance. The Galaxy Rangers admire Lan's swift punishment and believe justice must be upheld by personal action. Blessed by the Aeon, they travel world to world hunting evil — then move on.

Their assassination of Lord Ravager Zulo made them famous. Later they thwarted Dr. Primitive's atavistic experiment, then faded from sight — until a comet over Asdana signaled their return during Penacony's Stellaron crisis.

## At the table

Any Rangers the party has crossed paths with?`,
  },
  {
    slug: 'antimatter-legion',
    fm: {
      title: 'Antimatter Legion',
      description: "Nanook's legion — chaos and destruction sworn against life and civilization.",
      associatedPath: 'Destruction',
      alignment: 'Hostile',
      status: 'Active',
      draft: false,
    },
    body: `## Overview

Nanook commands a vast legion that brings ruin to worlds. Followers swear the Path of Destruction and place themselves opposite civilization itself. Fierce species serve as vanguards; evil strategists plot planetary collapse.

The Legion devours decaying worlds and leaves only when the last flame of civilization dies. Nanook's shadow sometimes appears over a world's final moments.

## At the table

Legion activity your campaign has witnessed.`,
  },
  {
    slug: 'genius-society',
    fm: {
      title: 'Genius Society',
      description: 'Mortals invited by Nous the Erudition to seek answers to the universe.',
      associatedPath: 'Erudition',
      alignment: 'Neutral',
      status: 'Active',
      draft: false,
    },
    body: `## Overview

Nous sends signals to sparks of intelligence across the cosmos, inviting geniuses to join the search for universal truth. Most misread the invitation as approval for work already done; Nous has no time for insignificant achievements.

Only those who humbly ask and accept that mortal wisdom has limits may join — and disappear from the world leaving world-shattering answers behind.

> *"The answer to the universe is beyond the limits of mortal wisdom."*

## Known members

- [Herta](../characters/herta/)
- [Ruan Mei](../characters/ruan-mei/)
- [Dr. Ratio](../characters/dr-ratio/)

## At the table`,
  },
  {
    slug: 'interastral-peace-corporation',
    fm: {
      title: 'Interastral Peace Corporation',
      description: 'Pan-galactic consortium — trade, credit, and devotion to Qlipoth the Preservation.',
      associatedPath: 'Preservation',
      alignment: 'Neutral',
      status: 'Active',
      draft: false,
    },
    body: `## Overview

To outsiders the IPC is a free-trade colossus. In practice it issues money, monopolizes resources, and funnels wealth to the Amber Lord Qlipoth. Nearly all interstellar commerce runs on IPC credit.

Seven major departments span marketing, logistics, investment, technology, and more — each controlling civilizations and billions of workers. Their motto: give everything to Qlipoth.

## At the table

IPC debts, contracts, or agents the party has dealt with.`,
  },
  {
    slug: 'the-family',
    fm: {
      title: 'The Family',
      description: 'Devotees of Xipe the Harmony — one melody, one smile, no discord.',
      associatedPath: 'Harmony',
      alignment: 'Unknown',
      status: 'Active',
      draft: false,
    },
    body: `## Overview

Under Xipe's radiance, followers formed a harmonious Family — different worlds and identities, but no disputes, only love and smiles. They sing to other worlds, inviting them to embrace Harmony.

When The Family took control of Penacony's Dreamscape, the resort exploded into prosperity. Critics whisper that dissenting civilizations simply vanish from the record.

## Related locations

- [Penacony](../locations/penacony/)

## At the table

Party experience with Family hospitality or control.`,
  },
  {
    slug: 'garden-of-recollection',
    fm: {
      title: 'Garden of Recollection',
      description: 'Memokeepers who preserve and share memories under Fuli the Remembrance.',
      associatedPath: 'Remembrance',
      alignment: 'Neutral',
      status: 'Active',
      draft: false,
    },
    body: `## Overview

To think is to exist; memories are proof. Memokeepers believe reality and imagination are myths — only memory endures. Enlightened by Fuli, they shed mortal flesh and travel as memetic entities, collecting precious memories by trade, theft, or deception.

## At the table`,
  },
  {
    slug: 'masked-fools',
    fm: {
      title: 'Masked Fools',
      description: 'Radical devotees of Aha the Elation — the universe is a joke worth laughing at.',
      associatedPath: 'Elation',
      alignment: 'Chaotic',
      status: 'Active',
      draft: false,
    },
    body: `## Overview

The Fools believe the truth of the world is laughter. Joy heals wounds, resists nihilism, and answers meaninglessness. They mock heroes, kings, lovers, and scholars — stirring stagnant pools to create change.

Aha sometimes blesses them with Aeonic power, amused by their renunciation of joy while spreading Elation anyway.

## Known members

- [Sparkle](../characters/sparkle/) — associated with Stellaron Hunters; Family ties in Penacony

## At the table`,
  },
  {
    slug: 'intelligentsia-guild',
    fm: {
      title: 'Intelligentsia Guild',
      description: 'Open academic network — all knowledge circulated like currency.',
      associatedPath: 'Erudition',
      alignment: 'Neutral',
      status: 'Active',
      draft: false,
    },
    body: `## Overview

The Guild accepts all who seek learning and funds the full pursuit of knowledge. Schools trade formulas for recipes; academic circulation runs at maximum efficiency. Their consensus: transcend individual limits through mutual learning.

They partner with the IPC Technology Department and feud with History Fictionologists.

## At the table`,
  },
];

const aeons = [
  {
    slug: 'akivili',
    fm: { title: 'Akivili the Trailblaze', description: 'Aeon of Trailblaze — laid the star rails linking worlds.', path: 'Trailblaze', draft: false },
    body: `## Overview

Akivili left isolated Pegana and expanded the unknown edges of the universe. The Nameless followed, sharing wine and songs aboard the Express until the Aeon's fall ended that age — but not the rails or the will to explore.

> *"Countless shooting stars streak across the night sky... If you can pick the right one, it will carry your wish to thousands of distant worlds."*

## At the table`,
  },
  {
    slug: 'nanook',
    fm: { title: 'Nanook the Destruction', description: 'Avatar of entropy — heat death made will.', path: 'Destruction', draft: false },
    body: `## Overview

Nanook believes the universe's birth was a mistake. Civilization is a cancer; war is the only shared language. To correct the error, Nanook became entropy's embodiment and commands the Antimatter Legion.

## At the table`,
  },
  {
    slug: 'lan',
    fm: { title: 'Lan the Hunt', description: 'The Reignbow Arbiter — destroys undead and Abominations of Abundance.', path: 'The Hunt', draft: false },
    body: `## Overview

Lan wanders worlds destroying the undead that poisoned their homeworld. Salvation and total destruction are often indistinguishable when the Hunt acts.

## At the table`,
  },
  {
    slug: 'nous',
    fm: { title: 'Nous the Erudition', description: 'Astral computer ascended — seeks to solve all mysteries.', path: 'Erudition', draft: false },
    body: `## Overview

Nous works equations of trillions of variables in a cosmic corner, occasionally signaling geniuses to join the Genius Society. Most answers mortals seek were solved millennia ago.

## At the table`,
  },
  {
    slug: 'xipe',
    fm: { title: 'Xipe the Harmony', description: 'Plural Aeon of thousand faces — unity through merged ideals.', path: 'Harmony', draft: false },
    body: `## Overview

Xipe chants songs of joy from harmonious worlds. Intelligent life must discard selfish differences and fuse into one melody — the strong helping the weak, life protected by death.

## At the table`,
  },
  {
    slug: 'ix',
    fm: { title: 'IX the Nihility', description: 'Enigmatic Aeon of the void — ultimate fate is nothingness.', path: 'Nihility', draft: false },
    body: `## Overview

IX does not interact with other Aeons. They believe the multiverse's fate is nothingness — and therefore worthless. Gazing into their shadow risks losing reason entirely.

## At the table`,
  },
  {
    slug: 'qlipoth',
    fm: { title: 'Qlipoth the Preservation', description: 'The Amber Lord — builder of walls between worlds and disaster.', path: 'Preservation', draft: false },
    body: `## Overview

Among the oldest Aeons, Qlipoth forged the Celestial Comet Wall and Great Attractor Base to isolate living worlds from imminent devouring. Mortals who feel their gaze become Architects, building barriers of their own.

## At the table`,
  },
  {
    slug: 'yaoshi',
    fm: { title: 'Yaoshi the Abundance', description: 'Nurturer of life — answers prayers, hates death and illness.', path: 'Abundance', draft: false },
    body: `## Overview

Yaoshi grants immortality and paradise to worlds that pray — but endless life breeds monsters the Xianzhou hunts. Denizens of Abundance spread Yaoshi's kindness; hunters call it a curse.

## At the table`,
  },
  {
    slug: 'aha',
    fm: { title: 'Aha the Elation', description: 'Aeon who laughed at the void and gifted joy to intelligent life.', path: 'Elation', draft: false },
    body: `## Overview

Only the wise can understand joy. Aha plays games without winners, seeking laughter that lifts the soul toward divinity — and sometimes blesses Masked Fools on a whim.

## At the table`,
  },
  {
    slug: 'fuli',
    fm: { title: 'Fuli the Remembrance', description: 'Keeper of memory — fish swimming upstream in the river of time.', path: 'Remembrance', draft: false },
    body: `## Overview

Memory is the only immortal treasure. Fuli sits at the sanctuary center, watching civilizations repeat mistakes. Memokeepers serve the Garden of Recollection in their name.

## At the table`,
  },
  {
    slug: 'tayzzyronth',
    fm: { title: 'Tayzzyronth the Propagation', description: 'Imperator Insectorum — self-replicating Swarm Disaster.', path: 'Propagation', draft: false },
    body: `## Overview

The last Coleoptera ascended from loneliness into infinite propagation. The Swarm Disaster swept the galaxy until fate halted Tayzzyronth — but spawn remain endless.

## At the table`,
  },
];

const locations = [
  {
    slug: 'herta-space-station',
    fm: { title: 'Herta Space Station', description: 'Orbital museum-lab sealing strange existences among the stars.', region: 'Orbit', world: 'Various', status: 'Known', draft: false },
    body: `## Overview

Genius Society member Herta established a museum-like starship to collect and seal curios from across the cosmos. Researchers catalog relics and curios; the collection draws jealous eyes, but Herta's power keeps crises rare.

## At the table`,
  },
  {
    slug: 'jarilo-vi',
    fm: { title: 'Jarilo-VI', description: 'Frozen world — Belobog above, Underworld below.', region: 'Outer Rim', world: 'Jarilo-VI', status: 'Known', draft: false },
    body: `## Overview

Ancient wars ended when an early spring turned the tide; the planet was named for the war god Jarilo. Intensive development exhausted resources; Stellaron and Eternal Freeze ended its golden age. Survivors built Belobog and lost contact with the wider cosmos.

## At the table`,
  },
  {
    slug: 'xianzhou-luofu',
    fm: { title: 'Xianzhou Luofu', description: 'Flagship of the Alliance — trades, heals, and hunts Abundance.', region: 'Xianzhou', world: 'Luofu', status: 'Known', draft: false },
    body: `## Overview

One of six Xianzhou flagships, Luofu sails toward the Hunt's destined enemies. After war with Denizens of Abundance it trades between civilized stars, partners with the IPC, and welcomes visitors for medicine and study — while Cloud Knights watch for Elixir Seekers and undead threats.

## At the table`,
  },
  {
    slug: 'penacony',
    fm: { title: 'Penacony', description: 'Planet of Festivities — dream resort above the Asdana sky.', region: 'Asdana', world: 'Penacony', status: 'Known', draft: false },
    body: `## Overview

Once an IPC frontier prison where inmates patched memoria leaks and dreamed of freedom together. After the Cancer of All Worlds, prisoners became rulers with help from many factions. The Family later took the Dreamscape and turned Penacony into a glittering resort — with a heavy past few guests acknowledge.

## At the table`,
  },
];

const terminology = [
  {
    slug: 'stellaron',
    fm: { title: 'Stellaron', description: 'Seed of disaster that warps worlds — heart of the Cancer of All Worlds.', category: 'Concepts', draft: false },
    body: `## Overview

Stellarons spread like cancer along star routes, corrupting worlds with Fragmentum. Most civilizations know them only as destruction; Stellaron Hunters pursue them for unknown ends. Often appears alongside Nanook's Legion — connection unproven.

## At the table`,
  },
  {
    slug: 'trailblaze',
    fm: { title: 'Trailblaze', description: 'Path walked by Akivili, the Nameless, and the Astral Express.', category: 'Paths', draft: false },
    body: `## Overview

Exploration linking worlds via star rail. The Express calendar inherits from Akivili's homeworld Pegana. The Trailblazer and crew continue where the Aeon fell.

## At the table`,
  },
  {
    slug: 'cancer-of-all-worlds',
    fm: { title: 'Cancer of All Worlds', description: 'IPC term for Stellaron corruption spreading along Trailblaze routes.', category: 'Phenomena', draft: false },
    body: `## Overview

Since a certain era, imperceptible matter disrupted Imaginary Energy along interstellar routes — travel became dangerous. Stellarons encroach on neighboring worlds; IPC warns travelers that infected worlds are rarely saved.

## At the table`,
  },
  {
    slug: 'fragmentum',
    fm: { title: 'Fragmentum', description: 'Spatial corrosion spawned by Stellaron — hostile twisted creations.', category: 'Phenomena', draft: false },
    body: `## Overview

Fragmentum converts touched entities and spaces into corrosive creations that preserve old habits but behave with violent hostility. Scholars warn: treat corroded beings as unrelated to their originals.

## At the table`,
  },
  {
    slug: 'emanator',
    fm: { title: 'Emanator', description: 'Mortals granted Path power by an Aeon — emissaries in mortal eyes.', category: 'Phenomena', draft: false },
    body: `## Overview

Aeons rarely share power; those who receive it become Emanators — Lord Ravagers, Stonehearts, Galaxy Rangers, and countless others. Each Aeon treats them differently: generous extension, indifference, or Aha's random whims.

## At the table`,
  },
  {
    slug: 'pathstrider',
    fm: { title: 'Pathstrider', description: 'Anyone who walks a Path ruled by an Aeon.', category: 'Phenomena', draft: false },
    body: `## Overview

Devotees, warriors, seekers — Pathstriders carry a Path's will with determination mortals lack. An Aeon's rare glance, approving or pitying, is treasured above all.

## At the table`,
  },
  {
    slug: 'imaginary-tree',
    fm: { title: 'Imaginary Tree', description: 'Theory of worlds as branches on a tree fed by Imaginary Energy.', category: 'Theory', draft: false },
    body: `## Overview

Worlds are leaves on branches of possibility; Imaginary Energy isolates star clusters so light cannot cross the gaps. Zandar One Kuwabara is credited with the theory — control Imaginary Energy, control the universe.

## At the table`,
  },
  {
    slug: 'amber-era',
    fm: { title: 'Amber Era', description: 'Galactic calendar — each Era begins when Qlipoth swings their hammer.', category: 'Calendar', draft: false },
    body: `## Overview

IPC calendar from Qlipoth's estimated ascension. Era length varies wildly (roughly 76–240 Trailblaze years). The Express restarted its journey in AE 2157.

## At the table`,
  },
  {
    slug: 'synesthesia-beacon',
    fm: { title: 'Synesthesia Beacon', description: 'Neural implant enabling universal translation across civilizations.', category: 'Technology', draft: false },
    body: `## Overview

Invented by Genius Society #56 Elias Salas, forgotten for centuries, then rebuilt by the Intelligentsia Guild under IPC pressure. One injection links inner language directly — but shared language did not bring peace.

## At the table`,
  },
];

async function main() {
  for (const f of factions) await write('factions', f.slug, f.fm, f.body);
  for (const a of aeons) await write('aeons', a.slug, a.fm, a.body);
  for (const l of locations) await write('locations', l.slug, l.fm, l.body);
  for (const t of terminology) await write('terminology', t.slug, t.fm, t.body);
  console.log(
    `Seeded ${factions.length} factions, ${aeons.length} aeons, ${locations.length} locations, ${terminology.length} terminology entries.`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
