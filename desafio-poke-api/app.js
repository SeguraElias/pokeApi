// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.ceil(max);
//   return Math.floor(Math.random() * (max - min) + min);
// }

const flex = document.querySelector(".flex");

function getPokemonData(){
  const pokeName = document.querySelector('#input-buscar')
  return pokeName.value.toLowerCase()
}

document.addEventListener("DOMContentLoaded", () => {
  //const random = getRandomInt(1, 151);  
});

const btnBuscar = document.querySelector('#btn-buscar')
btnBuscar.addEventListener('click', () => {
  flex.innerHTML = ""
  fetchData(getPokemonData());
})

//le pasamos un id como parametro
const fetchData = async (id) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    //crear una constante que se llame pokemon, y que sea de tipo objeto
    const pokemon = {
      img: data.sprites.other.dream_world.front_default,
      nombre: data.species.name,
      id: data.id,
      exp: data.base_experience,
      hp: data.stats[0].base_stat,
      ataque: data.stats[1].base_stat,
      defensa: data.stats[2].base_stat,
      especial: data.stats[3].base_stat
    };
    //fin de objeto pokemon
    //pintar card con la data extraida
    pintarCard(pokemon);
  } catch (error) {
    console.log(error);
  }
};

//pintando en el template
const pintarCard = (pokemon) => {
  console.log(pokemon);

  const template = document.querySelector("#template-card").content;

  const clone = template.cloneNode(true);
  const fragment = document.createDocumentFragment();

  clone
    .querySelector(".card-body-img")
    .setAttribute("src", pokemon.img)

  clone.querySelector(
    ".card-body-title"
  ).innerHTML = `${pokemon.nombre} <span>${pokemon.id}</span> <span>hp: ${pokemon.hp}</span>`;

  clone.querySelector(".card-body-text").textContent = pokemon.exp + " exp";
  clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.ataque + 'K'
  clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.especial + 'K'
  clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.defensa + 'K'


  fragment.appendChild(clone);
  flex.appendChild(fragment);
};
