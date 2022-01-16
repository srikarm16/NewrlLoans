/* eslint-disable */

const express = require('express');
const port = 5000;

import profileRoutes from './routes/profileRoutes.js';


const app = express();
app.use(express.json);

app.use("api/profile/create-profile", profileRoutes);

app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
})