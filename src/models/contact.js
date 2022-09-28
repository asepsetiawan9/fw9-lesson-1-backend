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

exports.getContact = (searchBy, keyword, limit, offset=0, orderBy, sortType, cb) => {
  db.query(`SELECT * FROM msg WHERE ${searchBy} LIKE '%${keyword}%' ORDER BY ${orderBy} ${sortType} LIMIT $1 OFFSET $2`,
    [limit, offset], (err, res) => {
      console.log(err);
      if(err) {
        console.log(err);
      }
      cb(err, res.rows);
    });
};
 

exports.countData = (searchBy, keyword, cb)=> {
  db.query(`SELECT * FROM msg WHERE ${searchBy} LIKE '%${keyword}%' `, (err, res)=>{
    // console.log(err);
    if(err){
      console.log(err);
    }
    cb(err, res.rowCount);
    
  });
};

exports.detaildata = (id, cb) => {
  const quer = 'SELECT * FROM msg WHERE id=$1';
  const value = [id];
  db.query(quer, value, (err, res)=>{
    if(err) {
      throw err;
    }
    cb(res.rows);
  });
};

exports.deleteData = (id, cb) => {
  const quer = 'DELETE FROM msg WHERE id=$1 RETURNING *';
  const value = [id];
  db.query(quer, value, (err, res)=>{
    if(err) {
      throw err;
    }
    cb(res.rows);
  });
};
