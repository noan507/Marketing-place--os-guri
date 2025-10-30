const btnLogin = document.getElementById("btnLogin");
const modalLogin = document.getElementById("modalLogin");
const formLogin = document.getElementById("formLogin");
const cancelarLogin = document.getElementById("cancelarLogin");

const btnAddProduto = document.getElementById("btnAddProduto");
const modalAddProduto = document.getElementById("modalAddProduto");
const formAddProduto = document.getElementById("formAddProduto");
const cancelarAddProduto = document.getElementById("cancelarAddProduto");

const listaProdutos = document.getElementById("listaProdutos");
const campoPesquisa = document.getElementById("campoPesquisa");
const btnPesquisar = document.getElementById("btnPesquisar");

const toast = document.getElementById("toast");

let usuario = null;
let produtos = [];

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
    modalLogin.close();
    mostrarToast(`Olá, ${nome}!`);
    btnLogin.textContent = `👋 ${nome}`;
  } else {
    mostrarToast("Preencha todos os campos!");
  }
});

// ADICIONAR PRODUTO
btnAddProduto.addEventListener("click", () => {
  if (!usuario) {
    mostrarToast("Você precisa estar logado para adicionar produtos!");
    return;
  }
  modalAddProduto.showModal();
});

cancelarAddProduto.addEventListener("click", () => {
  modalAddProduto.close();
});

formAddProduto.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nomeProduto").value.trim();
  const preco = document.getElementById("precoProduto").value.trim();
  const categoria = document.getElementById("categoriaProduto").value.trim();
  const obs = document.getElementById("obsProduto").value.trim();

  if (!nome || !preco) {
    mostrarToast("Preencha nome e preço!");
    return;
  }

  produtos.push({ nome, preco, categoria, obs });
  renderizarProdutos();
  modalAddProduto.close();
  mostrarToast("Você publicou o seu produto!");
  formAddProduto.reset();
});

// RENDERIZAR PRODUTOS
function renderizarProdutos() {
  listaProdutos.innerHTML = "";
  produtos.forEach((p) => {
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

// PESQUISAR PRODUTO
btnPesquisar.addEventListener("click", () => {
  const termo = campoPesquisa.value.trim().toLowerCase();
  const encontrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(termo)
  );
  if (encontrados.length) {
    listaProdutos.innerHTML = "";
    encontrados.forEach((p) => {
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
  } else {
    mostrarToast("Nenhum produto encontrado!");
  }
});
