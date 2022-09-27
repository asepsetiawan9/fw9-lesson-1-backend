const express = require('express');
require('dotenv').config();

const db = require('./src/helpers/db');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({ extended: false}));
app.use(cors());
// global.__basepath = __dirname;

app.get('/', (req, res)=> {
  return res.json({
    success: true,
    message: 'welcome to my backend'
  });
});

app.use('/', require('./src/routers'));

app.use('*', (req, res)=>{
  return res.status(404).json({
    success: false,
    message: 'Not Found Lurr'
  });
});

app.listen(process.env.PORT, ()=>{
  console.log(`aplication is running in port ${process.env.PORT}`);
});
