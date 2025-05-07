const userService = require('../services/userService');


exports.ShowUser = (req, res) => {
  const { email } = req.params;
  const user = userService.ShowUser(email);
  if (!user) {
    return res.status(404).json({ error: 'Użytkownik o podanym emailu nie został znaleziony' });
  }

  res.status(200).json(user);
};
exports.RegisterUser = (req, res) => {

};
exports.LoginUser = (req, res) => {

};
exports.ChangeUser = (req, res) => {

};
exports.DeleteUser = (req, res) => {
    return userModel.DeleteUser(id);
};