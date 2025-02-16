import { first151Pokemon, getFullPokedexNumber } from '../utils'

export function SideNav(props) {
    return (
        <nav>
            <div className={"header"}>
                <h1 className='text-gradient'>Pokëdëx</h1>
                <input/>
            </div>
            {
                first151Pokemon.map((pokemon, pokemonIndex) => {
                    return(
                        <button className='nav-card'>
                            <p>{getFullPokedexNumber(pokemonIndex)}</p>
                            <p>{pokemon}</p>
                        </button>
                    )
                })
            }
        </nav>  
    )
}