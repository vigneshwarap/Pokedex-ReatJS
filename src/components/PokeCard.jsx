import { useEffect, useState } from "react"
import { getFullPokedexNumber, getPokedexNumber } from "../utils"
import TypeCard from "./TypeCard"

export default function PokeCard(props) {

    const { selectedPokemon } = props
    const [ data, setData] = useState(null)
    const [ loading, setLoading ] = useState(false)

    const {name, height, abilities, weight, types, stats, moves, sprites } = data || {}

    const imgList = Object.keys(sprites || {}).filter( val => {
        if (!sprites[val]) {return false}
        if (['other', 'versions'].includes(val)) {return false}
        return true
    })

    useEffect(() => {
        
        // Check if any item is currently loading.
        if (loading || !localStorage) { return }

        // Check if the selected item is in cache
        let cache = {}
        if (localStorage.getItem('pokedex')) {
            cache = JSON.parse(localStorage.getItem('pokedex'))
        }

        if (selectedPokemon in cache) {
            setData(cache[selectedPokemon])
        }


        async function fetchPokemonData() {
            setLoading(true)
            try {
                const baseUrl = "https://pokeapi.co/api/v2/"
                const suffix = "pokemon/" + getPokedexNumber(selectedPokemon)
                const finalUrl = baseUrl + suffix
                const res = await fetch(finalUrl)
                const pokemonData = await res.json()
                setData(pokemonData)
                console.log(pokemonData)
                cache[selectedPokemon] = pokemonData
                localStorage.setItem('pokedex', JSON.stringify(cache))
            } catch (err) {
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        }selectedPokemon

        fetchPokemonData()
        
    },[selectedPokemon])

    if (loading || !data) {
        return (
            <div>
                <h4>Loading...</h4>
            </div>
        )
    }


    return (
        <div className="poke-card">
            <div>
                <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2>{name}</h2>
            </div>
            <div className='type-container'>
                { types.map( (type, typeIndex) => {
                    return (
                        <TypeCard key={typeIndex} type={type?.type?.name} />
                    )
                })}
            </div>
            <img className='default-img' src={'/pokemon/' + getFullPokedexNumber(selectedPokemon) + '.png'} alt="" />
            <div className='image-container'>
                {imgList.map((spriteURL, spriteIndex) => {
                    const imgUrl = sprites[spriteURL]
                    return (
                        <img src={imgUrl} alt={`${name}-img-${spriteURL}`}/>
                    )
                })}
            </div>
            <h3>Stats</h3>
            <div className="stats-card">
                {stats.map((statObj, statIndex) => {
                    const {stat, base_stat} = statObj
                    return (
                        <div key={statIndex} className="stat-item"> 
                            <p>{stat?.name.replaceAll('-',' ')}</p>
                            <h4>{base_stat}</h4>
                        </div>
                    )
                })}
            </div>
            <h3>Moves</h3>
            <div className='pokemon-move-grid'>
                {moves.map((moveObj, moveIndex) => {
                    return (
                        <button className='button-card pokemon-move'
                            key={moveIndex} onClick={() => {}}>
                                <p>{moveObj?.move?.name.replaceAll('-',' ')}</p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}