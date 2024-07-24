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
        if (!this.date) {
          this.leapYearMessage = 'Date is required!';
          this.dayOfWeek = '';
          return;
        }
        
        try {
          const response = await axios.post('http://localhost:3000/validate-date', {
            date: this.date,
          });
          this.leapYearMessage = response.data.isLeapYear;
          this.dayOfWeek = response.data.dayOfWeek;
        } catch (error) {
          if (error.response && error.response.data) {
            this.leapYearMessage = error.response.data.message;
          } else {
            this.leapYearMessage = 'An error occurred while validating the date.';
          }
          this.dayOfWeek = '';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Example styles */
  form {
    max-width: 400px;
    margin: 0 auto;
  }
  
  label {
    display: block;
    margin-top: 1em;
  }
  
  input, span {
    display: block;
    margin-top: 0.5em;
  }
  
  button {
    margin-top: 1em;
    padding: 0.5em 1em;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  