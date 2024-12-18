const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  produtos: [{ produto: String, quantidade: Number }],
  status: { type: String, default: "Pendente" },
  data: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Pedido", PedidoSchema);
