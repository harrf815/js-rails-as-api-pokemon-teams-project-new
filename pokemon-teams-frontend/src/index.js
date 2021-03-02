const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', ()=>{
    getTrainers()

})

//! this function is a fetch that gets the trainers info from the api 
function getTrainers(){
    fetch(TRAINERS_URL)
        .then(res => res.json())
        // .then(console.log) //* to check what kind of data 
        .then(trainers => trainers.forEach(trainer => buildTrainerCard(trainer)))
}
//! fetching the data to be able to add to the data 
function postPokemon(e){
    fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            trainer_id: e.target.dataset.trainerId
        })
    })
    .then(res => res.json())
    .then(pokemon => {
        let card = document.querySelector(`[data-id='${e.target.dataset.trainerId}']`)
        let ul = card.querySelector('ul')
        buildPokemonLi(pokemon, ul)
    })
}

//! fetching the data to delete a pokemon from the data 
function releasePokemon(pokemon){
    fetch(`${POKEMONS_URL}/${pokemon.id}`,{
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(() =>{
            let pokemonLi = document.querySelector(`[data-pokemon-id='${pokemon.id}']`)
            pokemonLi.parentElement.remove()
        })
}

//! this function is to build the card out with the trainers info in each card
function buildTrainerCard(trainer){
    // console.log(trainer) //* i should be able to see all the trainers individually

    //! Create Elements 
    let div = document.createElement('div')
    let p = document.createElement('p')
    let button = document.createElement('button')
    let ul = document.createElement('ul')

    //! Locate a section to put the div 
    let main = document.querySelector('main')

    //! Create class and id for elements 
    div.className = 'card'
    div.setAttribute('data-id', trainer.id)
    // console.log(div) //* great way to check how the div looks in the console 
    p.innerText = trainer.name
    button.textContent = 'Add Pokemon'
    button.setAttribute('data-trainer-id', trainer.id)

    //! Event Listeners this add a pokemon to the trainer 
    button.addEventListener('click', postPokemon)

    //! Append
    div.append(p,button,ul)
    main.appendChild(div)


    //! Calling on a function for a list of pokemon for each trainer 
    trainer.pokemons.forEach(pokemon => buildPokemonLi(pokemon, ul))
}

//! this function build a list of the pokemons 
function buildPokemonLi(pokemon, ul){

    //! Create elements need for a li 
    let li = document.createElement('li')
    let button = document.createElement('button')

    //! Creating class and text for the elements 
    li.textContent = `${pokemon.nickname} (${pokemon.species})`
    button.textContent = "Release"
    button.className = 'release'
    button.setAttribute('data-pokemon-id', pokemon.id)

    //! Creating a event listener to release a pokemon 
    button.addEventListener('click', () => releasePokemon(pokemon))

    //! Appending the button to li then appending ul to li 
    li.appendChild(button)
    ul.appendChild(li)
}