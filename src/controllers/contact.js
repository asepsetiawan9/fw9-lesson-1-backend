const contactModel = require('../models/contact');
const response = require('../helpers/standardResponse');
const errResponse = require('../helpers/errResponse');

exports.postContact = (req, res)=>{

  contactModel.postContact(req.body, (err, results)=>{
    if (err) {
      return errResponse(err, res);
    }else{
      return response(res, 'Post Contact successfully', results[0]);
    }
  });
};

exports.getContact= (req, res)=>{
  contactModel.getContact((results)=>{
    return response(res, 'Get All Contact success', results);
  });
};
