/* GPAForge — Egyptian university GPA planner. No server, data stays in localStorage. */
"use strict";

const I18N = {
  ar: {
    tagline: "احسب معدلك، واعرف محتاج كام عشان توصل لهدفك",
    currentTitle: "بياناتك الحالية",
    currentGPA: "المعدل التراكمي الحالي",
    currentHours: "الساعات المعتمدة المكتملة",
    newStudent: "لسه أول ترم؟ سيب الخانتين فاضيين وهنحسبلك معدل الترم على طول.",
    tabCalc: "حاسبة الترم",
    tabTarget: "محتاج كام؟",
    tabScale: "سلم التقديرات",
    course: "المادة",
    coursePh: "اسم المادة (اختياري)",
    hours: "الساعات",
    grade: "التقدير",
    addCourse: "+ أضف مادة",
    allA: "كله A",
    allB: "كله B",
    clearAll: "امسح الكل",
    semGPA: "معدل الترم",
    totalHours: "إجمالي الساعات",
    totalPoints: "مجموع النقاط",
    newCum: "التراكمي الجديد",
    equivGrade: "التقدير المكافئ",
    targetGPA: "المعدل التراكمي المستهدف",
    nextHours: "ساعات الترم الجاي",
    useCourses: "استخدم ساعات مواد حاسبة الترم",
    needLabel: "محتاج معدل",
    inSem: "في الترم ده",
    impossible: "مستحيل الترم ده",
    impossibleMsg: "حتى لو جبت A في كل المواد، أقصى حاجة هتوصلها {max}. جرب هدف أقرب أو خطط على ترمين.",
    guaranteed: "مضمون",
    guaranteedMsg: "هدفك في الجيب، هتوصله حتى لو معدلك في الترم نزل لحد {min}.",
    veryHard: "صعب جدًا",
    hard: "صعب",
    medium: "متوسط",
    easy: "في المتناول",
    needMsg: "يعني محتاج متوسط {letter} تقريبًا في كل مادة الترم ده.",
    needMsgNoOld: "يعني محتاج متوسط {letter} تقريبًا في مواد الترم.",
    scenarios: "سيناريوهات سريعة",
    scenAll: "كله",
    scenResult: "التراكمي: {gpa}",
    scenResultNoOld: "معدل الترم: {gpa}",
    scaleTitle: "سلم التقديرات",
    scaleNote: "الافتراضي هو السلم الشائع في الجامعات المصرية بنظام الساعات المعتمدة. عدّله لو سلم كليتك مختلف، والتغيير بيتحفظ تلقائيًا.",
    letter: "الحرف",
    minPct: "من ٪",
    points: "النقاط",
    preset: "نظام جاهز",
    presetEgy: "المصري الشائع (4.0)",
    presetUS: "الأمريكي البسيط (4.0)",
    reset: "إرجاع الافتراضي",
    footer: "بياناتك بتتحفظ على جهازك بس • من غير تسجيل • مفتوح المصدر",
    remove: "حذف المادة",
  },
  en: {
    tagline: "Calculate your GPA and see exactly what you need this semester",
    currentTitle: "Your current standing",
    currentGPA: "Current cumulative GPA",
    currentHours: "Completed credit hours",
    newStudent: "First semester? Leave both empty and we'll just compute your semester GPA.",
    tabCalc: "Semester calc",
    tabTarget: "What do I need?",
    tabScale: "Grade scale",
    course: "Course",
    coursePh: "Course name (optional)",
    hours: "Hours",
    grade: "Grade",
    addCourse: "+ Add course",
    allA: "All A",
    allB: "All B",
    clearAll: "Clear all",
    semGPA: "Semester GPA",
    totalHours: "Total hours",
    totalPoints: "Total points",
    newCum: "New cumulative",
    equivGrade: "Equivalent grade",
    targetGPA: "Target cumulative GPA",
    nextHours: "Next semester hours",
    useCourses: "Use hours from the semester calc",
    needLabel: "You need a",
    inSem: "this semester",
    impossible: "Not this semester",
    impossibleMsg: "Even with straight A's the best you can reach is {max}. Try a closer target or plan over two semesters.",
    guaranteed: "Guaranteed",
    guaranteedMsg: "Your goal is locked in, you'd reach it even if this semester dropped to {min}.",
    veryHard: "Very hard",
    hard: "Hard",
    medium: "Moderate",
    easy: "Within reach",
    needMsg: "That's an average of about {letter} in every course this semester.",
    needMsgNoOld: "That's an average of about {letter} across this semester's courses.",
    scenarios: "Quick scenarios",
    scenAll: "All",
    scenResult: "Cumulative: {gpa}",
    scenResultNoOld: "Semester: {gpa}",
    scaleTitle: "Grade scale",
    scaleNote: "The default is the common Egyptian credit-hour scale. Edit it if your faculty uses a different one; changes save automatically.",
    letter: "Letter",
    minPct: "Min %",
    points: "Points",
    preset: "Preset",
    presetEgy: "Egyptian common (4.0)",
    presetUS: "US simple (4.0)",
    reset: "Reset to default",
    footer: "Your data stays on your device • No sign-up • Open source",
    remove: "Remove course",
  },
};

const PRESETS = {
  egy: [
    { letter: "A", min: 85, points: 4.0 },
    { letter: "A-", min: 80, points: 3.7 },
    { letter: "B+", min: 75, points: 3.3 },
    { letter: "B", min: 70, points: 3.0 },
    { letter: "B-", min: 65, points: 2.7 },
    { letter: "C+", min: 60, points: 2.3 },
    { letter: "C", min: 55, points: 2.0 },
    { letter: "C-", min: 50, points: 1.7 },
    { letter: "F", min: 0, points: 0.0 },
  ],
  us: [
    { letter: "A", min: 90, points: 4.0 },
    { letter: "B", min: 80, points: 3.0 },
    { letter: "C", min: 70, points: 2.0 },
    { letter: "D", min: 60, points: 1.0 },
    { letter: "F", min: 0, points: 0.0 },
  ],
};

const STORE_KEY = "gpaforge-v1";

const defaultState = () => ({
  lang: "ar",
  oldGPA: "",
  oldHours: "",
  courses: [
    { name: "", hours: "3", grade: "A" },
    { name: "", hours: "3", grade: "B+" },
    { name: "", hours: "2", grade: "B" },
  ],
  targetGPA: "",
  nextHours: "",
  useCourses: false,
  scale: PRESETS.egy.map((g) => ({ ...g })),
  tab: "calc",
});

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return defaultState();
    const s = JSON.parse(raw);
    const d = defaultState();
    // Merge defensively so older saves keep working
    return {
      ...d, ...s,
      courses: Array.isArray(s.courses) && s.courses.length ? s.courses : d.courses,
      scale: Array.isArray(s.scale) && s.scale.length ? s.scale : d.scale,
    };
  } catch {
    return defaultState();
  }
}

function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch {}
}

const $ = (id) => document.getElementById(id);
const t = (key) => I18N[state.lang][key] || key;
const fmt = (tpl, vars) => tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k]);

function num(v) {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : null;
}

function maxPoints() {
  return Math.max(...state.scale.map((g) => g.points), 0);
}

function letterFor(gpa) {
  // Closest grade whose points >= gpa, else the top grade
  const sorted = [...state.scale].sort((a, b) => a.points - b.points);
  for (const g of sorted) if (g.points >= gpa) return g.letter;
  return sorted.length ? sorted[sorted.length - 1].letter : "—";
}

// Isolate Latin grade letters inside Arabic text so "A-" never renders as "-A"
const ltr = (s) => `\u2066${s}\u2069`;

/* ---------- Calculation core ---------- */

function calcSemester() {
  let hours = 0, points = 0;
  for (const c of state.courses) {
    const h = num(c.hours);
    if (!h || h <= 0) continue;
    const g = state.scale.find((x) => x.letter === c.grade);
    if (!g) continue;
    hours += h;
    points += h * g.points;
  }
  return { hours, points, gpa: hours ? points / hours : 0 };
}

function calcCumulative(sem) {
  const og = num(state.oldGPA), oh = num(state.oldHours);
  if (og === null || !oh || oh <= 0) return null;
  return (og * oh + sem.points) / (oh + sem.hours);
}

function calcTarget() {
  const target = num(state.targetGPA);
  if (target === null) return null;
  let newH;
  if (state.useCourses) {
    newH = calcSemester().hours;
  } else {
    newH = num(state.nextHours) || 0;
  }
  if (!newH || newH <= 0) return null;
  const og = num(state.oldGPA) ?? 0;
  const oh = num(state.oldHours) || 0;
  const req = (target * (oh + newH) - og * oh) / newH;
  return { req, newH, hasOld: num(state.oldGPA) !== null && oh > 0, oh, og, target };
}

/* ---------- Rendering ---------- */

function applyI18n() {
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
  document.title = state.lang === "ar"
    ? "GPAForge — مخطط المعدل التراكمي"
    : "GPAForge — GPA Planner";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  $("langBtn").textContent = state.lang === "ar" ? "EN" : "عربي";
  $("presetSel").innerHTML = "";
  [["egy", t("presetEgy")], ["us", t("presetUS")]].forEach(([v, label]) => {
    const o = document.createElement("option");
    o.value = v; o.textContent = label;
    $("presetSel").appendChild(o);
  });
  $("presetSel").value = scaleMatches("us") ? "us" : "egy";
}

function scaleMatches(preset) {
  const p = PRESETS[preset];
  return p.length === state.scale.length &&
    p.every((g, i) => g.letter === state.scale[i].letter &&
      g.min === state.scale[i].min && g.points === state.scale[i].points);
}

function gradeOptions(selected) {
  return state.scale
    .map((g) => `<option value="${g.letter}" ${g.letter === selected ? "selected" : ""}>${g.letter} (${g.points.toFixed(1)})</option>`)
    .join("");
}

function renderCourses() {
  const wrap = $("courseRows");
  wrap.innerHTML = "";
  state.courses.forEach((c, i) => {
    const row = document.createElement("div");
    row.className = "course-row";
    row.innerHTML = `
      <input class="c-name" type="text" placeholder="${t("coursePh")}" value="${escapeHtml(c.name)}">
      <input class="c-hours" type="number" inputmode="numeric" min="0" step="1" placeholder="3" value="${c.hours}">
      <select class="c-grade">${gradeOptions(c.grade)}</select>
      <button class="row-del" type="button" title="${t("remove")}" aria-label="${t("remove")}">✕</button>
    `;
    row.querySelector(".c-name").addEventListener("input", (e) => { c.name = e.target.value; save(); });
    row.querySelector(".c-hours").addEventListener("input", (e) => { c.hours = e.target.value; save(); renderResults(); if (state.useCourses) renderTarget(); });
    row.querySelector(".c-grade").addEventListener("change", (e) => { c.grade = e.target.value; save(); renderResults(); });
    row.querySelector(".row-del").addEventListener("click", () => {
      state.courses.splice(i, 1); save(); renderCourses(); renderResults(); if (state.useCourses) renderTarget();
    });
    wrap.appendChild(row);
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}

function renderResults() {
  const sem = calcSemester();
  const max = maxPoints() || 4;
  $("semGPA").textContent = sem.hours ? sem.gpa.toFixed(2) : "0.00";
  $("totalHours").textContent = sem.hours;
  $("totalPoints").textContent = sem.points.toFixed(1);
  $("equivGrade").textContent = sem.hours ? letterFor(sem.gpa) : "—";
  const cum = calcCumulative(sem);
  $("newCumWrap").style.display = cum === null ? "none" : "";
  $("newCum").textContent = cum === null ? "—" : cum.toFixed(2);

  // Ring progress (circumference 2πr ≈ 326.7)
  const frac = sem.hours ? Math.min(sem.gpa / max, 1) : 0;
  const ring = $("ringFg");
  ring.style.strokeDashoffset = (326.7 * (1 - frac)).toFixed(1);
  ring.style.stroke = sem.hours
    ? (frac >= 0.75 ? "var(--good)" : frac >= 0.5 ? "var(--accent)" : frac >= 0.3 ? "var(--warn)" : "var(--bad)")
    : "var(--accent)";
}

function renderTarget() {
  const res = calcTarget();
  const badge = $("needBadge");
  const val = $("needValue");
  const msg = $("needMsg");
  const scenWrap = $("scenarioRows");
  scenWrap.innerHTML = "";

  if (!res) {
    val.textContent = "—";
    badge.textContent = "";
    badge.className = "badge";
    msg.textContent = "";
    return;
  }

  const max = maxPoints() || 4;
  const { req, newH, hasOld, oh, og, target } = res;
  val.textContent = req.toFixed(2);

  let cls, label, m = "";
  if (req > max) {
    const best = (og * oh + max * newH) / (oh + newH);
    cls = "bad"; label = t("impossible");
    m = fmt(t("impossibleMsg"), { max: best.toFixed(2) });
  } else if (req <= 0) {
    cls = "good"; label = t("guaranteed");
    m = fmt(t("guaranteedMsg"), { min: (0).toFixed(2) });
  } else {
    if (req > 3.5) { cls = "bad"; label = t("veryHard"); }
    else if (req > 3.0) { cls = "hard"; label = t("hard"); }
    else if (req > 2.3) { cls = "mid"; label = t("medium"); }
    else { cls = "good"; label = t("easy"); }
    m = fmt(hasOld ? t("needMsg") : t("needMsgNoOld"), { letter: ltr(letterFor(req)) });
  }
  badge.textContent = label;
  badge.className = "badge " + cls;
  msg.textContent = m;

  // Quick scenarios: what cumulative do I land on with straight X's?
  const picks = ["A", "B+", "B", "C+"].filter((l) => state.scale.some((g) => g.letter === l));
  for (const letter of picks) {
    const g = state.scale.find((x) => x.letter === letter);
    const semPts = g.points * newH;
    const finalGpa = hasOld ? (og * oh + semPts) / (oh + newH) : g.points;
    const row = document.createElement("div");
    row.className = "scen-row";
    const ok = finalGpa >= target;
    row.innerHTML = `
      <span class="scen-grade">${t("scenAll")} <bdi>${letter}</bdi></span>
      <span class="scen-res">${fmt(hasOld ? t("scenResult") : t("scenResultNoOld"), { gpa: finalGpa.toFixed(2) })}</span>
      <span class="scen-note ${ok ? "ok" : "no"}">${ok ? "✓" : "✗"}</span>`;
    scenWrap.appendChild(row);
  }
}

function renderScale() {
  const wrap = $("scaleRows");
  wrap.innerHTML = "";
  state.scale.forEach((g, i) => {
    const row = document.createElement("div");
    row.className = "scale-row";
    row.innerHTML = `
      <span class="scale-letter" dir="ltr">${escapeHtml(g.letter)}</span>
      <input type="number" inputmode="numeric" min="0" max="100" step="1" value="${g.min}" ${g.letter === "F" ? "disabled" : ""}>
      <input type="number" inputmode="decimal" min="0" max="5" step="0.1" value="${g.points}">
    `;
    const [minInput, ptsInput] = row.querySelectorAll("input");
    minInput.addEventListener("input", (e) => { g.min = parseFloat(e.target.value) || 0; save(); });
    ptsInput.addEventListener("input", (e) => {
      g.points = parseFloat(e.target.value) || 0; save();
      renderCourses(); renderResults(); renderTarget();
    });
    wrap.appendChild(row);
  });
}

/* ---------- Tabs & events ---------- */

function switchTab(tab) {
  state.tab = tab; save();
  document.querySelectorAll(".tab").forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
  ["calc", "target", "scale"].forEach((k) => $("tab-" + k).classList.toggle("hidden", k !== tab));
}

function bindEvents() {
  $("langBtn").addEventListener("click", () => {
    state.lang = state.lang === "ar" ? "en" : "ar";
    save(); applyI18n(); renderCourses(); renderResults(); renderTarget(); renderScale();
  });

  document.querySelectorAll(".tab").forEach((b) =>
    b.addEventListener("click", () => switchTab(b.dataset.tab)));

  $("oldGPA").addEventListener("input", (e) => { state.oldGPA = e.target.value; save(); renderResults(); renderTarget(); });
  $("oldHours").addEventListener("input", (e) => { state.oldHours = e.target.value; save(); renderResults(); renderTarget(); });
  $("targetGPA").addEventListener("input", (e) => { state.targetGPA = e.target.value; save(); renderTarget(); });
  $("nextHours").addEventListener("input", (e) => { state.nextHours = e.target.value; save(); renderTarget(); });
  $("useCourses").addEventListener("change", (e) => { state.useCourses = e.target.checked; save(); renderTarget(); });

  $("addCourse").addEventListener("click", () => {
    state.courses.push({ name: "", hours: "3", grade: "A" });
    save(); renderCourses(); renderResults();
    if (state.useCourses) renderTarget();
  });
  const setAll = (letter) => {
    if (!state.scale.some((g) => g.letter === letter)) return;
    state.courses.forEach((c) => (c.grade = letter));
    save(); renderCourses(); renderResults();
  };
  $("allA").addEventListener("click", () => setAll("A"));
  $("allB").addEventListener("click", () => setAll("B"));
  $("clearAll").addEventListener("click", () => {
    state.courses = [{ name: "", hours: "3", grade: "A" }];
    save(); renderCourses(); renderResults();
    if (state.useCourses) renderTarget();
  });

  $("presetSel").addEventListener("change", (e) => {
    const p = PRESETS[e.target.value];
    if (!p) return;
    state.scale = p.map((g) => ({ ...g }));
    // Keep course selections valid on the new scale
    state.courses.forEach((c) => {
      if (!state.scale.some((g) => g.letter === c.grade)) c.grade = state.scale[0].letter;
    });
    save(); renderScale(); renderCourses(); renderResults(); renderTarget();
  });
  $("resetScale").addEventListener("click", () => {
    state.scale = PRESETS.egy.map((g) => ({ ...g }));
    state.courses.forEach((c) => {
      if (!state.scale.some((g) => g.letter === c.grade)) c.grade = "A";
    });
    save(); renderScale(); renderCourses(); renderResults(); renderTarget();
  });
}

/* ---------- Init ---------- */

function init() {
  applyI18n();
  $("oldGPA").value = state.oldGPA;
  $("oldHours").value = state.oldHours;
  $("targetGPA").value = state.targetGPA;
  $("nextHours").value = state.nextHours;
  $("useCourses").checked = state.useCourses;
  renderCourses();
  renderResults();
  renderTarget();
  renderScale();
  switchTab(state.tab || "calc");
  bindEvents();
}

init();
