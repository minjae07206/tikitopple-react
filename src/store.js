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
        shuffle(newGame);  
        newGame = newGame[0].concat(newGame[1], newGame[2]);
        console.log(newGame)
        return newGame;
      },

    }
})

let cards = createSlice({
    name: 'cards',
    initialState: cardsState,
    reducers: {
      removeCard(state, cardDelete){
        const indexOfCard = state.indexOf(cardDelete.payload);
        state.splice(indexOfCard, 1)
        return state;
      }
    }
})

let turnState = createSlice({
  name: 'turnState',
  initialState: ["None", "None"],
  reducers: {
    setTiki(state, tiki) {
      state[1] = tiki.payload;
    },
    setCard(state, card) {
      state[0] = card.payload;
    },
    resetTurnState() {
      return ['None', 'None'];
    }
  }
})

export default configureStore({
  reducer: {
    tikis: tikis.reducer,
    cards: cards.reducer,
    turnState: turnState.reducer,
   }
}) 

export let {setTiki, setCard, resetTurnState}  = turnState.actions;
export let {setNewGame} = tikis.actions;
export let {removeCard} = cards.actions;