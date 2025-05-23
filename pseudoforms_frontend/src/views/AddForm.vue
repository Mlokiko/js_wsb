<template>
  <div>
    <Header />
    <div class="form-container">
      <h2>Dodaj nowy formularz</h2>
      <form @submit.prevent="submitForm">
        <div class="form-field">
          <label for="title">Tytuł Formularza:</label>
          <input type="text" id="title" v-model="formData.title" required />
        </div>

        <div class="questions-container">
          <div v-for="(question, qIndex) in formData.questions" :key="qIndex" class="question">
            <h3>Pytanie {{ qIndex + 1 }}</h3>

            <div class="form-field">
              <label>Tekst Pytania:</label>
              <input type="text" v-model="question.text" placeholder="Wprowadź pytanie" required />
            </div>

            <div class="form-field">
              <label>Typ Pytania:</label>
              <select v-model="question.question_type" required>
                <option value="single_choice">Pytanie jednokrotnego wyboru</option>
                <option value="multiple_choice">Pytanie wielokrotnego wyboru</option>
                <option value="open">Pytanie otwarte</option>
              </select>
            </div>

            <div class="form-field" v-if="question.question_type !== 'open'">
              <label>Opcje:</label>
              <div v-for="(option, oIndex) in question.options" :key="oIndex" class="option-item">
                <input
                  type="text"
                  v-model="question.options[oIndex]"
                  placeholder="Wprowadź opcję"
                  required
                />
                <button @click.prevent="removeOption(qIndex, oIndex)" type="button">Usuń</button>
              </div>
              <button @click.prevent="addOption(qIndex)" type="button">Dodaj opcję</button>
            </div>

            <button @click.prevent="removeQuestion(qIndex)">Usuń pytanie</button>
          </div>

          <button @click.prevent="addQuestion" type="button">Dodaj pytanie</button>
        </div>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <button type="submit">Zapisz formularz</button>
      </form>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'AddForm',
  components: { Header, Footer },
  data() {
    return {
      formData: {
        title: '',
        questions: [
          {
            text: '',
            question_type: 'single_choice',
            options: ['']
          }
        ]
      },
      errorMessage: ''
    };
  },
  methods: {
    addQuestion() {
      this.formData.questions.push({
        text: '',
        question_type: 'single_choice',
        options: ['']
      });
    },
    removeQuestion(index) {
      this.formData.questions.splice(index, 1);
    },
    addOption(questionIndex) {
      this.formData.questions[questionIndex].options.push('');
    },
    removeOption(questionIndex, optionIndex) {
      this.formData.questions[questionIndex].options.splice(optionIndex, 1);
    },
    async submitForm() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const author = user?.name || null;

        const payload = {
          ...this.formData,
          author
        };

        const response = await fetch('http://localhost:3000/surveys', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Błąd przy zapisie formularza');
        this.$router.push('/all-forms');
      } catch (err) {
        console.error('Błąd zapisu:', err);
        this.errorMessage = 'Wystąpił błąd podczas dodawania formularza. Spróbuj ponownie.';
      }
    }
  }
};
</script>

<style scoped>
.form-container {
  padding: 2rem;
  max-width: 700px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
}
.form-field {
  margin-bottom: 1rem;
}
.form-field label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.3rem;
}
input,
select {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #4f46e5;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #3730a3;
}
.error {
  color: red;
  font-weight: bold;
}
</style>
