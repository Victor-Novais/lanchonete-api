const express = require("express");
const {
  adicionarProduto,
  listarProdutos,
} = require("../controllers/produtoController");

const router = express.Router();
router.get("/", listarProdutos);

router.post("/", adicionarProduto);

module.exports = router;
