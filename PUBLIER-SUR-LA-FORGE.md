# Publier LabERUN76 sur la Forge

Objectif : avoir le projet sur la Forge des communs numériques éducatifs et le site en ligne, mis à jour tout seul à chaque envoi.

- **Projet** : `missionnumerique76/laberun76` → <https://forge.apps.education.fr/missionnumerique76/laberun76>
- **Site** (adresse provisoire) : <https://missionnumerique76.forge.apps.education.fr/laberun76>

Durée : 15 minutes environ. Les menus sont donnés en français, avec le nom anglais entre parenthèses quand l'interface est en anglais.

---

## Étape 1 — Créer le projet

Dans le groupe **missionnumerique76** : **Nouveau projet** (*New project*), puis l'une des deux méthodes.

**A. En important le dépôt actuel (le plus simple)**
1. **Importer un projet › Dépôt par URL** (*Import project › Repository by URL*).
2. URL du dépôt : l'adresse `.git` du dépôt actuel (bouton **Code** du dépôt d'origine).
3. **Nom du projet** : `LabERUN76`, **identifiant (slug)** : `laberun76`. C'est lui qui donne la fin de l'adresse du site.
4. **Créer le projet**.

**B. À partir du dossier du projet (zip décompressé)**
1. **Créer un projet vide** (*Create blank project*), même nom et même identifiant, **sans** fichier README.
2. Envoyer le dossier en ligne de commande (voir « Variante » en bas de page), ou ouvrir le projet dans le **Web IDE**
   (touche `.`) et y glisser **le contenu** du dossier, pas le dossier lui-même.

> ⚠ Afficher les fichiers cachés avant de copier : `.gitlab-ci.yml` et `.gitignore` commencent par un point
> (Windows : Explorateur › **Affichage › Afficher › Éléments masqués** ; Mac : **Cmd + Maj + .**).

## Étape 2 — Vérifier que rien ne manque

À la racine du projet, on doit voir :

```
Outils/   a-migrer/   accueil/   scripts/
.gitignore   .gitlab-ci.yml   ACCESSIBILITE.md   CLAUDE.md   LICENSE   PUBLIER-SUR-LA-FORGE.md   README.md
accessibilite.html   index.html   manifest.webmanifest   package.json   sw.js
```

**Point le plus important :** `.gitlab-ci.yml` doit être à la racine. C'est lui qui construit et publie le site.

## Étape 3 — Lancer la première publication

1. **Compilation › Pipelines** (*Build › Pipelines*). Un pipeline démarre à chaque envoi sur `main`.
   S'il n'y en a pas encore : **Exécuter le pipeline** (*Run pipeline*) sur `main`.
2. Attendre ✅ (environ 1 minute). La tâche `pages` construit le site, puis GitLab le publie.

## Étape 4 — Régler l'adresse et la visibilité du site

1. **Déployer › Pages** (*Deploy › Pages*) : l'adresse du site s'affiche.
2. Si l'adresse ressemble à `laberun76-xxxx.forge.apps.education.fr` au lieu de
   `missionnumerique76.forge.apps.education.fr/laberun76` : **décocher « Utiliser un domaine unique »** (*Use unique domain*),
   puis **Enregistrer**.
3. **Paramètres › Général › Visibilité, fonctionnalités du projet, autorisations** : à la ligne **Pages**, choisir
   **Tout le monde** (*Everyone*) pour que les collègues voient le site sans compte, même si le projet reste privé.

## Étape 5 — Vérifier que tout fonctionne

- **Le site :** ouvrir l'adresse. On doit voir la page d'accueil avec les cartes « Organisateur de récréation » et « Tirage au sort ».
  En cas de doute, recharger avec **Ctrl + F5**.
- **Un premier ajout :** suivre « Ajouter un outil » dans le [README](README.md#ajouter-un-outil). Le pipeline passe au vert,
  puis l'outil apparaît sur le site.

---

## Variante : en ligne de commande (avec Git installé)

Pour un projet vide déjà créé à l'étape 1 :

```bash
cd chemin/vers/laberun76          # le dossier du projet
git init -b main                  # seulement s'il ne s'agit pas déjà d'un dépôt git
git add -A
git commit -m "Import initial de LabERUN76"
git remote add forge https://forge.apps.education.fr/missionnumerique76/laberun76.git
git push -u forge main
```

Depuis un clone du dépôt actuel, `git remote add forge …` puis `git push -u forge main` suffisent.
La Forge demande un **jeton d'accès** (*Personal access token*) à la place du mot de passe :
**Préférences › Jetons d'accès**, avec le droit `write_repository`. Ne jamais l'écrire dans un fichier du projet.

---

## Problèmes fréquents

| Ce que je vois | Solution |
|---|---|
| Le pipeline reste « En attente » (*pending*) | Aucun exécuteur : **Paramètres › CI/CD › Exécuteurs** (*Runners*) : activer les exécuteurs de l'instance. |
| Pipeline ❌ sur la tâche `pages` ou `verifier` | Cliquer sur la tâche : le message en français indique la fiche ou le fichier à corriger. |
| Pas de pipeline du tout | `.gitlab-ci.yml` manque ou n'est pas à la racine (étape 2). |
| Erreur 404 sur le site | Attendre quelques minutes après le premier ✅, vérifier l'adresse dans **Déployer › Pages**, et la visibilité de Pages (étape 4). |
| L'adresse contient un code bizarre (`laberun76-xxxx`) | Décocher « Utiliser un domaine unique » (étape 4). |
| Un nouvel outil n'apparaît pas | Le pipeline est-il vert ? Sinon, cliquer dessus. Puis recharger le site avec **Ctrl + F5**. |
