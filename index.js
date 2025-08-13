import express from "express";
import cors from "cors";
//import axios from "axios";
import { buscarCategorias } from "./categoriasProduto.js";

const app = express();

//permite que a aplicação seja acessada por outros servidores
app.use(cors());

// permite que a gente trabalhe com dados json
app.use(express.json());

app.get("/categoriasProduto", buscarCategorias);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
