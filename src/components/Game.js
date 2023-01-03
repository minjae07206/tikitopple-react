import Cards from './Cards.js';
import Tikis from './Tikis.js';
import CurrentChoice from './CurrentChoice.js';

function Game () {
    return (
        <div>
            <div className="top-layout">
                <Tikis></Tikis>
                <CurrentChoice></CurrentChoice>
            </div>
            
            <Cards></Cards>
        </div>
    )
}

export default Game;