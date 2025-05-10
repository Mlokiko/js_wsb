const surveyService = require('../services/surveyService');

// GET /surveys 
exports.getAllSurveys = (req, res) => {
  try {
    const surveys = surveyService.getAllSurveys();
    res.status(200).json(surveys);
  } catch (err) {
    res.status(500).json({ error: 'Nie udało się pobrać ankiet' });
  }
};

// GET /surveys/:id 
exports.getSurveyById = (req, res) => {
  // Obsługa błędu niepodania id (null) jest bezsensowna - zostaną zwrócone wszystkie ankiety
  const { id } = req.params;
  const survey = surveyService.getSurveyById(id);
  if (!survey) {
    return res.status(404).json({ error: 'Ankieta nie znaleziona' });
  }

  res.status(200).json(survey);
};

// POST /surveys 
exports.createSurvey = (req, res) => {
  const { title, author, questions } = req.body;

  // Nie sprawdzamy autora, bo zakładamy że NULL oznacza jego brak (anonimowa ankieta)
  // Nie sprawdzamy czy pytania są sensowne - nwm czy w takiej formie są dobrze sprawdzane... null w pytaniu może spowodować póżniej wywalenie się
  // kodu bez zwrócenia błędu (chyba?)
  if (!title || !Array.isArray(questions)) {
    return res.status(400).json({ error: 'Brak jednego z wymaganych pól: title, questions' });
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
  
  // Jak zrobić sprawdzanie, czy odpowiedzi pasują? tzn, czy np. do pytania single_choice nie jest wysyłana tablica z ponad 1 odpowiedzią?
  // teoretycznie tutaj musi to być zrobione, ale w surveyModel mamy logikę która przez każdą odpowiedz/pytanie iteruje... Trzeba to pozmieniać
  // żeby było wykonywane tutaj?

  //if (!Array.isArray(answers) || answers.length !== survey.questions.length) {
  // if (submition.question_id != survey.id) {
  //   return res.status(400).json({ error: 'Nieprawidłowy typ odpowiedzi' });
  // }
  const success = surveyService.submitSurvey(id, submition.respondent_id, submition.responses);

  if (success) {
    res.status(200).json({ message: 'Wysłano odpowiedzi' });
  } else {
    res.status(500).json({ error: 'Nie udało się wysłać odpowiedzi' });
  }
};

// DELETE /surveys/:id 
exports.deleteSurvey = (req, res) => {
  const { id } = req.params;
  if(!id){
    return res.status(400).json({error: 'Brak ID ankiety do usunięcia'})
  }

  const survey = surveyService.getSurveyById(id);
  if (!survey) {
    return res.status(404).json({ error: 'Ankieta nie znaleziona' });
  }

  const success = surveyService.deleteSurvey(id);
  if (!success) {
    return res.status(403).json({ error: 'Ankieta nie została usunięta' });
  }

  res.status(200).json({ message: 'Ankieta została usunięta' });
};
