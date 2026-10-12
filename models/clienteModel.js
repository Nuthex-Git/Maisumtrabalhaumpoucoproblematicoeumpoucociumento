
// MODEL UTILIZANDO FIREBASE REALTIME DATABASE

const db = require("../config/firebase");

const ref = db.ref("clientes");

/* =====================================================
   LISTAR CLIENTES
===================================================== */
async function listar() {
    const registros = await ref.once("value");
    const dados = registros.val();

    if (!dados) return [];

    return Object.keys(dados).map(id => ({
        id,
        nome: dados[id].nome,
        email: dados[id].email
    }));
}

/* =====================================================
   SALVAR CLIENTE
===================================================== */
async function salvar(cliente) {
    const novaRef = ref.push();

    await novaRef.set({
        nome: cliente.nome,
        email: cliente.email
    });

    return {
        id: novaRef.key,
        nome: cliente.nome,
        email: cliente.email
    };
}

/* =====================================================
   BUSCAR CLIENTE POR ID
===================================================== */
async function buscarPorId(id) {
    const registros = await ref.child(id).once("value");

    if (!registros.exists()) return null;

    return {
        id,
        ...registros.val()
    };
}

/* =====================================================
   EDITAR CLIENTE
===================================================== */
async function editar(id, novoCliente) {
    await ref.child(id).update({
        nome: novoCliente.nome,
        email: novoCliente.email
    });
}

/* =====================================================
   EXCLUIR CLIENTE
===================================================== */
async function excluir(id) {
    await ref.child(id).remove();
}

/* =====================================================
   EXPORTAÇÃO
===================================================== */
module.exports = {
    listar,
    salvar,
    buscarPorId,
    editar,
    excluir
};
