/*
  Board Cards: the app logic.
  The cards are in cards.js. You do not need to change this file.
*/
(() => {
  "use strict";

  // The labels for the "who" field of a card.
  const WHO_LABELS = {
    you: "👤 You",
    all: "👥 Everyone",
    others: "👥 Everyone else",
    pick: "👉 Pick a player",
    first: "🥇 First place",
    last: "🐢 Last place",
  };

  const SETTING_KEY = "board-cards:read-aloud";
  const DARK_INK = "#1f2430";
  const MIN_TEXT_PX = 13;

  const $ = (id) => document.getElementById(id);
  const deckBox = $("decks");
  const lastBox = $("last");
  const lastBtn = $("lastBtn");
  const cardDialog = $("cardDialog");
  const flip = $("flip");
  const backLetter = $("backLetter");
  const faceLetter = $("faceLetter");
  const faceName = $("faceName");
  const faceBody = $("faceBody");
  const cardWho = $("cardWho");
  const cardIcon = $("cardIcon");
  const cardText = $("cardText");
  const readBtn = $("readBtn");
  const doneBtn = $("doneBtn");
  const rulesDialog = $("rulesDialog");
  const rulesBtn = $("rulesBtn");
  const rulesClose = $("rulesClose");
  const keyList = $("keyList");
  const autoRead = $("autoRead");
  const autoReadWrap = $("autoReadWrap");

  const decks = (Array.isArray(window.DECKS) ? window.DECKS : [])
    .filter(Boolean)
    .map((deck) => ({
      letter: String(deck.letter || "").trim(),
      name: String(deck.name || "").trim(),
      about: String(deck.about || "").trim(),
      color: deck.color,
      cards: (Array.isArray(deck.cards) ? deck.cards : []).filter((card) => card && card.text),
    }))
    .filter((deck) => deck.letter && deck.cards.length > 0);

  if (decks.length === 0) {
    deckBox.innerHTML = '<p class="error">No cards found. Check the file cards.js.</p>';
    return;
  }

  // ---------- Decks ----------

  decks.forEach((deck) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "deck";
    button.setAttribute("aria-label", `Letter ${deck.letter}, ${deck.name}. Take a card.`);
    button.innerHTML =
      `<span class="deck-letter" aria-hidden="true">${esc(deck.letter)}</span>` +
      (deck.name ? `<span class="deck-name" aria-hidden="true">${esc(deck.name)}</span>` : "");
    applyDeckColors(button, deck);
    button.addEventListener("click", () => draw(deck));
    deckBox.appendChild(button);

    const item = document.createElement("li");
    item.innerHTML =
      `<span class="key-letter">${esc(deck.letter)}</span>` +
      `<span><strong>${esc(deck.name)}</strong>${deck.about ? `<br>${esc(deck.about)}` : ""}</span>`;
    applyDeckColors(item, deck);
    keyList.appendChild(item);
  });
  deckBox.style.setProperty("--count", String(decks.length));

  // ---------- Draw a card ----------

  // Each deck is shuffled like a real deck of cards.
  // You see all the cards of a deck before a card comes back.
  const piles = new Map();
  const lastIndex = new Map();
  let current = null;
  let lastCard = null;

  function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  function takeCard(deck) {
    let pile = piles.get(deck);
    if (!pile || pile.length === 0) {
      pile = shuffle(deck.cards.map((_, i) => i));
      // Do not show the same card two times in a row.
      const top = pile.length - 1;
      if (top > 0 && pile[top] === lastIndex.get(deck)) {
        [pile[0], pile[top]] = [pile[top], pile[0]];
      }
      piles.set(deck, pile);
    }
    const index = pile.pop();
    lastIndex.set(deck, index);
    return deck.cards[index];
  }

  function draw(deck) {
    const card = takeCard(deck);
    showCard(deck, card, true);
    setLastCard(deck, card);
    if (autoRead.checked) speak(card.text);
  }

  // ---------- Show a card ----------

  function showCard(deck, card, isNew) {
    current = { deck, card };
    applyDeckColors(cardDialog, deck);
    backLetter.textContent = deck.letter;
    faceLetter.textContent = deck.letter;
    faceName.textContent = deck.name;

    const who = whoList(card.who);
    cardWho.innerHTML = who.map((w) => `<span>${esc(WHO_LABELS[w] || w)}</span>`).join("");
    cardWho.hidden = who.length === 0;

    cardIcon.textContent = card.icon || "";
    cardIcon.hidden = !card.icon;

    const lines = linesOf(card.text);
    cardText.innerHTML = lines.map((line) => `<span class="line">${highlight(esc(line))}</span>`).join("");
    cardText.className = `face-text ${sizeClass(lines)}`;

    flip.classList.remove("animate");
    openDialog(cardDialog);
    fitText();
    if (isNew) {
      void flip.offsetWidth; // Start the flip animation again.
      flip.classList.add("animate");
    }
    doneBtn.focus();
  }

  function setLastCard(deck, card) {
    lastCard = { deck, card };
    const text = linesOf(card.text).join(" ");
    applyDeckColors(lastBtn, deck);
    lastBtn.innerHTML =
      `<span class="last-letter" aria-hidden="true">${esc(deck.letter)}</span>` +
      (card.icon ? `<span class="last-icon" aria-hidden="true">${esc(card.icon)}</span>` : "") +
      `<span class="last-text">${esc(text)}</span>`;
    lastBtn.setAttribute("aria-label", `Show the last card again. ${deck.letter}: ${text}`);
    lastBox.hidden = false;
  }

  // Make the text smaller if it is too long for the card.
  function fitText() {
    cardText.style.fontSize = "";
    let size = parseFloat(getComputedStyle(cardText).fontSize);
    let steps = 0;
    while (faceBody.scrollHeight > faceBody.clientHeight + 1 && size > MIN_TEXT_PX && steps < 30) {
      size = Math.max(MIN_TEXT_PX, size * 0.94);
      cardText.style.fontSize = `${size}px`;
      steps++;
    }
  }

  function linesOf(text) {
    return String(text || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }

  function whoList(who) {
    if (!who) return [];
    return (Array.isArray(who) ? who : [who]).map((w) => String(w).trim()).filter(Boolean);
  }

  function sizeClass(lines) {
    const chars = lines.join(" ").length;
    if (chars <= 34 && lines.length <= 2) return "is-short";
    if (chars <= 72 && lines.length <= 3) return "is-medium";
    return "is-long";
  }

  // Give colors to "forward 3", "back 3" and "purple space".
  // Short phrases stay on one line.
  function highlight(html) {
    return html
      .replace(/\b(forward|back)\b((?: \d+| that many)?(?: more| spaces?)?)/gi,
        (match, dir) => `<strong class="go-${dir.toLowerCase()}">${keepTogether(match)}</strong>`)
      .replace(/\bpurple spaces?\b/gi, (match) => `<span class="purple">${keepTogether(match)}</span>`);
  }

  function keepTogether(phrase) {
    return phrase.length <= 16 ? phrase.replace(/ /g, "\u00a0") : phrase;
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[c]);
  }

  // ---------- Colors ----------

  function parseHex(hex) {
    const match = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(hex || "").trim());
    if (!match) return null;
    let digits = match[1];
    if (digits.length === 3) digits = digits.split("").map((c) => c + c).join("");
    const n = parseInt(digits, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function luminance(rgb) {
    const [r, g, b] = rgb.map((v) => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  function contrast(a, b) {
    const la = luminance(a);
    const lb = luminance(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  }

  function applyDeckColors(el, deck) {
    const rgb = parseHex(deck.color);
    if (!rgb) {
      // Not a #hex color: use it as it is, with white text.
      el.style.setProperty("--deck", deck.color || "#555555");
      el.style.setProperty("--deck-ink", "#ffffff");
      el.style.setProperty("--deck-dark", "rgba(0, 0, 0, 0.45)");
      return;
    }
    const white = [255, 255, 255];
    const dark = parseHex(DARK_INK);
    const ink = contrast(rgb, white) >= contrast(rgb, dark) ? "#ffffff" : DARK_INK;
    const shade = rgb.map((v) => Math.round(v * 0.6));
    el.style.setProperty("--deck", `rgb(${rgb.join(", ")})`);
    el.style.setProperty("--deck-ink", ink);
    el.style.setProperty("--deck-dark", `rgb(${shade.join(", ")})`);
  }

  // ---------- Read out loud ----------

  const canSpeak = "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function";

  function speak(text) {
    if (!canSpeak) return;
    const synth = window.speechSynthesis;
    if (synth.speaking || synth.pending) synth.cancel();
    const words = linesOf(text)
      .map((line) => (/[.!?:,]$/.test(line) ? line : `${line}.`))
      .join(" ");
    const utterance = new SpeechSynthesisUtterance(words);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    synth.speak(utterance);
  }

  function stopSpeaking() {
    if (canSpeak && (window.speechSynthesis.speaking || window.speechSynthesis.pending)) {
      window.speechSynthesis.cancel();
    }
  }

  if (!canSpeak) {
    readBtn.hidden = true;
    autoReadWrap.hidden = true;
  }

  autoRead.checked = loadSetting();
  autoRead.addEventListener("change", () => saveSetting(autoRead.checked));

  function loadSetting() {
    try {
      return window.localStorage.getItem(SETTING_KEY) === "on";
    } catch (e) {
      return false;
    }
  }

  function saveSetting(on) {
    try {
      window.localStorage.setItem(SETTING_KEY, on ? "on" : "off");
    } catch (e) {
      // The browser does not let us save. That is OK.
    }
  }

  // ---------- Dialogs ----------

  function openDialog(dialog) {
    if (dialog.open) return;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function closeDialog(dialog) {
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
      dialog.dispatchEvent(new Event("close"));
    }
  }

  readBtn.addEventListener("click", () => {
    if (current) speak(current.card.text);
  });
  doneBtn.addEventListener("click", () => closeDialog(cardDialog));
  cardDialog.addEventListener("close", () => {
    stopSpeaking();
    flip.classList.remove("animate");
  });
  lastBtn.addEventListener("click", () => {
    if (lastCard) showCard(lastCard.deck, lastCard.card, false);
  });

  rulesBtn.addEventListener("click", () => openDialog(rulesDialog));
  rulesClose.addEventListener("click", () => closeDialog(rulesDialog));
  rulesDialog.addEventListener("click", (event) => {
    if (event.target === rulesDialog) closeDialog(rulesDialog);
  });

  // Letter keys (A to E, and P) take a card from that deck.
  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
    if (cardDialog.open || rulesDialog.open) return;
    const key = String(event.key || "").toLowerCase();
    const deck = decks.find((d) => d.letter.toLowerCase() === key);
    if (deck) {
      event.preventDefault();
      draw(deck);
    }
  });

  window.addEventListener("resize", () => {
    if (cardDialog.open) fitText();
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      if (cardDialog.open) fitText();
    });
  }
})();
