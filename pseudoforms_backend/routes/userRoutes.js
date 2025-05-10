const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Możliwość np. sprawdzenia danego użytkownika który stworzył ankiete. Szukamy po email, nie po ID, bo email jest w bazie jako NOT NULL UNIQUE, a po ID usera będziemy pozwalać kasować ankiety, tworzyć ankiety jako dany user itp/itd. nie wiem czyd dobrze myśle, no ale... 
router.get('/:email', userController.ShowUser);
/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Pobierz dane użytkownika
 *     description: Pobiera informacje o użytkowniku na podstawie podanego adresu email.
 *     tags:
 *       - Użytkownicy
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Adres email użytkownika, którego dane mają zostać pobrane.
 *         schema:
 *           type: string
 *           example: "user@example.com"
 *     responses:
 *       200:
 *         description: Dane użytkownika zostały pomyślnie pobrane.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID użytkownika.
 *                 name:
 *                   type: string
 *                   description: Imię i nazwisko użytkownika.
 *                 email:
 *                   type: string
 *                   description: Adres email użytkownika.
 *       404:
 *         description: Użytkownik o podanym emailu nie został znaleziony.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Użytkownik o podanym emailu nie został znaleziony."
 *       500:
 *         description: Wewnętrzny błąd serwera.
 */
// jak w surveyModel - adres rozwija się do /user/login
router.post('/login', userController.LoginUser);
router.put('/register', userController.RegisterUser);
router.patch('/change', userController.ChangeUser);
router.delete('/:email', userController.DeleteUser);

module.exports = router;
