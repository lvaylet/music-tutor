# 03: Cycle de vie de la Session (Décompte 3-2-1, chronomètre 60s et écran de fin)

**What to build:** Structurer le jeu autour d'une Session chronométrée d'une minute : un écran d'accueil avec un bouton « Démarrer » lance un décompte visuel dynamique (3, 2, 1, C'est parti !) avant de déclencher la minute de jeu. Un chronomètre visible égrène les 60 secondes pendant que l'enfant reconnaît des notes. À 00:00, la session bascule automatiquement sur un écran festif affichant le Score final obtenu, des félicitations joyeuses et un bouton « Rejouer » pour relancer une Session.

**Blocked by:** 02: Boucle de reconnaissance des notes, validation audio et feedback d'erreur

**Status:** ready-for-agent

- [ ] L'écran d'accueil présente un bouton « Démarrer » accueillant et clairement visible.
- [ ] Cliquer sur « Démarrer » active un décompte visuel 3-2-1 préparatoire avant le début du jeu effectif.
- [ ] Le chronomètre démarre à 60 secondes et s'affiche clairement en temps réel pendant la Session.
- [ ] Dès que le chronomètre atteint 0 seconde, les boutons de jeu se désactivent et l'écran de fin de session apparaît.
- [ ] L'écran de fin présente le Score total de notes réussies durant la minute avec une mise en scène valorisante.
- [ ] Un bouton « Rejouer » présent sur l'écran de fin permet de relancer une nouvelle Session sans recharger la page.
- [ ] Des tests avec timers simulés (`vi.useFakeTimers()`) vérifient le déroulement complet du cycle de vie (`IDLE` -> `COUNTDOWN` -> `PLAYING` -> `FINISHED`).
