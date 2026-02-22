const express = require('express');
const router = express.Router();
const { crearUsuario } = require('../controllers/userController');

router.post('/', crearUsuario);

module.exports = router;