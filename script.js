/* ============================================================
   MAGICAL MIKU TICKET REVEAL — script.js
   All game logic, character art, and scene transitions
   ============================================================ */

'use strict';

/* ── 1. PIXEL ART CHARACTER SVGs ────────────────────────────────
   Each character is defined as an SVG string.
   viewBox units are pixels; displayed at 6× scale.
   Colors use the character style guide below.
   ─────────────────────────────────────────────────────────────── */

const SKIN   = '#FECBA1';
const EYE    = '#2A1505';
const BLUSH  = '#FFB0B0';
const MOUTH  = '#E87070';
const SHINE  = '#FFFFFF';

// LOLA — long brown hair, black dress, normal height (16×24)
const LOLA_SVG = `
<svg viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg"
     width="80" height="120" style="image-rendering:pixelated">
  <rect x="2"  y="2"  width="12" height="18" fill="#5C3317"/>
  <rect x="4"  y="3"  width="8"  height="7"  fill="${SKIN}"/>
  <rect x="3"  y="2"  width="10" height="3"  fill="#5C3317"/>
  <rect x="4"  y="2"  width="8"  height="2"  fill="#5C3317"/>
  <rect x="5"  y="6"  width="2"  height="2"  fill="${EYE}"/>
  <rect x="6"  y="6"  width="1"  height="1"  fill="${SHINE}"/>
  <rect x="9"  y="6"  width="2"  height="2"  fill="${EYE}"/>
  <rect x="10" y="6"  width="1"  height="1"  fill="${SHINE}"/>
  <rect x="4"  y="8"  width="2"  height="1"  fill="${BLUSH}" opacity="0.85"/>
  <rect x="10" y="8"  width="2"  height="1"  fill="${BLUSH}" opacity="0.85"/>
  <rect x="7"  y="9"  width="2"  height="1"  fill="${MOUTH}"/>
  <rect x="7"  y="10" width="2"  height="1"  fill="${SKIN}"/>
  <rect x="4"  y="11" width="8"  height="8"  fill="#1A0A2E"/>
  <rect x="6"  y="11" width="4"  height="1"  fill="#3A1A5E"/>
  <rect x="2"  y="11" width="2"  height="6"  fill="${SKIN}"/>
  <rect x="12" y="11" width="2"  height="6"  fill="${SKIN}"/>
  <rect x="2"  y="17" width="2"  height="1"  fill="${SKIN}"/>
  <rect x="12" y="17" width="2"  height="1"  fill="${SKIN}"/>
  <rect x="5"  y="19" width="3"  height="3"  fill="#1A0A2E"/>
  <rect x="8"  y="19" width="3"  height="3"  fill="#1A0A2E"/>
  <rect x="4"  y="22" width="4"  height="2"  fill="#4A1A6E"/>
  <rect x="8"  y="22" width="4"  height="2"  fill="#4A1A6E"/>
  <rect x="2"  y="10" width="2"  height="10" fill="#5C3317"/>
  <rect x="12" y="10" width="2"  height="10" fill="#5C3317"/>
</svg>`;

// KIRA — short orange hair, slightly rounder/shorter, MÄNNLICHES Outfit (14×22)
const KIRA_SVG = `
<svg viewBox="0 0 14 22" xmlns="http://www.w3.org/2000/svg"
     width="70" height="110" style="image-rendering:pixelated">
  <rect x="2"  y="2"  width="10" height="2"  fill="#FF6B1A"/>
  <rect x="1"  y="3"  width="12" height="5"  fill="#FF6B1A"/>
  <rect x="2"  y="4"  width="10" height="7"  fill="${SKIN}"/>
  <rect x="1"  y="6"  width="1"  height="3"  fill="#FF6B1A"/>
  <rect x="12" y="6"  width="1"  height="3"  fill="#FF6B1A"/>
  <rect x="4"  y="6"  width="2"  height="2"  fill="${EYE}"/>
  <rect x="5"  y="6"  width="1"  height="1"  fill="${SHINE}"/>
  <rect x="8"  y="6"  width="2"  height="2"  fill="${EYE}"/>
  <rect x="9"  y="6"  width="1"  height="1"  fill="${SHINE}"/>
  <rect x="3"  y="8"  width="2"  height="1"  fill="${BLUSH}" opacity="0.85"/>
  <rect x="9"  y="8"  width="2"  height="1"  fill="${BLUSH}" opacity="0.85"/>
  <rect x="6"  y="9"  width="2"  height="1"  fill="${MOUTH}"/>
  <rect x="6"  y="11" width="2"  height="1"  fill="${SKIN}"/>
  <rect x="2"  y="12" width="10" height="6"  fill="#4A6741"/>
  <rect x="5"  y="12" width="4"  height="1"  fill="#3A5231"/>
  <rect x="4"  y="15" width="6"  height="2"  fill="#3A5231"/>
  <rect x="0"  y="12" width="3"  height="5"  fill="#4A6741"/>
  <rect x="11" y="12" width="3"  height="5"  fill="#4A6741"/>
  <rect x="0"  y="17" width="2"  height="1"  fill="${SKIN}"/>
  <rect x="12" y="17" width="2"  height="1"  fill="${SKIN}"/>
  <rect x="3"  y="18" width="8"  height="3"  fill="#2E4A7A"/>
  <rect x="6"  y="18" width="2"  height="3"  fill="#263F69"/>
  <rect x="2"  y="21" width="4"  height="1"  fill="#EEEEEE"/>
  <rect x="2"  y="21" width="4"  height="1"  fill="#DDDDDD"/>
  <rect x="8"  y="21" width="4"  height="1"  fill="#EEEEEE"/>
  <rect x="2"  y="21" width="5"  height="1"  fill="#CCCCCC"/>
  <rect x="7"  y="21" width="5"  height="1"  fill="#CCCCCC"/>
</svg>`;

// ALEX — shoulder-length brown hair, blue casual outfit (16×24)
const ALEX_SVG = `
<svg viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg"
     width="80" height="120" style="image-rendering:pixelated">
  <rect x="3"  y="2"  width="10" height="8"  fill="#8B5E3C"/>
  <rect x="4"  y="3"  width="8"  height="7"  fill="${SKIN}"/>
  <rect x="4"  y="3"  width="8"  height="2"  fill="#8B5E3C"/>
  <rect x="3"  y="9"  width="1"  height="4"  fill="#8B5E3C"/>
  <rect x="12" y="9"  width="1"  height="4"  fill="#8B5E3C"/>
  <rect x="5"  y="6"  width="2"  height="2"  fill="${EYE}"/>
  <rect x="6"  y="6"  width="1"  height="1"  fill="${SHINE}"/>
  <rect x="9"  y="6"  width="2"  height="2"  fill="${EYE}"/>
  <rect x="10" y="6"  width="1"  height="1"  fill="${SHINE}"/>
  <rect x="4"  y="8"  width="2"  height="1"  fill="${BLUSH}" opacity="0.85"/>
  <rect x="10" y="8"  width="2"  height="1"  fill="${BLUSH}" opacity="0.85"/>
  <rect x="7"  y="9"  width="2"  height="1"  fill="${MOUTH}"/>
  <rect x="7"  y="10" width="2"  height="1"  fill="${SKIN}"/>
  <rect x="4"  y="11" width="8"  height="5"  fill="#7DC4FF"/>
  <rect x="6"  y="11" width="4"  height="1"  fill="#5AAAEE"/>
  <rect x="4"  y="16" width="8"  height="5"  fill="#5B8DB8"/>
  <rect x="7"  y="16" width="2"  height="5"  fill="#4A7AA8"/>
  <rect x="2"  y="11" width="2"  height="6"  fill="${SKIN}"/>
  <rect x="12" y="11" width="2"  height="6"  fill="${SKIN}"/>
  <rect x="2"  y="17" width="2"  height="1"  fill="${SKIN}"/>
  <rect x="12" y="17" width="2"  height="1"  fill="${SKIN}"/>
  <rect x="5"  y="21" width="2"  height="2"  fill="#5B8DB8"/>
  <rect x="9"  y="21" width="2"  height="2"  fill="#5B8DB8"/>
  <rect x="4"  y="23" width="4"  height="1"  fill="#3A5A8A"/>
  <rect x="8"  y="23" width="4"  height="1"  fill="#3A5A8A"/>
</svg>`;

// HATSUNE MIKU — iconic twin tails, teal outfit (18×28, slightly taller)
const MIKU_SVG = `
<svg viewBox="0 0 18 28" xmlns="http://www.w3.org/2000/svg"
     width="90" height="140" style="image-rendering:pixelated">
  <rect x="0"  y="8"  width="3"  height="16" fill="#39C5BB"/>
  <rect x="0"  y="22" width="3"  height="5"  fill="#2AADA5"/>
  <rect x="15" y="8"  width="3"  height="16" fill="#39C5BB"/>
  <rect x="15" y="22" width="3"  height="5"  fill="#2AADA5"/>
  <rect x="3"  y="2"  width="12" height="7"  fill="#39C5BB"/>
  <rect x="3"  y="8"  width="3"  height="2"  fill="#1A8A84"/>
  <rect x="12" y="8"  width="3"  height="2"  fill="#1A8A84"/>
  <rect x="4"  y="3"  width="10" height="8"  fill="${SKIN}"/>
  <rect x="4"  y="3"  width="10" height="2"  fill="#39C5BB"/>
  <rect x="5"  y="6"  width="3"  height="3"  fill="${EYE}"/>
  <rect x="5"  y="6"  width="2"  height="2"  fill="#39C5BB" opacity="0.4"/>
  <rect x="7"  y="6"  width="1"  height="1"  fill="${SHINE}"/>
  <rect x="10" y="6"  width="3"  height="3"  fill="${EYE}"/>
  <rect x="10" y="6"  width="2"  height="2"  fill="#39C5BB" opacity="0.4"/>
  <rect x="12" y="6"  width="1"  height="1"  fill="${SHINE}"/>
  <rect x="4"  y="9"  width="3"  height="1"  fill="${BLUSH}" opacity="0.85"/>
  <rect x="11" y="9"  width="3"  height="1"  fill="${BLUSH}" opacity="0.85"/>
  <rect x="8"  y="10" width="2"  height="1"  fill="${MOUTH}"/>
  <rect x="8"  y="11" width="2"  height="1"  fill="${SKIN}"/>
  <rect x="5"  y="12" width="8"  height="6"  fill="#39C5BB"/>
  <rect x="7"  y="12" width="4"  height="1"  fill="white" opacity="0.9"/>
  <rect x="4"  y="18" width="10" height="5"  fill="#2AADA5"/>
  <rect x="4"  y="22" width="10" height="1"  fill="#1A8A84"/>
  <rect x="3"  y="12" width="2"  height="6"  fill="${SKIN}"/>
  <rect x="13" y="12" width="2"  height="6"  fill="${SKIN}"/>
  <rect x="3"  y="18" width="2"  height="1"  fill="${SKIN}"/>
  <rect x="13" y="18" width="2"  height="1"  fill="${SKIN}"/>
  <rect x="6"  y="23" width="2"  height="3"  fill="#222"/>
  <rect x="10" y="23" width="2"  height="3"  fill="#222"/>
  <rect x="5"  y="25" width="4"  height="3"  fill="#1A8A84"/>
  <rect x="9"  y="25" width="4"  height="3"  fill="#1A8A84"/>
  <rect x="1"  y="1"  width="2"  height="2"  fill="#FFE566" opacity="0.9"/>
  <rect x="15" y="2"  width="2"  height="2"  fill="#FFE566" opacity="0.9"/>
  <rect x="0"  y="5"  width="1"  height="1"  fill="white"   opacity="0.7"/>
  <rect x="17" y="6"  width="1"  height="1"  fill="white"   opacity="0.7"/>
</svg>`;

/* ── 2. CHARACTER MAP ────────────────────────────────────────── */
const CHAR_MAP = {
    'char-lola': LOLA_SVG,
    'char-kira': KIRA_SVG,
    'char-alex': ALEX_SVG,
    'char-miku': MIKU_SVG,
};

/** Inject all character SVGs into their placeholder divs */
function injectCharacters() {
    for (const [className, svg] of Object.entries(CHAR_MAP)) {
        document.querySelectorAll('.' + className).forEach(el => {
            el.innerHTML = svg;
        });
    }
}

/* ── 3. AMBIENT PARTICLES ────────────────────────────────────── */
const PARTICLE_EMOJIS = ['💖', '✨', '⭐', '🌸', '💫', '🎵', '🎀', '🌟'];

function spawnParticles() {
    const container = document.getElementById('particles');
    // Create 20 ambient floating particles
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('span');
        p.className = 'particle';
        p.textContent = PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)];
        p.style.cssText = `
      left: ${Math.random() * 100}%;
      --dur: ${6 + Math.random() * 10}s;
      --delay: ${Math.random() * 12}s;
      font-size: ${0.6 + Math.random() * 0.8}rem;
    `;
        container.appendChild(p);
    }
}

/* ── 4. SCENE MANAGEMENT ─────────────────────────────────────── */
let currentScene = 0;

/**
 * Transition to a given scene by index.
 * @param {number} index - Scene number (0–6)
 */
function goToScene(index) {
    const screens = document.querySelectorAll('.screen');
    const current = screens[currentScene];
    const next    = screens[index];
    if (!next || index === currentScene) return;

    // Fade out current
    current.classList.remove('active');

    // After CSS transition, activate next
    setTimeout(() => {
        next.classList.add('active');
        currentScene = index;
        onSceneEnter(index);
    }, 560);
}

/**
 * Called whenever a new scene becomes active.
 * Triggers scene-specific initialisation.
 */
function onSceneEnter(index) {
    switch (index) {
        case 1: startScene1(); break;
        case 2: startScene2(); break;
        case 3: startMiniGame(); break;
        case 4: startScene4(); break;
        case 5: startGiftScene(); break;
        case 6: startReveal(); break;
    }
}

/* ── 5. TYPEWRITER EFFECT ────────────────────────────────────── */
/**
 * Types out text character by character into an element.
 * @param {HTMLElement} el       - Target element
 * @param {string}      text     - Text to type
 * @param {number}      speed    - Milliseconds per character
 * @param {Function}    callback - Called when typing is done
 */
function typeWrite(el, text, speed = 36, callback) {
    el.textContent = '';
    let i = 0;
    const tick = setInterval(() => {
        el.textContent += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(tick);
            if (callback) callback();
        }
    }, speed);
}

/* ── 6. SCENE 1 — Lola Alone ─────────────────────────────────── */
function startScene1() {
    const textEl  = document.getElementById('dlg-text-1');
    const nextBtn = document.getElementById('btn-s1');

    typeWrite(
        textEl,
        'Woahhh Lola!\nSchau mal, wer gekommen ist, um dir zu helfen…',
        38,
        () => nextBtn.classList.remove('hidden')
    );

    nextBtn.onclick = () => goToScene(2);
}

/* ── 7. SCENE 2 — Kira & Alex Join ──────────────────────────── */
function startScene2() {
    const textEl  = document.getElementById('dlg-text-2');
    const nextBtn = document.getElementById('btn-s2');

    // Small delay so the slide-in animations finish first
    setTimeout(() => {
        typeWrite(
            textEl,
            'Kira & Alex: „Bitte helf uns die Herzen zu sammeln! ✨\nWir schaffen das zusammen…"',
            38,
            () => nextBtn.classList.remove('hidden')
        );
    }, 700);

    nextBtn.onclick = () => goToScene(3);
}

/* ── 8. MINI GAME — Collect 5 Hearts ────────────────────────── */
let collectedHearts = 0;

function startMiniGame() {
    collectedHearts = 0;
    updateHeartCounter();

    const area      = document.getElementById('game-area');
    const nextBtn   = document.getElementById('btn-game-next');
    area.innerHTML  = '';
    nextBtn.classList.add('hidden');

    // Spawn 5 hearts at random positions
    for (let i = 0; i < 5; i++) {
        setTimeout(() => spawnHeart(area, nextBtn), i * 300);
    }
}

function spawnHeart(area, nextBtn) {
    const heart = document.createElement('div');
    heart.className = 'game-heart';
    heart.textContent = '💖';

    // Random position within the game area (with padding)
    const areaW = area.offsetWidth  || 400;
    const areaH = area.offsetHeight || 260;
    heart.style.left   = `${10 + Math.random() * (areaW  - 80)}px`;
    heart.style.top    = `${10 + Math.random() * (areaH  - 60)}px`;
    heart.style.setProperty('--bob-dur',    `${1.5 + Math.random() * 1.5}s`);
    heart.style.setProperty('--drift-dur',  `${4   + Math.random() * 4}s`);
    heart.style.setProperty('--drift-delay',`${Math.random() * 2}s`);
    heart.style.setProperty('--drift-x',   `${-30 + Math.random() * 60}px`);

    heart.addEventListener('click', () => collectHeart(heart, nextBtn), { once: true });
    area.appendChild(heart);
}

function collectHeart(heart, nextBtn) {
    heart.classList.add('heart-pop');
    collectedHearts++;
    updateHeartCounter();

    // Tiny score popup
    showCollectPop(heart.offsetLeft + 16, heart.offsetTop, heart.parentElement);

    if (collectedHearts >= 5) {
        setTimeout(() => {
            nextBtn.classList.remove('hidden');
            nextBtn.onclick = () => goToScene(4);
        }, 600);
    }
}

function updateHeartCounter() {
    document.getElementById('collected').textContent = collectedHearts;
}

/** Shows a quick "✨ +1 ✨" floating pop on heart collection */
function showCollectPop(x, y, parent) {
    const pop = document.createElement('div');
    pop.textContent = '✨ +1';
    pop.style.cssText = `
    position: absolute;
    left: ${x}px;
    top: ${y}px;
    font-family: 'Press Start 2P', monospace;
    font-size: 0.55rem;
    color: #FF85C8;
    text-shadow: 2px 2px 0 #4A2060;
    pointer-events: none;
    z-index: 20;
    animation: popUp 0.9s ease-out forwards;
  `;
    parent.appendChild(pop);

    // Inject the keyframe dynamically once
    if (!document.getElementById('popup-kf')) {
        const style = document.createElement('style');
        style.id = 'popup-kf';
        style.textContent = `
      @keyframes popUp {
        0%   { opacity: 1; transform: translateY(0)    scale(1);   }
        100% { opacity: 0; transform: translateY(-50px) scale(1.3); }
      }
    `;
        document.head.appendChild(style);
    }

    setTimeout(() => pop.remove(), 950);
}

/* ── 9. SCENE 4 — Miku Appears ───────────────────────────────── */
function startScene4() {
    const textEl  = document.getElementById('dlg-text-4');
    const nextBtn = document.getElementById('btn-s4');

    spawnMagicSparkles();

    setTimeout(() => {
        typeWrite(
            textEl,
            '✨ Hatsune Miku: „Bist du bereit für deine Überraschung Lola? 🎶\nHier deine Belohnung, dafür das du die beste Freundin der Welt bist!!"',
            40,
            () => nextBtn.classList.remove('hidden')
        );
    }, 1200);

    nextBtn.onclick = () => goToScene(5);
}

/** Spawns animated sparkles for the magical scene */
function spawnMagicSparkles() {
    const container = document.getElementById('magic-sparkles');
    container.innerHTML = '';
    const sparks = ['✨','⭐','💫','🌟','🎵','💖','🎶','✦'];

    for (let i = 0; i < 24; i++) {
        const s = document.createElement('span');
        s.className = 'spark';
        s.textContent = sparks[Math.floor(Math.random() * sparks.length)];
        s.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --sd: ${0.8 + Math.random() * 1.4}s;
      --tx: ${-80 + Math.random() * 160}px;
      --ty: ${-80 + Math.random() * 160}px;
      animation-delay: ${Math.random() * 1.5}s;
      font-size: ${0.8 + Math.random() * 1}rem;
    `;
        container.appendChild(s);
    }

    // Respawn sparkles every 2.5s to keep the magic going
    setTimeout(spawnMagicSparkles, 2500);
}

/* ── 10. SCENE 5 — Gift Box ──────────────────────────────────── */
function startGiftScene() {
    const box   = document.getElementById('gift-box');
    const burst = document.getElementById('gift-burst');
    const hint  = document.querySelector('.gift-click-hint');

    // Reset state (in case of replays)
    box.classList.remove('open');
    burst.classList.add('hidden');

    box.onclick = () => {
        box.classList.add('open');
        burst.classList.remove('hidden');
        if (hint) hint.textContent = '🎁 Öffnet sich…';

        // Transition to final reveal after the animation plays
        setTimeout(() => goToScene(6), 1800);
    };
}

/* ── 11. SCENE 6 — Final Ticket Reveal ──────────────────────── */
function startReveal() {
    const msgEl = document.getElementById('ticket-message');

    // Die persönliche Nachricht — hier kannst du deinen Text anpassen!
    const message =
        'Ich liebe dich so sehr mein Schatz 💖\n\n' +
        'Ich hoffe, du hast \nsuper viel Spaß.\n\n' +
        'Das wird das schönste Konzert. 🎶';

    setTimeout(() => {
        typeWrite(msgEl, message, 40);
    }, 500);

    // Animate the ticket card after a short delay
    const card = document.getElementById('ticket-card');
    card.style.animationDelay = '0.3s';
}

/* ── 12. AUDIO TOGGLE ────────────────────────────────────────── */
let audioPlaying = false;

document.getElementById('audio-btn').addEventListener('click', () => {
    const bgm = document.getElementById('bgm');
    const btn = document.getElementById('audio-btn');

    // The <audio> src is empty by default.
    // To add music: upload an mp3 to your repo and set src here,
    // OR set the <source> src in the HTML.
    if (!bgm.src || bgm.src === window.location.href) {
        btn.textContent = '🔇';
        setTimeout(() => { btn.textContent = '🎵'; }, 800);
        return; // No audio source set yet
    }

    if (audioPlaying) {
        bgm.pause();
        btn.textContent = '🔇';
    } else {
        bgm.play().catch(() => {});
        btn.textContent = '🎵';
    }
    audioPlaying = !audioPlaying;
});

/* ── 13. BOOTSTRAP ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    // 1) Fill all character placeholder divs with their SVG art
    injectCharacters();

    // 2) Start ambient floating particles
    spawnParticles();

    // 3) Wire up the start button
    document.getElementById('btn-start').addEventListener('click', () => {
        goToScene(1);
    });

    // Note to Theo: to update the ticket link, find the <a id="ticket-link"> in
    // index.html and replace "DEIN_EVENTIM_LINK_HIER" with your actual URL.
});