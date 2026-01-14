const express = require('express');
const { uploadDocument, getDocuments } = require('../controllers/documentController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.route('/')
  .get(protect, getDocuments)
  .post(protect, upload.single('document'), uploadDocument);

module.exports = router;