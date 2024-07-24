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
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const date = ref('');
  const leapYearMessage = ref('');
  const dayOfWeek = ref('');
  
  const validateDate = async () => {
    if (!date.value) {
      leapYearMessage.value = 'Date is required!';
      dayOfWeek.value = '';
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/validate-date', {
        date: date.value,
      });
      leapYearMessage.value = response.data.isLeapYear;
      dayOfWeek.value = response.data.dayOfWeek;
    } catch (error) {
      if (error.response && error.response.data) {
        leapYearMessage.value = error.response.data.message;
      } else {
        leapYearMessage.value = 'An error occurred while validating the date.';
      }
      dayOfWeek.value = '';
    }
  };
  </script>
  
  <style scoped>
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
  