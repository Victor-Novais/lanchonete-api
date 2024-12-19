const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/usuarios.json");

exports.cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : "[]";
    const usuarios = JSON.parse(data);

    const usuarioExistente = usuarios.find(
      (usuario) => usuario.email === email
    );
    if (usuarioExistente) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const novoUsuario = { nome, email, senha };
    usuarios.push(novoUsuario);

    fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
};

exports.loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : "[]";
    const usuarios = JSON.parse(data);

    const usuario = usuarios.find((usuario) => usuario.email === email);
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (usuario.senha !== senha) {
      return res.status(401).json({ error: "Senha inválida" });
    }

    res.status(200).json({ message: "Login bem-sucedido!" });
  } catch (err) {
    console.error("Erro no cadastro do usuário:", err);
    res.status(500).json({ error: "Erro ao autenticar usuário" });
  }
};
