import {Card, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {moveTiki, removeCard, resetTurnState} from '../store.js'
import axios from 'axios';
function CurrentChoice() {
    let state = useSelector((state)=>{return state});
    let dispatch = useDispatch();
    return (
        //<form action="/turnchoice" method="POST">
        <div class="current-choice">
            <h4>Card Chosen:{state.turnState[0]}</h4>
            <h4>Tiki Chosen:{state.turnState[1]}</h4>
            <div style={{display: 'none'}}>
            <input type="text" name="card" value={state.turnState[0]}></input>
            <input type="text" name="tiki" value={state.turnState[1]}></input>
            </div>
            <button type='submit' disabled={false} onClick={()=>{
                axios.post('/turnchoice', {card: state.turnState[0], tiki: state.turnState[1]}).then(dispatch(resetTurnState()));    
                dispatch(removeCard(state.turnState[0]))}}>Submit</button>
        </div>
        //</form>

    )
}

export default CurrentChoice;