const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/produtos.json");

exports.adicionarProduto = async (req, res) => {
  const { nome, preco } = req.body;

  try {
    const data = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, "utf-8")
      : "[]";
    let produtos;

    try {
      produtos = JSON.parse(data);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Erro ao processar dados do arquivo" });
    }

    const novoProduto = { id: Date.now(), nome, preco };
    produtos.push(novoProduto);

    fs.writeFileSync(filePath, JSON.stringify(produtos, null, 2));

    res.status(201).json({
      message: "Produto adicionado com sucesso!",
      produto: novoProduto,
    });
  } catch (err) {
    console.error("Erro ao adicionar produto:", err);
    res.status(500).json({ error: "Erro ao adicionar produto" });
  }
};

exports.listarProdutos = async (req, res) => {
  try {
    const data = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, "utf-8")
      : "[]";
    let produtos;

    try {
      produtos = JSON.parse(data);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Erro ao processar dados do arquivo" });
    }

    res.status(200).json(produtos);
  } catch (err) {
    console.error("Erro ao listar produtos:", err);
    res.status(500).json({ error: "Erro ao listar produtos" });
  }
};
