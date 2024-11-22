const express = require('express');
const { addDoctors, adminLogin, allDoctors } = require('../controller/adminController.js');
const upload = require('../middlewares/multer.js');
const { authAdmin } = require('../middlewares/authAdmin.js');

const router = express.Router();

router.post('/add-doctors', authAdmin, upload.single('image'), addDoctors);
router.post('/login', adminLogin);
router.post('/all-doctors', authAdmin, allDoctors);

module.exports = router;