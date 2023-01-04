import { configureStore, createSlice } from '@reduxjs/toolkit'
import userEvent from '@testing-library/user-event';
import {tikisState, cardsState} from './data.js';

let tikis = createSlice({
    name: 'tikis',
    initialState: tikisState,
    reducers: {
      setNewGame(state) {
        function shuffle(array) {
          array.sort(() => Math.random() - 0.5);
        }
        const category1 = []
        const category2 = [];
        const category3 = [];
        let newGame = [category1, category2, category3];
        for (let tiki of state) {
          if (tiki.category === 1) {
            category1.push(tiki);
          } else if (tiki.category === 2) {
            category2.push(tiki);
          } else {
            category3.push(tiki)
          }
        }
        shuffle(category1);
        shuffle(category2);
        shuffle(category3);
        shuffle(newGame)
        //const temp = [category1, category2, category3]
        /*for (let i=0; i < 3; i++){
          let random = Math.floor(Math.random() * temp.length);
          let popped = temp.splice(random, 1);
          popped = popped[0];
          newGame.push(popped)
        } */
        newGame = newGame[0].concat(newGame[1], newGame[2]);
        console.log(newGame)
        return newGame;
      }
    }
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
export let {setNewGame} = tikis.actions;