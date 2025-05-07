const surveyModel = require(`../models/surveyModel`);

exports.getAllSurveys = () => {
  return surveyModel.getAllSurveys();
};
// Metoda wygląda jak wygląda - trzeba odpowiednio obrobić pytania które są w osobnej tabeli, service teoretycznie powinno sie
// tym zajmować, dlatego tutaj to siedzi
exports.getSurveyById = (id) => {
  const rawData = surveyModel.getSurveyById(id);

  if (!rawData.length) return null;

  const survey = {
    id: rawData[0].survey_id,
    title: rawData[0].title,
    created_at: rawData[0].created_at,
    author_id: rawData[0].author_id,
    questions: []
  };

  rawData.forEach(q => {
      survey.questions.push({
        id: q.question_id,
        text: q.question_text,
        type: q.question_type,
        options: q.question_options_json ? JSON.parse(q.question_options_json) : null
      });
  });

  return survey;
};
exports.createSurveys = ({ title, author, questions }) => {
  return surveyModel.createSurvey({ title, author, questions });
};
exports.submitSurvey = (id, question_id, respondent_id, response_text_json) => {
  return surveyModel.submitSurvey(id, question_id, respondent_id, response_text_json);
};
exports.deleteSurvey = (id) => {
  return surveyModel.deleteSurvey(id);
};