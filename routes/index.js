const express = require('express');
const studentsRouter = require('./students');
const testRouter = require('./test');

const router = express.Router();

router.use('/students', studentsRouter);
router.use('/test', testRouter);

module.exports = router;
