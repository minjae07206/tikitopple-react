import { configureStore, createSlice } from '@reduxjs/toolkit'
import userEvent from '@testing-library/user-event';
import {tikisState, cardsState} from './data.js';

let tikis = createSlice({
    name: 'tikis',
    initialState: tikisState,

})

let cards = createSlice({
    name: 'cards',
    initialState: cardsState,
})

let turnState = createSlice({
  name: 'turnState',
  initialState: ["N/A", "N/A"],
  reducers: {
    setTiki(state, tiki) {
      state[1] = tiki.payload;
    },
    setCard(state, card) {
      state[0] = card.payload;
    },
  }
})

export default configureStore({
  reducer: {
    tikis: tikis.reducer,
    cards: cards.reducer,
    turnState: turnState.reducer,
   }
}) 

export let {setTiki, setCard}  = turnState.actions;