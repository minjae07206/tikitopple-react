import {Card, Button} from 'react-bootstrap';
import { useSelector } from 'react-redux';

function CurrentChoice() {
    let state = useSelector((state)=>{return state});
    return (
        <div class="current-choice">
            <h4>Card Chosen:{state.turnState[0]}</h4>
            <h4>Tiki Chosen:{state.turnState[1]}</h4>
            <Button>Submit</Button>
        </div>

    )
}

export default CurrentChoice;