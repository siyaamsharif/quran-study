import { useState, useEffect, useRef, useCallback } from "react";

/* ═══ STATIC SURAH LIST — no network needed ═══ */
const SURAHS = [
  {id:1,name:"Al-Fatihah",eng:"The Opening",ayahs:7},
  {id:2,name:"Al-Baqarah",eng:"The Cow",ayahs:286},
  {id:3,name:"Ali 'Imran",eng:"Family of Imran",ayahs:200},
  {id:4,name:"An-Nisa",eng:"The Women",ayahs:176},
  {id:5,name:"Al-Ma'idah",eng:"The Table Spread",ayahs:120},
  {id:6,name:"Al-An'am",eng:"The Cattle",ayahs:165},
  {id:7,name:"Al-A'raf",eng:"The Heights",ayahs:206},
  {id:8,name:"Al-Anfal",eng:"The Spoils of War",ayahs:75},
  {id:9,name:"At-Tawbah",eng:"The Repentance",ayahs:129},
  {id:10,name:"Yunus",eng:"Jonah",ayahs:109},
  {id:11,name:"Hud",eng:"Hud",ayahs:123},
  {id:12,name:"Yusuf",eng:"Joseph",ayahs:111},
  {id:13,name:"Ar-Ra'd",eng:"The Thunder",ayahs:43},
  {id:14,name:"Ibrahim",eng:"Abraham",ayahs:52},
  {id:15,name:"Al-Hijr",eng:"The Rocky Tract",ayahs:99},
  {id:16,name:"An-Nahl",eng:"The Bee",ayahs:128},
  {id:17,name:"Al-Isra",eng:"The Night Journey",ayahs:111},
  {id:18,name:"Al-Kahf",eng:"The Cave",ayahs:110},
  {id:19,name:"Maryam",eng:"Mary",ayahs:98},
  {id:20,name:"Ta-Ha",eng:"Ta-Ha",ayahs:135},
  {id:21,name:"Al-Anbiya",eng:"The Prophets",ayahs:112},
  {id:22,name:"Al-Hajj",eng:"The Pilgrimage",ayahs:78},
  {id:23,name:"Al-Mu'minun",eng:"The Believers",ayahs:118},
  {id:24,name:"An-Nur",eng:"The Light",ayahs:64},
  {id:25,name:"Al-Furqan",eng:"The Criterion",ayahs:77},
  {id:26,name:"Ash-Shu'ara",eng:"The Poets",ayahs:227},
  {id:27,name:"An-Naml",eng:"The Ant",ayahs:93},
  {id:28,name:"Al-Qasas",eng:"The Stories",ayahs:88},
  {id:29,name:"Al-'Ankabut",eng:"The Spider",ayahs:69},
  {id:30,name:"Ar-Rum",eng:"The Romans",ayahs:60},
  {id:31,name:"Luqman",eng:"Luqman",ayahs:34},
  {id:32,name:"As-Sajdah",eng:"The Prostration",ayahs:30},
  {id:33,name:"Al-Ahzab",eng:"The Combined Forces",ayahs:73},
  {id:34,name:"Saba",eng:"Sheba",ayahs:54},
  {id:35,name:"Fatir",eng:"The Originator",ayahs:45},
  {id:36,name:"Ya-Sin",eng:"Ya Sin",ayahs:83},
  {id:37,name:"As-Saffat",eng:"Those Ranges in Ranks",ayahs:182},
  {id:38,name:"Sad",eng:"The Letter Sad",ayahs:88},
  {id:39,name:"Az-Zumar",eng:"The Groups",ayahs:75},
  {id:40,name:"Ghafir",eng:"The Forgiver",ayahs:85},
  {id:41,name:"Fussilat",eng:"Explained in Detail",ayahs:54},
  {id:42,name:"Ash-Shuraa",eng:"The Consultation",ayahs:53},
  {id:43,name:"Az-Zukhruf",eng:"The Gold Adornments",ayahs:89},
  {id:44,name:"Ad-Dukhan",eng:"The Smoke",ayahs:59},
  {id:45,name:"Al-Jathiyah",eng:"The Crouching",ayahs:37},
  {id:46,name:"Al-Ahqaf",eng:"The Wind-Curved Sandhills",ayahs:35},
  {id:47,name:"Muhammad",eng:"Muhammad",ayahs:38},
  {id:48,name:"Al-Fath",eng:"The Victory",ayahs:29},
  {id:49,name:"Al-Hujurat",eng:"The Rooms",ayahs:18},
  {id:50,name:"Qaf",eng:"The Letter Qaf",ayahs:45},
  {id:51,name:"Adh-Dhariyat",eng:"The Winnowing Winds",ayahs:60},
  {id:52,name:"At-Tur",eng:"The Mount",ayahs:49},
  {id:53,name:"An-Najm",eng:"The Star",ayahs:62},
  {id:54,name:"Al-Qamar",eng:"The Moon",ayahs:55},
  {id:55,name:"Ar-Rahman",eng:"The Beneficent",ayahs:78},
  {id:56,name:"Al-Waqi'ah",eng:"The Inevitable",ayahs:96},
  {id:57,name:"Al-Hadid",eng:"The Iron",ayahs:29},
  {id:58,name:"Al-Mujadila",eng:"The Pleading Woman",ayahs:22},
  {id:59,name:"Al-Hashr",eng:"The Exile",ayahs:24},
  {id:60,name:"Al-Mumtahanah",eng:"She that is to be Examined",ayahs:13},
  {id:61,name:"As-Saf",eng:"The Ranks",ayahs:14},
  {id:62,name:"Al-Jumu'ah",eng:"The Congregation",ayahs:11},
  {id:63,name:"Al-Munafiqun",eng:"The Hypocrites",ayahs:11},
  {id:64,name:"At-Taghabun",eng:"The Mutual Disillusion",ayahs:18},
  {id:65,name:"At-Talaq",eng:"The Divorce",ayahs:12},
  {id:66,name:"At-Tahrim",eng:"The Prohibition",ayahs:12},
  {id:67,name:"Al-Mulk",eng:"The Sovereignty",ayahs:30},
  {id:68,name:"Al-Qalam",eng:"The Pen",ayahs:52},
  {id:69,name:"Al-Haqqah",eng:"The Reality",ayahs:52},
  {id:70,name:"Al-Ma'arij",eng:"The Ascending Stairways",ayahs:44},
  {id:71,name:"Nuh",eng:"Noah",ayahs:28},
  {id:72,name:"Al-Jinn",eng:"The Jinn",ayahs:28},
  {id:73,name:"Al-Muzzammil",eng:"The Enshrouded One",ayahs:20},
  {id:74,name:"Al-Muddaththir",eng:"The Cloaked One",ayahs:56},
  {id:75,name:"Al-Qiyamah",eng:"The Resurrection",ayahs:40},
  {id:76,name:"Al-Insan",eng:"The Man",ayahs:31},
  {id:77,name:"Al-Mursalat",eng:"The Emissaries",ayahs:50},
  {id:78,name:"An-Naba",eng:"The Tidings",ayahs:40},
  {id:79,name:"An-Nazi'at",eng:"Those who drag forth",ayahs:46},
  {id:80,name:"'Abasa",eng:"He Frowned",ayahs:42},
  {id:81,name:"At-Takwir",eng:"The Overthrowing",ayahs:29},
  {id:82,name:"Al-Infitar",eng:"The Cleaving",ayahs:19},
  {id:83,name:"Al-Mutaffifin",eng:"The Defrauding",ayahs:36},
  {id:84,name:"Al-Inshiqaq",eng:"The Sundering",ayahs:25},
  {id:85,name:"Al-Buruj",eng:"The Mansions of the Stars",ayahs:22},
  {id:86,name:"At-Tariq",eng:"The Morning Star",ayahs:17},
  {id:87,name:"Al-A'la",eng:"The Most High",ayahs:19},
  {id:88,name:"Al-Ghashiyah",eng:"The Overwhelming",ayahs:26},
  {id:89,name:"Al-Fajr",eng:"The Dawn",ayahs:30},
  {id:90,name:"Al-Balad",eng:"The City",ayahs:20},
  {id:91,name:"Ash-Shams",eng:"The Sun",ayahs:15},
  {id:92,name:"Al-Layl",eng:"The Night",ayahs:21},
  {id:93,name:"Ad-Duhaa",eng:"The Morning Hours",ayahs:11},
  {id:94,name:"Ash-Sharh",eng:"The Relief",ayahs:8},
  {id:95,name:"At-Tin",eng:"The Fig",ayahs:8},
  {id:96,name:"Al-'Alaq",eng:"The Clot",ayahs:19},
  {id:97,name:"Al-Qadr",eng:"The Power",ayahs:5},
  {id:98,name:"Al-Bayyinah",eng:"The Evidence",ayahs:8},
  {id:99,name:"Az-Zalzalah",eng:"The Earthquake",ayahs:8},
  {id:100,name:"Al-'Adiyat",eng:"The Coursers",ayahs:11},
  {id:101,name:"Al-Qari'ah",eng:"The Calamity",ayahs:11},
  {id:102,name:"At-Takathur",eng:"The Rivalry in World Increase",ayahs:8},
  {id:103,name:"Al-'Asr",eng:"The Declining Day",ayahs:3},
  {id:104,name:"Al-Humazah",eng:"The Traducer",ayahs:9},
  {id:105,name:"Al-Fil",eng:"The Elephant",ayahs:5},
  {id:106,name:"Quraysh",eng:"Quraysh",ayahs:4},
  {id:107,name:"Al-Ma'un",eng:"The Small Kindnesses",ayahs:7},
  {id:108,name:"Al-Kawthar",eng:"The Abundance",ayahs:3},
  {id:109,name:"Al-Kafirun",eng:"The Disbelievers",ayahs:6},
  {id:110,name:"An-Nasr",eng:"The Divine Support",ayahs:3},
  {id:111,name:"Al-Masad",eng:"The Palm Fibre",ayahs:5},
  {id:112,name:"Al-Ikhlas",eng:"The Sincerity",ayahs:4},
  {id:113,name:"Al-Falaq",eng:"The Daybreak",ayahs:5},
  {id:114,name:"An-Nas",eng:"Mankind",ayahs:6},
];

const STORAGE_KEY = "quran_study_v2";
const SECTION_TYPES = [
  { id:"background",  label:"Background & Context",           icon:"📖" },
  { id:"wordByWord",  label:"Word by Word & Vocab Bank",      icon:"🔤" },
  { id:"thematic",    label:"Thematic Breakdown",             icon:"🌿" },
  { id:"lecture",     label:"Lecture Notes",                  icon:"🎓" },
  { id:"book",        label:"Book Notes",                     icon:"📚" },
  { id:"connections", label:"Connections to Other Ayaat",     icon:"🔗" },
  { id:"reflections", label:"Reflections",                    icon:"💭" },
  { id:"action",      label:"Action Points",                  icon:"✅" },
];

const TRANSLATIONS = [
  { id:203, name:"Dr. Mustafa Khattab — The Clear Quran" },
  { id:131, name:"Saheeh International" },
  { id:20,  name:"Pickthall" },
  { id:57,  name:"Mufti Taqi Usmani" },
  { id:85,  name:"Hilali & Khan" },
  { id:149, name:"Abdul Haleem" },
];

const TAFSIRS = [
  { id:"en-tafsir-ibn-kathir",     name:"Ibn Kathir (EN)" },
  { id:"en-tafsir-maariful-quran", name:"Ma'ariful Quran (EN)" },
  { id:"ar-tafsir-ibn-kathir",     name:"ابن كثير (AR)" },
  { id:"ar-tafseer-al-qurtubi",    name:"القرطبي (AR)" },
];

/* ═══ THEMES ═══ */
const THEMES = {
  dark: {
    name:"Dark", label:"Dark",
    bg:"#080810", s1:"#10101c", s2:"#16162a", s3:"#1e1e36",
    b1:"#252542", b2:"#35355a",
    gold:"#c9a84c", gold2:"#e8c97a", goldM:"rgba(201,168,76,0.14)",
    text:"#f0ede8", muted:"#8080a8", dim:"#4a4a6a",
    green:"#4caf7d", blue:"#5b8dee", red:"#e05757", purple:"#9b7fe8", teal:"#3eb8b0",
    accent:"#c9a84c", accentText:"#000",
    inputBg:"#1e1e36", inputBorder:"#252542", inputText:"#f0ede8",
  },
  black: {
    name:"Black", label:"Black",
    bg:"#000000", s1:"#0d0d0d", s2:"#141414", s3:"#1c1c1c",
    b1:"#2a2a2a", b2:"#3a3a3a",
    gold:"#d4a843", gold2:"#f0c96a", goldM:"rgba(212,168,67,0.13)",
    text:"#ffffff", muted:"#909090", dim:"#505050",
    green:"#4caf7d", blue:"#5b8dee", red:"#e05757", purple:"#9b7fe8", teal:"#3eb8b0",
    accent:"#d4a843", accentText:"#000",
    inputBg:"#1c1c1c", inputBorder:"#2a2a2a", inputText:"#ffffff",
  },
  cream: {
    name:"Cream", label:"Cream",
    bg:"#f4efe6", s1:"#faf7f1", s2:"#ece6da", s3:"#e2dace",
    b1:"#d2c9bb", b2:"#b8af9f",
    gold:"#b5883a", gold2:"#c9a04a", goldM:"rgba(181,136,58,0.13)",
    text:"#1c1a14", muted:"#5c5848", dim:"#9c9888",
    green:"#1c7a52", blue:"#2a68aa", red:"#c04040", purple:"#6858b0", teal:"#2a8878",
    accent:"#1c7a52", accentText:"#ffffff",
    inputBg:"#ece6da", inputBorder:"#d2c9bb", inputText:"#1c1a14",
  },
  sky: {
    name:"Sky", label:"Sky Blue",
    bg:"#e8f2fc", s1:"#f0f7ff", s2:"#ddeeff", s3:"#cce4f8",
    b1:"#aacce8", b2:"#88b4d8",
    gold:"#b07830", gold2:"#c99040", goldM:"rgba(176,120,48,0.12)",
    text:"#0c1e30", muted:"#3a5a78", dim:"#7090b0",
    green:"#1a8060", blue:"#1a60b0", red:"#c04040", purple:"#6050b8", teal:"#1a9090",
    accent:"#1a60b0", accentText:"#ffffff",
    inputBg:"#ddeeff", inputBorder:"#aacce8", inputText:"#0c1e30",
  },
  sage: {
    name:"Sage", label:"Light Green",
    bg:"#eaf4ee", s1:"#f2faf4", s2:"#daeee0", s3:"#cae4d0",
    b1:"#a8ccb4", b2:"#88b098",
    gold:"#a07828", gold2:"#bc9038", goldM:"rgba(160,120,40,0.12)",
    text:"#0c1e14", muted:"#3a5a44", dim:"#6a9070",
    green:"#1a7040", blue:"#2a60a8", red:"#c04040", purple:"#6058b0", teal:"#1a8878",
    accent:"#1a7040", accentText:"#ffffff",
    inputBg:"#daeee0", inputBorder:"#a8ccb4", inputText:"#0c1e14",
  },
};

const DEFAULT_DATA = { pages:[], references:[], projects:[], tags:[], aiHistory:[], flashcards:[] };

function loadData() {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? { ...DEFAULT_DATA, ...JSON.parse(r) } : DEFAULT_DATA; }
  catch { return DEFAULT_DATA; }
}
function saveData(d) { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); }

function stripHtml(html) {
  const t = document.createElement("div"); t.innerHTML = html;
  return (t.textContent || t.innerText || "").replace(/\s+/g, " ").trim();
}

async function aiCall(prompt, system, maxTokens) {
  const body = {
    model: "claude-sonnet-4-20250514",
    max_tokens: maxTokens || 1000,
    messages: [{ role:"user", content:prompt }],
  };
  if (system) body.system = system;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    // Use /api/claude proxy — keeps API key server-side, no CORS issues
    const r = await fetch("/api/claude", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!r.ok) {
      const err = await r.text();
      throw new Error(`${r.status}: ${err.slice(0, 100)}`);
    }
    const d = await r.json();
    return d.content?.[0]?.text || "";
  } catch(e) {
    clearTimeout(timeout);
    if (e.name === "AbortError") throw new Error("Request timed out after 30s");
    throw e;
  }
}

/* ── Quran JSON cache — loaded once from jsdelivr, free forever ── */
let QURAN_ARABIC = null;   // array of 114 surahs, each an array of ayah strings
let QURAN_EN     = null;   // same shape, English translation

async function loadQuranData() {
  if (!QURAN_ARABIC) {
    const r = await fetch("https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran.json");
    QURAN_ARABIC = await r.json();
  }
  if (!QURAN_EN) {
    const r = await fetch("https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_en.json");
    QURAN_EN = await r.json();
  }
}

async function fetchVerseData(surahNum, ayahStart, ayahEnd) {
  await loadQuranData();

  const sIdx   = parseInt(surahNum) - 1;          // 0-based
  const start  = parseInt(ayahStart) || 1;
  const end    = parseInt(ayahEnd)   || (QURAN_ARABIC[sIdx]?.length ?? start);

  const arabicVerses = QURAN_ARABIC[sIdx] || [];
  const enVerses     = QURAN_EN[sIdx]     || [];

  // quran-json stores ayahs as plain strings in order
  const slice = (arr) => arr.slice(start - 1, end);

  const arabicLines = slice(arabicVerses);
  const enLines     = slice(enVerses);

  if (!arabicLines.length) throw new Error("No verses found — check surah/ayah numbers");

  const arabic      = arabicLines.join("\n\n");
  const translation = enLines.map((t, i) => `(${start + i}) ${t}`).join("\n");

  // No word-by-word in this dataset — user can use Deep Research for that
  return { arabic, translation, words: [] };
}

/* ═══ ROOT ═══ */
export default function App() {
  const [data, setData]                   = useState(loadData);
  const [nav, setNav]                     = useState("dashboard");
  const [activePageId, setActivePageId]   = useState(null);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [themeName, setThemeName]         = useState(() => localStorage.getItem("quran_theme") || "dark");
  const [qa, setQa]                       = useState(false);
  const [qaMsg, setQaMsg]                 = useState("");
  const [qaReply, setQaReply]             = useState("");
  const [qaLoading, setQaLoading]         = useState(false);

  const T = THEMES[themeName] || THEMES.dark;

  useEffect(() => { saveData(data); }, [data]);
  useEffect(() => { localStorage.setItem("quran_theme", themeName); }, [themeName]);
  const upd = useCallback(fn => setData(d => { const n = fn(d); saveData(n); return n; }), []);

  const makeCss = (T) => `
    @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:${T.bg};color:${T.text};font-family:'Crimson Pro',Georgia,serif;font-size:16px}
    ::-webkit-scrollbar{width:4px;height:4px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:${T.b2};border-radius:2px}
    input,textarea,select{font-family:'Crimson Pro',serif;background:${T.inputBg};border:1px solid ${T.inputBorder};color:${T.inputText};border-radius:6px;padding:8px 12px;width:100%;outline:none;transition:border-color .2s;font-size:15px}
    input:focus,textarea:focus,select:focus{border-color:${T.gold}}
    textarea{resize:vertical;min-height:80px;line-height:1.75}
    select option{background:${T.s2};color:${T.text}}
    button{cursor:pointer;font-family:'Crimson Pro',serif;transition:all .15s}
    .ar{font-family:'Amiri',serif;direction:rtl;font-size:1.85em;line-height:2.1;color:${T.gold2};text-align:right}
  `;

  const navItems = [
    { id:"dashboard",  label:"Dashboard",      icon:"◈" },
    { id:"projects",   label:"Projects",       icon:"◰" },
    { id:"notebook",   label:"Notebook",       icon:"◧" },
    { id:"mindmap",    label:"Mind Map",       icon:"◎" },
    { id:"references", label:"References",     icon:"◫" },
    { id:"flashcards", label:"Flashcard Bank", icon:"fc" },
  ];

  async function doQA() {
    if (!qaMsg.trim()) return;
    setQaLoading(true); setQaReply("");
    try {
      const text = await aiCall(
        qaMsg,
        "Expert Islamic studies assistant. Specialize in Quranic tafsir, Arabic linguistics, and classical scholarship (Ibn Kathir, al-Tabari, al-Qurtubi, al-Razi). Be concise and cite scholars where relevant.",
        1000
      );
      setQaReply(text || "No response.");
    } catch(e) { setQaReply("Connection error: " + e.message); }
    finally { setQaLoading(false); }
  }

  return (
    <div style={{ display:"flex", height:"100vh", background:T.bg, overflow:"hidden" }}>
      <style>{makeCss(T)}</style>

      {/* ── Sidebar ── */}
      <div style={{ width:224, background:T.s1, borderRight:`1px solid ${T.b1}`, display:"flex", flexDirection:"column", flexShrink:0 }}>
        {/* Logo */}
        <div style={{ padding:"18px 16px 12px", borderBottom:`1px solid ${T.b1}` }}>
          <div style={{ fontSize:11, letterSpacing:".2em", color:T.gold, fontFamily:"JetBrains Mono", textTransform:"uppercase" }}>القرآن الكريم</div>
          <div style={{ fontSize:17, fontWeight:300, marginTop:4, color:T.text }}>Study Platform</div>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:"10px 8px", overflowY:"auto" }}>
          {navItems.map(item => (
            <button key={item.id}
              onClick={() => { setNav(item.id); if (item.id !== "projects") setActiveProjectId(null); }}
              style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"9px 12px", borderRadius:8, border:"none",
                background:nav===item.id ? T.goldM : "transparent",
                color:nav===item.id ? T.gold : T.muted,
                fontSize:14, fontWeight:nav===item.id?600:400, marginBottom:2, textAlign:"left" }}>
              {item.icon === "fc" ? (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink:0, opacity:.85 }}>
                  <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" fill="none"/>
                  <rect x="4" y="1" width="8" height="2" rx="1" fill="currentColor" opacity=".5"/>
                  <line x1="4" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="4" y1="10" x2="9" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              ) : (
                <span style={{ fontSize:14, opacity:.85 }}>{item.icon}</span>
              )}
              {item.label}
            </button>
          ))}

          {nav==="projects" && data.projects.length > 0 && (
            <div style={{ marginTop:4, paddingLeft:8 }}>
              {data.projects.map(p => (
                <button key={p.id} onClick={() => setActiveProjectId(p.id)}
                  style={{ display:"block", width:"100%", padding:"5px 10px", borderRadius:5, border:"none",
                    background:activeProjectId===p.id ? T.goldM : "transparent",
                    color:activeProjectId===p.id ? T.gold : T.muted, fontSize:12, textAlign:"left",
                    overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                  {p.name}
                </button>
              ))}
            </div>
          )}

          {data.pages.length > 0 && (
            <div style={{ marginTop:16 }}>
              <div style={{ fontSize:10, letterSpacing:".15em", color:T.dim, padding:"0 12px 6px", textTransform:"uppercase", fontFamily:"JetBrains Mono" }}>Recent</div>
              {data.pages.slice(-5).reverse().map(p => (
                <button key={p.id} onClick={() => { setActivePageId(p.id); setNav("notebook"); }}
                  style={{ display:"block", width:"100%", padding:"5px 12px", borderRadius:5, border:"none", background:"transparent", color:T.muted, fontSize:12, textAlign:"left", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                  {p.title || "Untitled"}
                </button>
              ))}
            </div>
          )}
        </nav>

        {/* Settings + Quick Ask */}
        <div style={{ padding:"10px 8px", borderTop:`1px solid ${T.b1}`, display:"flex", flexDirection:"column", gap:6 }}>
          <button onClick={() => { setNav("settings"); setActiveProjectId(null); }}
            style={{ display:"flex", alignItems:"center", gap:8, width:"100%", padding:"8px 12px", borderRadius:8, border:"none",
              background:nav==="settings" ? T.goldM : "transparent",
              color:nav==="settings" ? T.gold : T.muted, fontSize:13, textAlign:"left" }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            Settings
          </button>
          <button onClick={() => setQa(q => !q)}
            style={{ display:"flex", alignItems:"center", gap:8, width:"100%", padding:"9px 12px", borderRadius:8,
              border:`1px solid ${T.gold}`, background:qa?T.goldM:"transparent", color:T.gold, fontSize:13, fontWeight:500 }}>
            <span>✦</span> Quick Ask AI
          </button>
        </div>
      </div>

      {/* ── Main ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        {nav==="dashboard"  && <Dashboard  T={T} data={data} upd={upd} setNav={setNav} setActivePageId={setActivePageId} />}
        {nav==="projects"   && <Projects   T={T} data={data} upd={upd} activeProjectId={activeProjectId} setActiveProjectId={setActiveProjectId} setNav={setNav} setActivePageId={setActivePageId} />}
        {nav==="notebook"   && <Notebook   T={T} data={data} upd={upd} activePageId={activePageId} setActivePageId={setActivePageId} />}
        {nav==="mindmap"    && <MindMap    T={T} data={data} upd={upd} />}
        {nav==="references" && <References T={T} data={data} upd={upd} />}
        {nav==="flashcards" && <FlashcardBank T={T} data={data} upd={upd} />}
        {nav==="settings"   && <Settings   T={T} themeName={themeName} setThemeName={setThemeName} data={data} upd={upd} />}
      </div>

      {/* ── Quick Ask panel ── */}
      {qa && (
        <div style={{ width:340, background:T.s1, borderLeft:`1px solid ${T.b1}`, display:"flex", flexDirection:"column", padding:16 }}>
          <div style={{ fontSize:13, color:T.gold, fontWeight:600, marginBottom:12 }}>✦ Quick Ask AI</div>
          <textarea value={qaMsg} onChange={e=>setQaMsg(e.target.value)} placeholder="Ask anything about Quran, tafsir, Arabic, scholars…" style={{ minHeight:100, marginBottom:8 }} />
          <button onClick={doQA} disabled={qaLoading}
            style={{ padding:"8px", background:T.gold, color:T.accentText, border:"none", borderRadius:6, fontSize:14, fontWeight:600, marginBottom:12 }}>
            {qaLoading?"Thinking…":"Ask"}
          </button>
          {qaReply && <div style={{ flex:1, overflowY:"auto", background:T.s2, borderRadius:8, padding:12, fontSize:14, lineHeight:1.75, whiteSpace:"pre-wrap", color:T.text }}>{qaReply}</div>}
        </div>
      )}
    </div>
  );
}

/* ═══ DASHBOARD ═══ */
function Dashboard({ T, data, upd, setNav, setActivePageId }) {
  const totalS = data.pages.reduce((a,p) => a + SECTION_TYPES.length + (p.customSections?.length||0), 0);
  const doneS  = data.pages.reduce((a,p) => a + (p.completedSections?.length||0), 0);
  const pct = totalS > 0 ? Math.round(doneS/totalS*100) : 0;
  const incomplete = data.pages.filter(p => (p.completedSections?.length||0) < SECTION_TYPES.length + (p.customSections?.length||0));
  const tagCounts = {};
  data.pages.forEach(p => (p.tags||[]).forEach(t => { tagCounts[t]=(tagCounts[t]||0)+1; }));
  const card = { background:T.s1, border:`1px solid ${T.b1}`, borderRadius:12, padding:18 };

  return (
    <div style={{ flex:1, overflowY:"auto", padding:32 }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <div style={{ marginBottom:26 }}>
          <div style={{ fontSize:10, letterSpacing:".2em", color:T.gold, fontFamily:"JetBrains Mono", textTransform:"uppercase", marginBottom:5 }}>Dashboard</div>
          <h1 style={{ fontSize:26, fontWeight:300, color:T.text }}>Study Overview</h1>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:26 }}>
          {[{l:"Pages",v:data.pages.length,c:T.gold},{l:"Progress",v:`${pct}%`,c:T.green},{l:"References",v:data.references.length,c:T.blue},{l:"Projects",v:data.projects.length,c:T.purple}].map(s=>(
            <div key={s.l} style={{...card}}>
              <div style={{ fontSize:11, color:T.muted, marginBottom:5 }}>{s.l}</div>
              <div style={{ fontSize:26, fontWeight:300, color:s.c }}>{s.v}</div>
            </div>
          ))}
        </div>
        {data.pages.length > 0 && (
          <div style={{...card, marginBottom:20}}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ fontSize:13, color:T.muted }}>Overall Completion</span>
              <span style={{ fontSize:13, color:T.gold, fontFamily:"JetBrains Mono" }}>{pct}%</span>
            </div>
            <div style={{ height:5, background:T.s3, borderRadius:3 }}>
              <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${T.gold},${T.gold2})`, borderRadius:3, transition:"width .5s" }} />
            </div>
          </div>
        )}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
          <div style={card}>
            <div style={{ fontSize:12, color:T.gold, fontWeight:600, marginBottom:12 }}>Recent Pages</div>
            {data.pages.length===0 ? <div style={{color:T.dim,fontSize:13}}>No pages yet.</div>
              : data.pages.slice(-6).reverse().map(p=>(
              <div key={p.id} onClick={()=>{setActivePageId(p.id);setNav("notebook");}}
                style={{padding:"7px 0",borderBottom:`1px solid ${T.b1}`,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:14,color:T.text}}>{p.title||"Untitled"}</span>
                <span style={{fontSize:10,color:T.dim,fontFamily:"JetBrains Mono"}}>
                  {Math.round((p.completedSections?.length||0)/Math.max(SECTION_TYPES.length+(p.customSections?.length||0),1)*100)}%
                </span>
              </div>
            ))}
          </div>
          <div style={card}>
            <div style={{ fontSize:12, color:T.gold, fontWeight:600, marginBottom:12 }}>Needs Attention</div>
            {incomplete.length===0 ? <div style={{color:T.dim,fontSize:13}}>All complete!</div>
              : incomplete.slice(0,6).map(p=>{
              const done=p.completedSections?.length||0, tot=SECTION_TYPES.length+(p.customSections?.length||0);
              return (
                <div key={p.id} onClick={()=>{setActivePageId(p.id);setNav("notebook");}} style={{padding:"7px 0",borderBottom:`1px solid ${T.b1}`,cursor:"pointer"}}>
                  <div style={{fontSize:14,color:T.text,marginBottom:4}}>{p.title||"Untitled"}</div>
                  <div style={{height:3,background:T.s3,borderRadius:2}}>
                    <div style={{height:"100%",width:`${Math.round(done/tot*100)}%`,background:T.gold,borderRadius:2}} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={card}>
            <div style={{ fontSize:12, color:T.gold, fontWeight:600, marginBottom:12 }}>Projects</div>
            {data.projects.length===0 ? <div style={{color:T.dim,fontSize:13}}>No projects yet.</div>
              : data.projects.map(proj=>{
              const pp=data.pages.filter(p=>p.projectId===proj.id);
              const done=pp.reduce((a,p)=>a+(p.completedSections?.length||0),0);
              const tot=pp.reduce((a,p)=>a+SECTION_TYPES.length+(p.customSections?.length||0),0);
              return (
                <div key={proj.id} style={{padding:"7px 0",borderBottom:`1px solid ${T.b1}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{fontSize:14,color:T.text}}>{proj.name}</span>
                    <span style={{fontSize:10,color:T.dim,fontFamily:"JetBrains Mono"}}>{pp.length}p · {tot>0?Math.round(done/tot*100):0}%</span>
                  </div>
                  <div style={{height:3,background:T.s3,borderRadius:2}}>
                    <div style={{height:"100%",width:`${tot>0?Math.round(done/tot*100):0}%`,background:T.purple,borderRadius:2}} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={card}>
            <div style={{ fontSize:12, color:T.gold, fontWeight:600, marginBottom:12 }}>Tag Cloud</div>
            {Object.keys(tagCounts).length===0 ? <div style={{color:T.dim,fontSize:13}}>No tags yet.</div>
              : <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
              {Object.entries(tagCounts).map(([tag,count])=>(
                <span key={tag} style={{background:T.goldM,color:T.gold,border:`1px solid ${T.b2}`,borderRadius:20,padding:`3px ${8+count*2}px`,fontSize:11+Math.min(count,4)}}>{tag}</span>
              ))}
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ SHARED PAGE VIEW ═══ */
function PageView({ T, page, data, upd }) {
  const [expanded, setExpanded]         = useState(null);
  const [customName, setCustomName]     = useState("");
  const [deepQ, setDeepQ]               = useState("");
  const [deepLoading, setDeepLoading]   = useState(false);
  const [deepResult, setDeepResult]     = useState("");
  const [tafsirPanel, setTafsirPanel]   = useState(false);
  const [tafsirLoading, setTafsirLoading] = useState(false);
  const [tafsirResult, setTafsirResult] = useState("");
  const [selectedTafsir, setSelectedTafsir] = useState(TAFSIRS[0].id);
  const [flashMode, setFlashMode]       = useState(false);
  const [fcIdx, setFcIdx]               = useState(0);
  const [fcFlipped, setFcFlipped]       = useState(false);

  function updateNote(sid, val) { upd(d=>({...d,pages:d.pages.map(p=>p.id===page.id?{...p,notes:{...p.notes,[sid]:val}}:p)})); }
  function toggleDone(sid) {
    upd(d=>({...d,pages:d.pages.map(p=>{
      if(p.id!==page.id) return p;
      const done=p.completedSections||[];
      return {...p,completedSections:done.includes(sid)?done.filter(s=>s!==sid):[...done,sid]};
    })}));
  }
  function addCustomSec() {
    if(!customName.trim()) return;
    upd(d=>({...d,pages:d.pages.map(p=>p.id===page.id?{...p,customSections:[...(p.customSections||[]),{id:`c_${Date.now()}`,label:customName,icon:"📝",custom:true}]}:p)}));
    setCustomName("");
  }
  function deletePage() { upd(d=>({...d,pages:d.pages.filter(p=>p.id!==page.id)})); }
  async function runDeep() {
    if (!deepQ.trim()) return;
    setDeepLoading(true); setDeepResult("");
    try {
      const text = await aiCall(
        deepQ,
        `Expert Quranic studies and classical tafsir. Context: Surah ${page.surah}, Ayah ${page.ayahStart}${page.ayahEnd?`–${page.ayahEnd}`:""}`,
        1000
      );
      setDeepResult(text || "No response.");
    } catch(e) { setDeepResult("Error: " + e.message); }
    finally { setDeepLoading(false); }
  }
  async function loadTafsir() {
    setTafsirLoading(true); setTafsirResult("");
    try {
      const tafsirName = TAFSIRS.find(t => t.id === selectedTafsir)?.name || "Ibn Kathir";
      const surah = SURAHS.find(s => String(s.id) === String(page.surahNum || page.surah));
      const surahLabel = surah ? `${surah.name} (${surah.eng})` : `Surah ${page.surah}`;
      const text = await aiCall(
        `Provide the ${tafsirName} tafsir commentary for ${surahLabel}, Ayah ${page.ayahStart}. Give a thorough scholarly summary in plain text. No markdown.`,
        "You are an expert in classical Islamic tafsir. Provide accurate scholarly commentary.",
        1200
      );
      setTafsirResult(text || "No tafsir found.");
    } catch(e) { setTafsirResult("Could not fetch: " + e.message); }
    finally { setTafsirLoading(false); }
  }

  const allSecs = [...SECTION_TYPES,...(page.customSections||[])];
  const progress = Math.round((page.completedSections?.length||0)/Math.max(allSecs.length,1)*100);
  const wbw = page.wordByWord||[];
  const flashWords = wbw.filter(w=>w.arabic&&w.meaning);

  return (
    <div style={{ padding:28, position:"relative" }}>
      <div style={{ maxWidth:740, margin:"0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom:22 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div>
              <div style={{ fontSize:10, letterSpacing:".2em", color:T.gold, fontFamily:"JetBrains Mono", textTransform:"uppercase", marginBottom:3 }}>
                {page.surah} · {page.ayahStart}{page.ayahEnd&&page.ayahEnd!==page.ayahStart?`–${page.ayahEnd}`:""}
              </div>
              <h2 style={{ fontSize:22, fontWeight:300, marginBottom:7, color:T.text }}>{page.title}</h2>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                {(page.tags||[]).map(t=>(
                  <span key={t} style={{ fontSize:10, background:T.goldM, color:T.gold, border:`1px solid ${T.b2}`, borderRadius:10, padding:"2px 8px" }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", gap:6, alignItems:"center" }}>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:18, color:T.gold, fontFamily:"JetBrains Mono" }}>{progress}%</div>
                <div style={{ fontSize:10, color:T.dim }}>done</div>
              </div>
              <button onClick={()=>setTafsirPanel(t=>!t)}
                style={{ background:tafsirPanel?T.blue+"33":"transparent", border:`1px solid ${tafsirPanel?T.blue:T.b1}`, color:tafsirPanel?T.blue:T.muted, padding:"4px 9px", borderRadius:5, fontSize:11 }}>
                📖 Tafsir
              </button>
              <button onClick={deletePage} style={{ background:"transparent", border:`1px solid ${T.b1}`, color:T.red, padding:"4px 8px", borderRadius:5, fontSize:11 }}>Delete</button>
            </div>
          </div>
          <div style={{ height:3, background:T.s3, borderRadius:2, marginTop:10 }}>
            <div style={{ height:"100%", width:`${progress}%`, background:`linear-gradient(90deg,${T.gold},${T.gold2})`, borderRadius:2, transition:"width .4s" }} />
          </div>
        </div>

        {/* Arabic + translation */}
        {(page.arabic||page.translation)&&(
          <div style={{ background:T.s1, border:`1px solid ${T.b1}`, borderRadius:12, padding:22, marginBottom:18 }}>
            {page.arabic&&<div className="ar" style={{ marginBottom:14 }}>{page.arabic}</div>}
            {page.translation&&<div style={{ fontSize:15, lineHeight:1.85, color:T.muted, fontStyle:"italic" }}>{page.translation}</div>}
          </div>
        )}

        {/* Sections */}
        {allSecs.map(sec=>{
          const isExp=expanded===sec.id, isDone=(page.completedSections||[]).includes(sec.id);
          const hasContent=(page.notes?.[sec.id]||"").trim().length>0;
          return (
            <div key={sec.id} style={{ background:T.s1, border:`1px solid ${isExp?T.b2:T.b1}`, borderRadius:10, marginBottom:7, overflow:"hidden" }}>
              <div onClick={()=>setExpanded(isExp?null:sec.id)}
                style={{ display:"flex", alignItems:"center", gap:9, padding:"11px 15px", cursor:"pointer", background:isExp?T.s2:"transparent" }}>
                <span style={{ fontSize:13 }}>{sec.icon}</span>
                <span style={{ flex:1, fontSize:14, color:isExp?T.text:T.muted, fontWeight:isExp?500:400 }}>{sec.label}</span>
                {hasContent&&!isDone&&<span style={{ width:5, height:5, borderRadius:"50%", background:T.gold, flexShrink:0 }}/>}
                {isDone&&<span style={{ fontSize:10, color:T.green, fontFamily:"JetBrains Mono" }}>✓</span>}
                <span style={{ fontSize:9, color:T.dim, transform:isExp?"rotate(90deg)":"none", transition:"transform .2s" }}>▶</span>
              </div>
              {isExp&&(
                <div style={{ padding:"0 15px 15px" }}>
                  {sec.id==="wordByWord"&&wbw.length>0&&(
                    <div style={{ marginBottom:12 }}>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                        <div style={{ fontSize:11, color:T.gold, fontFamily:"JetBrains Mono" }}>{wbw.length} words</div>
                        {flashWords.length>0&&(
                          <button onClick={()=>{setFlashMode(true);setFcIdx(0);setFcFlipped(false);}}
                            style={{ padding:"4px 10px", background:T.teal+"22", border:`1px solid ${T.teal}`, color:T.teal, borderRadius:5, fontSize:11 }}>
                            🃏 Flashcards
                          </button>
                        )}
                      </div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:10 }}>
                        {wbw.map((w,i)=>(
                          <div key={i} style={{ background:T.s3, border:`1px solid ${T.b1}`, borderRadius:7, padding:"5px 9px", textAlign:"center", minWidth:65 }}>
                            <div className="ar" style={{ fontSize:"1.1em", marginBottom:2 }}>{w.arabic}</div>
                            <div style={{ fontSize:10, color:T.muted }}>{w.transliteration}</div>
                            <div style={{ fontSize:10, color:T.dim }}>{w.meaning}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <textarea value={page.notes?.[sec.id]||""} onChange={e=>updateNote(sec.id,e.target.value)} placeholder={`${sec.label} notes…`} style={{ minHeight:110 }} />
                  <div style={{ display:"flex", justifyContent:"flex-end", marginTop:7 }}>
                    <button onClick={()=>toggleDone(sec.id)}
                      style={{ padding:"4px 13px", background:isDone?T.green+"22":"transparent", border:`1px solid ${isDone?T.green:T.b2}`, color:isDone?T.green:T.muted, borderRadius:5, fontSize:11 }}>
                      {isDone?"✓ Done":"Mark Done"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div style={{ display:"flex", gap:8, marginBottom:22 }}>
          <input value={customName} onChange={e=>setCustomName(e.target.value)} placeholder="Custom section…" style={{ flex:1 }}
            onKeyDown={e=>e.key==="Enter"&&addCustomSec()} />
          <button onClick={addCustomSec} style={{ padding:"8px 13px", background:T.s3, border:`1px solid ${T.b2}`, color:T.muted, borderRadius:6, fontSize:13, whiteSpace:"nowrap" }}>+ Section</button>
        </div>

        <div style={{ background:T.s1, border:`1px solid ${T.b1}`, borderRadius:12, padding:18 }}>
          <div style={{ fontSize:13, color:T.gold, fontWeight:600, marginBottom:10 }}>✦ Deep Research AI</div>
          <textarea value={deepQ} onChange={e=>setDeepQ(e.target.value)} placeholder="Research something about this ayah…" style={{ minHeight:70, marginBottom:7 }} />
          <button onClick={runDeep} disabled={deepLoading}
            style={{ padding:"7px 18px", background:T.gold, color:T.accentText, border:"none", borderRadius:6, fontSize:14, fontWeight:600, marginBottom:deepResult?14:0 }}>
            {deepLoading?"Researching…":"Deep Research"}
          </button>
          {deepResult&&<div style={{ background:T.s2, borderRadius:8, padding:14, fontSize:14, lineHeight:1.8, whiteSpace:"pre-wrap", borderLeft:`3px solid ${T.gold}`, color:T.text }}>{deepResult}</div>}
        </div>
      </div>

      {/* Tafsir panel */}
      {tafsirPanel&&(
        <div style={{ position:"fixed", top:0, right:0, width:360, height:"100%", background:T.s1, borderLeft:`1px solid ${T.b1}`, display:"flex", flexDirection:"column", padding:18, zIndex:50, overflowY:"auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <div style={{ fontSize:13, color:T.gold, fontWeight:600 }}>📖 Tafsir</div>
            <button onClick={()=>setTafsirPanel(false)} style={{ background:"transparent", border:"none", color:T.dim, fontSize:20 }}>×</button>
          </div>
          <select value={selectedTafsir} onChange={e=>setSelectedTafsir(e.target.value)} style={{ marginBottom:8 }}>
            {TAFSIRS.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <button onClick={loadTafsir} disabled={tafsirLoading}
            style={{ width:"100%", padding:"7px", background:T.blue, border:"none", color:"#fff", borderRadius:6, fontSize:13, fontWeight:600, marginBottom:12 }}>
            {tafsirLoading?"Loading…":"Load Tafsir"}
          </button>
          {tafsirResult&&<div style={{ fontSize:13, lineHeight:1.9, whiteSpace:"pre-wrap", flex:1, overflowY:"auto", color:T.text }}>{tafsirResult}</div>}
        </div>
      )}

      {/* Flashcard modal */}
      {flashMode&&flashWords.length>0&&(
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.82)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200 }}
          onClick={e=>e.target===e.currentTarget&&setFlashMode(false)}>
          <div style={{ background:T.s2, border:`1px solid ${T.b2}`, borderRadius:16, padding:32, width:420, textAlign:"center" }}>
            <div style={{ fontSize:11, color:T.muted, marginBottom:4, fontFamily:"JetBrains Mono" }}>{fcIdx+1} / {flashWords.length}</div>
            <div style={{ background:T.s3, borderRadius:12, padding:"28px 20px", marginBottom:18, cursor:"pointer", minHeight:150, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}
              onClick={()=>setFcFlipped(f=>!f)}>
              {!fcFlipped
                ? <div className="ar" style={{ fontSize:"2.6em" }}>{flashWords[fcIdx].arabic}</div>
                : <><div style={{ fontSize:14, color:T.muted, marginBottom:6, fontStyle:"italic" }}>{flashWords[fcIdx].transliteration}</div>
                   <div style={{ fontSize:22, color:T.text }}>{flashWords[fcIdx].meaning}</div></>
              }
            </div>
            <div style={{ fontSize:11, color:T.dim, marginBottom:16 }}>{fcFlipped?"Tap to flip back":"Tap to reveal"}</div>
            <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
              <button onClick={()=>{setFcIdx(i=>Math.max(0,i-1));setFcFlipped(false);}} style={{ padding:"8px 22px", background:"transparent", border:`1px solid ${T.b2}`, color:T.muted, borderRadius:7, fontSize:14 }}>←</button>
              <button onClick={()=>{setFcIdx(i=>Math.min(flashWords.length-1,i+1));setFcFlipped(false);}} style={{ padding:"8px 22px", background:"transparent", border:`1px solid ${T.b2}`, color:T.muted, borderRadius:7, fontSize:14 }}>→</button>
              <button onClick={()=>setFlashMode(false)} style={{ padding:"8px 16px", background:"transparent", border:`1px solid ${T.b1}`, color:T.red, borderRadius:7, fontSize:13 }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══ PROJECTS ═══ */
function Projects({ T, data, upd, activeProjectId, setActiveProjectId, setNav, setActivePageId }) {
  const [adding, setAdding] = useState(false);
  const [np, setNp] = useState({ name:"", description:"", goal:"" });
  const [innerPageId, setInnerPageId] = useState(null);
  const activeProject = data.projects.find(p=>p.id===activeProjectId);
  const projPages = activeProject ? data.pages.filter(p=>p.projectId===activeProject.id) : [];

  function addProject() {
    if(!np.name.trim()) return;
    upd(d=>({...d,projects:[...d.projects,{...np,id:Date.now().toString(),createdAt:Date.now()}]}));
    setNp({name:"",description:"",goal:""}); setAdding(false);
  }
  function deleteProject(id) { upd(d=>({...d,projects:d.projects.filter(p=>p.id!==id)})); if(activeProjectId===id) setActiveProjectId(null); }

  if (activeProject) {
    return (
      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
        <div style={{ width:240, background:T.s1, borderRight:`1px solid ${T.b1}`, display:"flex", flexDirection:"column" }}>
          <div style={{ padding:"12px 12px 8px" }}>
            <button onClick={()=>{setActiveProjectId(null);setInnerPageId(null);}} style={{ background:"transparent", border:"none", color:T.muted, fontSize:12, marginBottom:10, padding:0 }}>← All Projects</button>
            <div style={{ fontSize:14, color:T.gold, fontWeight:600, marginBottom:2 }}>{activeProject.name}</div>
            {activeProject.goal&&<div style={{ fontSize:11, color:T.dim, marginBottom:10, fontStyle:"italic" }}>{activeProject.goal}</div>}
            <button onClick={()=>setNav("notebook")} style={{ width:"100%", padding:"7px", background:T.goldM, border:`1px solid ${T.gold}`, color:T.gold, borderRadius:6, fontSize:12, fontWeight:600 }}>+ Add Page (via Notebook)</button>
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"0 8px 8px" }}>
            {projPages.length===0&&<div style={{ color:T.dim, fontSize:12, padding:"8px 4px" }}>No pages yet. Assign pages in Notebook.</div>}
            {projPages.map(p=>{
              const done=p.completedSections?.length||0, tot=SECTION_TYPES.length+(p.customSections?.length||0);
              return (
                <div key={p.id} onClick={()=>setInnerPageId(p.id)}
                  style={{ padding:"9px", borderRadius:8, cursor:"pointer", marginBottom:2, background:innerPageId===p.id?T.goldM:"transparent", border:innerPageId===p.id?`1px solid ${T.b2}`:"1px solid transparent" }}>
                  <div style={{ fontSize:13, color:innerPageId===p.id?T.gold:T.text, fontWeight:innerPageId===p.id?600:400, marginBottom:3 }}>{p.title||"Untitled"}</div>
                  <div style={{ fontSize:10, color:T.dim, marginBottom:4, fontFamily:"JetBrains Mono" }}>{p.surah}:{p.ayahStart}</div>
                  <div style={{ height:2, background:T.s3, borderRadius:1 }}>
                    <div style={{ height:"100%", width:`${Math.round(done/Math.max(tot,1)*100)}%`, background:done===tot&&tot>0?T.green:T.gold, borderRadius:1 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto" }}>
          {!projPages.find(p=>p.id===innerPageId)
            ? <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", color:T.dim }}><div style={{ fontSize:36, opacity:.2, marginBottom:12 }}>◧</div><div style={{ fontSize:15 }}>Select a page</div></div>
            : <PageView T={T} page={projPages.find(p=>p.id===innerPageId)} data={data} upd={upd} />
          }
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex:1, overflowY:"auto", padding:32 }}>
      <div style={{ maxWidth:860, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
          <div>
            <div style={{ fontSize:10, letterSpacing:".2em", color:T.gold, fontFamily:"JetBrains Mono", textTransform:"uppercase", marginBottom:4 }}>Projects</div>
            <h2 style={{ fontSize:24, fontWeight:300, color:T.text }}>Study Projects</h2>
          </div>
          <button onClick={()=>setAdding(true)} style={{ padding:"8px 18px", background:T.goldM, border:`1px solid ${T.gold}`, color:T.gold, borderRadius:8, fontSize:14 }}>+ New Project</button>
        </div>
        {adding&&(
          <div style={{ background:T.s1, border:`1px solid ${T.b2}`, borderRadius:12, padding:20, marginBottom:20 }}>
            <input value={np.name} onChange={e=>setNp(p=>({...p,name:e.target.value}))} placeholder="Project name *" style={{ marginBottom:10 }} />
            <textarea value={np.description} onChange={e=>setNp(p=>({...p,description:e.target.value}))} placeholder="Description" style={{ minHeight:55, marginBottom:10 }} />
            <input value={np.goal} onChange={e=>setNp(p=>({...p,goal:e.target.value}))} placeholder="Goal" style={{ marginBottom:10 }} />
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={addProject} style={{ padding:"7px 18px", background:T.gold, color:T.accentText, border:"none", borderRadius:6, fontSize:14, fontWeight:600 }}>Create</button>
              <button onClick={()=>setAdding(false)} style={{ padding:"7px 13px", background:"transparent", border:`1px solid ${T.b1}`, color:T.muted, borderRadius:6, fontSize:13 }}>Cancel</button>
            </div>
          </div>
        )}
        {data.projects.length===0&&!adding&&<div style={{ color:T.dim, fontSize:15, textAlign:"center", padding:48 }}>No projects yet.</div>}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          {data.projects.map(proj=>{
            const pp=data.pages.filter(p=>p.projectId===proj.id);
            const done=pp.reduce((a,p)=>a+(p.completedSections?.length||0),0);
            const tot=pp.reduce((a,p)=>a+SECTION_TYPES.length+(p.customSections?.length||0),0);
            const pct=tot>0?Math.round(done/tot*100):0;
            return (
              <div key={proj.id} onClick={()=>setActiveProjectId(proj.id)}
                style={{ background:T.s1, border:`1px solid ${T.b1}`, borderRadius:14, padding:20, cursor:"pointer" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <div style={{ fontSize:16, fontWeight:500, color:T.text }}>{proj.name}</div>
                  <button onClick={e=>{e.stopPropagation();deleteProject(proj.id);}} style={{ background:"transparent", border:"none", color:T.dim, fontSize:16 }}>×</button>
                </div>
                {proj.description&&<p style={{ fontSize:13, color:T.muted, lineHeight:1.6, marginBottom:8 }}>{proj.description}</p>}
                {proj.goal&&<div style={{ fontSize:12, color:T.gold, marginBottom:10, fontStyle:"italic" }}>Goal: {proj.goal}</div>}
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:T.dim, marginBottom:5 }}>
                  <span>{pp.length} pages</span><span style={{ fontFamily:"JetBrains Mono" }}>{pct}%</span>
                </div>
                <div style={{ height:4, background:T.s3, borderRadius:2 }}>
                  <div style={{ height:"100%", width:`${pct}%`, background:T.purple, borderRadius:2 }} />
                </div>
                <div style={{ marginTop:10, fontSize:12, color:T.gold, opacity:.65 }}>Open project →</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══ NOTEBOOK ═══ */
function Notebook({ T, data, upd, activePageId, setActivePageId }) {
  const [modal, setModal]       = useState(false);
  const [np, setNp]             = useState({ title:"", surahNum:"", surahName:"", ayahStart:"", ayahEnd:"", arabic:"", translation:"", tags:"", projectId:"" });
  const [search, setSearch]     = useState("");
  const [copied, setCopied]     = useState(false);
  const [fetching, setFetching] = useState(false);
  const [fetchMsg, setFetchMsg] = useState("");
  const [fetchErr, setFetchErr] = useState("");
  const [tempWords, setTempWords] = useState([]);

  const page = data.pages.find(p => p.id === activePageId);

  function copyPrompt() {
    if (!np.surahNum) return;
    const surah = SURAHS.find(s => String(s.id) === np.surahNum);
    const start = np.ayahStart || "1";
    const end   = np.ayahEnd   || String(surah?.ayahs ?? start);
    const prompt = `Please give me the following for ${surah?.name} (${surah?.eng}), ayahs ${start}–${end}:\n\n1. Arabic text (Uthmani script), one ayah per line\n2. English translation (Dr. Mustafa Khattab), one ayah per line with verse numbers\n3. Word-by-word: one word per line as: arabic | transliteration | meaning`;
    navigator.clipboard.writeText(prompt).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); });
  }

  async function doFetch() {
    if (!np.surahNum) { setFetchErr("Please select a surah."); return; }
    const surah = SURAHS.find(s => String(s.id) === np.surahNum);
    const start = np.ayahStart || "1";
    const rawEnd = np.ayahEnd || String(surah?.ayahs ?? start);
    const end = Math.min(parseInt(rawEnd), parseInt(start) + 49); // quran.com supports up to 50
    setFetching(true); setFetchErr(""); setFetchMsg("Fetching from quran.com…");
    try {
      const { arabic, translation, words } = await fetchVerseData(np.surahNum, start, end);
      setNp(p => ({ ...p, arabic, translation, ayahStart: String(start), ayahEnd: String(end) }));
      setFetchMsg(`✓ Filled Arabic, translation${words.length > 0 ? `, and ${words.length} word cards` : ""}`);
      setTempWords(words);
      setFetchErr("");
    } catch(e) {
      setFetchErr("Failed: " + e.message + ". You can paste manually below.");
      setFetchMsg("");
    } finally { setFetching(false); }
  }

  function createPage() {
    if (!np.surahNum) return;
    const surah = SURAHS.find(s => String(s.id) === np.surahNum);
    const effectiveStart = np.ayahStart || "1";
    const effectiveEnd   = np.ayahEnd   || String(surah?.ayahs ?? "1");
    const id = Date.now().toString();
    const titleDefault = effectiveStart === effectiveEnd
      ? `${np.surahName} ${effectiveStart}`
      : `${np.surahName} ${effectiveStart}–${effectiveEnd}`;
    const wbwNote = tempWords.length > 0
      ? "Word by Word:\n" + tempWords.map(w => `${w.arabic} — ${w.transliteration} — ${w.meaning}`).join("\n")
      : "";
    const newP = {
      id, title: np.title || titleDefault,
      surah: np.surahName, surahNum: np.surahNum,
      ayahStart: effectiveStart, ayahEnd: effectiveEnd,
      arabic: np.arabic, translation: np.translation,
      wordByWord: tempWords,
      tags: np.tags.split(",").map(t => t.trim()).filter(Boolean),
      projectId: np.projectId || null,
      sections: SECTION_TYPES.map(s => ({ ...s, content: "" })),
      customSections: [], completedSections: [],
      createdAt: Date.now(),
      notes: wbwNote ? { wordByWord: wbwNote } : {},
    };
    upd(d => ({ ...d, pages: [...d.pages, newP] }));
    setActivePageId(id); setModal(false);
    setNp({ title:"", surahNum:"", surahName:"", ayahStart:"", ayahEnd:"", arabic:"", translation:"", tags:"", projectId:"" });
    setTempWords([]); setFetchErr(""); setFetchMsg(""); setCopied(false);
  }

  const filtered = data.pages.filter(p=>!search||(p.title+p.surah+(p.tags||[]).join(" ")).toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
      {/* Page list */}
      <div style={{ width:240, background:T.s1, borderRight:`1px solid ${T.b1}`, display:"flex", flexDirection:"column" }}>
        <div style={{ padding:12 }}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search pages…" style={{ marginBottom:8 }} />
          <button onClick={()=>setModal(true)} style={{ width:"100%", padding:"8px", background:T.goldM, border:`1px solid ${T.gold}`, color:T.gold, borderRadius:6, fontSize:13, fontWeight:600 }}>+ New Page</button>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"0 8px 8px" }}>
          {filtered.length===0&&<div style={{ color:T.dim, fontSize:12, padding:"8px 4px" }}>No pages found</div>}
          {filtered.map(p=>{
            const done=p.completedSections?.length||0, tot=SECTION_TYPES.length+(p.customSections?.length||0);
            return (
              <div key={p.id} onClick={()=>setActivePageId(p.id)}
                style={{ padding:"9px", borderRadius:8, cursor:"pointer", marginBottom:2, background:activePageId===p.id?T.goldM:"transparent", border:activePageId===p.id?`1px solid ${T.b2}`:"1px solid transparent" }}>
                <div style={{ fontSize:13, color:activePageId===p.id?T.gold:T.text, fontWeight:activePageId===p.id?600:400, marginBottom:3 }}>{p.title||"Untitled"}</div>
                <div style={{ fontSize:10, color:T.dim, marginBottom:4, fontFamily:"JetBrains Mono" }}>{p.surah}:{p.ayahStart}</div>
                <div style={{ height:2, background:T.s3, borderRadius:1 }}>
                  <div style={{ height:"100%", width:`${Math.round(done/Math.max(tot,1)*100)}%`, background:done===tot&&tot>0?T.green:T.gold, borderRadius:1 }} />
                </div>
                {(p.tags||[]).length>0&&(
                  <div style={{ display:"flex", flexWrap:"wrap", gap:3, marginTop:5 }}>
                    {(p.tags||[]).slice(0,3).map(t=><span key={t} style={{ fontSize:9, background:T.s3, color:T.muted, borderRadius:3, padding:"1px 5px" }}>{t}</span>)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Page content */}
      <div style={{ flex:1, overflowY:"auto" }}>
        {!page
          ? <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", color:T.dim }}>
              <div style={{ fontSize:38, opacity:.2, marginBottom:14 }}>◧</div>
              <div style={{ fontSize:15, marginBottom:10 }}>Select or create a page</div>
              <button onClick={()=>setModal(true)} style={{ padding:"8px 20px", background:T.goldM, border:`1px solid ${T.gold}`, color:T.gold, borderRadius:6, fontSize:14 }}>Create First Page</button>
            </div>
          : <PageView T={T} page={page} data={data} upd={upd} />
        }
      </div>

      {/* New Page Modal */}
      {modal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.82)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100 }}
          onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div style={{ background:T.s1, border:`1px solid ${T.b2}`, borderRadius:14, padding:26, width:560, maxHeight:"90vh", overflowY:"auto" }}
            onClick={e => e.stopPropagation()}>

            <div style={{ fontSize:17, fontWeight:300, marginBottom:3, color:T.text }}>New Notebook Page</div>
            <div style={{ fontSize:11, color:T.dim, marginBottom:18 }}>Select surah → paste Arabic + translation → create</div>

            {/* Surah + range */}
            <div style={{ display:"grid", gridTemplateColumns:"1.6fr 1fr 1fr", gap:10, marginBottom:10 }}>
              <div>
                <label style={{ fontSize:11, color:T.muted, display:"block", marginBottom:4 }}>Surah *</label>
                <select value={np.surahNum} onChange={e => {
                  const s = SURAHS.find(x => String(x.id) === e.target.value);
                  if (s) setNp(p => ({ ...p, surahNum:String(s.id), surahName:s.name, ayahStart:"", ayahEnd:"" }));
                  else   setNp(p => ({ ...p, surahNum:"", surahName:"" }));
                }}>
                  <option value="">— choose surah —</option>
                  {SURAHS.map(s => <option key={s.id} value={String(s.id)}>{s.id}. {s.name} — {s.eng}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize:11, color:T.muted, display:"block", marginBottom:4 }}>Ayah Start</label>
                <input value={np.ayahStart} onChange={e => setNp(p => ({ ...p, ayahStart:e.target.value }))}
                  placeholder={np.surahNum ? "1 (default)" : "—"} type="number" min="1" disabled={!np.surahNum} />
              </div>
              <div>
                <label style={{ fontSize:11, color:T.muted, display:"block", marginBottom:4 }}>Ayah End</label>
                <input value={np.ayahEnd} onChange={e => setNp(p => ({ ...p, ayahEnd:e.target.value }))}
                  placeholder={np.surahNum ? String(SURAHS.find(s => String(s.id) === np.surahNum)?.ayahs ?? "—") : "—"}
                  type="number" min="1" disabled={!np.surahNum} />
              </div>
            </div>

            {/* Helper bar */}
            {np.surahNum && (() => {
              const s = SURAHS.find(x => String(x.id) === np.surahNum);
              const start = np.ayahStart || "1";
              const end   = np.ayahEnd   || String(s?.ayahs);
              return (
                <div style={{ background:T.s2, borderRadius:8, padding:"12px 14px", marginBottom:10 }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, flexWrap:"wrap", marginBottom: fetchMsg || fetchErr ? 8 : 0 }}>
                    <div style={{ fontSize:12, color:T.muted }}>
                      <span style={{ color:T.text, fontWeight:500 }}>{s?.name}</span>{" "}
                      <span style={{ fontFamily:"JetBrains Mono", fontSize:11 }}>ayahs {start}–{end}</span>
                    </div>
                    <div style={{ display:"flex", gap:7 }}>
                      <button onClick={doFetch} disabled={fetching}
                        style={{ padding:"5px 14px", background:fetching ? T.s3 : T.blue, border:"none", color:fetching ? T.muted : "#fff", borderRadius:5, fontSize:12, fontWeight:600, whiteSpace:"nowrap" }}>
                        {fetching ? "Fetching…" : "⬇ Auto-fill"}
                      </button>
                      <a href={`https://quran.com/${np.surahNum}/${start}`} target="_blank" rel="noopener noreferrer"
                        style={{ padding:"5px 11px", background:"transparent", border:`1px solid ${T.b2}`, color:T.muted, borderRadius:5, fontSize:11, textDecoration:"none", whiteSpace:"nowrap" }}>
                        quran.com ↗
                      </a>
                      <button onClick={copyPrompt}
                        style={{ padding:"5px 11px", background:copied ? T.green+"22" : "transparent", border:`1px solid ${copied ? T.green : T.b2}`, color:copied ? T.green : T.muted, borderRadius:5, fontSize:11, whiteSpace:"nowrap" }}>
                        {copied ? "✓ Copied!" : "Copy prompt"}
                      </button>
                    </div>
                  </div>
                  {fetchMsg && <div style={{ fontSize:12, color:T.green }}>{fetchMsg}</div>}
                  {fetchErr && <div style={{ fontSize:12, color:T.red, marginTop:fetchMsg?4:0 }}>{fetchErr}</div>}
                </div>
              );
            })()}

            {!np.surahNum && (
              <div style={{ background:T.s2, borderRadius:8, padding:"10px 14px", marginBottom:14, fontSize:12, color:T.muted, lineHeight:1.7 }}>
                Pick a surah, then paste Arabic + translation below.{" "}
                Use <strong style={{ color:T.text }}>quran.com ↗</strong> to get the text, or{" "}
                <strong style={{ color:T.text }}>Copy Claude prompt</strong> — paste it in a new Claude message, copy the response back here.
              </div>
            )}

            {/* Arabic paste box */}
            <div style={{ marginBottom:12 }}>
              <label style={{ fontSize:11, color:T.muted, display:"block", marginBottom:4 }}>
                Arabic Text {np.arabic && <span style={{ color:T.green }}>✓</span>}
              </label>
              <textarea value={np.arabic} onChange={e => setNp(p => ({ ...p, arabic:e.target.value }))}
                placeholder="Paste Arabic here…"
                style={{ fontFamily:"Amiri", fontSize:"1.3em", direction:"rtl", minHeight:80, lineHeight:2.1 }} />
            </div>

            {/* Translation paste box */}
            <div style={{ marginBottom:14 }}>
              <label style={{ fontSize:11, color:T.muted, display:"block", marginBottom:4 }}>
                Translation {np.translation && <span style={{ color:T.green }}>✓</span>}
              </label>
              <textarea value={np.translation} onChange={e => setNp(p => ({ ...p, translation:e.target.value }))}
                placeholder="Paste English translation here…"
                style={{ minHeight:60 }} />
            </div>

            {/* Title + Tags */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
              <div>
                <label style={{ fontSize:11, color:T.muted, display:"block", marginBottom:4 }}>Page Title</label>
                <input value={np.title} onChange={e => setNp(p => ({ ...p, title:e.target.value }))}
                  placeholder={np.surahName ? `${np.surahName} ${np.ayahStart || "1"}` : "e.g. Ayat al-Kursi"} />
              </div>
              <div>
                <label style={{ fontSize:11, color:T.muted, display:"block", marginBottom:4 }}>Tags</label>
                <input value={np.tags} onChange={e => setNp(p => ({ ...p, tags:e.target.value }))} placeholder="tawhid, makki…" />
              </div>
            </div>

            <div style={{ marginBottom:18 }}>
              <label style={{ fontSize:11, color:T.muted, display:"block", marginBottom:4 }}>Project</label>
              <select value={np.projectId} onChange={e => setNp(p => ({ ...p, projectId:e.target.value }))}>
                <option value="">No project</option>
                {data.projects.map(proj => <option key={proj.id} value={proj.id}>{proj.name}</option>)}
              </select>
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <button onClick={createPage} disabled={!np.surahNum}
                style={{ flex:1, padding:"10px", background:np.surahNum ? T.gold : T.s3, color:np.surahNum ? T.accentText : T.dim, border:"none", borderRadius:8, fontSize:15, fontWeight:600 }}>
                Create Page
              </button>
              <button onClick={() => { setModal(false); setNp({ title:"", surahNum:"", surahName:"", ayahStart:"", ayahEnd:"", arabic:"", translation:"", tags:"", projectId:"" }); setCopied(false); }}
                style={{ padding:"10px 18px", background:"transparent", border:`1px solid ${T.b1}`, color:T.muted, borderRadius:8, fontSize:14 }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══ MIND MAP ═══ */
function MindMap({ T, data }) {
  const [nodes, setNodes] = useState(()=>{ try{return JSON.parse(localStorage.getItem("quran_mindmap")||"[]")}catch{return []} });
  const [pan, setPan] = useState({x:0,y:0}), [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(null), [panning, setPanning] = useState(false);
  const [editingNode, setEditingNode] = useState(null), [newLabel, setNewLabel] = useState("");
  const canvasRef = useRef(null);

  useEffect(()=>{ localStorage.setItem("quran_mindmap",JSON.stringify(nodes)); },[nodes]);
  useEffect(()=>{
    const ex=new Set(nodes.map(n=>n.id));
    const add=data.pages.filter(p=>!ex.has(`page_${p.id}`)).map((p,i)=>({id:`page_${p.id}`,label:p.title||`${p.surah}:${p.ayahStart}`,x:200+(i%4)*200,y:100+Math.floor(i/4)*130,type:"page"}));
    if(add.length) setNodes(n=>[...n,...add]);
  },[data.pages.length]);

  function addNode(){ if(!newLabel.trim()) return; setNodes(n=>[...n,{id:Date.now().toString(),label:newLabel,x:300+Math.random()*200,y:200+Math.random()*150,type:"manual"}]); setNewLabel(""); }

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <div style={{ padding:"10px 18px", background:T.s1, borderBottom:`1px solid ${T.b1}`, display:"flex", gap:8, alignItems:"center" }}>
        <input value={newLabel} onChange={e=>setNewLabel(e.target.value)} placeholder="New node…" style={{ width:200 }} onKeyDown={e=>e.key==="Enter"&&addNode()} />
        <button onClick={addNode} style={{ padding:"7px 13px", background:T.goldM, border:`1px solid ${T.gold}`, color:T.gold, borderRadius:6, fontSize:12 }}>+ Node</button>
        <div style={{ marginLeft:"auto", display:"flex", gap:6, alignItems:"center" }}>
          <button onClick={()=>setZoom(z=>Math.min(3,z+.1))} style={{ background:T.s3, border:`1px solid ${T.b1}`, color:T.text, padding:"4px 9px", borderRadius:4, fontSize:13 }}>+</button>
          <span style={{ fontSize:11, color:T.muted, fontFamily:"JetBrains Mono", minWidth:38, textAlign:"center" }}>{Math.round(zoom*100)}%</span>
          <button onClick={()=>setZoom(z=>Math.max(.2,z-.1))} style={{ background:T.s3, border:`1px solid ${T.b1}`, color:T.text, padding:"4px 9px", borderRadius:4, fontSize:13 }}>−</button>
          <button onClick={()=>{setPan({x:0,y:0});setZoom(1);}} style={{ background:T.s3, border:`1px solid ${T.b1}`, color:T.muted, padding:"4px 9px", borderRadius:4, fontSize:10 }}>Reset</button>
        </div>
      </div>
      <div ref={canvasRef} style={{ flex:1, overflow:"hidden", cursor:panning?"grabbing":"grab", position:"relative", background:T.bg }}
        onMouseDown={e=>{if(e.target===canvasRef.current||e.target.tagName==="svg")setPanning(true);}}
        onMouseMove={e=>{if(dragging)setNodes(ns=>ns.map(n=>n.id===dragging?{...n,x:n.x+e.movementX/zoom,y:n.y+e.movementY/zoom}:n));else if(panning)setPan(p=>({x:p.x+e.movementX,y:p.y+e.movementY}));}}
        onMouseUp={()=>{setDragging(null);setPanning(false);}}
        onWheel={e=>{e.preventDefault();setZoom(z=>Math.max(.2,Math.min(3,z-e.deltaY*.001)));}}
      >
        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
          <defs><pattern id="g" width={40*zoom} height={40*zoom} patternUnits="userSpaceOnUse" x={pan.x%(40*zoom)} y={pan.y%(40*zoom)}><circle cx="1" cy="1" r=".6" fill={T.b1}/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#g)"/>
        </svg>
        <div style={{ transform:`translate(${pan.x}px,${pan.y}px) scale(${zoom})`, transformOrigin:"0 0", position:"absolute" }}>
          {nodes.map(node=>(
            <div key={node.id} style={{ position:"absolute", left:node.x, top:node.y, transform:"translate(-50%,-50%)", background:node.type==="page"?T.goldM:T.s2, border:`1.5px solid ${node.type==="page"?T.gold:T.b2}`, borderRadius:10, padding:"7px 13px", cursor:"grab", userSelect:"none", minWidth:90, textAlign:"center" }}
              onMouseDown={e=>{e.stopPropagation();setDragging(node.id);}} onDoubleClick={()=>setEditingNode(node.id)}>
              {editingNode===node.id
                ? <input defaultValue={node.label} autoFocus style={{ background:"transparent", border:"none", color:T.text, fontSize:12, width:110, textAlign:"center" }} onBlur={e=>{setNodes(ns=>ns.map(n=>n.id===node.id?{...n,label:e.target.value}:n));setEditingNode(null);}} onKeyDown={e=>e.key==="Enter"&&e.target.blur()} />
                : <span style={{ fontSize:12, color:node.type==="page"?T.gold:T.text }}>{node.label}</span>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══ REFERENCES ═══ */
function References({ T, data, upd }) {
  const [adding, setAdding] = useState(false);
  const [nr, setNr] = useState({title:"",type:"link",url:"",author:"",notes:""});
  function addRef(){ if(!nr.title.trim()) return; upd(d=>({...d,references:[...d.references,{...nr,id:Date.now().toString(),addedAt:Date.now()}]})); setNr({title:"",type:"link",url:"",author:"",notes:""}); setAdding(false); }
  function deleteRef(id){ upd(d=>({...d,references:d.references.filter(r=>r.id!==id)})); }
  const icons={link:"🔗",pdf:"📄",book:"📚",lecture:"🎓"};
  const grouped={};
  data.references.forEach(r=>{ (grouped[r.type]=grouped[r.type]||[]).push(r); });
  return (
    <div style={{ flex:1, overflowY:"auto", padding:32 }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
          <div>
            <div style={{ fontSize:10, letterSpacing:".2em", color:T.gold, fontFamily:"JetBrains Mono", textTransform:"uppercase", marginBottom:4 }}>References</div>
            <h2 style={{ fontSize:24, fontWeight:300, color:T.text }}>Your Library</h2>
          </div>
          <button onClick={()=>setAdding(true)} style={{ padding:"8px 18px", background:T.goldM, border:`1px solid ${T.gold}`, color:T.gold, borderRadius:8, fontSize:14 }}>+ Add Reference</button>
        </div>
        {adding&&(
          <div style={{ background:T.s1, border:`1px solid ${T.b2}`, borderRadius:12, padding:20, marginBottom:20 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
              <input value={nr.title} onChange={e=>setNr(r=>({...r,title:e.target.value}))} placeholder="Title *" />
              <select value={nr.type} onChange={e=>setNr(r=>({...r,type:e.target.value}))}><option value="link">Link</option><option value="pdf">PDF</option><option value="book">Book</option><option value="lecture">Lecture</option></select>
              <input value={nr.url} onChange={e=>setNr(r=>({...r,url:e.target.value}))} placeholder="URL" />
              <input value={nr.author} onChange={e=>setNr(r=>({...r,author:e.target.value}))} placeholder="Author / Scholar" />
            </div>
            <textarea value={nr.notes} onChange={e=>setNr(r=>({...r,notes:e.target.value}))} placeholder="Notes…" style={{ minHeight:55, marginBottom:10 }} />
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={addRef} style={{ padding:"7px 18px", background:T.gold, color:T.accentText, border:"none", borderRadius:6, fontSize:14, fontWeight:600 }}>Save</button>
              <button onClick={()=>setAdding(false)} style={{ padding:"7px 13px", background:"transparent", border:`1px solid ${T.b1}`, color:T.muted, borderRadius:6, fontSize:13 }}>Cancel</button>
            </div>
          </div>
        )}
        {data.references.length===0&&!adding&&<div style={{ color:T.dim, fontSize:15, textAlign:"center", padding:48 }}>No references yet.</div>}
        {["link","pdf","book","lecture"].map(type=>{
          if(!grouped[type]?.length) return null;
          return (
            <div key={type} style={{ marginBottom:22 }}>
              <div style={{ fontSize:11, letterSpacing:".1em", color:T.dim, textTransform:"uppercase", marginBottom:8, fontFamily:"JetBrains Mono" }}>{icons[type]} {type}s</div>
              {grouped[type].map(ref=>(
                <div key={ref.id} style={{ background:T.s1, border:`1px solid ${T.b1}`, borderRadius:10, padding:"13px 15px", marginBottom:7, display:"flex", gap:12, alignItems:"flex-start" }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", gap:8, marginBottom:3 }}>
                      <span style={{ fontSize:15, fontWeight:500, color:T.text }}>{ref.title}</span>
                      {ref.author&&<span style={{ fontSize:12, color:T.dim }}>— {ref.author}</span>}
                    </div>
                    {ref.url&&<a href={ref.url} target="_blank" rel="noopener noreferrer" style={{ fontSize:12, color:T.blue, display:"block", marginBottom:3, wordBreak:"break-all" }}>{ref.url}</a>}
                    {ref.notes&&<p style={{ fontSize:13, color:T.muted, lineHeight:1.6 }}>{ref.notes}</p>}
                  </div>
                  <button onClick={()=>deleteRef(ref.id)} style={{ background:"transparent", border:"none", color:T.dim, fontSize:16 }}>×</button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══ FLASHCARD BANK ═══ */
function FlashcardBank({ T, data, upd }) {
  const allCards = data.pages.flatMap(page=>(page.wordByWord||[]).filter(w=>w.arabic&&w.meaning).map(w=>({...w,pageId:page.id,pageTitle:page.title||`${page.surah}:${page.ayahStart}`,surah:page.surah})));
  const manualCards = data.flashcards||[];
  const combined = [...allCards,...manualCards];
  const [filterSurah, setFilterSurah] = useState("all");
  const [studyMode, setStudyMode]     = useState(false);
  const [fcIdx, setFcIdx]             = useState(0);
  const [fcFlipped, setFcFlipped]     = useState(false);
  const [known, setKnown]             = useState(new Set());
  const [review, setReview]           = useState(new Set());
  const [showAdd, setShowAdd]         = useState(false);
  const [mf, setMf]                   = useState({arabic:"",transliteration:"",meaning:"",tag:""});

  const surahs = [...new Set(combined.map(c=>c.surah).filter(Boolean))];
  const filtered = filterSurah==="all" ? combined : combined.filter(c=>c.surah===filterSurah);
  const sessionCards = studyMode ? filtered.filter((_,i)=>!known.has(i)) : [];
  const cur = sessionCards[fcIdx % Math.max(sessionCards.length,1)];

  function markKnown(){ const gi=filtered.indexOf(cur); setKnown(s=>new Set([...s,gi])); setFcFlipped(false); if(fcIdx>=sessionCards.length-1) setFcIdx(0); }
  function markReview(){ const gi=filtered.indexOf(cur); setReview(s=>new Set([...s,gi])); setFcFlipped(false); setFcIdx(i=>Math.min(i+1,sessionCards.length-1)); }
  function addManual(){ if(!mf.arabic.trim()||!mf.meaning.trim()) return; upd(d=>({...d,flashcards:[...(d.flashcards||[]),{...mf,id:Date.now().toString(),pageTitle:"Manual",surah:mf.tag||"Custom"}]})); setMf({arabic:"",transliteration:"",meaning:"",tag:""}); setShowAdd(false); }
  function deleteManual(id){ upd(d=>({...d,flashcards:(d.flashcards||[]).filter(c=>c.id!==id)})); }

  if(studyMode&&filtered.length>0){
    const remaining=sessionCards.length;
    return (
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, background:T.bg }}>
        <div style={{ width:"100%", maxWidth:520, marginBottom:24 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <button onClick={()=>{setStudyMode(false);setFcIdx(0);setFcFlipped(false);setKnown(new Set());setReview(new Set());}} style={{ background:"transparent", border:"none", color:T.muted, fontSize:13 }}>← Back to Bank</button>
            <div style={{ display:"flex", gap:12, fontSize:12, fontFamily:"JetBrains Mono" }}>
              <span style={{ color:T.green }}>✓ {known.size}</span>
              <span style={{ color:T.gold }}>↺ {review.size}</span>
              <span style={{ color:T.muted }}>{remaining} left</span>
            </div>
          </div>
          <div style={{ height:4, background:T.s3, borderRadius:2 }}>
            <div style={{ height:"100%", width:`${filtered.length>0?Math.round(known.size/filtered.length*100):0}%`, background:T.green, borderRadius:2, transition:"width .3s" }} />
          </div>
        </div>
        {remaining===0 ? (
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🎉</div>
            <div style={{ fontSize:22, fontWeight:300, color:T.text, marginBottom:8 }}>Session complete!</div>
            <div style={{ fontSize:14, color:T.muted, marginBottom:24 }}>All {known.size} words marked known.</div>
            <button onClick={()=>{setStudyMode(false);setKnown(new Set());setReview(new Set());setFcIdx(0);}} style={{ padding:"10px 28px", background:T.gold, color:T.accentText, border:"none", borderRadius:8, fontSize:15, fontWeight:600 }}>Back to Bank</button>
          </div>
        ) : (
          <div style={{ width:"100%", maxWidth:520 }}>
            <div style={{ fontSize:11, color:T.muted, textAlign:"center", marginBottom:10, fontFamily:"JetBrains Mono" }}>{cur?.pageTitle} · {fcIdx+1} of {remaining}</div>
            <div onClick={()=>setFcFlipped(f=>!f)} style={{ background:T.s2, border:`1px solid ${T.b2}`, borderRadius:16, padding:"40px 32px", minHeight:200, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", cursor:"pointer", textAlign:"center", marginBottom:20 }}>
              {!fcFlipped
                ? <><div className="ar" style={{ fontSize:"3em" }}>{cur?.arabic}</div><div style={{ fontSize:12, color:T.dim, marginTop:8 }}>Tap to reveal</div></>
                : <><div className="ar" style={{ fontSize:"2em", marginBottom:10 }}>{cur?.arabic}</div><div style={{ fontSize:16, color:T.muted, fontStyle:"italic", marginBottom:6 }}>{cur?.transliteration}</div><div style={{ fontSize:22, color:T.text }}>{cur?.meaning}</div></>
              }
            </div>
            {fcFlipped&&(
              <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:16 }}>
                <button onClick={markKnown} style={{ flex:1, padding:"11px", background:T.green+"22", border:`1px solid ${T.green}`, color:T.green, borderRadius:8, fontSize:15, fontWeight:600 }}>✓ Got it</button>
                <button onClick={markReview} style={{ flex:1, padding:"11px", background:T.gold+"22", border:`1px solid ${T.gold}`, color:T.gold, borderRadius:8, fontSize:15, fontWeight:600 }}>↺ Review again</button>
              </div>
            )}
            <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
              <button onClick={()=>{setFcFlipped(false);setFcIdx(i=>Math.max(0,i-1));}} style={{ padding:"8px 20px", background:"transparent", border:`1px solid ${T.b2}`, color:T.muted, borderRadius:7, fontSize:14 }}>←</button>
              <button onClick={()=>{setFcFlipped(false);setFcIdx(i=>Math.min(sessionCards.length-1,i+1));}} style={{ padding:"8px 20px", background:"transparent", border:`1px solid ${T.b2}`, color:T.muted, borderRadius:7, fontSize:14 }}>→</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ flex:1, overflowY:"auto", padding:32 }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
          <div>
            <div style={{ fontSize:10, letterSpacing:".2em", color:T.gold, fontFamily:"JetBrains Mono", textTransform:"uppercase", marginBottom:4 }}>Flashcard Bank</div>
            <h2 style={{ fontSize:24, fontWeight:300, color:T.text }}>All Vocabulary</h2>
            <div style={{ fontSize:13, color:T.muted }}>{combined.length} words across {data.pages.length} pages</div>
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <button onClick={()=>setShowAdd(true)} style={{ padding:"8px 14px", background:"transparent", border:`1px solid ${T.b2}`, color:T.muted, borderRadius:7, fontSize:13 }}>+ Add Card</button>
            {filtered.length>0&&<button onClick={()=>{setStudyMode(true);setFcIdx(0);setFcFlipped(false);setKnown(new Set());setReview(new Set());}} style={{ padding:"8px 18px", background:T.gold, color:T.accentText, border:"none", borderRadius:8, fontSize:14, fontWeight:600 }}>Study ({filtered.length})</button>}
          </div>
        </div>
        {surahs.length>1&&(
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:20 }}>
            {["all",...surahs].map(s=>(
              <button key={s} onClick={()=>setFilterSurah(s)} style={{ padding:"4px 12px", borderRadius:20, border:`1px solid ${filterSurah===s?T.gold:T.b2}`, background:filterSurah===s?T.goldM:"transparent", color:filterSurah===s?T.gold:T.muted, fontSize:12 }}>
                {s==="all"?"All surahs":s}
              </button>
            ))}
          </div>
        )}
        {showAdd&&(
          <div style={{ background:T.s1, border:`1px solid ${T.b2}`, borderRadius:12, padding:20, marginBottom:24 }}>
            <div style={{ fontSize:13, color:T.gold, fontWeight:600, marginBottom:12 }}>Add Custom Flashcard</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
              <div><label style={{ fontSize:11, color:T.muted, display:"block", marginBottom:4 }}>Arabic *</label><input value={mf.arabic} onChange={e=>setMf(f=>({...f,arabic:e.target.value}))} placeholder="e.g. الرَّحِيمُ" style={{ fontFamily:"Amiri", fontSize:"1.2em", direction:"rtl" }} /></div>
              <div><label style={{ fontSize:11, color:T.muted, display:"block", marginBottom:4 }}>Meaning *</label><input value={mf.meaning} onChange={e=>setMf(f=>({...f,meaning:e.target.value}))} placeholder="e.g. the Most Merciful" /></div>
              <div><label style={{ fontSize:11, color:T.muted, display:"block", marginBottom:4 }}>Transliteration</label><input value={mf.transliteration} onChange={e=>setMf(f=>({...f,transliteration:e.target.value}))} placeholder="e.g. al-Raḥīm" /></div>
              <div><label style={{ fontSize:11, color:T.muted, display:"block", marginBottom:4 }}>Tag / Group</label><input value={mf.tag} onChange={e=>setMf(f=>({...f,tag:e.target.value}))} placeholder="e.g. Names of Allah" /></div>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={addManual} style={{ padding:"7px 18px", background:T.gold, color:T.accentText, border:"none", borderRadius:6, fontSize:14, fontWeight:600 }}>Save Card</button>
              <button onClick={()=>setShowAdd(false)} style={{ padding:"7px 13px", background:"transparent", border:`1px solid ${T.b1}`, color:T.muted, borderRadius:6, fontSize:13 }}>Cancel</button>
            </div>
          </div>
        )}
        {combined.length===0&&(
          <div style={{ textAlign:"center", padding:60, color:T.dim }}>
            <div style={{ fontSize:36, marginBottom:12, opacity:.3 }}>🃏</div>
            <div style={{ fontSize:15, marginBottom:6, color:T.muted }}>No flashcards yet</div>
            <div style={{ fontSize:13 }}>Create notebook pages and fetch from quran.com — words appear here automatically.</div>
          </div>
        )}
        {data.pages.filter(page=>(page.wordByWord||[]).length>0).map(page=>{
          const words=(page.wordByWord||[]).filter(w=>w.arabic&&w.meaning);
          if(filterSurah!=="all"&&page.surah!==filterSurah) return null;
          if(!words.length) return null;
          return (
            <div key={page.id} style={{ marginBottom:28 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <div style={{ fontSize:13, color:T.text, fontWeight:500 }}>{page.title}</div>
                <div style={{ fontSize:11, color:T.dim, fontFamily:"JetBrains Mono" }}>{page.surah}:{page.ayahStart} · {words.length} words</div>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {words.map((w,i)=>(
                  <div key={i} style={{ background:T.s1, border:`1px solid ${T.b1}`, borderRadius:10, padding:"10px 14px", textAlign:"center", minWidth:80 }}>
                    <div className="ar" style={{ fontSize:"1.3em", marginBottom:4 }}>{w.arabic}</div>
                    {w.transliteration&&<div style={{ fontSize:10, color:T.muted, marginBottom:2 }}>{w.transliteration}</div>}
                    <div style={{ fontSize:11, color:T.dim }}>{w.meaning}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {manualCards.length>0&&(filterSurah==="all"||filterSurah==="Custom")&&(
          <div style={{ marginBottom:28 }}>
            <div style={{ fontSize:13, color:T.text, fontWeight:500, marginBottom:10 }}>Custom Cards</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {manualCards.map(w=>(
                <div key={w.id} style={{ background:T.s1, border:`1px solid ${T.b1}`, borderRadius:10, padding:"10px 14px", textAlign:"center", minWidth:80, position:"relative" }}>
                  <button onClick={()=>deleteManual(w.id)} style={{ position:"absolute", top:4, right:6, background:"transparent", border:"none", color:T.dim, fontSize:12 }}>×</button>
                  <div className="ar" style={{ fontSize:"1.3em", marginBottom:4 }}>{w.arabic}</div>
                  {w.transliteration&&<div style={{ fontSize:10, color:T.muted, marginBottom:2 }}>{w.transliteration}</div>}
                  <div style={{ fontSize:11, color:T.dim }}>{w.meaning}</div>
                  {w.tag&&<div style={{ fontSize:9, color:T.gold, marginTop:3 }}>{w.tag}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══ SETTINGS ═══ */
const THEME_PREVIEWS = {
  dark:  { bg:"#080810", s1:"#10101c", gold:"#c9a84c", text:"#f0ede8" },
  black: { bg:"#000000", s1:"#0d0d0d", gold:"#d4a843", text:"#ffffff" },
  cream: { bg:"#f4efe6", s1:"#faf7f1", gold:"#b5883a", text:"#1c1a14" },
  sky:   { bg:"#e8f2fc", s1:"#f0f7ff", gold:"#b07830", text:"#0c1e30" },
  sage:  { bg:"#eaf4ee", s1:"#f2faf4", gold:"#a07828", text:"#0c1e14" },
};

function Settings({ T, themeName, setThemeName, data, upd }) {
  const stats = {
    pages: data.pages.length,
    projects: data.projects.length,
    refs: data.references.length,
    words: data.pages.reduce((a,p) => a + (p.wordByWord?.length||0), 0),
    cards: (data.flashcards||[]).length,
    notes: data.pages.reduce((a,p) => a + Object.values(p.notes||{}).filter(v=>v?.trim()).length, 0),
  };

  function exportData() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type:"application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download="quran-study-backup.json"; a.click();
    URL.revokeObjectURL(url);
  }

  function importData(e) {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try { const parsed = JSON.parse(ev.target.result); upd(() => ({ ...parsed })); alert("Data imported successfully."); }
      catch { alert("Invalid file. Please use a backup exported from this app."); }
    };
    reader.readAsText(file);
  }

  function clearAll() {
    if (window.confirm("Delete ALL data? This cannot be undone.")) {
      upd(() => ({ pages:[], references:[], projects:[], tags:[], aiHistory:[], flashcards:[] }));
    }
  }

  const row = { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:`1px solid ${T.b1}` };

  return (
    <div style={{ flex:1, overflowY:"auto", padding:36 }}>
      <div style={{ maxWidth:680, margin:"0 auto" }}>
        <div style={{ marginBottom:32 }}>
          <div style={{ fontSize:10, letterSpacing:".2em", color:T.gold, fontFamily:"JetBrains Mono", textTransform:"uppercase", marginBottom:5 }}>Settings</div>
          <h1 style={{ fontSize:26, fontWeight:300, color:T.text }}>Preferences</h1>
        </div>

        <section style={{ marginBottom:36 }}>
          <div style={{ fontSize:13, color:T.gold, fontWeight:600, letterSpacing:".05em", marginBottom:16 }}>Appearance</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10 }}>
            {Object.entries(THEMES).map(([key, th]) => {
              const prev = THEME_PREVIEWS[key];
              const active = themeName === key;
              return (
                <button key={key} onClick={() => setThemeName(key)}
                  style={{ background:prev.bg, border:`2px solid ${active ? prev.gold : prev.bg === "#f4efe6" || prev.bg === "#e8f2fc" || prev.bg === "#eaf4ee" ? "#ccc" : "#333"}`, borderRadius:12, padding:"14px 8px 12px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:8, transition:"border-color .2s",
                    outline: active ? `2px solid ${prev.gold}` : "none", outlineOffset:2 }}>
                  <div style={{ width:40, height:28, borderRadius:6, background:prev.s1, border:`1px solid ${prev.gold}44`, display:"flex", flexDirection:"column", justifyContent:"center", gap:3, padding:"4px 6px" }}>
                    <div style={{ height:3, borderRadius:2, background:prev.gold, width:"70%" }}/>
                    <div style={{ height:2, borderRadius:2, background:prev.text, opacity:.4, width:"90%" }}/>
                    <div style={{ height:2, borderRadius:2, background:prev.text, opacity:.25, width:"60%" }}/>
                  </div>
                  <span style={{ fontSize:11, color:prev.text, fontWeight:active?600:400, opacity:active?1:.65 }}>
                    {th.label}
                  </span>
                  {active && <div style={{ width:5, height:5, borderRadius:"50%", background:prev.gold }}/>}
                </button>
              );
            })}
          </div>
        </section>

        <section style={{ marginBottom:36 }}>
          <div style={{ fontSize:13, color:T.gold, fontWeight:600, letterSpacing:".05em", marginBottom:16 }}>Your Data</div>
          <div style={{ background:T.s1, border:`1px solid ${T.b1}`, borderRadius:12, padding:"0 20px" }}>
            {[["Study Pages",stats.pages],["Projects",stats.projects],["References",stats.refs],["Words Fetched",stats.words],["Custom Flashcards",stats.cards],["Sections with Notes",stats.notes]].map(([label,val]) => (
              <div key={label} style={row}>
                <span style={{ fontSize:14, color:T.muted }}>{label}</span>
                <span style={{ fontSize:16, color:T.text, fontFamily:"JetBrains Mono" }}>{val}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom:36 }}>
          <div style={{ fontSize:13, color:T.gold, fontWeight:600, letterSpacing:".05em", marginBottom:16 }}>Backup & Restore</div>
          <div style={{ background:T.s1, border:`1px solid ${T.b1}`, borderRadius:12, padding:20 }}>
            <p style={{ fontSize:13, color:T.muted, lineHeight:1.7, marginBottom:16 }}>Export your data as a JSON file to back it up or move to another device. Import a previously exported file to restore.</p>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              <button onClick={exportData} style={{ padding:"8px 20px", background:T.goldM, border:`1px solid ${T.gold}`, color:T.gold, borderRadius:7, fontSize:13, fontWeight:600 }}>↓ Export Backup</button>
              <label style={{ padding:"8px 20px", background:"transparent", border:`1px solid ${T.b2}`, color:T.muted, borderRadius:7, fontSize:13, cursor:"pointer" }}>
                ↑ Import Backup
                <input type="file" accept=".json" onChange={importData} style={{ display:"none" }} />
              </label>
            </div>
          </div>
        </section>

        <section style={{ marginBottom:36 }}>
          <div style={{ fontSize:13, color:T.gold, fontWeight:600, letterSpacing:".05em", marginBottom:16 }}>Permanent Access — How to Use This in Claude</div>
          <div style={{ background:T.s1, border:`1px solid ${T.b1}`, borderRadius:12, padding:20 }}>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[
                ["1. Create a Project in Claude.ai", "In the left sidebar of Claude.ai, click Projects → New Project. Name it something like \"Quran Study App\"."],
                ["2. Add the app to the project", "Open the project, click Add Content, and paste the full JSX source code of this app as project knowledge. Claude will always have it available."],
                ["3. Open it any time", "Start any new chat inside that project and say \"open my Quran study app\". Claude will render it immediately — no copy-pasting, no searching old chats."],
                ["4. Keep your data safe", "Your notes live in this browser's localStorage. Use Export Backup above regularly, or whenever you switch devices. Import on any device to restore everything."],
              ].map(([title, desc]) => (
                <div key={title} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:T.gold, marginTop:7, flexShrink:0 }}/>
                  <div>
                    <div style={{ fontSize:13, color:T.text, fontWeight:500, marginBottom:3 }}>{title}</div>
                    <div style={{ fontSize:13, color:T.muted, lineHeight:1.7 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:16, background:T.s2, borderRadius:8, padding:"10px 14px" }}>
              <p style={{ fontSize:12, color:T.dim, lineHeight:1.7 }}>Tip: Publishing as an Artifact gives you a shareable link anyone can open in their browser — but that version uses your Anthropic API key, so keep the link private if you don't want others using your credits.</p>
            </div>
          </div>
        </section>

        <section>
          <div style={{ fontSize:13, color:T.red, fontWeight:600, letterSpacing:".05em", marginBottom:16 }}>Danger Zone</div>
          <div style={{ background:T.s1, border:`1px solid ${T.red}44`, borderRadius:12, padding:20 }}>
            <p style={{ fontSize:13, color:T.muted, lineHeight:1.7, marginBottom:16 }}>Permanently delete all pages, projects, references, and flashcards. Export a backup first.</p>
            <button onClick={clearAll} style={{ padding:"8px 20px", background:"transparent", border:`1px solid ${T.red}`, color:T.red, borderRadius:7, fontSize:13 }}>Delete All Data</button>
          </div>
        </section>
      </div>
    </div>
  );
}
