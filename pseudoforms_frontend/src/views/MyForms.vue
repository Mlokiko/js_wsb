<template>
  <div>
    <Header />
    <section class="my-forms">
      <h2>Moje formularze</h2>

      <div v-if="createdForms.length === 0">Brak utworzonych formularzy.</div>
      <div v-else class="form-list">
        <div class="form-item" v-for="form in createdForms" :key="form.id">
          <h3>{{ form.title }}</h3>
          <p>Stworzone dnia {{ formatDate(form.created_at) }}</p>
          <div class="buttons">
            <button class="btn" @click="toggleDetails(form)">Szczegóły</button>
            <button class="btn danger" @click="deleteForm(form.id)">Usuń</button>
          </div>

          <div v-if="form.showDetails" class="details">
            <div v-if="form.detailsLoading">Ładowanie szczegółów...</div>
            <div v-else-if="form.detailsError" class="error">{{ form.detailsError }}</div>
            <div v-else>
              <h4>Pytania:</h4>
              <ul>
                <li v-for="question in form.questions" :key="question.id" class="question-detail">
                  <strong>{{ question.text }}</strong> ({{ question.type }})
                  <div v-if="question.answerStats && Object.keys(question.answerStats).length">
                    <em>Ilość odpowiedzi:</em>
                    <ul>
                      <li v-for="(count, answer) in question.answerStats" :key="answer">
                        "{{ answer }}" - {{ count }}
                      </li>
                    </ul>
                  </div>
                  <div v-else>
                    Brak danych o odpowiedziach dla tego pytania
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'MyForms',
  components: { Header, Footer },
  data() {
    return {
      userId: null,
      createdForms: []
    };
  },
  async created() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      console.warn('Brak userId — przekierowanie na stronę główną');
      this.$router.push('/');
      return;
    }

    this.userId = user.id;

    try {
      const res = await fetch(`http://localhost:3000/surveys`);
      if (!res.ok) throw new Error('Błąd podczas pobierania formularzy');
      const allForms = await res.json();
      this.createdForms = allForms.filter(form => form.author === this.userId);
    } catch (err) {
      console.error('Błąd przy pobieraniu formularzy:', err);
    }
  },
  methods: {
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString();
    },
    async toggleDetails(form) {
      if (form.showDetails) {
        form.showDetails = false; // Zwiń szczegóły
        return;
      }

      form.showDetails = true; // Rozwiń szczegóły
      form.detailsLoading = true;
      form.detailsError = null;

      try {
        const res = await fetch(`http://localhost:3000/surveys/${form.id}`);
        if (!res.ok) throw new Error('Nie udało się pobrać szczegółów formularza');
        const surveyDetails = await res.json();
        form.questions = surveyDetails.questions || [];
      } catch (err) {
        form.detailsError = err.message;
      } finally {
        form.detailsLoading = false;
      }
    },
    async deleteForm(id) {
      if (!confirm('Czy na pewno chcesz usunąć ten formularz?')) return;

      try {
        const res = await fetch(`http://localhost:3000/surveys/${id}`, {
          method: 'DELETE'
        });

        if (!res.ok) throw new Error('Błąd przy usuwaniu formularza');
        this.createdForms = this.createdForms.filter(form => form.id !== id);
      } catch (err) {
        console.error('Usuwanie nie powiodło się:', err);
      }
    }
  }
};
</script>

<style scoped>
.my-forms {
  padding: 2rem;
}

.form-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-item {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
}

.buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.btn {
  display: inline-block;
  background-color: #4f46e5;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
}

.btn:hover {
  background-color: #3b3f54;
}

.btn.danger {
  background-color: #e53e3e;
}

.btn.danger:hover {
  background-color: #c53030;
}

.details {
  margin-top: 1rem;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.1);
}
</style>