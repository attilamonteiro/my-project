const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/validate-date', (req, res) => {
  const { date } = req.body;
  const dateObj = new Date(date);

  // Validate if the date is a valid date
  if (isNaN(dateObj.getTime())) {
    return res.status(400).send({ message: 'Invalid date!' });
  }

  const year = dateObj.getUTCFullYear();
  const dayOfWeek = dateObj.getUTCDay();
  const dayArray = [
    'Sunday', 'Monday', 'Tuesday', 
    'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  // Function to check if the year is a leap year
  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  // Validate the day and month
  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth() + 1; // Months are 0-based
  const daysInMonth = [31, 28 + (isLeapYear(year) ? 1 : 0), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day < 1 || day > daysInMonth[month - 1]) {
    return res.status(400).send({ message: 'Invalid day for the given month!' });
  }

  // Validate if the date is within a valid range
  const minDate = new Date('1900-01-01');
  const maxDate = new Date('2100-12-31');
  if (dateObj < minDate || dateObj > maxDate) {
    return res.status(400).send({ message: 'Date is out of the acceptable range!' });
  }

  // Respond with the results
  res.status(200).send({
    isLeapYear: isLeapYear(year) ? 'Leap year' : 'Not a leap year',
    dayOfWeek: dayArray[dayOfWeek]
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
