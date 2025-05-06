const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');

router.get('/', surveyController.getAllSurveys);
/**
 * @swagger
 * /surveys:
 *   get:
 *     summary: Pobierz wszystkie ankiety
 *     description: Pobiera wszystkie ankiety z bazy SQL. Są to wyłącznie ankiety (tabela surveys), bez pytań do nich ani odpowiedzi
 *     responses:
 *       200:
 *         description: Wszystkie ankiety.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID ankiety - tworzony przy pomocy uuidv4().
 *                   title:
 *                     type: string
 *                     description: Tytuł ankiety.
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: Timestamp utworzenia ankiety.
 *                   author_id:
 *                     type: string
 *                     description: ID autora ankiety.
 */
router.get('/:id', surveyController.getSurveyById);
/**
 * @swagger
 * /surveys/{id}:
 *   get:
 *     summary: Pobierz ankietę o podanym ID
 *     description: Pobiera ankietę o podanym ID z bazy danych. Ankieta zawiera informacje zawarte w tabeli surveys oraz odpowiadające dane z questions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID ankiety (generowane przez uuidv4()).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the requested survey.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique identifier for the survey.
 *                 title:
 *                   type: string
 *                   description: Title of the survey.
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: Timestamp of survey creation.
 *                 author_id:
 *                   type: string
 *                   description: ID of the survey author.
 *       404:
 *         description: Ankieta nie znaleziona.
 */
router.post('/', surveyController.createSurvey);
/**
 * @swagger
 * /surveys:
 *   post:
 *     summary: Stwórz nową ankietę
 *     description: Dodaje nową ankietę do bazy danych.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Tytuł ankiety.
 *                 example: "Pączki"
 *               author:
 *                 type: string
 *                 description: ID użytkownika który stworzył ankietę.
 *                 example: NULL
 *               questions:
 *                 type: array
 *                 description: Lista pytań które zostaną dodane do ankiety.
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                       description: Tekst pytania.
 *                     question_type:
 *                       type: string
 *                       description: Typ pytania (np. multiple_choice, text, single_choice).
 *                     options:
 *                       type: array
 *                       description: Możliwe opcje odpowiedzi (tylko dla pytań typu multiple_choice).
 *                       items:
 *                         type: string
 *           example:
 *             title: "Pączki"
 *             author: null
 *             questions:
 *               - text: "Czy lubisz pączki?"
 *                 question_type: "single_choice"
 *                 options: ["Tak!", "Nie!", "Zjem jak ktoś mi da"]
 *               - text: "Jaki jest Twój ulubiony smak pączka?"
 *                 question_type: "multiple_choice"
 *                 options: ["Truskawkowy", "Czekoladowy", "Waniliowy", "Różany"]
 *     responses:
 *       201:
 *         description: Ankieta poprawnie utworzona.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique ID of the newly created survey.
 *                 title:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 author_id:
 *                   type: string
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The unique ID of the question.
 *                       text:
 *                         type: string
 *                       type:
 *                         type: string
 *                       options:
 *                         type: array
 *                         items:
 *                           type: string
 *       400:
 *         description: Bad request - invalid input data.
 */

router.put('/:id/submit', surveyController.submitSurvey);
/**
 * @swagger
 * /surveys/{id}/submit:
 *   put:
 *     summary: Wyślij odpowiedzi do ankiety
 *     description: Wysyła odpowiedzi do ankiety o podanym id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID ankiety.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               respondent_id:
 *                 type: string
 *                 description: ID użytkownika wysyłającego odpowiedzi. Może zawierać NULL - wtedy przyjmujemy że ankiete wypełnił niezalogowany użytownik.
 *                 example: "user_123"
 *               responses:
 *                 type: array
 *                 description: Tablica odpowiedzi na pytania. Zawiera 1 lub więcej odpowiedzi na pytania
 *                 items:
 *                   type: object
 *                   properties:
 *                     question_id:
 *                       type: integer
 *                       description: ID samego pytania. 
 *                       example: 1
 *                     response_text:
 *                       type: string
 *                       description: Text odpowiedzi. dla pytań multi będzie zawierać tablicę (zawierającą elementy z question_options_json), dla single po prosty jedną z opcji, dla otwartych (type - text) znajduje się dowolny tekst napisany przez użytkownika
 *                       example: "Tak!"
 *     responses:
 *       200:
 *         description: Survey successfully submitted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Survey responses submitted successfully."
 *       400:
 *         description: Bad request - invalid input data.
 *       404:
 *         description: Survey not found.
 */
router.delete('/:id', surveyController.deleteSurvey);

module.exports = router;


