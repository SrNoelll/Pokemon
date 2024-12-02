const contenedor = document.querySelector("#content");
const sobre = document.querySelector("#sobre");
const cartasAlb = document.querySelector("#album")

const album = JSON.parse(localStorage.getItem('cartas') || '[]');
console.log(album);
function mostrarAlbum(){
    album.forEach(element => {
        cartasAlb.innerHTML += element;
    });
}
mostrarAlbum();