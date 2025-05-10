<template>
  <div>
    <Header />
    <HeroSection />
    <div style="text-align: center; margin: 2rem;">
      <!-- Button to Fetch All Forms -->
      <router-link to="/all-forms">
        <button class="fetch-button">Fetch All Forms</button>
      </router-link>
      <!-- Button to Add New Form -->
      <router-link to="/add-form">
        <button class="add-button">Add New Form</button>
      </router-link>
    </div>
    <RecentForms :forms="recentForms" />
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import HeroSection from '../components/HeroSection.vue';
import RecentForms from '../components/RecentForms.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'LandingPage',
  components: {
    Header,
    HeroSection,
    RecentForms,
    Footer
  },
  data() {
    return {
      recentForms: [
        {
          title: 'Customer Feedback',
          description: 'Collect feedback from your customers about recent purchases.'
        },
        {
          title: 'Job Application',
          description: 'Application form for our open positions.'
        },
        {
          title: 'Event Registration',
          description: 'Let users register for your events easily.'
        },
        {
          title: 'Survey 2025',
          description: 'Annual survey to understand user satisfaction.'
        },
        {
          title: 'Newsletter Signup',
          description: 'Form to collect emails for our weekly newsletter.'
        }
      ]
    };
  }
};
</script>

<style scoped>
.fetch-button {
  padding: 0.75rem 1.5rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 1rem;
}

.add-button {
  padding: 0.75rem 1.5rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}
</style>
