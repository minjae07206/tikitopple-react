import { useDispatch, useSelector} from 'react-redux';
import {Button, Form} from 'react-bootstrap';
import {setTiki} from '../store.js';
function Tikis () {
    let state = useSelector((state)=> {return state})
    let dispatch = useDispatch()
    return (
        <div class='tikis'>
            {
                state.tikis.map((tiki)=>{
                    return (
                        <Button className='tiki' onClick={()=>{
                            dispatch(setTiki(tiki.name));
                            if (state.turnState[0] === "toast") {
                                dispatch(setTiki(state.tikis[state.tikis.length-1].name))
                            }
                        }}>
                            {tiki.name}
                        </Button>)                      
                })
            }
        </div>
    )
}

export default Tikis;