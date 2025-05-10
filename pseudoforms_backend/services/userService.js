const userModel = require(`../models/userModel`);

exports.ShowUser = (email) => {
    return userModel.ShowUser(email);
};
exports.RegisterUser = () => {
    return userModel.RegisterUser();
};
exports.LoginUser = () => {
    return userModel.LoginUser();
};
exports.ChangeUser = () => {
    return userModel.ChangeUser();
};
exports.DeleteUser = (id) => {
    return userModel.DeleteUser(id);
};