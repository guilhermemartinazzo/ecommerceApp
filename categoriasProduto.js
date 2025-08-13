import * as database from "./config/database.js";

const buscarCategorias = async (req, res) => {
  const sql = "Select * from categoria_produto";
  const result = await database.executeSql(sql);
  res.json(result);
};

export {buscarCategorias};
