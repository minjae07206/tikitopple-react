import { useDispatch, useSelector} from 'react-redux';
import {Button, Form} from 'react-bootstrap';
import {setTiki, checkError} from '../store.js';
function Tikis () {
    let state = useSelector((state)=> {return state})
    let dispatch = useDispatch();
    return (
        <div class='tikis'>
            {
                state.tikis.map((tiki)=>{
                    const tikiColor = {backgroundColor: tiki.color}
                    return (
                        <div style={tikiColor} className='tiki' onClick={()=>{
                            dispatch(setTiki(tiki.name));
                            dispatch(checkError(state.tikis));
                        }}>
                            {tiki.name}
                        </div>)                      
                })
            }
        </div>
    )
}
///
export default Tikis;