const db = require (`../data/db`);
const { v4: uuidv4 } = require('uuid');

function ShowUser(email) {
    return db.prepare(`SELECT name, email, created_at FROM users WHERE email = ?`).get(email);
};
function RegisterUser() {
  //return db.prepare(`SELECT * FROM surveys`).all();
};
function LoginUser() {
  //return db.prepare(`SELECT * FROM surveys`).all();
};
function ChangeUser() {
  //return db.prepare(`SELECT * FROM surveys`).all();
};
function DeleteUser() {
  //return db.prepare(`SELECT * FROM surveys`).all();
};

module.exports = {
    ShowUser,
    RegisterUser,
    LoginUser,
    ChangeUser,
    DeleteUser
};