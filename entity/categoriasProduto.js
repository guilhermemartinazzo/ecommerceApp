import * as database from "../config/database.js";

const buscarCategorias = async (req, res) => {
  const sql = "Select * from categoria_produto";
  const result = await database.executeSelect(sql);
  res.json(result);
};

const buscarCategoriaPorId = async (req, res) => {
  const { id } = req.params;
  const sql = "Select * from categoria_produto where id = ?";
  const result = await database.executeSelectWithParams(sql, id);
  if (result.length > 0) {
    res.json(result);
  } else {
    res.status(404).json({ message: "Resource not found" });
  }
};

const criarCategoria = async (req, res) => {
  const { nome } = req.body;
  const sql = "Insert into categoria_produto (nome,ativo) values (?,?)";
  try {
    const [result] = await database.executeInsert(sql, [nome, 1]);
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

const editarCategoria = async (req, res) => {
  const { nome, ativo } = req.body;
  const { id } = req.params;
  const sql = "UPDATE categoria_produto set nome = ?, ativo = ? where id = ?";
  try {
    const [result] = await database.executeInsert(sql, [nome, ativo, id]);
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

const excluirCategoria = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE from categoria_produto where id = ?";
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

export {
  buscarCategorias,
  buscarCategoriaPorId,
  criarCategoria,
  editarCategoria,
  excluirCategoria,
};
