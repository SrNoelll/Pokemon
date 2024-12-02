const contenedor = document.querySelector("#content");
const sobre = document.querySelector("#sobre");
const loading = document.querySelector("#loading"); // Selección del spinner
const album = JSON.parse(localStorage.getItem('cartas') || '[]');

function numeroRandom(max) {
  return Math.floor(Math.random() * max);
}

function cartaAl() {
  // Mostrar spinner y ocultar el contenedor de cartas
  loading.style.display = "block";
  contenedor.style.display = "none";

  fetch("https://api.pokemontcg.io/v2/cards/")
    .then((res) => res.json())
    .then((data) => {
      const resultado = data.data;
      const imagenPoke = document.createElement('img');
      imagenPoke.classList.add('img-fluid');
      imagenPoke.src = resultado[numeroRandom(resultado.length)].images.large;

      loading.style.display = "none";
      contenedor.innerHTML = '';
      contenedor.appendChild(imagenPoke);
      contenedor.style.display = "block";

      album.push(imagenPoke.outerHTML);
      localStorage.setItem('cartas', JSON.stringify(album));
    })
}

sobre.addEventListener("click", () => {
  sobre.classList.add('girar');
  setTimeout(() => {
    cartaAl();
    sobre.classList.remove('girar');
  }, 450);
});

contenedor.addEventListener("click", () => {
  contenedor.style.display = "none";
});
