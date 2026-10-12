const express = require("express");
const router = express.Router();

const controller = require("../controllers/clienteController");

router.get("/", controller.index);
router.post("/salvar", controller.salvar);
router.get("/editar/:id", controller.formEditar);
router.post("/editar/:id", controller.editar);
router.get("/excluir/:id", controller.excluir);

// API para React Native
router.get("/api", controller.api);

module.exports = router;
