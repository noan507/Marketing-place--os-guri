// Modal de login
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeBtns = document.querySelectorAll(".close");
const submitLogin = document.getElementById("submitLogin");
let loggedUser = null;

loginBtn.addEventListener("click", () => loginModal.style.display = "block");

submitLogin.addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email && password) {
    loggedUser = email.split("@")[0];
    loginModal.style.display = "none";
    loginBtn.textContent = `Olá, ${loggedUser}`;
  } else {
    alert("Preencha todos os campos!");
  }
});

closeBtns.forEach(btn => btn.addEventListener("click", () => {
  btn.closest(".modal").style.display = "none";
}));

window.onclick = e => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
};

// Produtos
const addProductBtn = document.getElementById("addProductBtn");
const addProductModal = document.getElementById("addProductModal");
const saveProduct = document.getElementById("saveProduct");
const productList = document.getElementById("product-list");

addProductBtn.addEventListener("click", () => addProductModal.style.display = "block");

saveProduct.addEventListener("click", () => {
  const name = document.getElementById("productName").value.trim();
  const price = document.getElementById("productPrice").value.trim();
  const category = document.getElementById("productCategory").value.trim();
  const desc = document.getElementById("productDesc").value.trim();

  if (!name || !price) return alert("Preencha nome e preço!");

  const card = document.createElement("div");
  card.classList.add("product-card");
  card.innerHTML = `
    <h3>${name}</h3>
    <p>Preço: R$ ${price}</p>
    <p>Categoria: ${category || "N/A"}</p>
    <small>${desc || ""}</small>
  `;
  productList.appendChild(card);

  addProductModal.style.display = "none";
  document.querySelectorAll(".modal-content input, .modal-content textarea").forEach(e => e.value = "");
});

// Pesquisa
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
  const term = searchInput.value.toLowerCase();
  document.querySelectorAll(".product-card").forEach(card => {
    card.style.display = card.textContent.toLowerCase().includes(term) ? "block" : "none";
  });
});
