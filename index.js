const express = require('express');
const port = 6666;
const db = require('./src/helpers/db');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({ extended: false}));
app.use(cors());

app.get('/', (req, res)=> {
  return res.json({
    success: true,
    message: 'welcome to my backend'
  });
});

app.use('*', (req, res)=>{
  return res.status(404).json({
    success: false,
    message: 'Not Found Lurr'
  });
});

app.use('/', require('./src/routers'));

app.listen(port, ()=>{
  console.log(`App Run in port ${port}`);
})
