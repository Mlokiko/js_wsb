const db = require (`../data/db`);
const { v4: uuidv4 } = require('uuid');

// Zwraca same survey bez pytań i odpowiedzi - potem można dodać metodę getAllSurveysFull
function getAllSurveys() {
  return db.prepare(`
    SELECT id, title, author_id AS author, created_at FROM surveys`).all();
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
  let id = uuidv4();
  const stmt = db.prepare(
    `INSERT INTO surveys (id, title, author_id, created_at) VALUES (?, ?, ?, ?)`);
  stmt.run(id, title, author, new Date().toISOString());
 for (let element of questions){
    const stmt2 = db.prepare(
      `INSERT INTO questions (survey_id, question_text, question_type, question_options_json) VALUES (?, ?, ?, ?)`);
    stmt2.run(id, element.text, element.question_type, JSON.stringify(element.options));
  };
  return db.prepare(`SELECT * FROM surveys WHERE id = ?`).get(id);
}

function submitSurvey(surveyId, respondentId, response) {
  for (let element of response){
    const stmt = db.prepare(`INSERT INTO responses (survey_id, question_id, response_text_json, respondent_id, submitted_at) VALUES (?, ?, ?, ?, ?)`);
    stmt.run(surveyId, element.question_id, JSON.stringify(element.response_text), respondentId || null, new Date().toISOString());
  }
  // Co powinno zostać zwrócone? na razie zostawiam wysyłanie wszystkich odpowiedzi DANEGO uzytkownika - bedą błedy jeśli user będzie niezalogowany, ale nie wiem co innego tu wkleic
  return db.prepare(`SELECT * FROM responses WHERE survey_id = ? AND respondent_id = ?`).get(surveyId, respondentId);
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