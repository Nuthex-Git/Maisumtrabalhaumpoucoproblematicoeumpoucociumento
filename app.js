const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// CORS
// Permite acesso à API pelo Expo Snack Web
app.use(cors());

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// FORM
app.use(express.urlencoded({ extended: true }));

// JSON
app.use(express.json());

// ROTAS
const categoriaRoutes = require("./routes/clienteRoutes");
app.use("/cliente", categoriaRoutes);
app.use("/clientes", categoriaRoutes);

// INDEX PRINCIPAL
app.get("/", (req, res) => {
  res.render("index", {
    titulo: "Página Inicial",
  });
});

// SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Servidor rodando na porta ${PORT}`
  );
});

