const toggleButton = document.getElementById('darkModeToggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode'); // Bascule la classe 'dark-mode' pour activer/désactiver
    if (body.classList.contains('dark-mode')) {
        toggleButton.textContent = 'light mode'; // Change le texte du bouton pour "light mode"
    } else {
        toggleButton.textContent = 'black mode'; // Change le texte du bouton pour "black mode"
    }
});

function openTab(evt, tabName) {
    // Cacher tous les éléments de contenu
    let tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = "none";
    }
  
    // Retirer la classe 'active' de tous les boutons d'onglet
    let tabLinks = document.getElementsByClassName("tab-link");
    for (let i = 0; i < tabLinks.length; i++) {
      tabLinks[i].classList.remove("active");
    }
  
    // Afficher le contenu de l'onglet sélectionné
    document.getElementById(tabName).style.display = "block";
    
    // Ajouter la classe 'active' au bouton d'onglet sélectionné
    evt.currentTarget.classList.add("active");
  }
  document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Empêche l'envoi du formulaire pour validation

    // Initialiser des variables pour la validation
    let formIsValid = true;

    // Récupérer les champs du formulaire
    let pseudo = document.getElementById('pseudo');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let password2 = document.getElementById('password2');
    let fruitSelection = document.querySelector('input[name="fruit"]:checked');

    // Validation du pseudo
    if (pseudo.value.length < 6) {
        pseudo.classList.add('invalid');
        pseudo.classList.remove('valid');
        formIsValid = false;
    } else {
        pseudo.classList.add('valid');
        pseudo.classList.remove('invalid');
    }

    // Validation de l'email
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email.value)) {
        email.classList.add('invalid');
        email.classList.remove('valid');
        formIsValid = false;
    } else {
        email.classList.add('valid');
        email.classList.remove('invalid');
    }

    // Validation du mot de passe
    if (password.value.length < 8) {
        password.classList.add('invalid');
        password.classList.remove('valid');
        formIsValid = false;
    } else {
        password.classList.add('valid');
        password.classList.remove('invalid');
    }

    // Validation de la vérification du mot de passe
    if (password.value !== password2.value) {
        password2.classList.add('invalid');
        password2.classList.remove('valid');
        formIsValid = false;
    } else {
        password2.classList.add('valid');
        password2.classList.remove('invalid');
    }

    // Validation du QCM (question de type radio)
    if (!fruitSelection) {
        formIsValid = false;
        alert('Veuillez sélectionner une réponse à la question.');
    }

    // Si le formulaire est valide, on peut le soumettre
    if (formIsValid) {
        alert('Formulaire soumis avec succès !');
    }
});
class Personnage {
    constructor(nom, pointsDeVie, attaque, precision) {
        this.nom = nom;
        this.pointsDeVie = pointsDeVie;
        this.attaque = attaque;
        this.precision = precision;
    }

    //precision
    attaquer(adversaire) {
        const chance = Math.random();
        if (chance < this.precision) {
            adversaire.pointsDeVie -= this.attaque;
            return `${this.nom} attaque ${adversaire.nom} et lui inflige ${this.attaque} points de dégâts !`;
        } else {
            return `${this.nom} a raté son attaque contre ${adversaire.nom} !`;
        }
    }
}

const combattant1 = new Personnage("Vauban", 100, 20, 0.8);
const combattant2 = new Personnage("Chroma", 80, 25, 0.7);

const pv1Element = document.getElementById('pv1');
const pv2Element = document.getElementById('pv2');
const resultElement = document.getElementById('result');

let combatInterval;

function combat() {
    combatInterval = setInterval(() => {
        if (combattant1.pointsDeVie > 0 && combattant2.pointsDeVie > 0) {
            // Le Guerrier attaque
            let result = combattant1.attaquer(combattant2);
            resultElement.innerText = result;
            pv2Element.innerText = combattant2.pointsDeVie;

            if (combattant2.pointsDeVie <= 0) {
                resultElement.innerText += `\n${combattant2.nom} a été vaincu ! ${combattant1.nom} remporte le combat !`;
                clearInterval(combatInterval);  // Stoppe le combat
                return;
            }

            // Le Mage attaque
            result = combattant2.attaquer(combattant1);
            resultElement.innerText += `\n${result}`;
            pv1Element.innerText = combattant1.pointsDeVie;

            if (combattant1.pointsDeVie <= 0) {
                resultElement.innerText += `\n${combattant1.nom} a été vaincu ! ${combattant2.nom} remporte le combat !`;
                clearInterval(combatInterval);  // Stoppe le combat
            }
        }
    }, 1000); // Combat se déroule toutes les secondes
}

// Appeler la fonction combat pour commencer
combat();