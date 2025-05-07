const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Możliwość np. sprawdzenia danego użytkownika który stworzył ankiete. Szukamy po email, nie po ID, bo email jest w bazie jako NOT NULL UNIQUE, a po ID usera będziemy pozwalać kasować ankiety, tworzyć ankiety jako dany user itp/itd. nie wiem czyd dobrze myśle, no ale... 
router.get('/:email', userController.ShowUser);
// jak w surveyModel - adres rozwija się do /user/login
router.post('/login', userController.LoginUser);
router.put('/register', userController.RegisterUser);
router.patch('/change', userController.ChangeUser);
router.delete('/:email', userController.DeleteUser);

module.exports = router;
