class Personnage {
    constructor(pseudo, classe, sante, attaque) {
        this.pseudo = pseudo;
        this.classe = classe;
        this.sante = sante;
        this.attaque = attaque;
        this.niveau = 1;
    }

    evoluer() {
        this.niveau++;
        console.log("["+this.pseudo+"] passe au niveau "+this.niveau);
    }

    verifierSante() {
        if (this.sante <= 0) {
            this.sante = 0;
            console.log("["+this.pseudo+"] à perdu !");
        }
    }

    get informations() {
        return "["+this.pseudo+"] (["+this.classe+"]) a "+this.sante+" points de vie et est au niveau "+this.niveau;
    }
}

class Magicien extends Personnage {
    constructor(pseudo) {
        super(pseudo, "magicien", 170, 90);
    }

    attaquer(personnage) {
        personnage.sante += this.attaque;
        console.log("["+this.pseudo+"] attaque ["+personnage.pseudo+"] en lancant un sort (["+this.attaque+"] dégats)");
        this.evoluer();
        personnage.verifierSante();
    }

    coupSpecial(personnage) {
        personnage.sante += this.attaque * 5;
        console.log("["+this.pseudo+"] attaque avec son coup special puissance des arcades ["+personnage.pseudo+"] (["+this.attaque*5+"] dégats)");
        this.evoluer();
        personnage.verifierSante();
    }
}

class Guerrier extends Personnage {
    constructor(pseudo) {
        super(pseudo, "guerrier", 350, 50);
    }

    attaquer(personnage) {
        personnage.sante += this.attaque;
        console.log("["+this.pseudo+"] attaque ["+personnage.pseudo+"] avec son épée (["+this.attaque+"] dégats)");
        this.evoluer();
        personnage.verifierSante();
    }

    coupSpecial(personnage) {
        personnage.sante += this.attaque * 5;
        console.log("["+this.pseudo+"] attaque avec son coup special hache de guerre ["+personnage.pseudo+"] (["+this.attaque*5+"] dégats)");
        Personnage.evoluer();
        personnage.verifierSante();
    }
}

let btn = document.querySelector("button");
let cmt1 = document.querySelector("#combatant1");
let cmt2 = document.querySelector("#combatant2")
let error = document.querySelector("#error")
let image = document.querySelector("img")
cmt1.addEventListener("keyup", function () {
    if (!isNaN(cmt1.value) && cmt1.value !== "") {
        error.style.display = "block";
    } else {
        error.style.display = "none";
    }
})
cmt2.addEventListener("keyup", function () {
    if (!isNaN(cmt1.value) && cmt1.value !== "") {
        error.style.display = "block";
    } else {
        error.style.display = "none";
    }
})
btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (cmt1.value === "" || cmt2.value === "") {
        error.textContent = "Vous devez renseigner les noms des deux combattant pour qu'il se battent"
        error.style.display = "block";
    } else {
        image.style.display = "block";
    }
})

var gandalf = new Magicien('Gandalf');
var thor    = new Guerrier('Thor');
console.log(thor.informations);
console.log(gandalf.informations);
gandalf.attaquer(thor);
console.log(thor.informations);
thor.attaquer(gandalf);
console.log(gandalf.informations);
gandalf.coupSpecial(thor);
