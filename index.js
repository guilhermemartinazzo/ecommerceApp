import express from "express";
import cors from "cors";
//import axios from "axios";
import {
  buscarCategorias,
  buscarCategoriaPorId,
  criarCategoria,
  editarCategoria,
  excluirCategoria
} from "./categoriasProduto.js";

import {
  buscarProdutos,
  buscarProdutoPorId,
  criarProduto,
  editarProduto,
  excluirProduto
} from "./entity/produto.js";

const app = express();

//permite que a aplicação seja acessada por outros servidores
app.use(cors());

// permite que a gente trabalhe com dados json
app.use(express.json());

app.get("/categoriasProduto", buscarCategorias);

app.get("/categorias/:id", buscarCategoriaPorId);

app.post("/categoriaProduto", criarCategoria);

app.put("/categorias/:id", editarCategoria);

app.delete("/categorias/:id", excluirCategoria);

// produto
app.get("/produtos", buscarProdutos);

app.get("/produtos/:id", buscarProdutoPorId);

app.post("/produtos", criarProduto);

app.put("/produtos/:id", editarProduto);

app.delete("/produtos/:id", excluirProduto);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
