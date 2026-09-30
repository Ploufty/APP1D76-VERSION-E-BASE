# Accessibilité (RGAA) : cahier des charges des outils Apps1D76

> But : que chaque outil (et la page d'accueil) respecte au mieux le **RGAA 4.1.2**
> (Référentiel général d'amélioration de l'accessibilité), obligatoire pour les sites de l'administration.
> Ce document ne remplace pas un audit : il permet une **démarche de meilleur effort** honnête et vérifiable.

---

## 1. Ce que la loi demande

| Obligation | En pratique pour Apps1D76 |
|---|---|
| **Déclaration d'accessibilité** (loi 2005-102 art. 47, décret 2019-768) | Une page par site, modèle en section 5 |
| **Mention en bas de chaque page** | « Accessibilité : non conforme » tant qu'aucun audit n'est fait, avec un lien vers la déclaration |
| **Moyen de contact** | Une adresse mail ou un formulaire **réels** (pas « les canaux habituels ») |
| **Schéma pluriannuel** (3 ans) et plan d'action annuel | Celui du ministère de l'Éducation nationale ([schéma](https://conformite.education.fr/schema_directeur.html), [plan d'action](https://conformite.education.fr/plan_action.html)) : pas de schéma propre trouvé pour l'académie de Normandie |

Les trois seuls états légaux sont : **totalement conforme** (100 % des critères), **partiellement conforme** (au moins 50 %),
**non conforme** (moins de 50 % **ou aucun audit**). Sans audit, il faut donc écrire « non conforme », même si le site est bien fait.

---

## 2. Liste de contrôle pour chaque outil

À cocher avant d'intégrer un outil dans `Outils/`. Les numéros renvoient aux thématiques du RGAA.

### Structure et page (thèmes 8 et 9)
- [ ] `<html lang="fr">` et un `<title>` propre à l'outil (le modèle `Outils/_modele/` le fait déjà).
- [ ] Un seul `<h1>`, puis des titres `h2`, `h3`… sans sauter de niveau.
- [ ] Zones `<header>`, `<main>`, `<footer>` (et `<nav>` s'il y a un menu).
- [ ] Les listes sont de vraies listes (`<ul>`, `<ol>`), pas des lignes avec des tirets.
- [ ] Le code HTML est valide (pas d'`id` en double, balises bien fermées).

### Images et icônes (thème 1)
- [ ] Image utile : `alt` qui dit ce qu'elle apporte. Image décorative : `alt=""`.
- [ ] Emoji ou icône seule dans un bouton : `aria-label` sur le bouton, emoji en `aria-hidden="true"`.
- [ ] Pas de texte important écrit dans une image.

### Couleurs et contrastes (thème 3)
- [ ] Texte : contraste d'au moins **4,5:1** (3:1 pour le gros texte à partir de 24 px, ou 18,5 px en gras).
- [ ] Bordures de champs, icônes, focus : au moins **3:1**.
- [ ] L'information ne passe jamais **que** par la couleur (ajouter un texte, une icône ou un motif).
- [ ] Vérifier en clair, en sombre et en contraste renforcé (réglages partagés d'`accueil/outil.js`).

### Formulaires (thème 11)
- [ ] Chaque champ a un `<label for="…">` visible.
- [ ] Champs regroupés dans `<fieldset>` + `<legend>` quand c'est une série (boutons radio, cases à cocher).
- [ ] Champ obligatoire signalé en texte, pas seulement par `*` ou par la couleur.
- [ ] Message d'erreur en texte, relié au champ (`aria-describedby`) et annoncé (`.alert-error` avec `role="alert"`).
- [ ] `autocomplete` sur les champs qui concernent l'utilisateur (nom, courriel), si l'outil en a.

### Clavier et focus (thèmes 7 et 12)
- [ ] Tout est utilisable **au clavier seul** : Tab, Maj+Tab, Entrée, Espace, Échap.
- [ ] Le focus est **toujours visible** (ne jamais écrire `outline: none` sans le remplacer).
- [ ] L'ordre de tabulation suit l'ordre de lecture.
- [ ] Un **lien d'évitement** « Aller au contenu » en début de page.
- [ ] Les actions sont des `<button>`, les liens sont des `<a href>` : pas de `<div>` cliquable.
- [ ] Une fenêtre (dialogue) garde le focus à l'intérieur, se ferme avec Échap et rend le focus au bouton d'ouverture.

### Contenus qui changent (thème 7)
- [ ] Un résultat qui apparaît (tirage, calcul, minuteur) est annoncé : zone `aria-live="polite"` ou `role="status"`.
- [ ] L'état d'un bouton bascule est exposé (`aria-pressed`, `aria-expanded`).

### Animations, son et temps (thèmes 4 et 13)
- [ ] Animations coupées avec `prefers-reduced-motion` **et** `[data-motion="reduce"]`.
- [ ] Rien ne clignote plus de 3 fois par seconde.
- [ ] Un son ou une vidéo ne démarre pas tout seul, ou peut être coupé tout de suite.
- [ ] Un minuteur peut être mis en pause, arrêté ou prolongé.
- [ ] Vidéo : sous-titres. Audio seul : transcription.

### Présentation et zoom (thème 10)
- [ ] Lisible à **200 %** de zoom et à 320 px de large, sans défilement horizontal.
- [ ] Tailles en `rem` / `em`, jamais de texte bloqué en `px` fixe dans un conteneur de hauteur fixe.
- [ ] Zones cliquables d'au moins **44 × 44 px**.
- [ ] Les liens se distinguent du texte autrement que par la couleur (soulignés).

### Liens et documents (thèmes 6 et 13)
- [ ] L'intitulé d'un lien dit où il mène (pas de « cliquez ici » seul).
- [ ] Lien qui ouvre un nouvel onglet : le signaler (« nouvelle fenêtre »).
- [ ] Documents téléchargés (Word, PDF) : titres structurés, texte réel. L'export `Outil.word` produit du texte, pas une image.

---

## 3. Comment tester (outils gratuits, 15 minutes par outil)

1. **Automatique** : extension **WAVE** ou **axe DevTools** (Firefox, Chrome), ou Lighthouse (F12 › Lighthouse › Accessibilité).
   Corriger toutes les erreurs. Ces tests ne trouvent qu'environ **30 %** des problèmes.
2. **Clavier** : débrancher la souris et faire tout l'outil au clavier.
3. **Zoom** : Ctrl + à 200 %, puis fenêtre étroite (320 px dans les outils de développement).
4. **Contrastes** : **Colour Contrast Analyser** (gratuit) ou l'onglet Accessibilité de Firefox.
5. **Lecteur d'écran** : **NVDA** (gratuit, Windows) avec Firefox, ou VoiceOver (Mac, iPad). Écouter titres, boutons, résultats.
6. Noter la date, les navigateurs et les aides techniques **réellement** utilisés : ils vont dans la déclaration.

Pour un vrai audit : grille officielle et méthode sur <https://accessibilite.numerique.gouv.fr/>
(outil gratuit d'audit : <https://ara.numerique.gouv.fr/>).

---

## 4. Ce que le projet fait déjà

| Point | Où |
|---|---|
| `lang="fr"`, lien d'évitement, `<nav>`, `<main>`, `role="status"` sur la recherche | `index.html` |
| Thème sombre, contraste renforcé, texte agrandi, animations réduites, partagés avec les outils | `accueil/script.js`, `accueil/outil.js` |
| Focus visible, zones de 44 px, contrastes AA des catégories | `accueil/style.css`, `accueil/outil.css` |
| Textes échappés, aucun gestionnaire d'événement dans le HTML | `esc`, `Outil.esc`, CSP |

| Déclaration d'accessibilité (état : non conforme, adresse de contact **à définir**) | `accessibilite.html` |
| Mention « Accessibilité : non conforme » en pied de page, avec lien vers la déclaration | accueil, `Outils/_modele/`, chaque outil |

À faire :
- choisir l'adresse de contact et la mettre dans `accessibilite.html` (section « Retour d'information et contact ») ;
- faire les tests de la section 3 et remplir « Environnement de test » et « Contenus non accessibles » dans `accessibilite.html` ;
- passer la liste de contrôle sur chaque outil existant et sur ceux de `a-migrer/` ;
- tout nouvel outil garde le lien d'évitement et le pied de page du modèle.

---

## 5. Modèle de déclaration d'accessibilité

Version en ligne : `accessibilite.html`. Pour un autre site, recopier ce modèle en remplaçant les `[…]`. Ne mettre **que** ce qui a été vraiment fait.

> **Déclaration d'accessibilité**
>
> La Mission Numérique Éducatif 76 (DSDEN de Seine-Maritime) s'engage à rendre ses services numériques accessibles,
> conformément à l'article 47 de la loi n° 2005-102 du 11 février 2005.
> Cette déclaration s'applique au site **Apps1D76** ([adresse du site]) et aux outils du dossier `Outils/`.
>
> **État de conformité** : le site Apps1D76 est **non conforme** au RGAA 4.1.2, en l'absence d'audit.
> Il a été conçu en suivant les règles du RGAA (démarche de meilleur effort).
>
> **Contenus non accessibles** : [liste des défauts connus, outil par outil, ou « aucun défaut connu à ce jour, mais non audité »].
>
> **Établissement de cette déclaration** : le [date].
> Technologies : HTML, CSS, JavaScript.
> Tests : [navigateurs et versions] ; [aides techniques : NVDA x.x avec Firefox…] ; [outils : WAVE, axe…].
> Pages vérifiées : [accueil, puis chaque outil].
>
> **Retour d'information et contact** : si vous n'arrivez pas à accéder à un contenu ou à un service,
> écrivez à [adresse mail réelle] pour être orienté vers une alternative accessible.
>
> **Schéma pluriannuel** : celui du ministère (<https://conformite.education.fr/schema_directeur.html>)
> et son plan d'action annuel (<https://conformite.education.fr/plan_action.html>).
>
> **Voies de recours** : si, après nous avoir signalé un défaut, vous n'avez pas obtenu de réponse satisfaisante, vous pouvez :
> - écrire au Défenseur des droits (<https://formulaire.defenseurdesdroits.fr/>) ;
> - contacter le délégué du Défenseur des droits de votre région (<https://www.defenseurdesdroits.fr/saisir/delegues>) ;
> - écrire par courrier, gratuitement et sans timbre : Défenseur des droits, Libre réponse 71120, 75342 Paris CEDEX 07.

### Remarques sur l'exemple trouvé (« La main innocente »)
- Bonne base, mais l'état « Non audité - Meilleur effort » n'existe pas légalement : écrire **« non conforme »**.
- Le contact « formulaire de votre établissement ou canaux habituels » ne suffit pas : il faut une adresse précise.
- Il manque le **schéma pluriannuel** et la **mention en pied de page** sur toutes les pages.
- Il cite NVDA, VoiceOver, TalkBack et 4 navigateurs : ne les garder que s'ils ont vraiment été testés.
- `role="banner"`, `role="main"`, `role="contentinfo"` sont inutiles sur `<header>`, `<main>`, `<footer>` (sans gravité).
- Le RGAA en vigueur est la version **4.1.2**.
