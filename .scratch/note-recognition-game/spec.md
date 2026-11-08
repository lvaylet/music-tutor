# Spécification : Jeu d'apprentissage des notes (Clé de Sol)

Status: resolved

## Problem Statement

Une jeune enfant de 7 ans qui commence la guitare a besoin d'apprendre à lire rapidement et avec confiance les notes sur une portée en clé de Sol (de Do à Si). Les méthodes traditionnelles de solfège sur papier peuvent sembler rébarbatives, abstraites et démotivantes à cet âge. Sans retour instantané, ludique et bienveillant, l'apprentissage devient une contrainte plutôt qu'un jeu, et il est difficile pour l'enfant et ses parents de percevoir clairement les progrès au fil des jours.

## Solution

Une Progressive Web App (PWA) épurée, tactile et gamifiée, conçue pour un usage autonome sur tablette, téléphone ou ordinateur. 
L'enfant lance une Session d'entraînement d'exactement une minute :
- Une Note unique apparaît sur une Portée en clé de Sol.
- L'enfant appuie sur le bouton correspondant au nom de la Note parmi 7 grands boutons colorés (`Do`, `Ré`, `Mi`, `Fa`, `Sol`, `La`, `Si`).
- Dès qu'elle choisit la bonne Note, une corde de guitare pincée résonne et la Note suivante apparaît.
- En cas d'erreur, une animation douce l'invite à retenter sa chance immédiatement sans pénalité de score ni perte de temps.
- À la fin de la minute, un écran de célébration affiche son Score, indique si elle a battu son Record personnel et enregistre la performance dans son Historique local. Un graphique simple lui permet de visualiser ses progrès dans le temps.

## User Stories

1. As a young learner, I want to see a clear and friendly "Démarrer" button on the home screen, so that I can start playing on my own without asking an adult for help.
2. As a young learner, I want to see a 3-2-1 visual countdown before the timer starts, so that I have time to get ready and focus before the game begins.
3. As a young learner, I want to see a single Note clearly displayed on a clean treble clef Portée, so that I can easily recognize where it is placed.
4. As a young learner, I want the Note to be drawn in a clear, high-contrast style on the Portée, so that I don't confuse lines and spaces.
5. As a young learner, I want to recognize notes ranging from Do4 (middle C on its ledger line below the staff) up to Si4 (middle line of the staff), so that I master the fundamental first octave taught in beginner guitar lessons.
6. As a young learner, I want to see 7 large, colorful buttons labeled with Latin note names (Do, Ré, Mi, Fa, Sol, La, Si), so that I can tap them easily with my fingers on a touchscreen.
7. As a young learner, I want the note buttons to be arranged in natural musical order (Do, Ré, Mi, Fa, Sol, La, Si), so that my spatial memory reinforces musical scale order.
8. As a young learner, I want to hear a realistic guitar plucked string sound when I choose the correct Note, so that I develop my musical ear while being instantly rewarded.
9. As a young learner, I want a gentle visual feedback (such as a soft shake or subtle orange/red glow) when I tap a wrong note, so that I know it's not the right one without feeling punished or discouraged.
10. As a young learner, I want to be allowed to tap another button immediately when I make a mistake, so that I can learn by trying until I find the correct Note.
11. As a young learner, I want to never see the exact same Note appear twice in a row, so that I never wonder if the screen froze or registered my tap.
12. As a young learner, I want to see a visible remaining-time indicator during the Session, so that I know how much time is left in my one-minute run.
13. As a young learner, I want to see my running Score increase by 1 each time I validate a correct Note, so that I feel motivated to keep going fast.
14. As a young learner, I want mistakes not to decrease my Score, so that I stay confident and never end up with a negative or disappointing result.
15. As a young learner, I want the Session to automatically stop when the 60 seconds expire, so that each practice run is short, dynamic, and digestible.
16. As a young learner, I want to see a joyful celebration screen at the end of the Session with festive animations and stars, so that I feel proud of my effort.
17. As a young learner, I want to see clearly how many notes I identified during the completed Session, so that I know my Score.
18. As a young learner, I want to be alerted with a special trophy or celebration if my Score beats my personal Record, so that I feel a strong sense of achievement.
19. As a young learner, I want a prominent "Rejouer" button on the end screen, so that I can immediately start another Session if I want to improve my Score.
20. As a young learner, I want to look at a simple progress graph showing my previous scores, so that I can see that I am getting faster and better over time.
21. As a parent, I want all progress and scores to be saved automatically in the local Historique without creating an account or typing a password, so that my child can use the app independently and privately.
22. As a parent, I want to consult the date and time associated with past sessions, so that I can track how consistently my child practices.
23. As a parent, I want an easily accessible audio toggle (Mute ON/OFF) on the interface, so that my child can practice silently when we are in a quiet room or traveling.
24. As a user on a tablet or mobile phone, I want the app to adapt perfectly to touch screens in both portrait and landscape modes, so that it is always comfortable to play.
25. As a user without internet access, I want the app to work completely offline as a PWA, so that it can be played anywhere (in the car, on vacation, or in airplane mode).

## Implementation Decisions

### Modules and Architectural Shape
- **PWA Client-Side Only Architecture**: The application is a standalone Progressive Web App with zero backend requirements. All state, scores, and preferences are stored locally in the browser's `localStorage` (ADR 0001).
- **Domain-Aligned Game Loop**:
  - The game is structured around the `Session` entity, representing a single 60-second timed run.
  - State machine transitions: `IDLE` (home screen with history and Start button) → `COUNTDOWN` (3-second visual countdown) → `PLAYING` (60-second active timer, reactive note display, and score counting) → `FINISHED` (celebratory summary screen with score, record comparison, and replay option).
- **Custom Vector Stave Renderer**:
  - The treble clef Portée and the active Note are drawn directly using custom SVG markup (ADR 0002).
  - Stave geometry: 5 horizontal lines, treble clef icon, ledger line for Do4, and accurate vertical positioning for the 7 diatonic notes (Do4, Ré4, Mi4, Fa4, Sol4, La4, Si4).
  - Clean, high-contrast, child-friendly styling with smooth transitions.
- **Synthesized Audio Engine**:
  - Sound generation uses the browser's native `AudioContext` (Web Audio API) to model guitar plucked string tones (Karplus-Strong physical modeling or synthesis envelope) without network latency or external audio files (ADR 0003).
  - An audio manager module tracks mute preferences (`isMuted` boolean stored in localStorage) and prevents audio emission when muted.
- **Randomization with Non-Repetition**:
  - A generator function picks the next Note uniformly among the 7 notes, enforcing `nextNote !== currentNote`.
- **Historique and Record Store**:
  - An immutable persistence layer saves completed sessions with `{ id, timestamp, score }`.
  - Computes all-time `Record` (maximum score) and extracts the last 15 to 20 sessions to render a lightweight SVG progression chart.
  - Gracefully handles empty states (first time playing) with encouraging guidance.

## Testing Decisions

### What Makes a Good Test
- Tests must interact strictly through user-visible elements (buttons, headings, SVG note labels, timer progress) rather than testing internal component state or unexported helper functions.
- Tests must verify behavioral contracts: clicking wrong notes does not advance the score or change the note; clicking the correct note updates the score, advances the note, and triggers audio; elapsed timer ends the game and saves to localStorage.

### Testing Seam
- **Primary Seam**: The root `<App />` component.
- The tests run against the integrated UI rendered in a Vitest + React Testing Library jsdom environment.
- **Mock Boundary**: The browser's native `AudioContext` interface is mocked with a spy to assert that guitar sound synthesis is invoked on correct answers and silenced when muted. `localStorage` is backed by the standard in-memory storage. Timer advancement is handled through Vitest fake timers (`vi.useFakeTimers()`).

### Modules Covered by Tests
- The end-to-end user journey across all states (`IDLE`, `COUNTDOWN`, `PLAYING`, `FINISHED`).
- The note validation and soft-error logic (wrong note triggers visual shake, correct note increments score).
- Non-repetition invariant between consecutive notes.
- Timer expiration at 60 seconds.
- Session persistence, Record calculation, and Historique display updates across multiple simulated runs.

## Out of Scope

- Notes outside the Do4–Si4 range (bass clef, high treble ledger lines).
- Musical accidentals (sharps `#` and flats `b`).
- Anglo-Saxon notation (C, D, E, F, G, A, B) as default (can be added as an optional setting in future versions).
- Multi-user accounts, cloud sync, social leaderboards, or authentication.
- Guitar fretboard mapping or tablature display (this module focuses solely on reading the staff).

## Further Notes

- The color palette for the 7 note buttons should be warm, distinctive, and accessible (sufficient contrast between text and background).
- All domain vocabulary in the code, comments, and tests must strictly adhere to `GLOSSARY.md` (`Session`, `Note`, `Portée`, `Score`, `Record`, `Historique`).
