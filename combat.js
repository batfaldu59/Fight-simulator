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
        return "["+this.pseudo+"] passe au niveau "+this.niveau;
    }

    verifierSante() {
        if (this.sante <= 0) {
            this.sante = 0;
            return "["+this.pseudo+"] à perdu !";
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
        let resultat = "["+this.pseudo+"] attaque ["+personnage.pseudo+"] en lancant un sort (["+this.attaque+"] dégats)";
        this.evoluer();
        personnage.verifierSante();
        return resultat;
    }

    coupSpecial(personnage) {
        personnage.sante += this.attaque * 5;
        let resultat = "["+this.pseudo+"] attaque avec son coup special puissance des arcades ["+personnage.pseudo+"] (["+this.attaque*5+"] dégats)";
        this.evoluer();
        personnage.verifierSante();
        return resultat;
    }
}

class Guerrier extends Personnage {
    constructor(pseudo) {
        super(pseudo, "guerrier", 350, 50);
    }

    attaquer(personnage) {
        personnage.sante += this.attaque;
        let resultat = "["+this.pseudo+"] attaque ["+personnage.pseudo+"] avec son épée (["+this.attaque+"] dégats)";
        this.evoluer();
        personnage.verifierSante();
        return resultat;
    }

    coupSpecial(personnage) {
        personnage.sante += this.attaque * 5;
        let resultat = "["+this.pseudo+"] attaque avec son coup special hache de guerre ["+personnage.pseudo+"] (["+this.attaque*5+"] dégats)";
        Personnage.evoluer();
        personnage.verifierSante();
        return resultat;
    }
}


let btn = document.querySelector("button");
let error = document.querySelector("#error")
let image = document.querySelector("img")
let cmt = document.querySelectorAll(".combattant").forEach(element => {
    element.addEventListener('keyup', () => {
        if (!isNaN(element.value) && element.value !== '') {
            error.style.display = "block";
        } else {
            error.style.display = "none";
        }
    })
})


btn.addEventListener("click", (e) => {
    e.preventDefault();
    let combattant = document.querySelectorAll(".combattant");
    let combattant1;
    let combattant2;
    for (let i = 0 ; i < combattant.length ; i++) {
        if (combattant[i].value === "") {
            error.textContent = "Vous devez renseigner les noms des héros qui combattrons";
            error.style.display = "block";
        } else {
            error.style.display = "none";
            combattant[i].setAttribute("disabled", true);
            image.style.display = "block";
            
        }
        
        if (i === 0) {
            combattant1 = new Magicien(combattant[0].value);
        } else {
            combattant2 = new Guerrier(combattant[1].value)
        }
    }
    var result = () => {
        let div = document.querySelector("#resultat");
        div.innerHTML = "<p>"+combattant1.informations+"<br>"+combattant2.informations+"<br>"+combattant1.attaquer(combattant2)+
                        "<br>"+combattant2.informations+"<br>"+combattant2.attaquer(combattant1)+
                        "<br>"+combattant1.informations+"<br>"+combattant1.coupSpecial(combattant2)+"</p>";
    } 
    setTimeout(result, 3000);
    
    
    
    
})


// console.log(thor.informations);
// console.log(gandalf.informations);
// gandalf.attaquer(thor);
// console.log(thor.informations);
// thor.attaquer(gandalf);
// console.log(gandalf.informations);
// gandalf.coupSpecial(thor);
