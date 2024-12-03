const contenedor = document.querySelector("#content");
const sobre = document.querySelector("#sobre");
const loading = document.querySelector("#loading");
const album = JSON.parse(localStorage.getItem("cartas") || "[]");
const api= JSON.parse(localStorage.getItem("api") || "[]");
const API_KEY = "860c8c57-3c2e-4e8e-b99b-b51ffe872731";

function numeroRandom(max) {
  return Math.floor(Math.random() * max);
}

/* function cargarApi() {
  if(localStorage.getItem("apidata")===null){
    for (let index = 0; index < 76; index++) {
      fetch(`https://api.pokemontcg.io/v2/cards?page=${index+1}`, {
        headers: {
          "X-Api-Key": API_KEY,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          apidata[index] = data.data;
          localStorage.setItem("apidata", JSON.stringify(apidata))
        });
      
    }
  }
  
} */

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
