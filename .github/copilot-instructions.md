# Copilot Instructions for Helpme Project

## Project Overview
- This is a Node.js/Express web application for managing support tickets.
- Views are rendered using EJS templates in the `views/` directory.
- Static assets are served from the `public/` directory.
- The main entry point is `app.js`.

## Key Components
- **Tickets Domain Model:**
  - Defined in `src/BO/Tickets` as a class (see below for conventions).
  - Each ticket has: auto-incremented `id`, required `auteur`, `date-creation` (computed, format: dd/MM/YYYY HH:mm:ss), required `titre` (max 50 chars), optional `description` (max 2000 chars), and `etat` ("ouvert" by default, or "clos").
- **Business Logic:**
  - Service logic is in `src/Services/ticket.service` (methods for updating status, getting details, etc).
- **Views:**
  - EJS templates in `views/` (main: `liste-tickets.ejs`).
  - Header/footer fragments in `views/fragments/`.

## Patterns & Conventions
- Use ES6 classes for domain models and services.
- Tickets are not persisted to a database (in-memory only, unless otherwise specified).
- All dates must be formatted as `dd/MM/YYYY HH:mm:ss`.
- Status (`etat`) is always either `ouvert` or `clos`.
- Use module exports for classes/services if needed for reuse.
- Use `nodemon` for development (`npm start`).
- Use `jest` for tests (`npm test`).

## Example: Ticket Class
```js
class Ticket {
  static idCounter = 0;
  constructor(auteur, titre, description = "") {
    if (!auteur) throw new Error("L'auteur est obligatoire.");
    if (!titre || titre.length > 50) throw new Error("Le titre est obligatoire et doit faire 50 caractères max.");
    if (description && description.length > 2000) throw new Error("La description doit faire 2000 caractères max.");
    this.id = ++Ticket.idCounter;
    this.auteur = auteur;
    this.date_creation = Ticket.getCurrentDateTime();
    this.titre = titre;
    this.description = description;
    this.etat = "ouvert";
  }
  static getCurrentDateTime() {
    const now = new Date();
    const pad = n => n.toString().padStart(2, '0');
    return `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }
  fermer() { this.etat = "clos"; }
  ouvrir() { this.etat = "ouvert"; }
}
```

## Developer Workflow
- Start the app: `npm start` (runs on port 3333 by default)
- Run tests: `npm test`
- Main logic: edit `app.js`, `src/BO/Tickets`, `src/Services/ticket.service`
- Add new views in `views/`, fragments in `views/fragments/`

## Integration Points
- Express routes are defined in `app.js`.
- EJS templates receive data via `res.render()`.
- No database integration by default; add persistence as needed.

---
If any conventions or workflows are unclear, please ask for clarification or examples from the codebase.
