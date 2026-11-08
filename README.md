# Music Tutor 🎸

Application web progressive (PWA) conçue pour aider les jeunes enfants débutant la guitare à apprendre à lire les notes sur une portée en clé de Sol de manière ludique, autonome et bienveillante.

## But du projet

L'objectif est de transformer l'apprentissage du solfège pour la guitare en un jeu interactif rapide :

- Reconnaître les 7 notes naturelles de la clé de Sol (**Do**, **Ré**, **Mi**, **Fa**, **Sol**, **La**, **Si**).
- S'entraîner au cours de sessions dynamiques d'une minute.
- Développer simultanément l'oreille musicale grâce au son d'une corde de guitare pincée à chaque bonne réponse.
- Visualiser ses progrès au fil du temps grâce à un historique local des scores et un record personnel, sans compte ni publicité.

---

## Fonctionnalités

### Fonctionnalités complètes (Tickets 01 à 05)

- 🎼 **Portée musicale SVG sur-mesure** : Rendu vectoriel épuré, contrasté et réactif de la clé de Sol classique avec positionnement exact des notes et ligne supplémentaire pour le Do4.
- 🎹 **Boutons tactiles colorés** : 7 grands boutons adaptés aux doigts d'un enfant sur écran tactile, disposés dans l'ordre musical naturel (`Do` à `Si`).
- 🔊 **Synthèse de guitare Web Audio API & Contrôle Mute** :
  - Son de corde pincée acoustique modélisé et déclenché instantanément sans latence à chaque bonne note.
  - Bouton silencieux persistant (`🔇` / `🔊`) pour s'entraîner discrètement.
- 🎯 **Boucle de reconnaissance interactive** :
  - Incrémentation du score en temps réel à chaque bonne réponse.
  - Tirage aléatoire sans répétition consécutive de la même note.
  - Feedback d'erreur bienveillant (animation douce de secousse sans perte de score ni blocage).
- ⏱️ **Cycle de Session complet** :
  - Écran d'accueil accueillant avec bouton « Démarrer ».
  - Décompte visuel dynamique 3-2-1 pour se concentrer avant le départ.
  - Chronomètre visible de 60 secondes en temps réel.
  - Écran de célébration festif avec affichage valorisant du Score final et bouton « Rejouer » instantané.
- 📈 **Historique & Record personnel (`localStorage`)** :
  - Persistance locale et sécurisée des sessions sans inscription ni serveur.
  - Détection automatique et célébration spéciale (`🏆 Nouveau Record Personnel !`) lorsque le record est battu.
  - Graphique d'évolution interactif (histogramme SVG avec repère du record) retraçant les 15 dernières sessions.
- 📱 **Progressive Web App (PWA) & 100% Hors-ligne** :
  - Manifeste Web App avec icône vectorielle pour installation sur l'écran d'accueil (tablette/smartphone).
  - Service Worker de mise en cache pour jouer sans connexion Internet (voyage, vacances).
- ⚡ **Socle moderne et typé** : Développé avec React 19, TypeScript, Vite et Tailwind CSS v4.
- 🧪 **Suite de tests automatisés** : 28 tests d'intégration et unitaires pilotés par le comportement (Vitest + React Testing Library).

---

## Prérequis

- [Node.js](https://nodejs.org/) (version 20 ou supérieure recommandée)
- `npm`

---

## Installation

1. Cloner le dépôt :

   ```bash
   git clone https://github.com/lvaylet/music-tutor.git
   cd music-tutor
   ```

2. Installer les dépendances :

   ```bash
   npm install
   ```

---

## Utilisation

### Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez l'URL affichée dans votre terminal (par exemple `http://localhost:5173`) dans votre navigateur ou sur votre tablette connectée au même réseau local.

### Lancer les tests

```bash
npm test
```

Ou en mode surveillance continue :

```bash
npm run test:watch
```

### Compiler pour la production

```bash
npm run build
npm run preview
```

---

## Conventions du projet

Consultez [AGENTS.md](./AGENTS.md) pour les règles d'ingénierie et de git, ainsi que [GLOSSARY.md](./GLOSSARY.md) pour le vocabulaire du domaine musical (`Session`, `Note`, `Portée`, `Score`, `Record`, `Historique`).
