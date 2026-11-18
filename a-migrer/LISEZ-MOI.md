# Outils en attente d'intégration

Ce dossier accueille les outils qui ne sont pas encore sur la page d'accueil. Deux cas :

## 1. Un nouvel outil à confier à Claude

1. Sur la Forge, ouvrir le projet dans le **Web IDE** (**Modifier › Web IDE**, ou touche `.`) et glisser le dossier de l'outil
   dans `a-migrer` (par exemple `a-migrer/calcul-flash/` avec sa page `.html`, ses images, ses scripts…).
   Puis **Contrôle de source › Valider et pousser**.
2. Demander à Claude : « Nouvel outil dans a-migrer/calcul-flash : intègre-le ».
   On peut ajouter des indications : public visé, catégorie, nom souhaité.
3. Claude déplace l'outil dans `Outils/`, écrit sa fiche, lui applique l'UI commune, le vérifie
   et propose une demande de fusion à accepter.

## 2. Un outil de l'ancien site

Chaque dossier ci-dessous contient déjà la **fiche** (`outil.json`) de l'outil, mais pas ses fichiers :

1. Copier les fichiers de l'outil dans son dossier ici (ex. `a-migrer/course/index.html`, ses images, scripts…).
   Pour `carnet` et `thunderstruct`, la page d'entrée est indiquée par `"page"` dans la fiche.
2. Déplacer le dossier complet dans `Outils/` (ou le confier à Claude comme ci-dessus).
3. Envoyer sur la Forge : le pipeline régénère la page et l'outil apparaît en ligne (en local : `npm run generer`).

## À savoir

Ce dossier n'apparaît pas sur l'accueil et n'est pas publié sur le site, mais il est visible par toute personne qui a accès
au projet sur la Forge : ne jamais y déposer de données d'élèves. Supprimez-le quand tout est migré.
