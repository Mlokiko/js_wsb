const db = require (`../data/db`);
const { v4: uuidv4 } = require('uuid');

function ShowUser() {

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