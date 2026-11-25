# Regards depuis l'espace

*Views from space: the home page of three interactive guides to spacecraft, in English (default) and French.*

Page d'accueil commune, servie à la racine de https://rolgim.github.io/, qui présente et relie les trois sites de la série :

| Site | Sujet | Adresse | Dépôt | Surlignage |
|---|---|---|---|---|
| Observatoires en orbite | télescopes spatiaux | https://rolgim.github.io/Observatories/ | [Rolgim/Observatories](https://github.com/Rolgim/Observatories) | jaune `#FFD21F` |
| Explorateurs du Système solaire | sondes planétaires | https://rolgim.github.io/SolarExplorers/ | [Rolgim/SolarExplorers](https://github.com/Rolgim/SolarExplorers) | bleu `#2F6FE4` |
| Observateurs de la Terre | satellites d'observation de la Terre | https://rolgim.github.io/EarthObservers/ | [Rolgim/EarthObservers](https://github.com/Rolgim/EarthObservers) | vert `#127A46` |

Les liens ouvrent chaque site dans la langue choisie sur la page d'accueil (`#fr-` ou `#en-`, compris par les trois sites).

## Organisation

| Chemin | Rôle |
|---|---|
| `index.html` | toute la page : HTML (textes anglais), CSS, script (textes français, langue, thème). Aucune dépendance, aucune étape de construction |
| `favicon.svg` | icône : trois points aux couleurs des trois sites |
| `tools/check.js` | test dans un vrai navigateur : accessibilité WCAG 2.1 A et AA (axe-core), erreurs JavaScript, défilement horizontal, langue et liens, en clair et en sombre, sur bureau et mobile |
| `socle/` | **socle commun** des sites de la série (construction, langue, traduction, visionneuse 3D, styles de base, outils de test), copié dans chaque site par `node socle/sync.js` ; non publié sur la page d'accueil. Mode d'emploi : [socle/README.md](socle/README.md) |
| `CREDITS.md`, `data/credits.json` | registre de ce que la page affiche sans l'avoir créé |
| `.github/workflows/` | `pages.yml` publie sur GitHub Pages ; `tests.yml` lance `tools/check.js` |

Les nombres affichés (18 observatoires, 17 sondes, 20 satellites, au 25 novembre 2026) sont écrits à la main dans `index.html` : les mettre à jour quand un site s'agrandit.

Pour la voir en local : ouvrir `index.html` dans un navigateur. Pour la tester : `npm install --no-save playwright@1.56.0 axe-core@4.10.2`, `npx playwright install chromium`, puis `node tools/check.js`.

## Crédits et licences

Le code et les illustrations de la page sont sous licence [Apache 2.0](LICENSE) (voir aussi [NOTICE](NOTICE)). Les seuls éléments extérieurs sont les deux polices, listées dans [CREDITS.md](CREDITS.md).
