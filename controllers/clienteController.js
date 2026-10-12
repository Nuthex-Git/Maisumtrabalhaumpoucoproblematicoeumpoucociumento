const model = require("../models/clienteModel");

// ========================================
// LISTAR CLIENTES
// ========================================
exports.index = async (req, res) => {
    try {
        const clientes = await model.listar();

        res.render("categorias/index", {
            clientes: clientes,
            clienteEditar: null
        });
    } catch (erro) {
        console.error("Erro ao listar clientes:", erro);
        res.status(500).send("Erro ao listar clientes");
    }
};

// ========================================
// SALVAR NOVO CLIENTE
// ========================================
exports.salvar = async (req, res) => {
    try {
        console.log("Dados recebidos:", req.body);

        const nome = req.body.nome;
        const email = req.body.email;

        if (!nome || !email) {
            return res.status(400).send(
                "Erro: preencha o nome e o email do cliente."
            );
        }

        await model.salvar({
            nome: nome.trim(),
            email: email.trim()
        });

        res.redirect("/clientes");
    } catch (erro) {
        console.error("Erro ao salvar cliente:", erro);
        res.status(500).send("Erro ao salvar cliente");
    }
};

// ========================================
// ABRIR FORMULÁRIO DE EDIÇÃO
// ========================================
exports.formEditar = async (req, res) => {
    try {
        const clientes = await model.listar();
        const clienteEditar = await model.buscarPorId(req.params.id);

        if (!clienteEditar) {
            return res.status(404).send("Cliente não encontrado");
        }

        res.render("categorias/index", {
            clientes: clientes,
            clienteEditar: clienteEditar
        });
    } catch (erro) {
        console.error("Erro ao carregar cliente:", erro);
        res.status(500).send("Erro ao carregar cliente");
    }
};

// ========================================
// EDITAR CLIENTE
// ========================================
exports.editar = async (req, res) => {
    try {
        const nome = req.body.nome;
        const email = req.body.email;

        if (!nome || !email) {
            return res.status(400).send(
                "Erro: preencha o nome e o email do cliente."
            );
        }

        const cliente = await model.buscarPorId(req.params.id);

        if (!cliente) {
            return res.status(404).send("Cliente não encontrado");
        }

        await model.editar(req.params.id, {
            nome: nome.trim(),
            email: email.trim()
        });

        res.redirect("/clientes");
    } catch (erro) {
        console.error("Erro ao editar cliente:", erro);
        res.status(500).send("Erro ao editar cliente");
    }
};

// ========================================
// EXCLUIR CLIENTE
// ========================================
exports.excluir = async (req, res) => {
    try {
        const cliente = await model.buscarPorId(req.params.id);

        if (!cliente) {
            return res.status(404).send("Cliente não encontrado");
        }

        await model.excluir(req.params.id);

        res.redirect("/clientes");
    } catch (erro) {
        console.error("Erro ao excluir cliente:", erro);
        res.status(500).send("Erro ao excluir cliente");
    }
};

// ========================================
// API - LISTAR CLIENTES EM JSON
// ========================================
exports.api = async (req, res) => {
    try {
        const clientes = await model.listar();

        res.json(clientes);
    } catch (erro) {
        console.error("Erro na API de clientes:", erro);

        res.status(500).json({
            erro: "Erro ao buscar clientes"
        });
    }
};