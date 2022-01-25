
import PokemonApi from './PokemonApi.js';

 PokemonApi.prototype.renderPokemons  = 
  function  (pokemons) {
    const pokeGallery = document.getElementById('pokeGallery');
    pokeGallery.innerHTML = '<ul class="galeria3__list" id="pokemonList"></ul>';

    pokemons.forEach(pokemon => {
      const listItem = document.createElement('li');
      listItem.setAttribute('class','galeria3__item');
      listItem.innerHTML = `
        <div id="card${pokemon.id}" 
        data-id="${pokemon.id}"
        data-name="${pokemon.name}"
        data-image="${pokemon.image}"
        class="pokecard">
          
          <div class="pokecard__body">
              <img class="pokecard__imagen" src="${pokemon.image}" />
          </div>
          <div class="pokecard__header">
              <h2 class="pokecard__title">${pokemon.name}</h2>
          </div>
        </div>
        `;

        pokeGallery.children[0].appendChild(listItem);
    });
  };

  function highlight (card){

    const pokId = card.dataset.id;
    const pokName = card.dataset.name;
    const pokImage = card.dataset.image;

    //----------------------------------------------------
    const pokeHighName = document.getElementById('highName');
    pokeHighName.innerHTML = '';
    const NombrePokemon = document.createElement('h1');
    NombrePokemon.innerHTML = '';
    NombrePokemon.setAttribute('id',`title_${pokName}_${pokId}`);
    NombrePokemon.setAttribute('class','highlight__titulo');
    NombrePokemon.append(pokName);
    pokeHighName.append(NombrePokemon);

    //--------------------------------------------

    const pokeHighImage = document.getElementById('highImage');
    pokeHighImage.innerHTML = '';
   

    //----------------------------------------------------
    const imgPokemon = document.createElement('img');
    Object.assign(imgPokemon, {
      className: 'highlight__imagen',
      id: `img_${pokName}_${pokId}`,
      src: pokImage
    });

    pokeHighImage.append(imgPokemon);

  }


  window.onload = async  function() {

    const pokemonApi = new PokemonApi();

    const pokemonArray = await  pokemonApi.GetAllPokemons();
    pokemonApi.renderPokemons(pokemonArray);

    const cards = document.getElementById('pokeGallery')
    .getElementsByClassName('pokecard');

    for (let card of cards)
      {
        card.onclick = function()
        {
          highlight (this);
        };
      }
  };

  
