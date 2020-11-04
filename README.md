# visualizeJS_in_ASPNET
Application ASP.NET qui va intégrer les fonctionnalités de la suite BI Jaspersoft

## I - Mise en place de l'application ASP.NET

Pour mettre en place cette application ASP.NET, vous devrez ouvrir le fichier .sln du dossier TestVisualizeJS avec visual studio : 
<br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/visualizeA.png "Img_A")

Vous devrez ensuite effectuer les modifications suivantes pour adapter l'application à votre propre serveur Jaspersoft :

*Pour le "Controller" (Controller/Visualize/VisualizeController.cs) :*
<br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/visualizeB.png "Img_B")
<br>
*Pour la "View" (Views/Visualize/Index.cshtml)*
<br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/visualizeC.png "Img_C")
<br>
*Pour le fichier javascript (Content/VisualizeConfig.js) :*
<br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/visualizeD.png "Img_D")

## II - Quelques explications sur le code

[récupérer étapes importantes]
### Introduction
Les ressources du serveur JasperReports peuvent être utilisées dans nos propres applications grâce à certains outils mis à disposition par Jaspersoft.

En plus des Iframes et de l'API REST qui ont été traités dans les documentations précédents, il existe une autre méthode pour incorporer les fonctionnalités du serveur Jasper dans nos applications Web : **Visualize.js**

**Visualize.js** est un framework javascript créé spécialement pour intégrer des rapports, tableaux de bords, analyses ... Jasper dans des applications web ([lien vers la documentation officielle](https://community.jaspersoft.com/documentation/tibco-jasperreports-server-visualizejs-guide/v780/api-reference-visualizejs "lien vers la documentation officielle"))



De nombreux exemples d'utilisation de visualize.js sont disponibles sur [ce github](https://github.com/tibcosoftware/JS-visualize "ce github"), ces exemples sont directement manipulables dans des JSfiddle (HTML + CSS + JS interactifs, disponibles en live sur le web) :

![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG1.png "Img_1")
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG2.png "Img_2")

### 1 - Afficher un rapport avec une page ASP.NET
Pour afficher un rapport dans un page ASP.NET avec visualize.js, il suffit d'avoir à disposition une vue et un fichier javascript.

Il est alors facile de tester les différentes fonctionnalités de visualize.js en naviguant entre les différents "fiddle" du github pour s'inspirer d'exemples déjà existants.

Dans notre fichier javascript utilisant visualize.js, visualize sera représenté de cette manière :

**visualize.config({**
  <span style="color:blue">auth:</span> {
    <span style="color:blue">name:</span> jasper_username,
    <span style="color:blue">password:</span> jasper_password
  }
**});**



**visualize(function (v) {**

  // Nos rapports / contrôles d'entrées / fonctionnalités Jasper à utiliser

  Exemples :

<span style="color:blue">
  v.report</span> => pour configurer un rapport
<span style="color:brown">
  v.dashboard</span> => pour configurer un tableau de bord
<span style="color:red">
  v.inputControls</span> => pour configurer nos contrôles d'entrées
<span style="color:orange">
  v.resourcesSearch </span>=> pour récupérer des informations sur les ressources du serveur Jasper

   ...

  pour plus d'informations, consulter la documentation officielle de Japsersoft community sur visualize.js 

});



Voici un petit exemple simple qui permet d'afficher un rapport sur une page asp.net :

*Configuration HTML :*
<br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG3.png "Img_3")

*Configuration Javascript (en utilisant visualize.js) :*
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG4.png "Img_4")

*Affichage final :*
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG5.png "Img_5")

Le rapport s'affiche bien mais il est impossible d'utiliser les fonctionnalités de Jasper (export, configuration des contrôles d'entrées, pagination ....).

Pour remédier à ce problème, il faut configurer notre fonction visualize dans notre fichier javascript, voici quelques fonctionnalités utiles à implémenter :

#### Pagination simple (next / previous)

Code HTML :
<br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG6.png "Img_6")

Code Javascript (++ pour next, – pour previous): 
<br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG7.png "Img_7")
<br>
Rendu : 
<br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG8.png "Img_8")

#### Pagination avec choix de page

Code HTML :
Ajout d'un label et d'un input pour recevoir le n° de page
<br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG9.png "Img_9")

Code Javascript :
<br> 
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG10.png "Img_10")

Rendu :
<br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG11.png "Img_11")

#### Zoom (-, + et personnalisé)

Code HTML :
3 boutons différents : Zoom- , Zoom+ et Zoom personnalisé
<br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG11A.png "Img_11A")


Code JS :
modification de la taille du container et rechargement du rapport
<br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG11B.png "Img_11B")

Même procédé pour le zoom personnalisé (en prenant en compte la valeur entrée par l'utilisateur)
<br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG11C.png "Img_11C")

#### Export (format pdf, csv, json, ...)

Code HTML :
<br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG12.png "Img_12")

Code Javascript :
<br> 
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG13.png "Img_13")
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG14.png "Img_14")
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG15.png "Img_15")
<br>
Rendu :
<br> 
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG16.png "Img_1-")

#### Gestion des contrôles d'entrée

Code HTML :
Ajout d'une div qui va contenir les contrôles d'entrée
<br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG17.png "Img_17")

Code Javascript : 
<br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG18.png "Img_18")

Rendu :
<br> 
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG19.png "Img_19")


**Exemple d'affichage final après avoir inclus ces fonctionnalités :** 
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG20.png "Img_20")

PS : Des modifications ont depuis été effectuées pour avoir un meilleur visuel, voici un aperçu :
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG20A.png "Img_20A")

### 2 - Afficher le contenu d'un dossier du serveur Jasper 
Dans la partie Javascript, on doit utiliser **"resourcesSearch"** pour récupérer toutes les ressources présentes à un emplacement précis du serveur, on peut filtrer les éléments récupérer par types ([liste des types](https://community.jaspersoft.com/wiki/visualizejs-api-notes-and-samples-resourcessearch "liste des types")).
Extrait de [la documentation Jaspersoft community](https://community.jaspersoft.com/wiki/visualizejs-search-dashboards-reports-and-other-resources-repository-folder-and-its-subfolders "la documentation Jaspersoft community") : 
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG21.png "Img_21")

Mais en utilisant cette méthode, les ressources ne seront pas récupérées dans le même ordre que celui du référentiel du serveur jasper.
Dans le dossier test_mongodb, il y a deux sous-dossiers qui possèdent chacun un rapport, ici les rapports présents dans les sous-dossiers (en bleu) ne sont pas corrects :

![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG22.png "Img_22")
<br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG23.png "Img_23")

Pour régler ce problème, il faut faire un tri des ressources dans notre fichier javascript (juste après la récupération des données avec v.resourcesSearch),
voici le code complet qui permet d'afficher une liste des ressources disponibles à un emplacement :
*Code HTML :* 
<br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG24.png "Img_24")

*Code Javascript*
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG25.png "Img_25")
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG26.png "Img_26")
*Affichage final bien ordonnancé :*
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG27.png "Img_27")

**Bonus :** il est possible de changer dynamiquement le rapport qui va être affiché en utilisant  la liste de rapports précédente.
Pour ce faire, il faut juste rajouter un comportement "on change" sur notre select (dans la fonction visualize de notre javascript), ainsi lorsque le rapport
sélectionné change, la fonction  "on change" se déclenche et un nouveau rapport + des nouveaux contrôles d'entrées sont disponibles : 

![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG28.png "Img_28")

### 3 - Améliorations possibles au niveau de la sécurité
Il est possible d'améliorer le niveau de sécurité de visualize.js en transmettant les informations de connexion à l'aide d'un token SSO (créé par eactive directory par exemple)
Plus d'informations sont disponibles dans [cette documentation officielle](https://community.jaspersoft.com/documentation/tibco-jasperreports-server-visualizejs-guide/v780/api-reference-login-and-logout "cette documentation officielle").

Pour obtenir un minimum de sécurité dans notre application ASP.NET, il est toujours possible d'intégrer une authentification basique, pour ce faire, il faut :

#### Etape A
Créer un formulaire de connexion dans la vue, cacher tous les visuels tant que les informations de connexion sont incorrectes (mettre des "display : none" sur les "div" concernées) :
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG29.png "Img_29")
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG30.png "Img_30")

#### Etape B
Récupérer les informations de connexion dans notre controller, si elles sont correctes, récupérer la première ressource du dossier préciser en paramètre dans le code

+ transmettre des informations au javascript (dont les identifiants)
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG31.png "Img_31")
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG32.png "Img_32")
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG33.png "Img_33")

#### Etape C
Activer l'affichage des éléments quand les données sont valides dans le code JS (visualize.js) :
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG34.png "Img_34")

#### Etape D
Rendu :
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG35.png "Img_35")
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/IMG36.png "Img_36")
