# Apps1D76 — page d'accueil des outils numériques

**Ouvrir `index.html` = voir la page d'accueil.** Aucune installation, aucune compilation.

## Organisation

```
Outils/          ← UN DOSSIER PAR OUTIL : c'est le seul endroit où l'on travaille
  categories.json   les catégories (nom, couleur, icône, ordre)
  tirage-au-sort/   exemple : les fichiers de l'outil + sa fiche outil.json
a-migrer/        ← outils en attente : fiches de l'ancien site, et nouveaux outils déposés pour Claude
index.html       ← la page d'accueil
accueil/         ← son apparence, son fonctionnement, ses icônes, la liste générée outils.js (ne pas modifier)
                   et l'UI commune des outils (outil.css, outil.js ; modèle dans Outils/_modele/)
sw.js  manifest.webmanifest   ← application installable et hors ligne
scripts/         ← assistant, mise à jour, sécurité
```

## Ajouter un outil

### Directement sur GitHub (sans rien installer)

1. Ouvrir le dossier **Outils** › **Add file › Upload files**.
2. Glisser **le dossier de l'outil** (avec son `index.html`, ses images, scripts…). Cliquer **Commit changes**.
3. Dans ce nouveau dossier : **Add file › Create new file**, nommé `outil.json` :
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
4. **Commit changes**. Dans l'onglet **Actions**, la mise à jour tourne (≈ 20 s) : ✅ = page à jour.
   ❌ = cliquer dessus, le message indique quoi corriger.

> Sans fiche, l'outil s'affiche quand même dans « Autres outils ».

### En le confiant à Claude

Déposer les fichiers bruts de l'outil dans `a-migrer/<nom>/` (**Add file › Upload files**), puis demander à Claude :
« Nouvel outil dans a-migrer/<nom> : intègre-le ». Claude range l'outil, écrit sa fiche, lui applique l'UI commune,
le vérifie et propose une demande de fusion (voir `a-migrer/LISEZ-MOI.md`).

### Sur son ordinateur (Node.js 18+)

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

⚠ Ne jamais déposer de données d'élèves, de sauvegardes ou de mots de passe : la vérification bloquera la mise à jour.

## Commandes (facultatives, Node.js 18+)

| Commande | Effet |
|---|---|
| `npm run ajouter` | Crée la fiche d'un outil en posant des questions, puis met la page à jour |
| `npm run generer` | Relit `Outils/`, met à jour `accueil/outils.js` (+ contrôle de sécurité) |
| `npm run verifier` | Vérifie les fiches sans rien modifier |
| `npm run securite` | Contrôle de sécurité seul |
| `npm run apercu` | Met à jour puis ouvre la page sur http://localhost:8080 |

Sans Node.js : il suffit d'envoyer sur GitHub, la mise à jour se fait en ligne (onglet **Actions**).

## Publication

- **GitHub Pages** : Settings › Pages › *Deploy from a branch* › **main** (ou **Clean** dans le dépôt de test) / (root).
- **Nouveau dépôt à partir du zip** : voir [IMPORTER-DANS-UN-NOUVEAU-DEPOT.md](IMPORTER-DANS-UN-NOUVEAU-DEPOT.md).
- **Forge (GitLab)** : `.gitlab-ci.yml` met à jour la liste et publie sur GitLab Pages.

## Sécurité

À chaque mise à jour : fiches vérifiées (liens `https://` uniquement, pas de `../`, majuscules exactes),
textes échappés à l'affichage, politique de sécurité (CSP) de la page recalculée, recherche de mots de passe,
clés d'API et fichiers sensibles (`.sql`, `.env`, `.key`…) qui bloque la publication.

Comment le code est organisé, comment le modifier : **[CLAUDE.md](CLAUDE.md)** (guide de développement).
