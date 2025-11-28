const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");

const modalLogin = document.getElementById("modalLogin");
const formLogin = document.getElementById("formLogin");
const cancelarLogin = document.getElementById("cancelarLogin");

const modalAddProduto = document.getElementById("modalAddProduto");
const formAddProduto = document.getElementById("formAddProduto");
const cancelarAddProduto = document.getElementById("cancelarAddProduto");

const modalLogout = document.getElementById("modalLogout");
const confirmarLogout = document.getElementById("confirmarLogout");
const cancelarLogout = document.getElementById("cancelarLogout");

const logoutNome = document.getElementById("logoutNome");
const logoutEmail = document.getElementById("logoutEmail");

const listaProdutos = document.getElementById("listaProdutos");
const campoPesquisa = document.getElementById("campoPesquisa");
const btnPesquisar = document.getElementById("btnPesquisar");

const toast = document.getElementById("toast");
const boasVindas = document.getElementById("boasVindas");

let usuario = JSON.parse(localStorage.getItem("usuario")) || null;
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// TOAST
function mostrarToast(msg) {
    toast.textContent = msg;
    toast.classList.add("mostrar");
    setTimeout(() => toast.classList.remove("mostrar"), 3000);
}

// LOGIN
btnLogin.addEventListener("click", () => {
    modalLogin.showModal();
});

cancelarLogin.addEventListener("click", () => {
    modalLogin.close();
});

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nomeLogin").value.trim();
    const email = document.getElementById("emailLogin").value.trim();
    const senha = document.getElementById("senhaLogin").value.trim();

    if (nome && email && senha) {
        usuario = { nome, email };
        localStorage.setItem("usuario", JSON.stringify(usuario));

        modalLogin.close();
        mostrarToast(`👋 Olá, ${nome}!`);
        boasVindas.textContent = `Bem-vindo, ${nome}!`;
        btnLogin.textContent = `👋 ${nome}`;
    }
});

// ADICIONAR PRODUTO
document.getElementById("btnAddProduto").addEventListener("click", () => {
    if (!usuario) {
        mostrarToast("❌ Você precisa estar logado!");
        return;
    }
    modalAddProduto.showModal();
});

cancelarAddProduto.addEventListener("click", () => {
    modalAddProduto.close();
});

formAddProduto.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nomeProduto").value;
    const preco = document.getElementById("precoProduto").value;
    const categoria = document.getElementById("categoriaProduto").value;
    const obs = document.getElementById("obsProduto").value;

    produtos.push({ nome, preco, categoria, obs });
    localStorage.setItem("produtos", JSON.stringify(produtos));

    modalAddProduto.close();
    renderizarProdutos();
    mostrarToast("✅ Você publicou o seu produto!");
    formAddProduto.reset();
});

// RENDERIZAR
function renderizarProdutos() {
    listaProdutos.innerHTML = "";
    produtos.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("produto");
        div.innerHTML = `
      <h3>${p.nome}</h3>
      <p><b>Preço:</b> R$ ${p.preco}</p>
      <p><b>Categoria:</b> ${p.categoria || "—"}</p>
      <p><b>Obs:</b> ${p.obs || "—"}</p>
    `;
        listaProdutos.appendChild(div);
    });
}
renderizarProdutos();

// PESQUISAR
btnPesquisar.addEventListener("click", () => {
    const termo = campoPesquisa.value.trim().toLowerCase();
    const encontrados = produtos.filter(p => p.nome.toLowerCase().includes(termo));

    if (!encontrados.length) {
        mostrarToast("🔍 Nenhum produto encontrado!");
        return;
    }

    listaProdutos.innerHTML = "";
    encontrados.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("produto");
        div.innerHTML = `
      <h3>${p.nome}</h3>
      <p><b>Preço:</b> R$ ${p.preco}</p>
      <p><b>Categoria:</b> ${p.categoria || "—"}</p>
      <p><b>Obs:</b> ${p.obs || "—"}</p>
    `;
        listaProdutos.appendChild(div);
    });
});

// LOGOUT
btnLogout.addEventListener("click", () => {
    if (!usuario) {
        mostrarToast("❌ Você não está logado!");
        return;
    }

    logoutNome.textContent = usuario.nome;
    logoutEmail.textContent = usuario.email;

    modalLogout.showModal();
});

cancelarLogout.addEventListener("click", () => {
    modalLogout.close();
});

confirmarLogout.addEventListener("click", () => {
    usuario = null;
    localStorage.removeItem("usuario");

    btnLogin.textContent = "🔐 Login";
    boasVindas.textContent = "";
    modalLogout.close();

    mostrarToast("🚪 Você saiu da conta!");
});
