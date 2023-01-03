import { useDispatch, useSelector } from "react-redux";
import {Button} from 'react-bootstrap';
import {setCard, setTiki} from '../store.js'
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
                            if (card === "toast") {
                                dispatch(setTiki(state.tikis[state.tikis.length-1].name))
                            }
                        }}>{card}</Button>
                    )
                })
            }
        </div>
    )
}

export default Cards;
