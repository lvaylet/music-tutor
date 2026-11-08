# 02: Boucle de reconnaissance des notes, validation audio et feedback d'erreur

**What to build:** Rendre l'interaction sur les notes dynamique : lorsque l'enfant clique sur le bouton correspondant à la Note affichée sur la Portée, le son d'une corde de guitare pincée retentit (Web Audio API), le Score s'incrémente de 1 et une nouvelle Note aléatoire apparaît sans jamais afficher deux fois de suite la même note. En cas de mauvaise réponse, un retour visuel doux (secousse ou lueur colorée) invite l'enfant à retenter immédiatement sans pénalité de score ni blocage.

**Blocked by:** 01: Initialisation du projet et rendu interactif de base de la Portée

**Status:** ready-for-agent

- [ ] Cliquer sur le bon bouton de Note incrémente le Score affiché à l'écran.
- [ ] Une synthèse sonore de guitare via la Web Audio API est déclenchée lors de chaque bonne réponse.
- [ ] La validation d'une Note affiche immédiatement une nouvelle Note aléatoire choisie parmi Do4 et Si4.
- [ ] Deux notes identiques ne sont jamais affichées consécutivement.
- [ ] Cliquer sur un mauvais bouton de Note ne modifie pas le Score et n'avance pas la Note.
- [ ] Une mauvaise réponse déclenche une animation de feedback visuel bienveillante sur le bouton ou la portée.
- [ ] L'enfant peut retenter sa chance en cliquant sur un autre bouton jusqu'à trouver la bonne Note.
- [ ] Des tests d'intégration simulent les clics corrects et incorrects et vérifient l'absence de pénalité, la non-répétition consécutive et l'émission audio mockée.
