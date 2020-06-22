// Rutas para authenticar usuarios
const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

// Crea un usuario
// api/auth
router.post("/", authController.autenticarUsuario);

router.get("/", auth, authController.usuarioAutenticado);
module.exports = router;
