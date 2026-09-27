# Outils en attente d'intégration

Ce dossier accueille les outils qui ne sont pas encore sur la page d'accueil. Deux cas :

## 1. Un nouvel outil à confier à Claude

1. Sur GitHub, ouvrir `a-migrer` › **Add file › Upload files** et glisser le dossier de l'outil
   (par exemple `a-migrer/calcul-flash/` avec sa page `.html`, ses images, ses scripts…). **Commit changes**.
2. Demander à Claude : « Nouvel outil dans a-migrer/calcul-flash : intègre-le ».
   On peut ajouter des indications : public visé, catégorie, nom souhaité.
3. Claude déplace l'outil dans `Outils/`, écrit sa fiche, lui applique l'UI commune, le vérifie
   et propose une demande de fusion à accepter.

## 2. Un outil de l'ancien site

Chaque dossier ci-dessous contient déjà la **fiche** (`outil.json`) de l'outil, mais pas ses fichiers :

1. Copier les fichiers de l'outil dans son dossier ici (ex. `a-migrer/course/index.html`, ses images, scripts…).
   Pour `carnet` et `thunderstruct`, la page d'entrée est indiquée par `"page"` dans la fiche.
2. Déplacer le dossier complet dans `Outils/` (ou le confier à Claude comme ci-dessus).
3. Envoyer sur GitHub (ou `npm run generer`) : l'outil apparaît sur l'accueil.

## À savoir

Ce dossier n'apparaît pas sur l'accueil et n'est pas publié sur la Forge, mais **GitHub Pages publie toute la branche** :
ne jamais y déposer de données d'élèves. Supprimez-le quand tout est migré.
