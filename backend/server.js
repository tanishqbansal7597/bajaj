const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const userId = 'john_doe_17091999'; // Replace with your user ID

app.post('/bfhl', (req, res) => {
  const { collegeEmailId, collegeRollNumber, numbers, alphabets } = req.body;

  const response = {
    status: 'success',
    user_id: userId,
    college_email_id: collegeEmailId,
    college_roll_number: collegeRollNumber,
    numbers,
    alphabets,
  };

  res.json(response);
});

app.get('/bfhl', (req, res) => {
  const operationCode = 'BFHL_123'; // Replace with your operation code
  res.json({ operation_code: operationCode });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(Server listening on port ${port});
});