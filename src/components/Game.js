import Cards from './Cards.js';
import Tikis from './Tikis.js';
import CurrentChoice from './CurrentChoice.js';
import {Button} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {setNewGame} from '../store.js';

function Game () {
    let dispatch = useDispatch();
    return (
        <div>
            <div class="top-layout">
                <Button className='new-game-btn' onClick={()=>{
                    dispatch(setNewGame());
                }}>New Round</Button>
                <Tikis></Tikis>
                <CurrentChoice></CurrentChoice>
            </div>
            
            <Cards></Cards>
        </div>
    )
}

export default Game;