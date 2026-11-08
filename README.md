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

### Disponibles (Ticket 01)
- 🎼 **Portée musicale SVG sur-mesure** : Rendu vectoriel épuré, contrasté et réactif de la clé de Sol avec positionnement exact des notes et ligne supplémentaire pour le Do4.
- 🎹 **Boutons tactiles colorés** : 7 grands boutons adaptés aux doigts d'un enfant sur écran tactile, disposés dans l'ordre musical naturel (`Do` à `Si`).
- ⚡ **Socle moderne et typé** : Développé avec React 19, TypeScript, Vite et Tailwind CSS v4.
- 🧪 **Suite de tests automatisés** : Tests d'intégration et unitaires pilotés par le comportement (Vitest + React Testing Library).

### En cours / À venir (Tickets 02 à 05)
- 🔊 **Ticket 02** : Boucle de reconnaissance interactive avec synthèse sonore de guitare (Web Audio API) et retours visuels bienveillants en cas d'erreur.
- ⏱️ **Ticket 03** : Session chronométrée de 1 minute avec décompte préparatoire 3-2-1 et écran de célébration festif.
- 📈 **Ticket 04** : Historique persisté en `localStorage`, calcul du record absolu et graphique d'évolution des scores.
- 📴 **Ticket 05** : Mode muet (Mute ON/OFF), ergonomie responsive peaufinée et support PWA 100% hors-ligne.

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
