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

        <div class="form-field">
          <label>
            <input type="checkbox" v-model="isAnonymous" />
            Chcę zostać anonimowy
          </label>
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

            <div class="form-field">
              <label>Opcje:</label>
              <div v-for="(option, oIndex) in question.options" :key="oIndex" class="option-item">
                <input
                  type="text"
                  v-model="question.options[oIndex]"
                  placeholder="Wprowadź opcje(przecinki dozwolone)"
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
import axios from 'axios';

export default {
  name: 'AddForm',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      formData: {
        title: '',
        author: null, // Możesz to ustawić na null, a później przypisać ID
        questions: [
          {
            text: '',
            question_type: 'single_choice',
            options: ['']
          }
        ]
      },
      isAnonymous: false, // Nowa zmienna do przechowywania stanu checkboxa
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
        // Pobierz dane użytkownika z localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        if (this.isAnonymous) {
          this.formData.author = 'anonymous'; // Ustaw na 'anonymous' jeśli checkbox zaznaczony
        } else if (userData && userData.name) {
          this.formData.author = userData.name; // Przypisz ID użytkownika do pola author
        } else {
          this.formData.author = 'Brak'; // Ustaw na 'Brak' jeśli brak ID
        }

        const response = await fetch('http://localhost:3000/surveys', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.formData)
        });

        if (!response.ok) throw new Error('Failed to submit form');
        this.$router.push('/all-forms');
      } catch (err) {
        console.error('Submission error:', err);
        this.errorMessage = 'Wystąpił błąd podczas dodawania formularza. Spróbuj ponownie.'; // Set error message
      }
    }
  }
};
</script>

<style scoped>
.form-container {
  padding: 2.5rem; /* Slightly more padding */
  max-width: 650px; /* Slightly wider */
  margin: 2rem auto; /* Add margin top/bottom for better spacing */
  background: #ffffff; /* Pure white background */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Softer, more spread-out shadow */
  border-radius: 10px; /* Slightly more rounded corners */
}

h2 {
  text-align: center;
  color: #333; /* Darker heading color */
  margin-bottom: 2rem; /* More space below heading */
  font-size: 1.8rem;
}

h3 {
  color: #555;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.form-field {
  margin-bottom: 1.5rem; /* Increased margin for better separation */
}

.form-field label {
  display: block;
  margin-bottom: 0.6rem; /* Slightly more space below label */
  font-weight: 600; /* Bolder label text */
  color: #444;
}

.form-field input[type="text"],
.form-field select,
.form-field textarea { /* Added textarea for consistency, assuming it might be used */
  width: 100%;
  padding: 0.9rem 1rem; /* Increased padding for input fields */
  border: 1px solid #dcdcdc; /* Lighter border color */
  border-radius: 6px; /* Slightly more rounded input corners */
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease; /* Smooth transition for focus */
}

.form-field input[type="text"]:focus,
.form-field select:focus,
.form-field textarea:focus {
  border-color: #10b981; /* Highlight on focus */
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2); /* Subtle focus ring */
  outline: none;
}

.form-field input[type="checkbox"] {
  margin-right: 0.5rem; /* Space between checkbox and label */
  transform: scale(1.1); /* Slightly larger checkbox */
}

.questions-container {
  margin-top: 3rem; /* More separation for the questions section */
  border-top: 1px solid #eee; /* Light separator line */
  padding-top: 2.5rem; /* Padding above the first question */
}

.question {
  background: #f9f9f9; /* Light background for each question block */
  padding: 1.8rem;
  border-radius: 8px;
  margin-bottom: 2.5rem; /* More space between questions */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* Subtle shadow for question blocks */
}

.option-item {
  display: flex;
  align-items: center;
  gap: 0.8rem; /* Space between option input and remove button */
  margin-bottom: 0.8rem; /* Space between options */
}

.option-item input {
  flex-grow: 1; /* Allow input to take available space */
}

button {
  background-color: #10b981;
  color: white;
  border: none;
  padding: 0.85rem 1.75rem; /* Slightly more padding for buttons */
  font-size: 1.05rem; /* Slightly larger font for buttons */
  cursor: pointer;
  border-radius: 6px; /* More rounded button corners */
  transition: background-color 0.3s ease, transform 0.2s ease; /* Smooth hover effects */
  margin-top: 1.2rem; /* Increased top margin for buttons */
}

button:hover {
  background-color: #0e9f6e; /* Darker green on hover */
  transform: translateY(-1px); /* Slight lift on hover */
}

button[type="submit"] {
  width: 100%; /* Full width submit button */
  padding: 1rem 1.75rem; /* More padding for submit button */
  font-size: 1.15rem; /* Larger font for submit button */
  margin-top: 2.5rem; /* More space above submit button */
  background-color: #007bff; /* Different color for primary action */
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

button:not([type="submit"]):not(.option-item button) {
    margin-right: 1rem; /* Space between add question/option buttons */
}

.question button {
    background-color: #dc3545; /* Red for remove question button */
    padding: 0.7rem 1.4rem;
    font-size: 0.95rem;
    margin-top: 1.5rem;
}

.question button:hover {
    background-color: #c82333;
}

.option-item button {
    background-color: #ffc107; /* Orange for remove option button */
    color: #333;
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    margin-top: 0; /* Remove top margin for inline buttons */
}

.option-item button:hover {
    background-color: #e0a800;
}

.error {
  color: #dc3545; /* Red for error messages */
  text-align: center;
  margin-top: 1.5rem;
  font-weight: 500;
}
</style>