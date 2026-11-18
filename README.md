# LabERUN76 — page d'accueil des outils numériques

Les outils numériques de la **Mission Numérique Éducatif 76** pour l'école primaire, publiés sur la Forge des communs numériques éducatifs.

- **Site** (adresse provisoire) : <https://missionnumerique76.forge.apps.education.fr/laberun76>
- **Projet** : <https://forge.apps.education.fr/missionnumerique76/laberun76>

**Ouvrir `index.html` = voir la page d'accueil.** Aucune installation, aucune compilation.

## Organisation

```
Outils/          ← UN DOSSIER PAR OUTIL : c'est le seul endroit où l'on travaille
  categories.json   les catégories (nom, couleur, icône, ordre)
  tirage-au-sort/   exemple : les fichiers de l'outil + sa fiche outil.json
  _modele/          page de départ d'un nouvel outil (n'apparaît pas sur l'accueil)
a-migrer/        ← outils en attente : fiches de l'ancien site, et nouveaux outils déposés pour Claude
index.html       ← la page d'accueil
accessibilite.html  ← la déclaration d'accessibilité
accueil/         ← apparence et fonctionnement de l'accueil, liste générée outils.js (ne pas modifier),
                   et l'UI commune des outils (outil.css, outil.js)
sw.js  manifest.webmanifest   ← application installable et hors ligne
scripts/         ← assistant, mise à jour, sécurité
.gitlab-ci.yml   ← publication automatique sur la Forge
```

## Ajouter un outil

### Directement sur la Forge (sans rien installer)

1. Ouvrir le projet sur la Forge, puis **Modifier › Web IDE** (ou appuyer sur la touche `.`).
2. Dans l'explorateur à gauche, **glisser le dossier de l'outil** (avec sa page `.html`, ses images, scripts…) dans le dossier `Outils`.
3. Dans ce nouveau dossier : clic droit › **Nouveau fichier**, nommé `outil.json` :
   ```json
   {
     "titre": "Calcul mental flash",
     "description": "Des calculs chronométrés pour travailler les automatismes.",
     "icone": "⚡",
     "categorie": "vie-de-classe"
   }
   ```
   Catégories disponibles : voir `Outils/categories.json` (champ `id`, ou son titre, ex. `"Direction d'école"`).
   Si la page de l'outil ne s'appelle pas `index.html` et qu'elle est la seule page `.html` du dossier, elle est trouvée toute seule.
4. Icône **Contrôle de source** (à gauche) › écrire un message › **Valider et pousser** sur `main`.
5. **Compilation › Pipelines** (*Build › Pipelines*) : la mise à jour tourne (≈ 1 min). ✅ = site à jour.
   ❌ = cliquer dessus puis sur la tâche en rouge : le message indique quoi corriger.

> Sans fiche, l'outil s'affiche quand même dans « Autres outils ».

### En le confiant à Claude

Déposer les fichiers bruts de l'outil dans `a-migrer/<nom>/` (même méthode, dans le dossier `a-migrer`), puis demander à Claude :
« Nouvel outil dans a-migrer/<nom> : intègre-le ». Claude range l'outil, écrit sa fiche, lui applique l'UI commune,
le vérifie et propose une demande de fusion (voir `a-migrer/LISEZ-MOI.md`).

### Sur son ordinateur (Node.js 18 ou plus)

1. Glisser le dossier de l'outil dans `Outils/`.
2. `npm run ajouter` → choisir le dossier, répondre aux questions. La page est mise à jour.
3. Ouvrir `index.html` pour vérifier, puis envoyer (`git add -A`, `git commit`, `git push`).

### Options de la fiche

| Champ | Rôle |
|---|---|
| `titre`, `description`, `icone`, `categorie` | Obligatoires (description : 160 caractères max) |
| `page` | Page d'entrée si ce n'est pas `index.html` (ex. `"carnet.html"`) |
| `ordre` | Position dans la catégorie (1, 2, 3…), sinon ordre alphabétique |
| `url` | Outil hébergé ailleurs : `"https://…"` (remplace `page`) |

**Nouvelle catégorie** : ajouter un bloc dans `Outils/categories.json` (couleurs : `bleu`, `rouge`, `vert`, `orange`, `violet`, `turquoise`) ou utiliser `npm run ajouter`.
**Retirer un outil** : supprimer son dossier.

⚠ Ne jamais déposer de données d'élèves, de sauvegardes ou de mots de passe : la vérification bloquera la publication.

## Commandes (facultatives, Node.js 18 ou plus)

| Commande | Effet |
|---|---|
| `npm run ajouter` | Crée la fiche d'un outil en posant des questions, puis met la page à jour |
| `npm run generer` | Relit `Outils/`, met à jour `accueil/outils.js` (+ contrôle de sécurité) |
| `npm run verifier` | Vérifie les fiches sans rien modifier |
| `npm run securite` | Contrôle de sécurité seul |
| `npm run apercu` | Met à jour puis ouvre la page sur http://localhost:8080 |

Sans Node.js : il suffit d'envoyer sur la Forge, la mise à jour se fait en ligne (**Compilation › Pipelines**).

## Publication

- **À chaque envoi sur `main`**, `.gitlab-ci.yml` relit `Outils/`, régénère la page, lance le contrôle de sécurité, puis publie le site sur GitLab Pages.
  Seuls les fichiers du site sont publiés : ni `a-migrer/`, ni `scripts/`, ni la documentation.
- **Sur les autres branches et dans les demandes de fusion**, les mêmes vérifications tournent, sans publier.
- **Mise en place ou nouveau projet** : voir [PUBLIER-SUR-LA-FORGE.md](PUBLIER-SUR-LA-FORGE.md).

## Sécurité

À chaque publication : fiches vérifiées (liens `https://` uniquement, pas de `../`, majuscules exactes),
textes échappés à l'affichage, politique de sécurité (CSP) de la page recalculée, recherche de mots de passe,
clés d'API et fichiers sensibles (`.sql`, `.env`, `.key`…) qui bloque la publication.

Comment le code est organisé, comment le modifier : **[CLAUDE.md](CLAUDE.md)** (guide de développement).
Accessibilité : **[ACCESSIBILITE.md](ACCESSIBILITE.md)** (cahier des charges RGAA).
