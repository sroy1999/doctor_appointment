const express = require('express');
const { addDoctors, adminLogin } = require('../controller/adminController.js');
const upload = require('../middlewares/multer.js');

const router = express.Router();

router.post('/add-doctors', upload.single('image'), addDoctors);
router.post('/login', adminLogin);

module.exports = router;