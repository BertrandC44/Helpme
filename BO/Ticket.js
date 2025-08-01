class Ticket {
    
    /**
     * @param {string} auteur - Auteur du ticket (obligatoire)
     * @param {string} titre - Titre du ticket (alphanumérique, max 50, obligatoire)
     * @param {string} description - Description du ticket (alphanumérique, max 2000)
     */
    constructor(auteur, titre, description = "") {
        if (!auteur) throw new Error("L'auteur est obligatoire.");
        if (!titre || titre.length > 50) throw new Error("Le titre est obligatoire et doit faire 50 caractères max.");
        if (description && description.length > 2000) throw new Error("La description doit faire 2000 caractères max.");

        this.id = id;
        this.auteur = auteur;
        this.dateCreation = new Date();
        this.titre = titre;
        this.description = description;
        this.etat = etat; 
    }

    get creationFormatee() {
    return this.creation.toLocaleString("fr-FR"); // format dd/MM/YYYY HH:mm:ss
  }

}

const EtatTicket = {
  OUVERT: "OUVERT",
  CLOS: "CLOS",
  TOUS: "TOUS",
};

module.exports = { Ticket, EtatTicket };

   