

    class Pokemon {

        constructor(id, name, image){
            this.id = id;
            this.name = name;
            this.image = image;
        }

    }

    function PokemonApi (){
        this.pokemons = []
    }

    PokemonApi.prototype.getPokemons = async function() {
        try{
            const url = 'https://pokeapi.co/api/v2/pokemon';
            const response = await fetch(url);
            const data = await response.json();
            return data.results;
        }catch (error){
            console.error(error)
        }
    };

    PokemonApi.prototype.getPokemon = async function(url) {
        try{
            const response = await fetch(url);
            const data = await response.json();
            const pokemon = new Pokemon (
                data.id, 
                data.name,
                data.sprites.other.dream_world.front_default
                );
                
            return pokemon;
        }catch (error){
            console.error(error)
        }
    };

    PokemonApi.prototype.GetAllPokemons = async function(){

        try{
            const somePokemons = await this.getPokemons();
            const pokemonPromises = somePokemons.map(pok=> this.getPokemon(pok.url));
            
            this.pokemons = await Promise.all(pokemonPromises);
    
            return this.pokemons;
        }catch (error){
            console.error(error)
        }
        
      }


      export default PokemonApi;
     // export default Pokemon;