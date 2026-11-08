# 04: Persistance locale de l'Historique, Record personnel et graphique de progression

**What to build:** Sauvegarder automatiquement chaque Session terminée dans le stockage local du navigateur (`localStorage`) pour conserver l'Historique des scores sans création de compte. Déterminer et mettre en avant le Record personnel (avec félicitations spéciales et badge/trophée lorsque le record est battu à la fin d'une session), et afficher sur l'écran d'accueil un graphique simple et lisible retraçant les scores des 15 à 20 dernières sessions.

**Blocked by:** 03: Cycle de vie de la Session (Décompte 3-2-1, chronomètre 60s et écran de fin)

**Status:** ready-for-agent

- [ ] Chaque session terminée est persistée de façon immuable dans `localStorage` avec un identifiant, un horodatage et le score obtenu.
- [ ] Le Record personnel de l'enfant est calculé automatiquement à partir de l'Historique et affiché sur l'écran d'accueil.
- [ ] Si le score d'une session dépasse le précédent record, une mention spéciale de célébration s'affiche sur l'écran de fin.
- [ ] Un graphique visuel (barres ou courbe SVG) présente l'évolution des scores des 15 à 20 dernières sessions.
- [ ] L'état initial sans sessions (premier lancement) affiche un message d'encouragement simple et chaleureux.
- [ ] Des tests vérifient la persistance dans `localStorage`, la détection du record battu et l'affichage des points de progression.
