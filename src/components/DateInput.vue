<template>
    <div>
      <h1>Check Leap Year</h1>
      <form @submit.prevent="validateDate">
        <label for="date">Date:</label> 
        <input v-model="date" id="date" type="date" required /><br />
        <label for="type">Leap Year:</label> 
        <span id="type">{{ leapYearMessage }}</span><br />
        <label for="day">Day of the Week:</label> 
        <span id="day">{{ dayOfWeek }}</span><br />
        <button type="submit">Check</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        date: '',
        leapYearMessage: '',
        dayOfWeek: '',
      };
    },
    methods: {
      async validateDate() {
        try {
          const response = await axios.post('http://localhost:3000/validate-date', {
            date: this.date,
          });
          this.leapYearMessage = response.data.isLeapYear;
          this.dayOfWeek = response.data.dayOfWeek;
        } catch (error) {
          this.leapYearMessage = error.response.data.message;
          this.dayOfWeek = '';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  