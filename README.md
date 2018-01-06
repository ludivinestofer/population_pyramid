# **Pyramide des âges**
#### Visualisations des statistiques d'évolution de la population en Suisse entre 1860 et 2016 

Disponible en ligne : [ici](https://ludivinestofer.github.io/Template/) 

Ce projet a été effectué dans le cadre du cours de *Visualisation de données* donné par Isaac Pante (Faculté des Lettres, Université de Lausanne, SP2017). 

## La pyramide des âges 

C'est une application interactive qui permet de visualiser de manière dynamique l'évolution de la population en Suisse durant les 150 dernières années. 

![Alt Text](Image/Screen_whole.png)

La pyramide des âges est une représentation graphique de la structure de la population selon l'âge et le sexe à un moment donné. Elle est constituée par convention de deux histogrammes, un pour chaque sexe (par convention les hommes à gauche et les femmes à droite). Les âges sont distribués en ordonnée et les effectifs en abscisse. 

C'est dans le premier Atlas statistique des Etats-Unis paru en 1874 que ce type de graphique apparaît. Il tient son nom de la forme initiale du graphique qui représente une pyramide comme il est possible de le voir en 1860. 

![Alt Text](Image/1860.png)

Il est possible grâce à la pyramide des âges de voir l'évolution de la population d'un pays. Celle-ci est influencée par le taux de fécondité, le taux de mortalité ainsi que l'espérance de vie. Au fil du temps, ces différents indicateurs ont évolué et fortement influencé la structure de la population représentée par la forme de la pyramide. 
En effet, la pyramide de 2016 comme il est possible de le voir ci-dessous n'a plus vraiment une forme de pyramide mais plutôt de champignon. 

![Alt Text](Image/2016.png)

La pyramide des âges interactive permet de naviguer au fil du temps afin de voir l'évolution de la population selon les périodes historiques. De ce fait, il est possible de voir, en 1934, une diminution importante du nombre de femmes et d'hommes entre 15 et 20 ans. Ceci s'explique par l'épidémie de grippe espagnole ayant frappé la Suisse 15 ans auparavant. 

![Alt Text](Image/1934.png)

La pyramide des âges permet de mettre en avant les variations de population. En effet, le baby-boom de la fin de la 2ème guerre mondiale ainsi que les pics suivants (les enfants et les petits-enfants des baby-boomer) sont visibles sur le graphique. 

![Alt Text](Image/1970.png)

Ce  type de graphique permet  donc de garder une trace à long terme des crises du passé comme les guerres, les épidémies, les maladies mais également les augmentations de la natalité. 

## Description de l'application 

###  Construction 

Ce programme est un logiciel gratuit. 

Il a été construit avec 3 langages de programmation soit *HTML* (structure de la page), *CSS* (design de la page) et *Javascript* (graphique et interactivité). 

Bien sûr d'autres librairies ont été utilisées dont principalement *D3.js v4* qui permet de faire des graphiques mais également *Bootstrap 4.0.0*, *JQuery 3.2.1*, *Pooper.js 1.12.6* et *Leaflet 1.0.0*.


### Les données

Les données utilisées pour réaliser les graphiques proviennent du département *population* de l'Office fédéral de la statistique (OFS). Il s'agit de données sur l'effectif de la population au 31 décembre 1860 à nos jours (2016). Les données sont séparées selon le sexe, ce qui permet de réaliser une pyramide des âges.

Jusqu'en 2010, les statistiques sont construites sur la base d'ESPOP (Statistique de l'état annuel de la population) et depuis 2011, sur la base de STATPOP (Statistique de la population et des ménages). 

Les données sont téléchargables à partir des liens suivants :

-   [Population résidante permanente (hommes) selon l'âge, 1860-1909](https://www.bfs.admin.ch/asset/de/hs-f-01.01.01.06)
-   [Population résidante permanente (femmes) selon l'âge, 1860-1909](https://www.bfs.admin.ch/asset/de/hs-f-01.01.01.07)
-   [Population résidante permanente (hommes) selon l'âge, 1910-1959](https://www.bfs.admin.ch/asset/de/hs-f-01.01.01.09)
-   [Population résidante permanente (femmes) selon l'âge, 1910-1959](https://www.bfs.admin.ch/asset/de/hs-f-01.01.01.10)
-   [Population résidante permanente (hommes) selon l'âge, 1960-2009](https://www.bfs.admin.ch/asset/de/hs-f-01.01.01.12)
-   [Population résidante permanente (femmes) selon l'âge, 1960-2009](https://www.bfs.admin.ch/asset/de/hs-f-01.01.01.13)
-   [Population résidante permanente selon l'âge, le sexe et la catégorie de nationalité, 2010-2016](https://www.bfs.admin.ch/asset/de/je-f-01.02.03.02)

Les données ont été optimisées au format *csv*  avant d'être converties en *GeoJSON*. Ce format est plus facile à utiliser avec le langage *Javascript*. 

### Utilisation  

Il suffit d'avoir accès à internet et de se rendre [ici](https://ludivinestofer.github.io/Template/) 

Vous atteignez la page d'accueil qui varie selon le support utilisé. 

![Alt Text](Image/Screen_whole.png)

Par convention comme expliqué plus haut, les hommes sont représentés à gauche et les femmes à droite. 

Pour naviguer au fil du temps, il est possible d'utiliser le slider ou les boutons situés en bas. 
Le slider permet de trouver une année précisement alors que les boutons permettent d'accéder rapidement aux dizaines et donc d'observer les grandes tendances d'évolution du graphique.

![Alt Text](Image/Screen_boutons.png)

Le bouton PLAY situé à gauche fait défiler la pyramide depuis 1860 jusqu'aux données actuelles (2016) en boucle. Cela permet de voir de manière continue l'évolution de la population suisse. 

![Alt Text](Image/Screen_play.png)

Lorsque l'on passe la souris sur les barres des histogrammes, l'âge sélectionné ainsi que le nombre d'habitants s'affichent dans un tooltip. La couleur de la police du tooltip permet de distinguer les hommes des femmes. 

![Alt Text](Image/tooltip_f.png)

![Alt Text](Image/tooltip_h.png)


### Public cible 

La pyramide des âges s'adresse principalement aux statisticiens ou aux géographes devant analyser des données démographiques. Il est important qu'ils puissent interagir avec les données et observer l'évolution dans le temps en utilisant la fonction "Play" par exemple. Cette application s'adresse également à toute la population intéressée à suivre l'évolution démographique de la Suisse. 

## Sources

- Office fédéral de la statistique, OFS, disponible en ligne : https://www.bfs.admin.ch/bfs/fr/home/statistiques/themes-transversaux/mesure-bien-etre/tous-indicateurs/societe/rapport-personnes-agees.assetdetail.3302625.html

- Institut national d'études démographiques, INED, disponible en ligne : https://www.ined.fr/fr/lexique/pyramide-des-ages/


---------

Copyright © 2017 - Ludivine Stofer 
