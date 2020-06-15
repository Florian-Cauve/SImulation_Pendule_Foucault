<html>
<head>
    <title>Simulation pendule de Foucault</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="simulation.js"></script>
</head>
<body>
<div class="Explication">
    <label>Simulation prouvant la rotation de la Terre :</label>
    <label>Vous devez rentrer une latitude qui correspondra à l'emplacement (sur Terre) de votre pendule de Foucault, lancez
        ensuite la simulation.</label>
    <label>Vous pourrez donc observer la période représentant le temps que le pendule met à faire un tour.</label>
    <label>Enfin vous pourrez observer le pendule qui oscille ou bien sa trajectoire en fonction du temps.</label>
    <label>Retrouvez toutes les latitudes des grandes capitales <a
                href="https://fr.wikipedia.org/wiki/Liste_des_capitales_nationales_par_latitude">ici</a></label>
</div>
<div class="index">
    <form action="traitement.php" method="POST">
        <label>Entrez la latitude que vous souhaitez :</label>
        <input type="number" step="0.01" name="latitude" max="90" min="-90">
        <input type="submit" value="Lancer la simulation">
    </form>
</div>

<label class="footer">Pensé et réalisé par le groupe G5D : Cauvé Florian - Chemillier Hugo - Fourniere Hadrien -
    Fathi Kadir Abdallah - Lamy François - Lorphelin Arthur</label>

</body>
</html>