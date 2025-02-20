export default function Header(props) {

    const {handleToggleMenu} = props

    return(
        <div>
            <button onClick={handleToggleMenu} className="open-nav-button">
                <i className="fa-solid fa-bars"></i>
                <h1 className="text-gradient">Pokedex</h1>
            </button>
        </div>
    )
}