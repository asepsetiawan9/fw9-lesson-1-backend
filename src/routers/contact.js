const contact = require('express').Router();
const contactController = require('../controllers/contact');
const { body } = require('express-validator');
const validationCheck = require('../middleware/checkValidation');

const contactValidation = [
  body('name')
  .exists({checkFalsy: true}).withMessage('Enter an Name')
  .isLength({min: 2}).withMessage('Name must be more than 2 characters'),
  body('email')
    .exists({checkFalsy: true}).withMessage('Enter an Email')
    .isEmail().withMessage('Wrong Email Format'),
];

contact.post('/', ...contactValidation, validationCheck, contactController.postContact);
contact.get('/get-data', body('limit').toInt(), body('page').toInt(), contactController.getContact);
contact.get('/detail-data/:id', contactController.detailData);
contact.delete('/delete/:id', contactController.deleteData);
contact.patch('/edit/:id', ...contactValidation, validationCheck, contactController.editData);

module.exports = contact ;

