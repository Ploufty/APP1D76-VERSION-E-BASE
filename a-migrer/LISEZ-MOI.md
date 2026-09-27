# Outils à migrer depuis l'ancien site

Chaque dossier contient la **fiche** (`outil.json`) déjà remplie d'un outil de l'ancien site,
mais pas ses fichiers. Pour migrer un outil :

1. Copier les fichiers de l'outil dans son dossier ici (ex. `a-migrer/course/index.html`, ses images, scripts…).
   Pour `carnet` et `thunderstruct`, la page d'entrée est indiquée par `"page"` dans la fiche.
2. Déplacer le dossier complet dans `Outils/`.
3. Envoyer sur GitHub (ou `npm run generer`) : l'outil apparaît sur l'accueil.

Ce dossier n'apparaît pas sur l'accueil et n'est pas publié sur la Forge, mais **GitHub Pages publie toute la branche** :
ne jamais y déposer de données d'élèves. Supprimez-le quand tout est migré.
