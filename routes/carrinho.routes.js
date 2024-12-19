const express = require("express");
const Carrinho = require("../models/Carrinho");
const router = express.Router();

router.get("/", (req, res) => res.json(Carrinho.listar()));

router.post("/", (req, res) => {
  const carrinho = { id: Date.now(), produtos: [], ...req.body };
  res.json(Carrinho.criar(carrinho));
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { produtos } = req.body;
  res.json(Carrinho.atualizar(Number(id), produtos));
});

module.exports = router;
