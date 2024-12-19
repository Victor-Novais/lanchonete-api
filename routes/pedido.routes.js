const express = require("express");
const {
  listarPedidos,
  criarPedido,
} = require("../controllers/pedidoController");

const router = express.Router();

router.get("/", listarPedidos);

router.post("/", criarPedido);

module.exports = router;
