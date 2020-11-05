# Explication du code

## Partie "Model"

La partie Model contient une classe "VisiteurWeb" qui représente l'utilisateur de l'application ASP.NET.

C'est dans cette classe que seront stockés les indentifiants de connexion Jasper :
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG1.png "cod_img1")


## Partie "Controller"

La partie Controller se divise en 2 sections, une section qui va s'exécuter dès que l'utilisateur démarre l'application et une autre section qui va s'exécuter dès que l'utilisateur remplit un formulaire de connexion dans l'application, envoyant ainsi les paramètres nécessaires pour se connecter au service Jasper et récuperer des informations clés :

![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG2A.png "cod_img2a")
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG2B.png "cod_img2b")
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG2C.png "cod_img2c")
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG3.png "cod_img3")

## Partie "Vue"

La partie Vue contient tous les éléments qui seront affichés, elle permet aussi d'envoyer les informations données par le controller aux éléments HTML et au code javascript (dans content)

<b>Imports nécessaires (bootstrap, jquery et visualize.js) + récupération des données du controller pour envoi vers notre javascript :</b>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG4.png "cod_img4")

<b>Formulaire de connexion :</b><br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG5.png "cod_img5")

<b>Selection d'une ressource (parmi celles générées dans notre javascript) :</b>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG6.png "cod_img6")

<b>Modal + barre de navigation "fixée":</b>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG7.png "cod_img7")
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG8.png "cod_img8")

<b>Conteneurs pour afficher notre ressource selon son type (rapport / tableau de bord)</b>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG9.png "cod_img9")

## Partie "Javascript dans Content"

La partie javascript est divisée en plusieurs parties, une partie qui contient de nombreuses fonctions qui seront utilisées par la suite :

<b>fonction "getFolderColor" :</b><br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG10.png "cod_img10")


<b>fonction buildResourceSelectControl :</b>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG11A.png "cod_img11a")
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG11B.png "cod_img11b")

<b>fonction hideOrShowReportHTMLElements :</b><br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG12.png "cod_img12")

<b>fonction buildControl</b><br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG13.png "cod_img13")

une partie pour récupérer les données de la vue dans des variables :
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG14.png "cod_img14")


et une autre partie pour interagir avec visualize.js et configurer les ressources du serveur Jasper (récupérer les contrôles d'entrées, permettre la navigation entre les pages, ...) :

<b>authentification :</b><br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG15.png "cod_img15")<br>
<b>récupération de la liste des ressources :</b><br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG16.png "cod_img16")<br>
<b>le premier élement à afficher est un tableau de bord ? :</b><br>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG17.png "cod_img17")<br>
<b>le premier élément à afficher est un rapport ? : </b><br>
#### configuration du rapport
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG18.png "cod_img18")

#### contrôles d'entrées à définir si on afifche un rapport :
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG19.png "cod_img19")

<b>gestion des différentes fonctionnalités (pagination, zoom, export, modifications de paramètres) :</b>
#### pagination
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG20.png "cod_img20")
#### zoom
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG21A.png "cod_img21a")
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG21B.png "cod_img21b")
#### export
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG22.png "cod_img22")
<b>modification de la ressource à afficher lorsqu'une option est sélectionnée :</b>
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG23A.png "cod_img23a")
![alt text](https://github.com/Dreamsplutox/visualizeJS_in_ASPNET/blob/main/readme_images/CODIMG23B.png "cod_img23b")





