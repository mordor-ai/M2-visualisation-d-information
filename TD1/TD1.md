TP1 -
==
## exercice 1
Reprenez l’exemple de la partie 1 et définissez les tâches que les individus du public
ciblé devront pouvoir accomplir avec votre visualisation, les structures de données que vous allez
utiliser et les attributs dérivés que vous allez calculer (indice : rappelez-vous de votre enseignement
d’analyse de réseaux).

### tâches
voir les utilisateurs les plus
influents selon les différents groupes
* identifier les clusters
* dans chaque cluster , identifier les plus influents

### structures de données
sommets : utilisateurs de l'application
arêtes :  échanges d'avais

### attributs dérivés
attributs qualitatif : identification des clusters ou groupes louvain
attribut quantitatif : calcule de la centralité  dans chaque sous graphe:  closeness


## Exercice 2
Reprenez l’exemple précédent et proposez une visualisation.

la visualisation consiste à  montrer autant de sous graphes que de clusters le graphe avec la grosseur des sommets selon l'indice de centralité  et la couleur des sommets selon chaque cluster
ensuite on propose une juxtaposition avec les infos sur la personne

correction


# exercice 3
Exercice 3 : Normalement, vous avez déjà vu en cours d’analyse de réseaux les algorithmes
permettant de calculer les clusters et la centralité. Il reste donc à trouver celui permettant de
calculer le positionnement des sommets. Récupérez le fichier graphVisTechniques.pdf, il contient
une petite introduction au dessin de graphes (et en particulier aux différentes familles de
techniques). Trouvez ensuite un algorithme de positionnement des sommets d’un graphe
permettant de réaliser la visualisation de l’étape 3 ?

Algo de force



#Exercice 4
Exercice 4 : Pour les étapes de conception 2 à 4, identifiez les risques et proposez, si vous en trouvez,
des moyens pour vous en prémunir.


corr : mauvaises tâches,mauvaises structures , données dérivées inutiles


risque identifié:  
* 2 : les atributs derivés impossible de trouver la communauté des vins de saint-emilion
*
*  3:  les choix visuels ne sont pas judicieux=> on n'arrive pas facilement à  identifier les influenceurs
corr :  mauvais idiomes visuels
mauvaises interactions
précautions:   justifier les choix
  * règles de sémiologie graphVisTechniques * règles évoquées
  * nombreuses études disponibles (slides 64 à  68 du cours)

* 4 :  algorithme:  l'algo n'est pas adapté car trop touffu   ( le graphe est trop touffu => graphe invariant d’échelle impossible de déterminer les communautés)


corr:  algo : trop lent ou faux
précautions:
  * calculer les complexités théoriques en temps
  *  prouver que les algos obtiennne les résultats escomptés





# exercice 5
Exercice 5 : Dans l’exercice 3, vous avez identifié un algorithme intéressant pour placer les sommets
de votre graphe. Comment allez-vous l’évaluer ?

évaluer le graphe :  notamment en minimisant les croisements des arêtes
cror :
generer des jeux de tests:
* graphes synthétiques ( differnettes tailles, , graphes réels)
critès de qualité
 * distance 2D  entre u et v proportionnelle à  la distance du plus court chemein dnas  le graphes
 * distance moyenne intra cluster
 * minimisation des croisements
 * maximisation de l'angle des arêtes
 * visualisation des symétries

 lancer l'algo sur les differents graphes:
 * temps de calcul
 qualité des résultats

## Exercice 6
