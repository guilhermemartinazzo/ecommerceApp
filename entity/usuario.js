import * as database from "../config/database.js";

const buscarUsuarios = async (req, res) => {
  const sql = "Select * from user";
  const result = await database.executeSelect(sql);
  res.json(result);
};

const buscarUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  const sql = "Select * from user where id = ?";
  const result = await database.executeSelectWithParams(sql, id);
  console.log(result);
  if (result.length > 0) {
    res.json(result);
  } else {
    res.status(404).json({ message: "Resource not found" });
  }
};

const criarUsuario = async (req, res) => {
  const { nome, email, senha, documento } = req.body;
  const sql =
    "Insert into user (name,email,password,document) values (?,?,?,?)";
  try {
    const [result] = await database.executeInsert(sql, [
      nome,
      email,
      senha,
      documento,
    ]);
    if (result) {
      res.json({ message: "Successfully created", id: result.insertId });
    } else {
      res.json({ message: "Resource not created", result });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating resource", reason: err.message });
  }
};

const editarUsuario = async (req, res) => {
  const { nome, email, senha, documento } = req.body;
  const { id } = req.params;
  const sql =
    "UPDATE user set name = ?, email = ?, password = ?, document = ? where id = ?";
  try {
    const [result] = await database.executeInsert(sql, [
      nome,
      email,
      senha,
      documento,
      id,
    ]);
    if (result.affectedRows > 0) {
      console.log(result.info);
      res.json({ message: "Success", info: result.info });
    } else {
      res
        .status(404)
        .json({ message: "Resource not found", info: result.info });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating resource", reason: err.message });
  }
};
const usuarios_autenticados = new Map();

const login = async (req, res) => {
  const { email, senha } = req.body;
  const sql = "Select * from user where email = ? and password = ?";
  try {
    const result = await database.executeSelectWithParams(sql, [email, senha]);
    if (result.length > 0) {
      //const token = crypto.getRandomValues(32).toString("hex");
      const token = crypto.randomUUID();
      usuarios_autenticados.set(token, result[0]);
      res.json({ token: token });
    } else {
      res.status(401).json({ message: "Email ou senha inválidos" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao fazer login", erro: error.message });
  }
};

const excluirUsuario = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE from user where id = ?";
  try {
    const [result] = await database.executeInsert(sql, [id]);
    if (result.affectedRows > 0) {
      console.log(result);
      res.json({ message: "Success", info: result.info ?? result.insertId });
    } else {
      res
        .status(404)
        .json({ message: "Resource not found", info: result.info });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating resource", reason: err.message });
  }
};

const autenticar = (req, res, next) => {
  console.log(usuarios_autenticados);
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ message: "Token não encontrado" });
    return;
  }

  const usuario = usuarios_autenticados.get(authorization);
  if (!usuario) {
    res.status(401).json({ messge: "Token inválido" });
    return;
  }
  req.usuario = usuario;
  next();
};

export {
  buscarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  editarUsuario,
  excluirUsuario,
  login,
  autenticar,
};
