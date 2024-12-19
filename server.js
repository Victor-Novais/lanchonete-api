const express = require("express");
const bodyParser = require("body-parser");
const usuarioRoutes = require("./routes/usuario.routes");
const produtoRoutes = require("./routes/produto.routes");
const pedidoRoutes = require("./routes/pedido.routes");
const app = express();

app.use(bodyParser.json());

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/produtos", produtoRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
