# 01: Initialisation du projet et rendu interactif de base de la Portée

**What to build:** Mettre en place le socle de l'application (React, TypeScript, Vite, Tailwind CSS, environnement de test Vitest / React Testing Library) et afficher un premier écran fonctionnel présentant une Portée en clé de Sol dessinée en SVG vectoriel avec une Note visible (située entre Do4 et Si4) et les 7 boutons de notes ordonnés de `Do` à `Si`.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Le projet compile et démarre via Vite avec React, TypeScript et Tailwind CSS.
- [ ] L'environnement de test Vitest avec `@testing-library/react` et jsdom est configuré et exécutable via `npm test`.
- [ ] La Portée en clé de Sol est rendue proprement en SVG avec ses 5 lignes horizontales et sa ligne supplémentaire sous la portée pour le Do.
- [ ] Une Note est positionnée avec exactitude à sa hauteur musicale sur la Portée (par exemple Do4 sur sa ligne supplémentaire ou Sol4 sur la 2e ligne).
- [ ] Les 7 boutons de réponse (`Do`, `Ré`, `Mi`, `Fa`, `Sol`, `La`, `Si`) sont visibles à l'écran dans l'ordre musical naturel sous forme de grandes cibles tactiles.
- [ ] Un test unitaire/d'intégration valide que la Portée et les 7 boutons de notes sont présents et accessibles dans le document.
