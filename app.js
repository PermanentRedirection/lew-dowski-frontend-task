require('dotenv').config();
const express = require('express');
const recordsRouter = require('./routers/records');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

app.use('/', recordsRouter);
app.use(errorHandler); // Centralized error handling

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
