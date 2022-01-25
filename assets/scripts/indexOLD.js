
import PokemonApi from './PokemonApi.js';

async function getPokemons() {
    
    try{
        const url = 'https://pokeapi.co/api/v2/pokemon';
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    }catch (error){
        console.error(error)
    }
    
  }

  async function getPokemon(url, name) {
    
    try{
        const response = await fetch(url);
        const data = await response.json();
        const pokemon = {
            id: data.id, 
            name: data.name,
            image: data.sprites.other.dream_world.front_default
        };
        return pokemon;
    }catch (error){
        console.error(error)
    }
    
  }


  async function GetAllPokemons(){

    try{
        const somePokemons = await getPokemons();
        const pokemonPromises = somePokemons.map(pok=>getPokemon(pok.url));
        
        const pokemons = await Promise.all(pokemonPromises);

        return pokemons;
    }catch (error){
        console.error(error)
    }
    
  }

  function renderPokemons (pokemons) {
    const pokeGallery = document.getElementById('pokeGallery');
    pokeGallery.innerHTML = '<ul id="pokemonList"></ul>';

    pokemons.forEach(pokemon => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <div id="card${pokemon.id}" 
        data-id="${pokemon.id}"
        data-name="${pokemon.name}"
        data-image="${pokemon.image}"
        class="poke-card">
            <h2>${pokemon.name}</h2>
            <img class ="img-galley" src="${pokemon.image}" />
        </div>
        `;

        pokeGallery.children[0].appendChild(listItem);
    });
  }

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
    NombrePokemon.setAttribute('class','high-title');
    NombrePokemon.append(pokName);
    pokeHighName.append(NombrePokemon);

    //--------------------------------------------

    const pokeHighImage = document.getElementById('highImage');
    pokeHighImage.innerHTML = '';
   

    //----------------------------------------------------
    const imgPokemon = document.createElement('img');
    Object.assign(imgPokemon, {
      className: 'high-img',
      id: `img_${pokName}_${pokId}`,
      src: pokImage
    });

    pokeHighImage.append(imgPokemon);

  }
/*
  async function DrawPokemons () {
    const pokemonArray =await  GetAllPokemons();
    renderPokemons(pokemonArray);
  };
  DrawPokemons ();
*/
  window.onload = async  function() {

    const pokemonApi = new PokemonApi();

    const pokemonArray = await  pokemonApi.GetAllPokemons();
    renderPokemons(pokemonArray);

    const cards = document.getElementById('pokeGallery')
    .getElementsByClassName('poke-card');

    for (let card of cards)
      {
        card.onclick = function()
        {
          highlight (this);
        };
      }
  };

  
