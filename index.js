
// Le jeu comporte 10 numéros différents qui sont numérotés de 0 à 9.
// Le tableau est initialisé avec les numéros qui se suivent.

var numeroscartes = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];

// l'état initial des cartes est défini sur 0 recto de la carte
var etatsCartes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// l'état de la carte une fois retournée est défini 
//selon le numéro de la carte dessus
var cartesRetournees = [];

// correspond au compteur de nombre de paires trouvées
var nbPairesTrouvees = 0;

// récupère les images dans le HTML
var imgCartes = document.getElementById("tapis").getElementsByTagName("img");

// Création d'une boucle for 
//On parcourt le tableau des objets des éléments img, 
//chacun d'eux reçoit une fonction déclenchée par l'événement onclick.
//La fonction ainsi définie est exécutée à chaque fois que l'utilisateur 
//clique sur l'image son rôle est d'appeller controleJeu avec le numéro de l'image cliquée.

for (var i = 0; i < imgCartes.length; i++) {
    imgCartes[i].noCarte = i; //Ajout de la propriété "noCarte" à l'objet img
    imgCartes[i].onclick = function() {
        controleJeu(this.noCarte);
    }
}
//Appel de la fonction initialiseJeu pour mélanger les cartes.

initialiseJeu();

// Utilisez switch pour sélectionner l'un des nombreux blocs de code à exécuter
// Voilà comment cela fonctionne:

//     L'expression est évaluée une fois.
//     La valeur de l'expression est comparée aux valeurs de chaque cas.
//     S'il y a correspondance, le bloc de code associé est exécuté.


//La fonction affichage met à jour l'affichage de la carte.

//L'affichage rendu dépend de l'état actuel de la carte (donné par le tableau etatsCartes) : 
// Le codage utilisé pour l'état des cartes :

//état 0 : carte face cachée, on affichage l'image de dos de carte.

//état 1 : carte retournée, on affiche l'image du chiffre correspondant.

//état -1 : carte enlevée du jeu, on cache l'élément img.

function affichage(noCarte) {
    switch (etatsCartes[noCarte]) {
        case 0:
            imgCartes[noCarte].src = "images/om.jpg";
            break;
        case 1:
            imgCartes[noCarte].src = "images/carte" + numeroscartes[noCarte] + ".png";
            break;
        case -1:
            imgCartes[noCarte].style.visibility = "hidden";   
    }
}

//La fonction rejouer affiche un message de félicitation et permet de jouer 
//à nouveau en rechargeant la page dans le navigateur.

function rejouer() {
    alert("Vous avez gagné");
    location.reload();
}

//La fonction initialiseJeu mélange les numéros de motif des cartes.
//Pour cela un algorithme de mélange est utilisé

function initialiseJeu() {
    for (var position = numeroscartes.length - 1; position >= 1; position--) {
        var hasard = Math.floor(Math.random() * (position + 1));
        var sauve = numeroscartes[position];
        numeroscartes[position] = numeroscartes[hasard];
        numeroscartes[hasard] = sauve;
    }
}

//fonction appelée chaque fois que l'utilisateur clique sur une carte 
//en passant en paramètre le numéro de la carte cliquée.

function controleJeu(noCarte) {


//Si la carte cliquée est de dos (état 0) :

    //on fait passer son état à 1,

    //on ajoute son numéro au tableau des cartes retournées,

    //on fait la mise à jour de son affichage. 

// pour les états 1 et -1 : 
// cliquer sur une carte déjà retournée ne change rien 
// cliquer sur une zone de carte enlevée non plus.
        if (etatsCartes[noCarte] == 0) {
            etatsCartes[noCarte] = 1;
            cartesRetournees.push(noCarte);
            affichage(noCarte);
        }

//Si on se retrouve avec deux cartes retournées, il faut déterminer si elles ont le même motif :
//si oui : les deux cartes prennent le nouvel état -1 (c'est à dire qu'il faut les enlever) 
//et aumente le compteur de nombre de paires trouvées (nbPairesTrouvees),
//si non : les deux cartes prennent le nouvel état 0 (c'est à dire qu'on les remet de dos).
        if (cartesRetournees.length == 2) {
            var nouveauEtat = 0;
            if (numeroscartes[cartesRetournees[0]] == numeroscartes[cartesRetournees[1]]) {
                nouveauEtat = -1;
                nbPairesTrouvees++;
            }

            etatsCartes[cartesRetournees[0]] = nouveauEtat;
            etatsCartes[cartesRetournees[1]] = nouveauEtat;


// Différe la mise à jour de l'affichage des cartes de 600ms.
//Enfin au cas où toutes les paires ont été trouvées, on appelle la fonction rejouer

          		setTimeout(function() {
                affichage(cartesRetournees[0]);
                affichage(cartesRetournees[1]);
                cartesRetournees = [];
                if (nbPairesTrouvees == 10) {
                    rejouer();
                }
            }, 600);
        }
}