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
  const {searchBy='name', search ='', limit=5, page=1, orderBy ='id', sortType='ASC' } = req.query;
  const offset = (page-1) * limit;
  contactModel.getContact(searchBy, search, limit, offset, orderBy, sortType,(err, results)=>{
    if(results.length < 1){
      return res.redirect('/404');
    }else{
      
      const infoPage = {};
      contactModel.countData(searchBy, search, (err, totalData) =>{
        infoPage.totalData = totalData;
        infoPage.totalPage = Math.ceil(totalData/limit);
        infoPage.limit = parseInt(limit)
        infoPage.currPage = parseInt(page);
        infoPage.nextPage = infoPage.currPage < infoPage.totalPage ? infoPage.currPage + 1 : null;
        infoPage.prevPage = infoPage.currPage > 1 ? infoPage.currPage -1 : null;

    return response(res, 'Get All Contact success', results, infoPage);
    });
  }
});
};

exports.detailData = (req, res)=>{
  const {id} =req.params;
  contactModel.detaildata(id, (results)=>{
    return response(res, 'This Details Massage', results);
  });
};

exports.deleteData = (req, res)=>{
  const {id} =req.params;
  contactModel.deleteData(id, (results)=>{
    return response(res, 'Delete Message success', results[0]);
  });
};

