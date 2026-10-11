import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("number theory curriculum renders in prerequisite order with working mathematics and provenance", async () => {
  const slugs = [
    "primes-factorization", "modular-arithmetic", "gcd-euclidean-algorithm",
    "modular-inverses", "fast-modular-exponentiation", "euler-totient-theorem",
    "rsa-first-principles",
  ];
  const topic = await render("/topic/number-theory-cryptography");
  assert.equal(topic.status, 200);
  const topicHtml = await topic.text();
  const excerpts = [...topicHtml.matchAll(/<span>(.*?)<\/span>/g)].map((match) => match[1]).join(" ");
  assert.doesNotMatch(excerpts, /\\[()\[\]]/);
  assert.match(excerpts, /twelve-hour/);
  assert.match(excerpts, /equal-length/);
  assert.match(excerpts, /public-key/);
  assert.match(excerpts, /10\+5=15/);
  let previous = -1;
  for (const slug of slugs) {
    const index = topicHtml.lastIndexOf(`href="/entry/${slug}"`);
    assert.ok(index > previous, `${slug} is in prerequisite order`);
    previous = index;
    const response = await render(`/entry/${slug}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    const article = html.slice(html.indexOf('class="entry-body"'), html.indexOf("</article>"));
    assert.doesNotMatch(article, /\\(?:gcd|pmod|varphi|equiv|times|Longrightarrow)/);
  }
  const rsa = await (await render("/entry/rsa-first-principles")).text();
  assert.match(rsa, /RSA-OAEP/);
  assert.match(rsa, /RSA-PSS/);
  assert.match(rsa, /all 55 toy messages/);
  const modular = await (await render("/entry/modular-arithmetic")).text();
  assert.match(modular, /modular-residue-wheel.svg/);
  assert.match(modular, /Local original arithmetic diagram/);
});

test("server-renders Gavin's Miscellany", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Gavin&#x27;s Miscellany<\/title>/i);
  assert.match(html, /Personal encyclopedia and learning curriculum/);
  assert.match(html, /150 entries/);
  assert.match(html, /Natural World/);
  assert.match(html, /Tardigrades and Cryptobiosis/);
  assert.match(html, /Surprise Me/);
  assert.match(html, /Edit &amp; Review/);
  assert.doesNotMatch(html, /Memory off/);
  assert.doesNotMatch(html, /aria-label="Memory email"/);
  assert.doesNotMatch(html, /aria-label="Memory password"/);
  assert.doesNotMatch(html, /Things I thought were interesting enough not to forget/);
  assert.doesNotMatch(html, /<h1>Gavin&#x27;s Miscellany<\/h1>/);
  assert.doesNotMatch(html, /Recently Added/);
  assert.match(html, /href="\/quiz"/);
  assert.match(html, /Category browser/);
  assert.match(html, /Overview/);
  assert.doesNotMatch(html, /class="quiz-band"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("server-renders stable entry URLs", async () => {
  const response = await render("/entry/time-dilation");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>Time Dilation \| Gavin&#x27;s Miscellany<\/title>/i);
  assert.match(html, /rel="canonical" href="\/entry\/time-dilation"/i);
  assert.match(html, /Time Dilation/);
  assert.match(html, /Physics &amp; Space/);
  assert.match(html, /href="\/topic\/relativity"/);
  assert.match(html, /href="\/quiz\?topic=relativity"/);
  assert.doesNotMatch(html, /Quiz related topics/);
  assert.doesNotMatch(html, /Previous entry/);
  assert.doesNotMatch(html, /Next entry/);
});

test("entry chrome renders compact tags, dates, and remote images", async () => {
  const response = await render("/entry/octopus-intelligence");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /class="entry-tags"/);
  assert.match(html, /href="\/tag\/cognition"/);
  assert.match(html, /date_added[^<]+2026-08-11/);
  assert.match(html, /date_updated[^<]+2026-08-12/);
  assert.match(html, /960px-GRNMS_-_Octopus_Vulgaris/);
  assert.doesNotMatch(html, /class="tag-panel"/);
  assert.doesNotMatch(html, /Special:FilePath\/Octopus/);
});

test("entry prose renders cleaned callouts without editorial leaks", async () => {
  const gunsResponse = await render("/entry/guns-germs-steel");
  assert.equal(gunsResponse.status, 200);

  const guns = await gunsResponse.text();
  assert.match(guns, /class="entry-callout"/);
  assert.match(guns, /Diamond proposed a powerful large-scale environmental explanation/);
  assert.doesNotMatch(guns, /Do not store/);
  assert.doesNotMatch(guns, /&gt;\s*<strong>/);

  const junctionResponse = await render("/entry/junction-boxes");
  assert.equal(junctionResponse.status, 200);

  const junction = await junctionResponse.text();
  assert.match(junction, /class="entry-callout"/);
  assert.doesNotMatch(junction, /&gt;\s*<strong>Safety boundary/);
});

test("entry prose renders fenced text blocks as code blocks", async () => {
  const response = await render("/entry/history-of-alcohol");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /class="entry-code-block"/);
  assert.match(html, /Arabic al-kuḥl \/ kohl/);
  assert.match(
    html,
    /<ul><li>Fermentation is prehistoric\.<\/li><li>Distillation technology is ancient but much later\.<\/li><li>The modern word and its ethanol meaning are later still\.<\/li><\/ul>/,
  );
});

test("entry prose normalizes special characters while preserving markdown semantics", async () => {
  const festivalResponse = await render("/entry/festival-raspberry-cordyline");
  assert.equal(festivalResponse.status, 200);
  const festival = await festivalResponse.text();
  assert.match(festival, /Festival™ Raspberry Cordyline/);
  assert.match(festival, /Cordyline banksii × pumilio &#x27;CorBzr01&#x27;/);
  assert.match(festival, /3–3\.5 ft tall × about 3 ft wide/);
  assert.match(festival, /15 °F \/ −9 °C/);
  assert.match(festival, /water \+ oxygen \+ support \+ nutrients/);
  assert.doesNotMatch(festival, /<code[^>]*>Cordyline banksii × pumilio/);
  assert.doesNotMatch(festival, /`3–3\.5 ft tall/);

  const tokensResponse = await render("/entry/tokens-and-embeddings");
  assert.equal(tokensResponse.status, 200);
  const tokens = await tokensResponse.text();
  assert.match(tokens, /<code class="entry-inline-code">5 x 3<\/code>/);
  assert.match(tokens, /<code class="entry-inline-code">The dog ran\.<\/code>/);
  assert.match(tokens, /<span class="math-inline">E<\/span>/);

  const logicResponse = await render("/entry/propositional-logic");
  assert.equal(logicResponse.status, 200);
  const logic = await logicResponse.text();
  assert.match(logic, /<table>/);
  assert.match(logic, /<span class="math-inline">¬ P<\/span>/);
  assert.match(logic, /<span class="math-inline">P → Q<\/span>/);
});

test("server-renders Handoff 30 plant and plaque updates", async () => {
  const cordylineResponse = await render("/entry/festival-raspberry-cordyline");
  assert.equal(cordylineResponse.status, 200);
  const cordyline = await cordylineResponse.text();
  assert.match(cordyline, /Festival™ Raspberry Cordyline/);
  assert.match(cordyline, /37619109045_1e3ff0e505_c\.jpg/);
  assert.match(cordyline, /festival-raspberry-cordyline-care\.svg/);
  assert.match(cordyline, /Wood chips: useful mulch, questionable bulk potting medium/);
  assert.match(cordyline, /<ol><li><strong>Check the growing medium several inches down\.<\/strong><ul><li>Dry throughout/);

  const atherosclerosisResponse = await render("/entry/atherosclerosis");
  assert.equal(atherosclerosisResponse.status, 200);
  const atherosclerosis = await atherosclerosisResponse.text();
  assert.match(atherosclerosis, /Can plaque actually regress/);
  assert.match(atherosclerosis, /Plaque stabilization and regression schematic/);
  assert.match(atherosclerosis, /not necessarily an artery returned to its teenage appearance/);
});

test("server-renders category landing pages", async () => {
  const response = await render("/category/biology-medicine");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>Biology &amp; Medicine \| Gavin&#x27;s Miscellany<\/title>/i);
  assert.match(html, /Metabolism &amp; Diabetes/);
  assert.match(html, /href="\/topic\/metabolism-diabetes"/);
  assert.match(html, /Blood Glucose Regulation/);
});

test("server-renders topic landing pages", async () => {
  const response = await render("/topic/metabolism-diabetes");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>Metabolism &amp; Diabetes \| Gavin&#x27;s Miscellany<\/title>/i);
  assert.match(html, /Start Here/);
  assert.match(html, /Metabolic Fuel Use/);
  assert.match(html, /Gluconeogenesis/);
});

test("explicit topic ordering renders pedagogical topic pages", async () => {
  const geologyResponse = await render("/topic/earth-history-geology");
  assert.equal(geologyResponse.status, 200);
  const geology = await geologyResponse.text();
  assert.ok(geology.indexOf("Geological Time Overview") < geology.indexOf("How We Know the Age of Earth"));
  assert.ok(geology.indexOf("How We Know the Age of Earth") < geology.indexOf("Radiometric Dating"));
  assert.ok(geology.indexOf("Radiometric Dating") < geology.indexOf("Great Oxidation Event"));

  const philosophersResponse = await render("/topic/philosophers");
  assert.equal(philosophersResponse.status, 200);
  const philosophers = await philosophersResponse.text();
  assert.ok(philosophers.indexOf("Confucius") < philosophers.indexOf("Socrates"));
  assert.ok(philosophers.indexOf("Socrates") < philosophers.indexOf("Plato"));
  assert.ok(philosophers.indexOf("Plato") < philosophers.indexOf("Aristotle"));

  const logicResponse = await render("/topic/logic-formal-reasoning");
  assert.equal(logicResponse.status, 200);
  const logic = await logicResponse.text();
  assert.ok(logic.indexOf("Logic from Zero") < logic.indexOf("Propositional Logic"));
  assert.ok(logic.indexOf("Propositional Logic") < logic.indexOf("Predicate Logic"));
  assert.ok(logic.indexOf("Predicate Logic") < logic.indexOf("Modal Logic and Kripke Worlds"));
  assert.ok(logic.indexOf("Modal Logic and Kripke Worlds") < logic.indexOf("K, T, S4 and S5"));
  assert.ok(logic.indexOf("K, T, S4 and S5") < logic.indexOf("Logic of Time, Knowledge and Obligation"));
  assert.ok(logic.indexOf("Logic of Time, Knowledge and Obligation") < logic.indexOf("Beyond Classical Logic"));

  const alcoholResponse = await render("/topic/alcohol-history-science");
  assert.equal(alcoholResponse.status, 200);
  const alcohol = await alcoholResponse.text();
  assert.ok(alcohol.indexOf("Alcohol: Fermentation, Distillation and the Major Families") < alcohol.indexOf("Alcoholic Fermentation"));
  assert.ok(alcohol.indexOf("Alcoholic Fermentation") < alcohol.indexOf("Distillation: Concentrating Alcohol and Flavor"));
  assert.ok(alcohol.indexOf("Distillation: Concentrating Alcohol and Flavor") < alcohol.indexOf("Fermented Drink Families"));

  const metabolismResponse = await render("/topic/metabolism-diabetes");
  assert.equal(metabolismResponse.status, 200);
  const metabolism = await metabolismResponse.text();
  assert.ok(metabolism.indexOf("Metabolic Fuel Use") < metabolism.indexOf("From Food to ATP"));
  assert.ok(metabolism.indexOf("From Food to ATP") < metabolism.indexOf("Fat vs Glycogen"));
  assert.ok(metabolism.indexOf("Fat vs Glycogen") < metabolism.indexOf("Fuel by Tissue"));

  const mechanicsResponse = await render("/topic/classical-mechanics");
  assert.equal(mechanicsResponse.status, 200);
  const mechanics = await mechanicsResponse.text();
  assert.ok(mechanics.indexOf("Classical Mechanics: The Map") < mechanics.indexOf("Kinematics"));
  assert.ok(mechanics.indexOf("Kinematics") < mechanics.indexOf("Forces and Newton"));
  assert.ok(mechanics.indexOf("Forces and Newton") < mechanics.indexOf("Work, Energy, and Power"));
  assert.ok(mechanics.indexOf("Work, Energy, and Power") < mechanics.indexOf("Linear Momentum"));

  const cardiovascularResponse = await render("/topic/cardiovascular");
  assert.equal(cardiovascularResponse.status, 200);
  const cardiovascular = await cardiovascularResponse.text();
  assert.ok(cardiovascular.indexOf("Cardiovascular System") < cardiovascular.indexOf("Blood Pressure Explained"));
  assert.ok(cardiovascular.indexOf("Blood Pressure Explained") < cardiovascular.indexOf("Hypertension"));
  assert.ok(cardiovascular.indexOf("Hypertension") < cardiovascular.indexOf("Atherosclerosis"));
  assert.ok(cardiovascular.indexOf("Atherosclerosis") < cardiovascular.indexOf("Myocardial Infarction"));

  const gamesResponse = await render("/topic/history-of-games");
  assert.equal(gamesResponse.status, 200);
  const games = await gamesResponse.text();
  assert.ok(games.indexOf("History of Games") < games.indexOf("Mancala"));
  assert.ok(games.indexOf("Mancala") < games.indexOf("Go: Territory"));
  assert.ok(games.indexOf("Go: Territory") < games.indexOf("Chess"));
  assert.ok(games.indexOf("Chess") < games.indexOf("Whist to Contract Bridge"));

  const kinshipResponse = await render("/topic/kinship-family-tree");
  assert.equal(kinshipResponse.status, 200);
  const kinship = await kinshipResponse.text();
  assert.ok(kinship.indexOf("Cousins and") < kinship.indexOf("Family Relationship Map"));
});

test("server-renders tag landing pages", async () => {
  const response = await render("/tag/insulin");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>insulin \| Gavin&#x27;s Miscellany<\/title>/i);
  assert.match(html, /Biology &amp; Medicine/);
  assert.match(html, /Metabolism &amp; Diabetes/);
  assert.match(html, /Type 1 vs Type 2 Diabetes/);
});

test("unknown entry URLs return not found", async () => {
  const response = await render("/entry/does-not-exist");
  assert.equal(response.status, 404);

  const html = await response.text();
  assert.match(html, /Not Found/);
});

test("server-renders dedicated quiz page", async () => {
  const response = await render("/quiz");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>Quiz Me \| Gavin&#x27;s Miscellany<\/title>/i);
  assert.match(html, /Gavin&#x27;s Miscellany/);
  assert.match(html, /150 entries/);
  assert.match(html, /<button class="header-action header-action-surprise"[^>]*>Surprise Me<\/button><a href="\/quiz" class="header-action header-action-quiz">Quiz Me<\/a>/);
  assert.doesNotMatch(html, /class="header-action[^"]*"[^>]*>Entries</);
  assert.match(html, /All topics/);
  assert.match(html, /By category/);
  assert.match(html, /By topic/);
  assert.match(html, /Related-topic run/);
  assert.match(html, /Preparing quiz/);
  assert.match(html, /Preparing your quiz run/);
  assert.doesNotMatch(html, /This mode does not have quiz prompts yet/);
  assert.match(html, /Quiz coverage - sign in to view readiness/);
  assert.match(html, /choose entries to mark ready to quiz/);
  assert.doesNotMatch(html, /Readiness could not be loaded/);
  assert.doesNotMatch(html, />Due<\/button>/);
  assert.doesNotMatch(html, /Memory tracking/);
  assert.doesNotMatch(html, /typed-answer/);
  assert.doesNotMatch(html, /Reveal answer/);
  assert.doesNotMatch(html, /Open source entry/);
  assert.doesNotMatch(html, /Knew it/);
  assert.doesNotMatch(html, /Didn&#x27;t know it/);
});

test("entry pages render shared header and multiple visuals", async () => {
  const response = await render("/entry/tardigrades-cryptobiosis");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /class="site-title-block"/);
  assert.match(html, /150 entries/);
  assert.match(html, /class="entry-image"/);
  assert.match(html, /class="inline-figure"/);
  assert.match(html, /cryptobiosis-cycle\.svg/);
  assert.match(html, /Cryptobiosis cycle diagram/);
  assert.doesNotMatch(html, /Things I thought were interesting enough not to forget/);
});

test("supplementary YouTube video renders only when declared", async () => {
  const response = await render("/entry/four-stroke-engine");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /class="entry-video"/);
  assert.match(html, /youtube-nocookie\.com\/embed\/ZQvfHyfgBtA/);
  assert.match(html, /title="How a Car Engine Works"/);
  assert.match(html, /Supplementary Animagraffs animation/);
  assert.doesNotMatch(html, /autoplay/);
});


test("public mode renders no review UI and rejects review endpoints", async () => {
  const response = await render("/entry/aristotle");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.doesNotMatch(html, /Review mode/);
  assert.doesNotMatch(html, /pending<\/a>/);
  assert.doesNotMatch(html, /entry-review-cluster/);
  assert.doesNotMatch(html, /memory-ready-cluster/);
  assert.doesNotMatch(html, /Ready to quiz/);
  assert.doesNotMatch(html, /Quiz status unavailable/);

  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `review-public-${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const apiResponse = await worker.fetch(
    new Request("http://localhost/api/review/request", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ entry: "aristotle" }),
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(apiResponse.status, 403);
});

test("public mode gates the review queue behind sign-in", async () => {
  const response = await render("/review-queue");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Review Queue/);
  assert.match(html, /Sign in required/);
});


test("physics and vehicle curricula render complete routes in dependency order", async () => {
  const orders = {
    "electricity-magnetism": ["electric-fields-superposition", "electric-flux-gauss-law", "electric-potential-energy", "current-resistance-power", "dc-circuits-kirchhoff", "capacitors-rc-circuits", "magnetic-fields-forces", "electromagnetic-induction"],
    "thermal-physics": ["temperature-heat-ideal-gases", "first-law-thermodynamic-processes", "entropy-heat-engines"],
    "vehicles-drivetrains": ["vehicle-energy-systems-map", "four-stroke-engine", "transmission-gearing", "differential-gears", "brakes-hydraulics-abs", "steering-geometry", "car-suspension-basics", "engine-cooling-lubrication", "vehicle-starting-charging"],
  };
  for (const [topic, slugs] of Object.entries(orders)) {
    const overview = await render(`/topic/${topic}`);
    assert.equal(overview.status, 200);
    const html = await overview.text();
    let previous = -1;
    for (const slug of slugs) {
      const index = html.lastIndexOf(`href="/entry/${slug}"`);
      assert.ok(index > previous, `${slug} follows curriculum order`);
      previous = index;
      const response = await render(`/entry/${slug}`);
      assert.equal(response.status, 200);
      const entry = await response.text();
      const body = entry.slice(entry.indexOf('class="entry-body"'), entry.indexOf("</article>"));
      assert.doesNotMatch(body, /\\[A-Za-z]/, `${slug} must not leak TeX commands`);
      assert.doesNotMatch(entry, /entry-review-cluster|typed-answer/);
    }
  }
});


test("origins curriculum renders evidence and dated hypotheses without changing public review access", async () => {
  const slugs = ["early-earth-habitability", "prebiotic-chemistry-energy", "rna-replication-origins", "protocells-origin-hypotheses", "earliest-life-evidence"];
  const overview = await (await render("/topic/earth-history-geology")).text();
  let previous = overview.lastIndexOf('href="/entry/radiometric-dating"');
  for (const slug of slugs) {
    const index = overview.lastIndexOf(`href="/entry/${slug}"`);
    assert.ok(index > previous, `${slug} follows prerequisite order`);
    previous = index;
    const response = await render(`/entry/${slug}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    const body = html.slice(html.indexOf('class="entry-body"'), html.indexOf("</article>"));
    assert.doesNotMatch(body, /\\[A-Za-z]/);
    assert.doesNotMatch(html, /entry-review-cluster|typed-answer/);
  }
  const rna = await (await render("/entry/rna-replication-origins")).text();
  assert.match(rna, /separate experiments, not a continuous self-replication cycle/);
  assert.match(rna, /origins-copy-fidelity.svg/);
  const evidence = await (await render("/entry/earliest-life-evidence")).text();
  assert.match(evidence, /CC BY 4.0/);
  assert.match(evidence, /origins-isua-graphite.png/);
});
