import * as database from "../config/database.js";

const buscarProdutos = async (req, res) => {
  const sql =
    "Select p.id,p.nome, p.preco, p.marca,cp.nome as categoria, p.id_categoria as idCategoria from produto p left join categoria_produto cp on cp.id=p.id_categoria";
  const result = await database.executeSelect(sql);
  res.json(result);
};

const buscarProdutoPorId = async (req, res) => {
  const { id } = req.params;
  const sql =
    "Select p.id,p.nome, p.preco, p.marca,cp.nome as categoria, p.id_categoria as idCategoria from produto p left join categoria_produto cp on cp.id=p.id_categoria where p.id = ?";
  const result = await database.executeSelectWithParams(sql, id);
  console.log(result);
  if (result.length > 0) {
    res.json(result);
  } else {
    res.status(404).json({ message: "Resource not found" });
  }
};

const criarProduto = async (req, res) => {
  const { nome, preco, marca, idCategoria } = req.body;
  const sql =
    "Insert into produto (nome,preco,marca,id_categoria) values (?,?, ?, ?)";
  try {
    const [result] = await database.executeInsert(sql, [
      nome,
      preco,
      marca,
      idCategoria,
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

const editarProduto = async (req, res) => {
  const { nome, preco, marca, idCategoria } = req.body;
  const { id } = req.params;
  const sql =
    "UPDATE produto set nome = ?, preco = ?, marca = ?, id_categoria = ? where id = ?";
  try {
    const [result] = await database.executeInsert(sql, [
      nome,
      preco,
      marca,
      idCategoria,
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

const excluirProduto = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE from produto where id = ?";
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
  buscarProdutos,
  buscarProdutoPorId,
  criarProduto,
  editarProduto,
  excluirProduto,
};
