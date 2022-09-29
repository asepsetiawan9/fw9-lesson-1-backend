const contact = require('express').Router();
const contactController = require('../controllers/contact');
const { body } = require('express-validator');
const validationCheck = require('../middleware/checkValidation');

const contactValidation = [
  body('email')
    .exists({checkFalsy: true}).withMessage('Enter an Email')
    .isEmail().withMessage('Wrong Email Format'),
];

contact.post('/', ...contactValidation, validationCheck, contactController.postContact);
contact.get('/get-data', body('limit').toInt(), body('page').toInt(), contactController.getContact);
contact.get('/detail-data/:id', contactController.detailData);
contact.delete('/delete/:id', contactController.deleteData);
contact.patch('/edit/:id', contactController.editData);

module.exports = contact ;

