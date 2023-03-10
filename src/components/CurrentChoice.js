import {Card, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {moveTiki, removeCard, resetTurnState} from '../store.js'
import axios from 'axios';
import io from 'socket.io-client';
import { useEffect } from 'react';
const socket = io();

function CurrentChoice() {
    let state = useSelector((state)=>{return state});
    let dispatch = useDispatch();
    let setDisabled = true
    if(state.turnState.cardNow === 'None' || state.turnState.tikiNow === 'None') {
        setDisabled = true;
    } else{
        setDisabled = false;
    }
    useEffect(()=>{socket.on('turn-data', (data)=>{
        console.log(data)
        dispatch(moveTiki(data));
    })}, [])
    return (
        <div class="current-choice">
            <h4>Card Chosen:{state.turnState.cardNow}</h4>
            <h4>Tiki Chosen:{state.turnState.tikiNow}</h4>
            <button type='submit' disabled={setDisabled} onClick={()=>{
                socket.emit('turn-data', state.turnState);
                dispatch(resetTurnState());  
                dispatch(removeCard(state.turnState.cardNow));
                }}>Submit</button>
        </div>

    )
}

export default CurrentChoice;