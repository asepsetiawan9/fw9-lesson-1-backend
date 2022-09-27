const db = require('../helpers/db');

exports.postContact = (data, cb)=>{
  const quer = 'INSERT INTO msg (name, email, message) VALUES ($1, $2, $3) RETURNING *';
  const value = [data.name, data.email, data.message];
  db.query(quer, value, (err, res)=>{
    console.log(err);
    if (res) {
      cb(err, res.rows);
    }else{
      cb(err);
    }
  });
};

exports.getContact = (cb) => {
  db.query('SELECT * FROM msg ORDER BY id ASC', (err, res) => {
    if(err) {
      throw err;
    }
    cb(res.rows);
  });
};
