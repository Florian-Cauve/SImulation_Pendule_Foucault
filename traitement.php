<html>
<head>
    <title>Simulation du pendule de foucault</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="simulation.js"></script>
</head>
<body onload="LancementSimulation(<?php echo $_POST["latitude"] ?>,0)">

    <div class="FenetreSimulation">
        <div class="Periode">
            <label>Période pour 1 tour : <label id="Periode"></label></label>
        </div>

        <div class="Chrono">
            <label>Temps écoulé depuis le début de la simulation</label>
            <label id="TempsEcoule"></label>
        </div>
    </div>
    <div class="bande"></div>
    <div class="SecondePartie">
        <div class="Bouton">
            <input type="button" id="Trajectoire" class="changerVue" name="false" value="Voir Trajectoire" onclick="LancementSimulation(<?php echo $_POST["latitude"] ?>,1)">
            <input type="button" id="Pendule" class="changerVue" name="false" value="Voir Pendule" onclick="LancementSimulation(<?php echo $_POST["latitude"] ?>,2)">
            <a href="index.php"><input type="button" value="Changer la latitude"></a>
        </div>
        <div class="divSimulation">
            <canvas id="Simulation"></canvas>
        </div>
    </div>
    <label id="text" >Vous avez choisi une latitude de <?php echo $_POST["latitude"] ?> pour votre simulation du pendule de Foucault.</label>
</body>
</html>





