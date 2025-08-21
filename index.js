import express from "express";
import cors from "cors";
//import axios from "axios";
import {
  buscarCategorias,
  buscarCategoriaPorId,
  criarCategoria,
  editarCategoria,
  excluirCategoria,
} from "./entity/categoriasProduto.js";
import {
  buscarProdutos,
  buscarProdutoPorId,
  criarProduto,
  editarProduto,
  excluirProduto,
} from "./entity/produto.js";
import {
  buscarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  editarUsuario,
  excluirUsuario,
  login,
  autenticar,
} from "./entity/usuario.js";

const app = express();

//permite que a aplicação seja acessada por outros servidores
app.use(cors());

// permite que a gente trabalhe com dados json
app.use(express.json());
app.get("/categoriasProduto", autenticar, buscarCategorias);
app.get("/categorias/:id", autenticar, buscarCategoriaPorId);
app.post("/categoriaProduto", autenticar, criarCategoria);
app.put("/categorias/:id", autenticar, editarCategoria);
app.delete("/categorias/:id", autenticar, excluirCategoria);

// produto
app.get("/produtos", autenticar, buscarProdutos);
app.get("/produtos/:id", autenticar, buscarProdutoPorId);
app.post("/produtos", autenticar, criarProduto);
app.put("/produtos/:id", autenticar, editarProduto);
app.delete("/produtos/:id", autenticar, excluirProduto);

// user
app.get("/usuarios", autenticar, buscarUsuarios);
app.get("/usuarios/:id", autenticar, buscarUsuarioPorId);
app.post("/usuarios", autenticar, criarUsuario);
app.put("/usuarios/:id", autenticar, editarUsuario);
app.delete("/usuarios/:id", autenticar, excluirUsuario);
app.post("/login", login);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
