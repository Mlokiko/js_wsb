<template>
    <div>
      <Header />
      <div class="form-container">
        <h2>Add New Form</h2>
        <form @submit.prevent="submitForm">
          <div class="form-field">
            <label for="title">Form Title:</label>
            <input type="text" id="title" v-model="formData.title" required />
          </div>
          
          <div class="form-field">
            <label for="author">Author (optional):</label>
            <input type="text" id="author" v-model="formData.author" />
          </div>
  
          <div class="questions-container">
            <div v-for="(question, index) in formData.questions" :key="index" class="question">
              <h3>Question {{ index + 1 }}</h3>
              <div class="form-field">
                <label for="question-text">Question Text:</label>
                <input type="text" v-model="question.text" placeholder="Enter question" required />
              </div>
              <div class="form-field">
                <label for="question-type">Question Type:</label>
                <select v-model="question.question_type" required>
                  <option value="single_choice">Single Choice</option>
                  <option value="multiple_choice">Multiple Choice</option>
                </select>
              </div>
              <div class="form-field">
                <label for="options">Options (separate with commas):</label>
                <input type="text" v-model="question.options" placeholder="Option 1, Option 2, ..." required />
              </div>
              <button @click.prevent="removeQuestion(index)">Remove Question</button>
            </div>
  
            <button @click.prevent="addQuestion">Add Question</button>
          </div>
  
          <div class="form-actions">
            <button type="submit">Save Form</button>
          </div>
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
    components: {
      Header,
      Footer
    },
    data() {
      return {
        formData: {
          title: '',
          author: null,
          questions: [
            {
              text: '',
              question_type: 'single_choice',
              options: ['']
            }
          ]
        }
      };
    },
    methods: {
      // Add a new question to the form
      addQuestion() {
        this.formData.questions.push({
          text: '',
          question_type: 'single_choice',
          options: ['']
        });
      },
      
      // Remove a question from the form
      removeQuestion(index) {
        this.formData.questions.splice(index, 1);
      },
      
      // Submit form data
      async submitForm() {
        try {
          const res = await fetch('http://localhost:3000/surveys', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.formData)
          });
  
          if (!res.ok) throw new Error('Failed to create form');
          
          // Redirect to the "All Forms" page after successfully adding the form
          this.$router.push('/all-forms');
        } catch (error) {
          console.error('Error:', error);
          alert('Error submitting the form.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .form-container {
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  
  .form-field {
    margin-bottom: 1rem;
  }
  
  .form-field label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  .form-field input,
  .form-field textarea,
  .form-field select {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .form-actions {
    text-align: right;
  }
  
  .form-actions button {
    background-color: #10b981;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .questions-container {
    margin-top: 2rem;
  }
  
  .question {
    margin-bottom: 2rem;
  }
  
  button {
    margin-top: 1rem;
  }
  </style>
  