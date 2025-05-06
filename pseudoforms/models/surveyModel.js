//const fs = require('fs');
const db = require (`../data/db`);
const path = require('path');  // chyba niepotrzebne? pozostałości po usuniętych już funkcjach?
const { v4: uuidv4 } = require('uuid');

// Zwraca same survey bez pytań i odpowiedzi - potem można dodać metodę getAllSurveysFull
function getAllSurveys() {
  return db.prepare(`SELECT * FROM surveys`).all();
}

function getSurveyById(id) {
  return db.prepare(`
    SELECT surveys.id AS survey_id, surveys.title, surveys.created_at, surveys.author_id,
      questions.id AS question_id, questions.question_text, questions.question_type, questions.question_options_json
    FROM surveys
    LEFT JOIN questions ON surveys.id = questions.survey_id
    WHERE surveys.id = ?
  `).all(id);
}

function createSurvey({title, author, questions}) {
  const questionsJson = JSON.stringify(questions);
  console.log(questions);
  let id = uuidv4();
  const stmt = db.prepare(
    `INSERT INTO surveys (id, title, author_id, created_at) VALUES (?, ?, ?, ?)`);
  const info = stmt.run(id, title, author, new Date().toISOString());
 for (let element of questions){
   console.log(element);
    const stmt2 = db.prepare(
      `INSERT INTO questions (survey_id, question_text, question_type, question_options_json) VALUES (?, ?, ?, ?)`);
    const info2 = stmt2.run(id, element.text, element.question_type, JSON.stringify(element.options));
  };
  return db.prepare(`SELECT * FROM surveys WHERE id = ?`).get(id);
}

function submitSurvey( surveyId, questionId, respondentId, response ) {
  const stmt = db.prepare(`INSERT INTO responses (survey_id, question_id, response_text_json, respondent_id, submitted_at) VALUES (?, ?, ?, ?, ?)`);
  console.log(surveyId, questionId, JSON.stringify(response), respondentId);
  stmt.run(surveyId, questionId, JSON.stringify(response), respondentId || null, new Date().toISOString());
  return db.prepare(`SELECT * FROM responses WHERE survey_id = ? AND question_id = ?`).get(surveyId, questionId);
};

function deleteSurvey(id) {
  const stmt = db.prepare(`DELETE FROM surveys WHERE id = ?`);
  const info = stmt.run(id);
  return true;
}

module.exports = {
  getAllSurveys,
  getSurveyById,
  createSurvey,
  submitSurvey,
  deleteSurvey
};