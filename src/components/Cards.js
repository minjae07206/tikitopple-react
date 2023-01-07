import { useDispatch, useSelector } from "react-redux";
import {Button} from 'react-bootstrap';
import {setCard, setTiki, checkError} from '../store.js'
function Cards() {
    let dispatch = useDispatch();
    let state = useSelector((state) => { return state });
    return (
        <div class="cards">
            {
                state.cards.map((card) => {
                    return (
                        <Button variant="primary" onClick={()=>{
                            dispatch(setCard(card));
                            dispatch(checkError(state.tikis));
                        }}>{card}</Button>
                    )
                })
            }
            <div>{state.turnState.errorMessage}</div>
        </div>
    )
}

export default Cards;
