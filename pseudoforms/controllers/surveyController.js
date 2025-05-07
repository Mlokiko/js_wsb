const surveyService = require('../services/surveyService');

// GET /surveys 
exports.getAllSurveys = (req, res) => {
  try {
    const surveys = surveyService.getAllSurveys();
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ error: 'Nie udało się pobrać ankiet' });
  }
};

// GET /surveys/:id 
exports.getSurveyById = (req, res) => {
  const { id } = req.params;
  const survey = surveyService.getSurveyById(id);

  if (!survey) {
    return res.status(404).json({ error: 'Ankieta nie znaleziona' });
  }

  res.json(survey);
};


// POST /surveys 
exports.createSurvey = (req, res) => {
  const { title, author, questions } = req.body;

  if (!title || !Array.isArray(questions)) {
    return res.status(400).json({ error: 'Brak wymaganych pól: title, questions' });
  }

  try {
    const newSurvey = surveyService.createSurveys({ title, author, questions });
    res.status(201).json(newSurvey);
  } catch (err) {
    res.status(500).json({ error: 'Błąd przy tworzeniu ankiety' });
  }
};


// PUT /surveys/:id/submit 
exports.submitSurvey = (req, res) => {
  const { id } = req.params;
  const submition = req.body;

  const survey = surveyService.getSurveyById(id);

  if (!survey) {
    return res.status(404).json({ error: 'Ankieta nie znaleziona' });
  }
  //if (!Array.isArray(answers) || answers.length !== survey.questions.length) {
  // if (submition.question_id != survey.id) {
  //   return res.status(400).json({ error: 'Nieprawidłowy typ odpowiedzi' });
  // }
  const success = surveyService.submitSurvey(id, submition.respondent_id, submition.responses);

  if (success) {
    res.status(200).json({ message: 'Odpowiedzi zapisane' });
  } else {
    res.status(500).json({ error: 'Nie udało się zapisać odpowiedzi' });
  }
};


// DELETE /surveys/:id 
exports.deleteSurvey = (req, res) => {
  const { id } = req.params;

  const survey = surveyService.getSurveyById(id);

  if (!survey) {
    return res.status(404).json({ error: 'Ankieta nie znaleziona' });
  }
  const success = surveyService.deleteSurvey(id);

  if (!success) {
    return res.status(404).json({ error: 'Ankieta nie została usunięta' });
  }

  res.status(200).json({ message: 'Ankieta została usunięta' });
};