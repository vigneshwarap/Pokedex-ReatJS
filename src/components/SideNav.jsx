import { useState } from 'react'
import { first151Pokemon, getFullPokedexNumber } from '../utils'

export default function SideNav(props) {

    const { selectedPokemon, setSelectedPokemon, showSideMenu, handleCloseMenu} = props

    const [searchValue, setSearchValue] = useState('')

    const filterList = first151Pokemon.filter((ele, elementIndex) => {

        if (getFullPokedexNumber(elementIndex).includes(searchValue)) {
            return true;
        }

        if (ele.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }

        return false;
    })
    
    console.log('filterlist', filterList)

    return (
        <nav className={' ' + (!showSideMenu ? " open" : "")}>
            <div className={"header " + (!showSideMenu ? " open" : "")}>
                <button onClick={handleCloseMenu} className='open-nav-button'>
                    <i className="fa-solid fa-arrow-left-long"></i>
                </button>
                <h1 className='text-gradient'>Pokëdëx</h1>
                <input placeholder='E.g. 001 or bulba...' value={searchValue} onChange={(e) => {
                    console.log('onchange' + e.target.value)
                    setSearchValue(e.target.value)
                }}/>
            </div>
            {
                filterList.map((pokemon, pokemonIndex) => {
                    const truepokeDexNumber = first151Pokemon.indexOf(pokemon)
                    return(
                        <button onClick={() => {
                            setSelectedPokemon(truepokeDexNumber)
                            handleCloseMenu()
                        }} key={pokemonIndex} className={'nav-card' + (
                            pokemonIndex === selectedPokemon ? 'nav-card-selected' : ' ')}>
                            <p>{getFullPokedexNumber(truepokeDexNumber)}</p>
                            <p>{pokemon}</p>
                        </button>
                    )
                })
            }
        </nav>  
    )
}