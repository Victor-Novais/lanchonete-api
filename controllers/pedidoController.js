const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/pedidos.json");

exports.listarPedidos = async (req, res) => {
  try {
    const data = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, "utf-8")
      : "[]";
    let pedidos;

    try {
      pedidos = JSON.parse(data);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Erro ao processar dados do arquivo" });
    }

    res.status(200).json(pedidos);
  } catch (err) {
    console.error("Erro ao listar pedidos:", err);
    res.status(500).json({ error: "Erro ao listar pedidos" });
  }
};

exports.criarPedido = async (req, res) => {
  const { usuario, produtos } = req.body;

  try {
    const data = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, "utf-8")
      : "[]";
    let pedidos;

    try {
      pedidos = JSON.parse(data);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Erro ao processar dados do arquivo" });
    }

    const novoPedido = {
      id: Date.now(),
      usuario,
      produtos,
      status: "Pendente",
    };
    pedidos.push(novoPedido);

    fs.writeFileSync(filePath, JSON.stringify(pedidos, null, 2));

    res
      .status(201)
      .json({ message: "Pedido criado com sucesso!", pedido: novoPedido });
  } catch (err) {
    console.error("Erro ao criar pedido:", err);
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
};
