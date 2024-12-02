const contenedor = document.querySelector("#content");
const sobre = document.querySelector("#sobre");
const loading = document.querySelector("#loading");
const album = JSON.parse(localStorage.getItem("cartas") || "[]");
const api= JSON.parse(localStorage.getItem("api") || "[]");
const API_KEY = "860c8c57-3c2e-4e8e-b99b-b51ffe872731";
let apidata=[];

function numeroRandom(max) {
  return Math.floor(Math.random() * max);
}

function cargarApi() {
  for (let index = 1; index < 76; index++) {
    fetch(`https://api.pokemontcg.io/v2/cards?page=${index}`, {
      headers: {
        "X-Api-Key": API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        apidata = data.data;
      });
    
  }
}

function cartaAl() {
  loading.style.display = "block";
  contenedor.style.display = "none";

  fetch(`https://api.pokemontcg.io/v2/cards?page=${numeroRandom(75)}`, {
    headers: {
      "X-Api-Key": API_KEY,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const resultado = data.data;
      const imagenPoke = document.createElement("img");
      imagenPoke.classList.add("img-fluid");
      imagenPoke.loading = "lazy";
      imagenPoke.src = resultado[numeroRandom(resultado.length)].images.large;
      loading.style.display = "none";
      contenedor.innerHTML = "";
      contenedor.appendChild(imagenPoke);
      contenedor.style.display = "block";
      album.push(imagenPoke.outerHTML);
      localStorage.setItem("cartas", JSON.stringify(album));
    });
}
cargarApi();
console.log(apidata)
sobre.addEventListener("click", () => {
  sobre.classList.add("girar");
  setTimeout(() => {
    cartaAl();
    sobre.classList.remove("girar");
  }, 450);
});

contenedor.addEventListener("click", () => {
  contenedor.style.display = "none";
});
