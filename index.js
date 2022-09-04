const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config();
const { PORT, MONGO_URI } = process.env;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.error(error));

const userRouter = require('./router/v3/user/index.js');
app.use('/v3/user', userRouter);

const authRouter = require('./router/v3/auth/index.js');
app.use('/v3/auth', authRouter);

const doctorRouter = require('./router/v3/doctor/index');
app.use('/v3/doctor', doctorRouter);

app.get('/v3/test', (req, res) => {
  res.status(200).json({ response: { ok: { statusCode: 200, data: {} } } });
});
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${PORT || 3000}`);
});
