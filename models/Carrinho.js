const mongoose = require("mongoose");

const CarrinhoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  produtos: [
    {
      produto: { type: mongoose.Schema.Types.ObjectId, ref: "Produto" },
      quantidade: { type: Number, required: true },
    },
  ],
  total: { type: Number, default: 0 },
});

module.exports = mongoose.model("Carrinho", CarrinhoSchema);
