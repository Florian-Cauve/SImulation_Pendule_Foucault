from math import cos,sin,pi
import turtle

"""Declaration des variables utiles pour tous les calculs"""
Omega = (2*pi)/86164
Omega0 = 0.04
global temps
temps = 0


"""Recuperation des données utiles pour le calcul"""
def InitialisationParametres():
    global teta

    while True:
        try:
            teta = turtle.numinput("Latitude","Veuillez entrez la latitude de l'emplacement où vous voulez placer votre pendule de foucault (vous pouvez trouver toutes les latitudes des différentes capitales sur ce site : )",""
                                                                                                                                                                                                                                 "",-90,90)
            if teta <= 90 and teta >= -90 :
                break
        except TypeError:
            pass

    teta = ((teta*pi)/180) + (2 * pi)  # Important le +2pi car on peut mettre la valeur 0

    """Caclul de la période"""
    T = abs((2 * pi) / (Omega * sin(teta)))
    print(T)
    global Theure
    Theure = T / 3600

def AffichageParametres(temps):
    pointeur.up()
    pointeur.home()
    pointeur.goto(-650,350)
    global posParametres
    posParametres = pointeur.position()
    """
    pointeur.setheading(0)
    pointeur.forward(-20)
    pointeur.color('white')
    pointeur.begin_fill()
    pointeur.forward(350)
    pointeur.right(90)
    pointeur.forward(50)
    pointeur.right(90)
    pointeur.forward(350)
    pointeur.right(90)
    pointeur.forward(50)
    pointeur.end_fill()"""

    """Affichage des différents parametres"""
    pointeur.color('black')
    pointeur.goto(posParametres)
    pointeur.write(("Période du pendule pour faire un tour complet : %d h %d min" % ((round(Theure - Theure % 1)),(round(Theure % 1 * 60)))),False,"left",("Arial",12,"normal"))
    pointeur.goto(posParametres[0],posParametres[1]-30)
    tempsHeure = temps / 3600
    pointeur.write(("Temps écoulé depuis le lancement : %d h %d min" % ((round(tempsHeure - tempsHeure % 1)), (round(tempsHeure % 1 * 60)))), False, "left", ("Arial", 12, "normal"))

def AffichageTempsEcoule(temps):
    tempsHeure = temps / 3600
    if (round(tempsHeure % 1 * 60)) != (round(((temps-1) / 3600) % 1 * 60)):
        pointeur.up()
        pointeur.goto(posParametres[0]-20,posParametres[1])
        pointeur.setheading(0)
        pointeur.color('white')
        pointeur.begin_fill()
        pointeur.forward(370)
        pointeur.right(90)
        pointeur.forward(50)
        pointeur.right(90)
        pointeur.forward(370)
        pointeur.right(90)
        pointeur.forward(50)
        pointeur.end_fill()

        pointeur.color('black')
        pointeur.goto(posParametres[0], posParametres[1] - 30)
        pointeur.write(("Temps écoulé depuis le lancement : %d h %d min" % ((round(tempsHeure - tempsHeure % 1)), (round(tempsHeure % 1 * 60)))), False, "left", ("Arial", 12, "normal"))

def AffichagePeriode():
    pointeur.up()
    pointeur.color('black')
    pointeur.goto(posParametres)
    pointeur.write(("Période du pendule pour faire un tour complet : %d h %d min" % ((round(Theure - Theure % 1)), (round(Theure % 1 * 60)))), False, "left", ("Arial", 12, "normal"))


def testturtle():
    """Commande pour tracer des choses"""
    pointeur.down() #Pose le stylo pour pouvoir écrire, inverse fenetre.up()
    pointeur.right(90) #peut utiliser fenetre.rt
    pointeur.forward(100) #peut utiliser fenetre.fd
    pointeur.goto(+100,+42)
    pointeur.left(90)
    pointeur.forward(150)

    """Faire un cercle"""
    pointeur.goto(0,0)
    pointeur.circle(100)
    pointeur.setheading(90)
    pointeur.forward(200)

def TracerFenetre():
    """Initialiser la page"""
    global fenetre
    fenetre = turtle.Screen()
    fenetre.title("Simulation du pendule de foucault")
    fenetre.setup(width=1.0, height=1.0)

    """Initialiser le pointeur"""
    global pointeur
    pointeur = turtle.Turtle()
    pointeur.speed(0)
    pointeur.hideturtle()
    pointeur.home()
    pointeur.clear()
    pointeur.up()

def TracerCercle():
    """Creation de la partie pour le cercle trigonometrique"""
    global tailleRayonCercle
    tailleRayonCercle = 350

    pointeur.up()
    pointeur.home()
    pointeur.setheading(270)
    pointeur.forward(tailleRayonCercle)
    pointeur.lt(90)
    pointeur.down()
    pointeur.pen(fillcolor='white')
    pointeur.begin_fill()
    pointeur.circle(tailleRayonCercle)
    pointeur.end_fill()
    pointeur.setheading(0)
    pointeur.up()
    pointeur.circle(tailleRayonCercle,90)
    pointeur.color('red')
    pointeur.dot(10)
    pointeur.write("Point de lancement du pendule")
    pointeur.up()

def TracerTrajectoire():
    temps = 0
    pointeur.color('black')
    while True:
        """Calcul de la fonction du pendule"""
        Pcomplexe = cos(-Omega * sin(teta) * temps)
        PImaginaire = sin(-Omega * sin(teta) * temps)
        Multiplicateur = complex(Pcomplexe, PImaginaire)
        Pcomplexe = cos(Omega0 * temps)
        PImaginaire = ((Omega * sin(teta)) / Omega0) * sin(Omega0 * temps)
        Z = Multiplicateur * complex(Pcomplexe, PImaginaire)

        """Affichage du point calculer dans cette itération"""
        pointeur.down()
        pointeur.goto(Z.real*tailleRayonCercle,Z.imag*tailleRayonCercle)
        AffichageTempsEcoule(temps)
        pointeur.up()
        pointeur.goto(Z.real*tailleRayonCercle,Z.imag*tailleRayonCercle)
        temps = temps + 1

def TracerBoulePendule():
    temps = 0
    fenetre.tracer(0)
    pointeur.up()
    while True:
        """Calcul de la fonction du pendule"""
        Pcomplexe = cos(-Omega * sin(teta) * temps)
        PImaginaire = sin(-Omega * sin(teta) * temps)
        Multiplicateur = complex(Pcomplexe, PImaginaire)
        Pcomplexe = cos(Omega0 * temps)
        PImaginaire = ((Omega * sin(teta)) / Omega0) * sin(Omega0 * temps)
        Z = Multiplicateur * complex(Pcomplexe, PImaginaire)

        """Affichage du point calculer dans cette itération"""
        pointeur.clear()
        TracerCercle()
        AffichageParametres(temps)
        pointeur.goto(Z.real * tailleRayonCercle, Z.imag * tailleRayonCercle)
        pointeur.dot(50, 'black')
        fenetre.update()
        temps = temps + 1

"""Faire en sorte de garder la fenetre (garde pour l'instant)"""
TracerFenetre()

InitialisationParametres()

AffichageParametres(temps)


TracerCercle()
TracerBoulePendule()
TracerTrajectoire()


"""Obligatoirement en fin de programme"""
turtle.done()