# 05: Contrôle sonore (Mute), ergonomie tactile et configuration PWA hors-ligne

**What to build:** Ajouter un bouton Mute (audio ON/OFF) persistant pour permettre de s'entraîner en silence. Peaufiner la mise en page responsive pour garantir un confort tactile optimal sur tablette et smartphone (grandes zones de toucher, contrastes vifs adaptés aux enfants). Configurer la Progressive Web App (manifest et service worker de mise en cache) afin que l'application s'installe sur l'écran d'accueil et fonctionne parfaitement hors-ligne sans connexion Internet.

**Blocked by:** 04: Persistance locale de l'Historique, Record personnel et graphique de progression

**Status:** ready-for-agent

- [ ] Un commutateur audio Mute (icône haut-parleur ON/OFF) est accessible en haut de l'écran et son état est persisté localement.
- [ ] Lorsque le mode muet est actif, la synthèse audio est désactivée lors de la validation des notes.
- [ ] L'interface est responsive et ergonomique en mode portrait comme en mode paysage sur smartphone et tablette tactile.
- [ ] Un fichier Web App Manifest (`manifest.json` ou `manifest.webmanifest`) et une icône d'application sont configurés pour l'installation sur l'écran d'accueil.
- [ ] Un Service Worker met en cache les assets statiques nécessaires pour garantir un fonctionnement complet sans réseau.
- [ ] Des tests vérifient que le bouton Mute coupe effectivement l'appel à la synthèse sonore et que sa préférence est restaurée au rechargement.
