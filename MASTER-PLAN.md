# Marcelle's Animal Word Adventure — Master Development Plan
**Started:** March 2026 | **Player:** Marcelle (turning 6 in May 2026)
**Guiding principle:** Game is live and playable at all times. We add features incrementally — never break what Marcelle can already play.

---

## PART A — Educational Content (Priority Now)

### Project A-1: Word Sequencing + Difficulty Curve + Sentence Builder
*Status: UP NEXT*

**A-1a: Fix word sequencing (no repeats)**
- Words must not repeat within a single level (10 questions)
- Track used words per level session; draw from remaining pool
- Words may recur across different levels (pool is large enough but repetition across levels is fine — even beneficial for learning)

**A-1b: Difficulty curve within each level**
- Questions 1–3: Easier/shorter sight words (pre-primer Dolch: a, I, the, is, go, see, run, etc.)
- Questions 4–5: Mid-tier sight words (primer/Grade 1)
- Questions 6–10: Harder words (Grade 2+)
- Define tiers explicitly in the word data so this is easy to adjust

**A-1c: Sentence builder (questions 6–10)**
- Questions 1–5: Current format — hear a word, tap the correct word from 3 choices
- Questions 6–8: Simple sentences — voice reads the sentence, player drags/clicks words into correct order
  - Examples: "The cat is black." / "The dog ran fast." / "I see a big red ball."
  - 2–3 decoy words included that are NOT in the sentence
- Questions 9–10: More complex sentences — still using sight words but longer structure
  - Examples: "I went to the store for food." / "I ran to catch the bus in the morning."
  - Same drag-and-drop mechanic, slightly more words, slightly more decoys
- Sentence word bank: displayed as shuffled word tiles at the bottom; drag or tap to place in order
- Answer area: blank slots at top, one per word in the sentence
- Feedback: sentence turns green + spoken aloud when correct; gentle shake + try again when wrong

**Sentence pool to build:**
- Simple (Q6–8): ~30 sentences using primarily pre-primer/primer Dolch words
- Complex (Q9–10): ~20 sentences using Grade 1–2 sight words in fuller structure

---

### Project A-2: Math Levels
*Status: After A-1 is complete*

**Concept:** Dedicated math levels woven into the journey rotation (see Level Rotation below).
Math levels use the same map/location/friend structure but replace the word activity with a math activity.

**Math topics (K–1st grade curriculum):**
- **Addition (basic):** Single digit, e.g., 2 + 3 = ?; answer choices (multiple choice or number tap)
- **Subtraction (basic):** Single digit, e.g., 7 − 4 = ?
- **Counting:** Count the objects shown (emoji clusters), select the correct number
- **Number recognition:** Which number is bigger/smaller?
- **Shapes:** Name the shape shown
- **Word problems (simple):** "You have 3 apples. You get 2 more. How many?" — spoken aloud + illustrated with emoji
- **Patterns:** What comes next in the pattern? (emoji sequence)
- **Skip counting:** Count by 2s or 5s

**Mechanics:**
- Voice reads the problem aloud
- Answer format: tap the correct number/answer from 3–4 choices (same tap mechanic as sight words)
- Word problems: voice reads, emoji illustrates, same multiple choice
- 10 questions per math level (no drag-and-drop needed for math — keep it simple)

---

### Project A-3: Spanish Levels
*Status: After A-2 is complete*

**Concept:** Spanish levels mirror the English sight word + sentence structure from A-1. Same format, same mechanics — just Spanish vocabulary.

**Content:**
- Spanish sight word equivalents of the English Dolch list
  - Examples: el/la, y, es, un, ver, ir, grande, rojo, aquí, yo, jugar, correr
- Spanish simple sentences (Q6–8): "El gato es negro." / "El perro corrió rápido."
- Spanish complex sentences (Q9–10): "Fui a la tienda por comida." / "Corrí para tomar el autobús."
- Voice reads Spanish using `speechSynthesis` with `lang: 'es-MX'` or `'es-US'`

**Context:** Marcelle attends a dual-language academy — Spanish reinforces what she's learning in school.

---

### Level Rotation (A-1 + A-2 + A-3 combined)
Once all three projects are complete, the 9-level journey for each character rotates through topics:

| Level | Topic | Type |
| --- | --- | --- |
| 1 | English Sight Words + Sentences | A-1 |
| 2 | Math — Addition | A-2 |
| 3 | Spanish Sight Words + Sentences | A-3 |
| 4 | Math — Subtraction | A-2 |
| 5 | English Sight Words + Sentences | A-1 |
| 6 | Math — Counting / Word Problems | A-2 |
| 7 | Spanish Sight Words + Sentences | A-3 |
| 8 | Math — Shapes / Patterns | A-2 |
| 9 | English or Spanish — Mixed Challenge | A-1/A-3 |

*Rotation can be tuned once we see how Marcelle responds to pacing.*

---

## PART B — Activity & Fun Enhancements
*Status: IN PROGRESS*

### Project B-3: Mini Reward Games (between levels)
*Status: IN PROGRESS — 3 of 9 games built*

After each completed level (except the final one), a 30–60 second arcade-style mini-game plays as a reward before returning to the map. Player earns +5 bonus stars per mini-game.

**Implemented games (rotate across levels):**
1. **Star Swimmer** 🌊 — Move with arrow keys, collect ⭐ in an ocean scene (45s)
2. **Chomp!** 👾 — Pac-Man inspired: eat dots in a maze, avoid the ghost (60s)
3. **Cross the Road** 🚗 — Frogger inspired: cross traffic lanes to reach the goal (45s)

**Implemented (session 2):**
4. **Space Blaster** 🚀 — Space Invaders: auto-shoot, blast aliens in waves, explosions (45s)
5. **Jump & Run** 🏃 — Auto-scroll platformer: jump over obstacles, collect coins, speeds up (45s)
6. **Pong!** 🏓 — Classic paddle vs CPU, first to 3 wins, ball speeds up (60s)

**Implemented (session 3):**
7. **Block Drop** 🧱 — Tetris: 5 piece types, left/right/down, clear rows for 20pts (45s)
8. **Brick Breaker** 🧱 — Breakout: paddle bounces ball to smash colorful bricks, wave clears, 60s
9. **Barrel Dodge** 🛢️ — Donkey Kong: climb 5 platforms via ladders, dodge rolling barrels, reach flag for 50pts (45s)

**Game order:** Shuffled randomly each journey — all 9 games appear once, in a different order every time.

**Technical:** Canvas-based games in the same HTML file. Arrow keys + WASD + touch d-pad. Game loop via requestAnimationFrame with timer countdown.

### Project B-4: Speech Recognition Read-Aloud Mode
*Status: PLANNED — requires GitHub Pages deployment first*

- Display a word or sentence on screen; Marcelle reads it aloud into the mic
- `SpeechRecognition` API checks if she said it right (English `en-US` + Spanish `es-MX`)
- Generous/fuzzy matching + "Skip" button for when mic misunderstands
- Requires HTTPS (GitHub Pages) — won't work from file://
- Test with Marcelle's actual voice before building too much
- Could replace some Q1-5 word rounds with read-aloud rounds

### Project B-1: Progressive Scene Storytelling
*Status: PLANNED — brainstorm needed*

Replace random emoji sceneStates with meaningful 10-step visual progressions (canvas/SVG) that show tangible progress: beak cleaning off, food filling a basket, water jug filling up, etc.

### Project B-2: Enhanced Correct-Answer Feedback
*Status: PLANNED*

- Bonus stars for answer streaks (3 in a row = bonus star)
- Confetti burst / screen flash on correct answers
- Sound effects (correct chime, wrong buzz, streak fanfare, level complete celebration)
- Math-specific celebration (flash completed equation)

### Other B Items (not yet prioritized)
- Level-win screen: wait for TTS to finish before advancing; add tap-to-continue
- Animated character walking along map path between locations
- Custom modal for "Start Over" instead of browser `confirm()`
- Sticker/badge collection per completed character journey
- Personal best tracking in localStorage
- "Practice mode" for words gotten wrong

---

## PART C — Polish, Visuals, Voice & Deployment
*Status: After Part B — brainstorm session needed*

**Ideas to develop:**
1. Custom illustrated or animated character sprites (replace emoji characters)
2. Real background art for each biome instead of emoji sprite clusters
3. Better voice — investigate alternatives to browser TTS (ElevenLabs, pre-recorded audio clips)
4. Sound effects (correct answer chime, wrong answer buzz, level complete fanfare)
5. Background music — soft, looping, child-friendly
6. Fix Dark Forest biome (shares appearance with regular Forest — needs unique visuals)
7. **Deploy to GitHub Pages** so the game can be played on any device/computer
  - Convert to a clean file structure if needed (separate CSS/JS files)
  - Set up GitHub repository and Pages hosting
  - Share URL so Marcelle can play on tablet, school computer, etc.
8. Mobile/tablet optimization — larger tap targets, orientation handling

*We will brainstorm and prioritize C items once Part B is shipped.*

---

## PART D — Advanced Reading & Interactivity
*Status: Future — after Parts A, B, C*

**Ideas to explore:**
1. **Speech recognition / read-aloud mode:** Display a sentence on screen; Marcelle reads it aloud; game listens via Web Speech API (`SpeechRecognition`) and tells her right/wrong
  - Feasibility: Web Speech Recognition works in Chrome; needs HTTPS (fine on GitHub Pages)
  - Accuracy with young voices is imperfect — needs careful threshold tuning
2. Phonics mode — focus on letter sounds and blending, not just whole words
3. Comprehension questions — read a short 2–3 sentence story, answer a question about it
4. Writing/tracing mode — trace letters with finger on touchscreen

*Brainstorm session before starting Part D.*

---

## PART E — Nora's Version (Age 3–4)
*Status: Future — after Part D or in parallel*

**Concept:** On the opening screen, player selects **Marcelle** or **Nora** before choosing a character. Each player has their own save slot and age-appropriate content.

**Nora's content (3–4 year old curriculum):**
- Letter recognition — hear a letter name, tap the correct letter
- Letter sounds — hear a sound, tap the matching letter
- Number recognition (1–10) — hear a number, tap it
- Counting (1–10) — count emoji objects, tap the answer
- Colors — hear a color name, tap the matching colored shape
- Shapes — hear a shape name, tap the correct shape
- Simple matching — match animal to sound, color to object, etc.
- Shorter sessions — maybe 6 questions per level instead of 10
- More celebration/reward moments — Nora needs more frequent positive feedback

**Technical:** Single codebase with a player-profile system selecting content tier at launch.

---

## Known Bugs / Quick Fixes (Address Opportunistically)
- [ ] Dark Forest biome is visually identical to regular Forest — give it unique emoji decorations
- [ ] Level-win screen auto-advances in 2.5s — speech may not finish; add a tap-to-continue option
- [ ] "Start Over" uses browser `confirm()` dialog — replace with a custom in-game modal
- [ ] `Play Again!` button goes to map, not directly into level 1 — minor UX friction

---

## Flagged Items from A-1 Review (carry forward to future parts)

### → Part B
- **Level-win screen auto-advances in 2.5s** — TTS may not finish reading the success message before the screen changes; replace timer with a tap-to-continue button (or wait for speech to finish)
- **Start Over uses browser \****`confirm()`**\*\* dialog** — jarring vs. the colorful UI; replace with a custom in-game modal
- **No snap/slide animation when a sentence tile is placed** — a subtle animation when the word lands in the slot would feel more satisfying for a child
- **Wrong sentence resets completely** — currently all placed words return to the bank on a wrong answer; revisit once we observe how Marcelle responds; partial highlighting of wrong words is an alternative

### → Part C
- **Sentence tile touch targets on tablet/small screen** — word tiles may need larger padding or a minimum size for comfortable tapping on smaller devices; test on her actual device
- **Sentence difficulty ordering is now by word count** — works well but revisit once we have more sentence data; could eventually sort by vocabulary complexity instead

### → Part D
- **Adaptive difficulty for word tiers** — track which specific words Marcelle misses repeatedly and surface them more often; eventually learn her personal weak spots
- **Sentence builder as speech recognition foundation** — the slot-based sentence display is a natural fit for Part D's read-aloud mode: display the sentence in filled slots, she reads it aloud, game checks her pronunciation word by word
- **Sentence decoys are fixed per sentence** — "The cat is black" always has the same 2 decoys; could randomize decoys from a common-word pool for more variety on replays

---

## Flagged Items from A-2 Review (carry forward to future parts)

### → Part B
- **Math-specific celebration moment** — after a correct math answer, briefly flash the completed equation (e.g. "2 + 3 = 5 ✅") before advancing; more satisfying than just a green button
- **Question type icon/label** — show a small icon at the top of each math question (➕ for addition, ➖ for subtraction, 🔢 for counting, 🕐 for time) so Marcelle knows what kind of problem she's solving
- **Wrong math answer feedback** — currently just shakes the wrong button; could also highlight the correct button after 1–2 wrong attempts (scaffolded hint)

### → Part C
- **Math touch targets on tablet** — math answer buttons should be tested on Marcelle's actual device; may need larger min-width for comfortable tapping
- **Clock SVG readability** — at 12:00, both hands overlap at the top; may benefit from a colored dot on the minute hand tip or slightly different styling to distinguish them
- **Instruction text customization** — all math questions say "Listen and pick the answer!"; could vary by type ("How many do you see?", "What time is it?", "What comes next?")

### → Part D
- **Adaptive math difficulty** — track which question types (addition, subtraction, counting, shapes/time) Marcelle consistently misses and weight those higher in future math levels
- **Missing-number format** — introduce "2 + ___ = 5" style questions as a harder variant for T3 or a 2nd-grade expansion (Part A-2 v2)
- **No-repeat math question tracking** — like sentences, could track which specific math questions have been seen this game session and avoid repeats; lower priority since the pools are large and math repetition is pedagogically fine
- **Word problems with full emoji illustration at T1** — currently word problems only appear in T3; a very simple illustrated word problem (e.g. "You have 2 🐶 and get 1 more 🐶. How many?") would be engaging for younger players in earlier levels

---

## Work Order Summary

| Phase | Project | Status |
| --- | --- | --- |
| **A-1** | Word sequencing (no repeats) + difficulty tiers + sentence builder | **COMPLETE** |
| **A-2** | Math levels — mixed types per level, 4 difficulty tiers across journey | **COMPLETE** |
| **A-3** | Spanish levels — T1/T2 words, simple/complex sentences, TTS (Raul/Sabina), translation hints | **COMPLETE** |
| **B-3** | Mini reward games between levels — 9 games, shuffled order each journey | **COMPLETE** |
| **B-1** | Progressive scene storytelling (replace emoji sceneStates with visual progressions) | Planned |
| **B-2** | Enhanced correct-answer feedback (streaks, confetti, sound effects, screen flash) | **COMPLETE** |
| **C** | Polish, visuals, voice, GitHub deployment | Future |
| **D** | Advanced reading / speech recognition | Future |
| **E** | Nora's version | Future |

---

## Session Log
| Date | Work Done |
| --- | --- |
| Mar 2026 | Master plan created; current game reviewed and documented |
| Mar 2026 | A-1 complete — word tiers, no-repeat words per level, no-repeat sentences per game, sentence builder (tap-to-place), sentence difficulty ordered by word count |
| Mar 2026 | A-2 complete — math levels (addition, subtraction, counting, shapes/time); mixed types per level; 4-level difficulty progression; SVG clock face; Fisher-Yates shuffle fix applied globally |
| Mar 2026 | A-3 complete — Spanish sight words (20 T1 + 20 T2), simple/complex sentences with translations, TTS voices (Raul words / Sabina sentences), translation hints after correct answers, levels 2 & 6 are Spanish |
| Mar 2026 | B-3 built — mini-game infrastructure + 3 games: Star Swimmer (ocean collect, speed phases, jellyfish hazards), Chomp! (pac-man maze, 2nd ghost last 15s), Cross the Road (frogger, progressive difficulty + mercy slowdown). 600x600 canvas, on-canvas timer/score, player glow, touch d-pad. Test mode via ?testgame=N. Paused at 3/9 — games 4-9 later. |
| Mar 2026 | B-2 complete — sound effects, confetti, screen flash, streaks (+1 bonus star every 3), fireworks at 5-streak and level complete |
| Mar 2026 | B-3 complete — all 9 mini-games built. Games 4-6: Space Blaster, Jump & Run (holes + reachable coins), Pong (rubber-band AI, diagonal enforcement). Games 7-9: Block Drop (Tetris w/ rotation, 60s, speed phases), Brick Breaker (replaced Puzzle Push — rally speed system), Barrel Dodge (DK). Game order shuffled per journey. |
| Mar 2026 | B-2 polish — fireworks at 5-streak and level complete, repeat 🔊 slows voice 15% per press (floor 0.35), all TTS functions accept rate parameter |
| Mar 2026 | Level type rotation shuffled — E/M/S each appear 3x in groups of 3, no back-to-back. Math counting replaced with number patterns (fill-in-the-blank sequences). B-4 (speech recognition read-aloud) added to plan for post-GitHub-Pages. |
