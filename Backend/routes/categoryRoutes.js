const express = require('express');
const {createCategory} = require('../controllers/categoryController');

const router = express.Router();

router.post('/createCategory',createCategory);


module.exports= router;