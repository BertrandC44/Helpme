const Role = Object.freeze({
  ROLE_APPRENANT: 1,
  ROLE_FORMATEUR: 2,
});

// Base utilisateurs simulée (in-memory)
let users = [
  {
    id: 1,
    username: "formateur",
    name: "formateur",
    password: process.env.PWD_FORMATEUR || "Pa$$w0rd",
    role: Role.ROLE_FORMATEUR,
  },
  {
    id: 2,
    username: "alice",
    name: "Alice",
    password: "alice",
    role: Role.ROLE_APPRENANT,
  },
  {
    id: 3,
    username: "bob",
    name: "Bob",
    password: "bob",
    role: Role.ROLE_APPRENANT,
  },
];

let idx = 4;

/**
 * Trouve un utilisateur par ID
 */
function findUserById(id) {
  return users.find((user) => user.id === Number(id));
}

/**
 * Authentifie un utilisateur par login/mot de passe
 */
function findUserByUsernameAndPassword(username, password) {
  return users.find(
    (user) => user.username === username && user.password === password
  );
}

/**
 * Supprime un utilisateur par ID
 */
function deleteUser(id) {
  users = users.filter((user) => user.id !== Number(id));
}

module.exports = {
  Role,
  findUserById,
  findUserByUsernameAndPassword,
  deleteUser,
};
