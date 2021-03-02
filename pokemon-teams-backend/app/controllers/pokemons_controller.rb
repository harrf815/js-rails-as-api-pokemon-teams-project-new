class PokemonsController < ApplicationController

    def index 
        pokemons = Pokemon.all
        render json: pokemons 
    end

    def create 
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, speices: species, trainer_id: params["pokemon"]["trainer_id"].to_i)
    end

    def destroy 
        pokemon = Pokemon.find(params[:id])
        pokemon.destory 
        render json: {'message': 'pokemon release'}
    end
end
