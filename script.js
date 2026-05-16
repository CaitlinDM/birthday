/* ================================================
   SITE ANNIVERSAIRE — BEBOO 💕
   script.js

   📁 STRUCTURE DES FICHIERS ATTENDUE :
   ├── index.html
   ├── style.css
   ├── script.js
   └── img/
       ├── 2022/  novembre.jpg  decembre.jpg
       ├── 2023/  janvier.jpg … decembre.jpg
       ├── 2024/  janvier.jpg … decembre.jpg
       ├── 2025/  janvier.jpg … decembre.jpg
       └── 2026/  janvier.jpg … mai.jpg
   ================================================ */

/* ================================================
   DONNÉES
   ================================================ */

const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const YEARS = [2022, 2023, 2024, 2025, 2026];

const YEAR_MONTHS = {
  2022: ["Novembre", "Décembre"],
  2023: [...MONTHS],
  2024: [...MONTHS],
  2025: [...MONTHS],
  2026: ["Janvier", "Février", "Mars", "Avril", "Mai"]
};

const DEFAULT_YEAR_CONTENT = Object.fromEntries(
  YEARS.map(year => [
    year,
    Object.fromEntries(
      (YEAR_MONTHS[year] || []).map(month => [month, { note: `${month} ${year}`, photo: "" }])
    )
  ])
);

const YEAR_CONTENT = {
  ...DEFAULT_YEAR_CONTENT,

  2022: {
    ...DEFAULT_YEAR_CONTENT[2022],
    Novembre: { note: "Le commencement",     photo: "./img/2022/novembre.jpg" },
    Décembre: { note: "Nos premières nuits", photo: "./img/2022/decembre.jpg" }
  },

  2023: {
    ...DEFAULT_YEAR_CONTENT[2023],
    Janvier:   { note: "Notre première fois à Nantes",                photo: "./img/2023/janvier.jpg" },
    Février:   { note: "Nos rêves de ski",                            photo: "./img/2023/fevrier.jpg" },
    Mars:      { note: "Notre première (et pas la dernière) à Disney",photo: "./img/2023/mars.jpg" },
    Avril:     { note: "Mon gentleman",                               photo: "./img/2023/avril.jpg" },
    Mai:       { note: "Un peu de nous (juste un peu)",               photo: "./img/2023/mai.jpg" },
    Juin:      { note: "Quel beaugosse",                              photo: "./img/2023/juin.jpg" },
    Juillet:   { note: "Premier feu d'artifice",                      photo: "./img/2023/juillet.jpg" },
    Août:      { note: "Beaucoup de nous",                            photo: "./img/2023/aout.jpg" },
    Septembre: { note: "Ça boulotte, mais à Astérix",                 photo: "./img/2023/septembre.jpg" },
    Octobre:   { note: "Toujours le beaugosse",                       photo: "./img/2023/octobre.jpg" },
    Novembre:  { note: "Un peu de magie de Noël",                     photo: "./img/2023/novembre.jpg" },
    Décembre:  { note: "De retour à Disney",                          photo: "./img/2023/decembre.jpg" }
  },

  2024: {
    ...DEFAULT_YEAR_CONTENT[2024],
    Janvier:   { note: "Première fois au ski",          photo: "./img/2024/janvier.jpg" },
    Février:   { note: "Un peu de Boo",                 photo: "./img/2024/fevrier.jpg" },
    Mars:      { note: "Un peu de nous (encore)",       photo: "./img/2024/mars.jpg" },
    Avril:     { note: "De nouveau un peu plus de Boo", photo: "./img/2024/avril.jpg" },
    Mai:       { note: "Enfin du calme",                photo: "./img/2024/mai.jpg" },
    Juin:      { note: "En vadrouille",                 photo: "./img/2024/juin.jpg" },
    Juillet:   { note: "Festyland avec le champion",    photo: "./img/2024/juillet.jpg" },
    Août:      { note: "Sous 60°",                      photo: "./img/2024/aout.jpg" },
    Septembre: { note: "Presque une belle vue",         photo: "./img/2024/septembre.jpg" },
    Octobre:   { note: "Nos plus belles pizzas",        photo: "./img/2024/octobre.jpg" },
    Novembre:  { note: "Couché mémé",                   photo: "./img/2024/novembre.jpg" },
    Décembre:  { note: "Pour finir l'année en beauté",  photo: "./img/2024/decembre.jpg" }
  },

  2025: {
    ...DEFAULT_YEAR_CONTENT[2025],
    Janvier:   { note: "Un début d'année sous drogue",           photo: "./img/2025/janvier.jpg" },
    Février:   { note: "Ma première bague (et pas la dernière)", photo: "./img/2025/fevrier.jpg" },
    Mars:      { note: "Notre premier diplôme",                  photo: "./img/2025/mars.jpg" },
    Avril:     { note: "La meilleure des vues",                  photo: "./img/2025/avril.jpg" },
    Mai:       { note: "L'un des meilleurs parcs",               photo: "./img/2025/mai.jpg" },
    Juin:      { note: "Un peu de nous",                         photo: "./img/2025/juin.jpg" },
    Juillet:   { note: "Matte moi ce beau gosse",                photo: "./img/2025/juillet.jpg" },
    Août:      { note: "Premier repas chez nous",                photo: "./img/2025/aout.jpg" },
    Septembre: { note: "Notre seul et unique Pitaya de Cholet",  photo: "./img/2025/septembre.jpg" },
    Octobre:   { note: "Notre 1er Halloween",                    photo: "./img/2025/octobre.jpg" },
    Novembre:  { note: "Le meilleur des tontons",                photo: "./img/2025/novembre.jpg" },
    Décembre:  { note: "Notre nouvel an entouré de vieux",       photo: "./img/2025/decembre.jpg" }
  },

  2026: {
    ...DEFAULT_YEAR_CONTENT[2026],
    Janvier: { note: "Notre Boo pour bien commencer l'année", photo: "./img/2026/janvier.jpg" },
    Février: { note: "Je t'aime",                             photo: "./img/2026/fevrier.jpg" },
    Mars:    { note: "Notre pépette",                         photo: "./img/2026/mars.jpg" },
    Avril:   { note: "Un peu de Bauduin",                     photo: "./img/2026/avril.jpg" },
    Mai:     { note: "Joyeux anniversaire Beboo 🎉",           photo: "./img/2026/mai.jpg" }
  }
};

/* ================================================
   CONSTANTES
   ================================================ */

const STORAGE_PREFIX  = "month-seen-";
const TYPEWRITER_TEXT = "Joyeux anniversaire Beboo\u00A0💕";

/* ================================================
   RÉFÉRENCES DOM
   ================================================ */

const screens = {
  loading: document.getElementById("p0"),
  intro:   document.getElementById("p1"),
  months:  document.getElementById("p2"),
  final:   document.getElementById("p3")
};

const elements = {
  title:         document.getElementById("typeTitle"),
  heartsLayer:   document.getElementById("heartsLayer"),
  startBtn:      document.getElementById("startBtn"),
  resetBtn:      document.getElementById("resetBtn"),
  monthsGrid:    document.getElementById("monthsGrid"),
  yearHighlight: document.getElementById("yearHighlight"),
  prevYearBtn:   document.getElementById("prevYearBtn"),
  nextYearBtn:   document.getElementById("nextYearBtn"),
  overlay:       document.getElementById("overlay"),
  backdrop:      document.getElementById("backdrop"),
  envStage:      document.getElementById("envStage"),
  closedFlap:    document.getElementById("closedFlap"),
  overlayHint:   document.getElementById("overlayHint"),
  photo:         document.getElementById("photo"),
  photoImg:      document.getElementById("photoImg"),
  monthNote:     document.getElementById("monthNote"),
  loadingLottie: document.getElementById("loadingLottie"),
  progressLabel: document.getElementById("progressLabel"),
  progressFill:  document.getElementById("progressFill"),
  finalQuote:    document.getElementById("finalQuote"),
  finalBackBtn:  document.getElementById("finalBackBtn"),
  openAllBtn:    document.getElementById("openAllBtn"),
  goFinalBtn:    document.getElementById("goFinalBtn")
};

/* ================================================
   ÉTAT
   ================================================ */

const state = {
  heartsTimer:    null,
  opened:         false,
  startY:         null,
  activeMonth:    null,
  activeYear:     YEARS[0],
  openDirectly:   false,
  photoFlipBound: false,
  allSeen:        false
};

/* ================================================
   UTILITAIRES
   ================================================ */

function showScreen(screenToShow) {
  Object.values(screens).forEach(s => s.classList.remove("is-active"));
  screenToShow.classList.add("is-active");
}

function getSeenKey(year, month)  { return `${STORAGE_PREFIX}${year}-${month}`; }
function isMonthSeen(year, month) { return localStorage.getItem(getSeenKey(year, month)) === "1"; }
function markMonthSeen(year, month){ localStorage.setItem(getSeenKey(year, month), "1"); }

function clearSeenMonths() {
  YEARS.forEach(year =>
    (YEAR_MONTHS[year] || []).forEach(month =>
      localStorage.removeItem(getSeenKey(year, month))
    )
  );
}

function getYearMonths(year)        { return YEAR_MONTHS[year] || []; }
function getMonthContent(year, month){ return YEAR_CONTENT[year]?.[month] || { note: `${month} ${year}`, photo: "" }; }

function makePlaceholderSvg(year, month) {
  const uid = `bg-${year}-${month.replace(/[^a-z]/gi, "")}`;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
      <defs>
        <linearGradient id="${uid}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#d9b2b2"/>
          <stop offset="100%" stop-color="#b11212"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#${uid})"/>
      <circle cx="680" cy="120" r="110" fill="rgba(255,255,255,.10)"/>
      <circle cx="120" cy="820" r="130" fill="rgba(255,255,255,.08)"/>
      <text x="400" y="430" text-anchor="middle" font-family="Arial,sans-serif" font-size="78" font-weight="700" fill="#fff">${month}</text>
      <text x="400" y="540" text-anchor="middle" font-family="Arial,sans-serif" font-size="92" font-weight="900" fill="#fff">${year}</text>
    </svg>`.trim();
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function getMonthPhoto(year, month) {
  const content = getMonthContent(year, month);
  return content.photo || makePlaceholderSvg(year, month);
}

/* ================================================
   TYPEWRITER
   ================================================ */

function startTypewriter() {
  const chars = Array.from(TYPEWRITER_TEXT);
  let index = 0;
  elements.title.textContent = "";
  function typeNext() {
    elements.title.textContent = chars.slice(0, index).join("");
    index++;
    if (index <= chars.length) setTimeout(typeNext, 120);
  }
  typeNext();
}

/* ================================================
   CŒURS FLOTTANTS
   ================================================ */

function createHeart() {
  const heart    = document.createElement("div");
  const size     = 14 + Math.random() * 26;
  const duration = 4.8 + Math.random() * 3.8;
  const drift    = (Math.random() * 160) - 80;
  const x        = Math.random() * 100;
  heart.className = "heart";
  heart.textContent = "❤️";
  heart.style.setProperty("--x",     `${x}%`);
  heart.style.setProperty("--s",     `${size}px`);
  heart.style.setProperty("--d",     `${duration}s`);
  heart.style.setProperty("--drift", `${drift}px`);
  elements.heartsLayer.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

function startHearts() {
  if (state.heartsTimer) return;
  const delay = window.matchMedia("(max-width: 720px)").matches ? 750 : 260;
  state.heartsTimer = setInterval(createHeart, delay);
}

function stopHearts() {
  if (!state.heartsTimer) return;
  clearInterval(state.heartsTimer);
  state.heartsTimer = null;
}

/* ================================================
   OVERLAY
   ================================================ */

function resetOverlayState() {
  state.opened       = false;
  state.startY       = null;
  state.openDirectly = false;
  elements.envStage.classList.remove("is-opened");
  elements.closedFlap.style.removeProperty("--flap-angle");
  elements.overlayHint.textContent  = "Maintiens + glisse vers le haut pour ouvrir";
  elements.overlayHint.style.display = "block";
  elements.photo.classList.remove("is-flipped");
}

function closeOverlay() {
  elements.overlay.classList.remove("is-open");
  elements.overlay.setAttribute("aria-hidden", "true");
  resetOverlayState();
  state.activeMonth = null;
}

function setOverlayContent(year, month) {
  const content = getMonthContent(year, month);
  elements.photoImg.src = getMonthPhoto(year, month);
  elements.photoImg.alt = `Photo ${month} ${year}`;
  elements.monthNote.textContent = content.note || `${month} ${year}`;
}

function openOverlay(year, month) {
  state.activeYear   = year;
  state.activeMonth  = month;
  setOverlayContent(year, month);
  resetOverlayState();
  state.openDirectly = isMonthSeen(year, month);
  elements.overlay.classList.add("is-open");
  elements.overlay.setAttribute("aria-hidden", "false");
  if (state.openDirectly) {
    state.opened = true;
    elements.envStage.classList.add("is-opened");
    elements.overlayHint.style.display = "none";
  }
}

function updateMonthButtonSeenState(year, month) {
  const target = elements.monthsGrid.querySelector(
    `.monthBtn[data-year="${year}"][data-month="${month}"]`
  );
  if (target) target.classList.add("is-seen");
}

function commitOpen() {
  if (state.opened) return;
  state.opened = true;
  elements.closedFlap.style.removeProperty("--flap-angle");
  elements.envStage.classList.add("is-opened");
  elements.overlayHint.style.display = "none";
  if (state.activeMonth) {
    markMonthSeen(state.activeYear, state.activeMonth);
    updateMonthButtonSeenState(state.activeYear, state.activeMonth);
    updateProgress();
  }
}

function resetFlapIfNeeded() {
  if (!state.opened && !state.openDirectly) {
    elements.closedFlap.style.setProperty("--flap-angle", "0deg");
  }
  state.startY = null;
}

/* ================================================
   MINI ENVELOPPES
   ================================================ */

function createMiniEnvelope(year, month) {
  const button = document.createElement("button");
  button.type  = "button";
  button.className = "monthBtn";
  button.dataset.year  = String(year);
  button.dataset.month = month;
  button.setAttribute("aria-label", `Ouvrir l'enveloppe ${month} ${year}`);

  const thumb = getMonthPhoto(year, month);
  button.style.setProperty("--thumb", thumb ? `url("${thumb}")` : "none");
  if (isMonthSeen(year, month)) button.classList.add("is-seen");

  button.innerHTML = `
    <div class="miniWrap">
      <div class="mini3d">
        <div class="miniFace miniFront">
          <span>${month}</span>
        </div>
        <div class="miniFace miniBack">
          <div class="flap"></div>
        </div>
        <div class="miniSeen">
          <div class="seenEnv">
            <div class="seenFlap"></div>
          </div>
          <div class="seenPolaroid">
            <div class="seenPhoto"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  button.addEventListener("click", () => openOverlay(year, month));
  return button;
}

/* ================================================
   RENDU DES MOIS
   ================================================ */

function updateYearNavButtons() {
  const i = YEARS.indexOf(state.activeYear);
  elements.prevYearBtn.disabled = i <= 0;
  elements.nextYearBtn.disabled = i >= YEARS.length - 1;
}

function renderMonths() {
  const year            = state.activeYear;
  const availableMonths = getYearMonths(year);

  elements.monthsGrid.classList.add("is-switching");
  elements.yearHighlight.textContent = String(year);
  elements.monthsGrid.innerHTML = "";

  MONTHS.forEach(month => {
    if (availableMonths.includes(month)) {
      elements.monthsGrid.appendChild(createMiniEnvelope(year, month));
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "monthPlaceholder";
      elements.monthsGrid.appendChild(placeholder);
    }
  });

  updateYearNavButtons();
  updateProgress();
  requestAnimationFrame(() => elements.monthsGrid.classList.remove("is-switching"));
}

function changeYear(step) {
  const i        = YEARS.indexOf(state.activeYear);
  const nextYear = YEARS[i + step];
  if (!nextYear) return;
  state.activeYear = nextYear;
  closeOverlay();
  renderMonths();
}

/* ================================================
   GLISSER POUR OUVRIR L'ENVELOPPE
   ================================================ */

function bindEnvelopeDrag() {
  elements.envStage.addEventListener("pointerdown", event => {
    if (state.opened || state.openDirectly) return;
    state.startY = event.clientY;
    elements.closedFlap.style.setProperty("--flap-angle", "0deg");
  });

  elements.envStage.addEventListener("pointermove", event => {
    if (state.opened || state.openDirectly || state.startY === null) return;
    const dy       = state.startY - event.clientY;
    const progress = Math.max(0, Math.min(1, dy / 95));
    elements.closedFlap.style.setProperty("--flap-angle", `${-progress * 120}deg`);
    if (dy > 70) { commitOpen(); state.startY = null; }
  });

  elements.envStage.addEventListener("pointerup",     resetFlapIfNeeded);
  elements.envStage.addEventListener("pointercancel", resetFlapIfNeeded);
}

/* ================================================
   RETOURNER LE POLAROID
   ================================================ */

function bindPhotoFlip() {
  if (state.photoFlipBound) return;
  state.photoFlipBound = true;
  elements.photo.addEventListener("click", event => {
    event.stopPropagation();
    if (!state.opened && !state.openDirectly) return;
    elements.photo.classList.toggle("is-flipped");
  });
}

/* ================================================
   ÉVÉNEMENTS
   ================================================ */

function bindEvents() {
  elements.startBtn.addEventListener("click", () => {
    stopHearts();
    showScreen(screens.months);
    renderMonths();
  });

  elements.goFinalBtn.addEventListener("click", () => {
    elements.goFinalBtn.classList.remove("visible");
    screens.months.style.transition = "opacity 1.2s ease";
    screens.months.style.opacity    = "0";
    setTimeout(() => {
      screens.months.style.transition = "";
      screens.months.style.opacity    = "";
      launchFinalPage();
    }, 1200);
  });

  elements.openAllBtn.addEventListener("click", () => {
    YEARS.forEach(y =>
      getYearMonths(y).forEach(m => markMonthSeen(y, m))
    );
    renderMonths();
  });

  elements.resetBtn.addEventListener("click", () => {
    clearSeenMonths();
    state.activeYear = YEARS[0];
    renderMonths();
  });

  elements.prevYearBtn.addEventListener("click", () => changeYear(-1));
  elements.nextYearBtn.addEventListener("click", () => changeYear(1));

  elements.backdrop.addEventListener("click", closeOverlay);

  elements.overlay.addEventListener("click", event => {
    if (!elements.envStage.contains(event.target)) closeOverlay();
  });

  elements.finalBackBtn.addEventListener("click", () => {
    elements.finalBackBtn.classList.remove("visible");
    screens.months.style.opacity    = "";
    screens.months.style.transition = "";
    showScreen(screens.months);
  });

  window.addEventListener("keydown", event => {
    if (event.key === "Escape" && elements.overlay.classList.contains("is-open")) closeOverlay();
    if (!screens.months.classList.contains("is-active")) return;
    if (event.key === "ArrowLeft")  changeYear(-1);
    if (event.key === "ArrowRight") changeYear(1);
  });

  bindPhotoFlip();
  bindEnvelopeDrag();
}

/* ================================================
   COMPTEUR D'ENVELOPPES
   ================================================ */

function getTotalCounts() {
  let total = 0, seen = 0;
  YEARS.forEach(y => {
    const months = getYearMonths(y);
    total += months.length;
    seen  += months.filter(m => isMonthSeen(y, m)).length;
  });
  return { total, seen };
}

function updateProgress() {
  const { total, seen } = getTotalCounts();
  if (!elements.progressLabel || !elements.progressFill) return;

  const allDone = seen === total && total > 0;

  // Cacher/montrer compteur vs bouton final
  elements.progressLabel.parentElement.style.visibility = allDone ? "hidden" : "visible";
  elements.goFinalBtn.classList.toggle("visible", allDone);

  elements.progressLabel.textContent = `${seen} / ${total} souvenirs ouverts`;
  elements.progressFill.style.width  = total > 0 ? `${(seen / total) * 100}%` : "0%";

  if (allDone) state.allSeen = true;
}

/* ================================================
   PAGE FINALE
   ================================================ */

function launchFinalPage() {
  if (screens.final.classList.contains("is-active")) return;
  showScreen(screens.final);

  const finalText = "Merci pour ces belles années, je t'aime ♥";
  const chars     = Array.from(finalText);
  let idx = 0;
  elements.finalBackBtn.classList.remove("visible");
  elements.finalQuote.textContent = "";

  setTimeout(() => {
    function typeNext() {
      elements.finalQuote.textContent = chars.slice(0, idx).join("");
      idx++;
      if (idx <= chars.length) {
        setTimeout(typeNext, 80);
      } else {
        setTimeout(() => elements.finalBackBtn.classList.add("visible"), 400);
      }
    }
    typeNext();
  }, 400);
}

/* ================================================
   CHARGEMENT
   ================================================ */

function runLoadingThenIntro() {
  setTimeout(() => {
    elements.loadingLottie.classList.add("loadingOut");
    setTimeout(() => {
      showScreen(screens.intro);
      startTypewriter();
      startHearts();
    }, 420);
  }, 2400);
}

/* ================================================
   INIT
   ================================================ */

function init() {
  bindEvents();
  runLoadingThenIntro();
}

init();
