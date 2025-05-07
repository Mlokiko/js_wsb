const userModel = require(`../models/userModel`);

exports.ShowUser = () => {

};
exports.RegisterUser = () => {

};
exports.LoginUser = () => {

};
exports.ChangeUser = () => {

};
exports.DeleteUser = (id) => {
    return userModel.DeleteUser(id);
};