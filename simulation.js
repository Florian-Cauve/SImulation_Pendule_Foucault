function LancementSimulation(teta,Prog) {
    /*Initialisation de tous les parametres*/
    var pi = Math.PI;
    var Omega = Omega = (2 * pi) / 86164
    var Omega0 = 0.04
    var AngleRad = ((teta * pi) / 180) + (2 * pi)
    var PeriodeHeure = Math.abs((2 * pi) / (Omega * Math.sin(AngleRad))) / 3600
    document.getElementById('Periode').innerHTML =
        (Math.round(PeriodeHeure - PeriodeHeure % 1)).toString() + "h" +
        (Math.round(PeriodeHeure % 1 * 60)).toString() + "min";
    var temps = 0;
    var Z = [1,0];

    /*Parametrage du canvas et du stylo*/
    var canvas = document.getElementById('Simulation');
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;
    var pen = canvas.getContext("2d");
    pen.translate(width / 2, height / 2); /*fixe les coordonnées au miliieu du canvas */

    /*Mettre le background en blanc*/
    pen.fillStyle = 'rgb(255, 255, 255)';
    pen.fillRect(-width / 2, -height / 2, width, height);
    /*Initialiser la taille du stylo et sa couleur*/
    pen.lineWidth = 1;

    /*
    var degrade = pen.createLinearGradient(170, 1, 1, 1);
    degrade.addColorStop(0, "white");
    degrade.addColorStop(1, "black");*/

    pen.fillStyle = 'rgb(0,0,0)';

    function test() {

        pen.moveTo(50, 0);
        for (var i = 0; i < Math.round(teta); i++) {
            pen.strokeRect(-200 + i * 20, -200 + i * 20, 20, 20);
        }

        pen.fillStyle = 'rgb(0, 0, 0)';
        pen.beginPath();
        pen.moveTo(100, 100);
        pen.lineTo(300, 150);
        pen.stroke();

        pen.beginPath();
        pen.arc(0, 0, 300, 0, 2 * Math.PI);
        pen.stroke();

        pen.fillStyle = 'blue';
        pen.font = '48px georgia';
        pen.fillText('Point de lancement du pendule', 50, 150);

    }

    function TracerCercle() {
        pen.fillStyle = 'rgb(0,0,0)';
        pen.moveTo(0, 0);
        pen.beginPath();
        pen.arc(0, 0, 0.45 * height, 0, 2 * Math.PI);
        pen.stroke();
        pen.fillStyle = 'rgb(200,0,0)';
        pen.beginPath();
        pen.arc(0.45 * height, 0, 5, 0, 2 * Math.PI);
        pen.fill();
        pen.font = '20px Arial';
        pen.fillText('Point de lancement du pendule', 0.47 * height, 0);
    }

    function MulComplex(El1, El2) {
        var PartRe = El1[0] * El2[0] + El1[1] * El2[1];
        var PartImag = El1[0] * El2[1] + El1[1] * El2[0] *-1;
        return [PartRe, PartImag];
    }

    function TracerTrajectoire() {
        /*Calcul de la fonction du pendule*/

        var Pcomplexe = Math.cos(-Omega * Math.sin(AngleRad) * temps);
        var PImaginaire = Math.sin(-Omega * Math.sin(AngleRad) * temps);
        var Multiplicateur = [Pcomplexe, PImaginaire];
        Pcomplexe = Math.cos(Omega0 * temps);
        PImaginaire = ((Omega * Math.sin(AngleRad)) / Omega0) * Math.sin(Omega0 * temps);

        /*Affichage du point calculer dans cette itération*/

        pen.beginPath();
        pen.moveTo(Z[0] * 0.45 * height, Z[1] * 0.45 * height);

        Z = MulComplex(Multiplicateur, [Pcomplexe, PImaginaire]);

        pen.lineTo(Z[0] * 0.45 * height, Z[1] * 0.45 * height);
        pen.stroke();

        document.getElementById('TempsEcoule').innerHTML =
            (Math.round(temps/3600 - temps/3600 % 1)).toString() + "h" +
            (Math.round(temps/3600 % 1 * 60)).toString() + "min";

        temps = temps + 2;

        if (document.getElementById('Trajectoire').getAttribute("name")=="true"){
            window.requestAnimationFrame(TracerTrajectoire);
        }
        else {
            window.cancelAnimationFrame(TracerTrajectoire);
            pen.fillStyle = 'rgb(255, 255, 255)';
            pen.fillRect(-width / 2, -height / 2, width, height);
            TracerCercle();
        }
    }

    function TracerPendule(){

        /*Calcul de la fonction du pendule*/
        var Pcomplexe = Math.cos(-Omega * Math.sin(AngleRad) * temps);
        var PImaginaire = Math.sin(-Omega * Math.sin(AngleRad) * temps);
        var Multiplicateur = [Pcomplexe, PImaginaire];
        Pcomplexe = Math.cos(Omega0 * temps);
        PImaginaire = ((Omega * Math.sin(AngleRad)) / Omega0) * Math.sin(Omega0 * temps);
        Z = MulComplex(Multiplicateur, [Pcomplexe, PImaginaire]);

        /*Affichage du point calculer dans cette itération*/
        pen.fillStyle = 'rgb(255, 255, 255)';
        pen.fillRect(-width / 2, -height / 2, width, height);
        TracerCercle();

        pen.fillStyle = 'rgb(0,0,0)';
        pen.beginPath();
        pen.arc(Z[0] * 0.45 * height, Z[1] * 0.45 * height, 20, 0, 2 * Math.PI);
        pen.fill();

        document.getElementById('TempsEcoule').innerHTML =
            (Math.round(temps/3600 - temps/3600 % 1)).toString() + "h" +
            (Math.round(temps/3600 % 1 * 60)).toString() + "min";

        temps = temps + 2;

        if (document.getElementById('Pendule').getAttribute("name")=="true"){
            window.requestAnimationFrame(TracerPendule);
        }
        else {
            window.cancelAnimationFrame(TracerPendule);
            pen.fillStyle = 'rgb(255, 255, 255)';
            pen.fillRect(-width / 2, -height / 2, width, height);
            TracerCercle();
        }

    }

    if (Prog==0){
        document.getElementById('Trajectoire').style = "pointer-events : none;" + "background-color : lightgrey;";
        document.getElementById('Pendule').style = "pointer-events : auto;" + "background-color : auto;";
        document.getElementById('Trajectoire').setAttribute("name","true");
        document.getElementById('Pendule').setAttribute("name","false");
        TracerCercle();
        TracerTrajectoire();
    }
    else if (Prog == 1){
        document.getElementById('Trajectoire').style = "pointer-events : none;" + "background-color : lightgrey;";
        document.getElementById('Pendule').style = "pointer-events : auto;" + "background-color : auto;";
        document.getElementById('Trajectoire').setAttribute("name","true");
        document.getElementById('Pendule').setAttribute("name","false");
        TracerTrajectoire();
    }
    else if (Prog == 2){
        document.getElementById('Trajectoire').style = "pointer-events : auto;" + "background-color : auto;";
        document.getElementById('Pendule').style = "pointer-events : none;" + "background-color : lightgrey;";
        document.getElementById('Trajectoire').setAttribute("name","false");
        document.getElementById('Pendule').setAttribute("name","true");
        TracerPendule();
    }
}