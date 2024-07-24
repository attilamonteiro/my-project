// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/validate-date', (req, res) => {
  const { date } = req.body;
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return res.status(400).send({ message: 'Invalid date!' });
  }

  const year = dateObj.getUTCFullYear();
  const dayOfWeek = dateObj.getUTCDay();
  const dayArray = [
    'Sunday', 'Monday', 'Tuesday', 
    'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  res.status(200).send({
    isLeapYear: isLeapYear(year) ? 'Leap year' : 'Not a leap year',
    dayOfWeek: dayArray[dayOfWeek]
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
