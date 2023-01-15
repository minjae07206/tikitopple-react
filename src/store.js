import { configureStore, createSlice } from '@reduxjs/toolkit'
import userEvent from '@testing-library/user-event';
import { tikisState, cardsState } from './data.js';

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
      return newGame;
    },
    moveTiki(state, turn) {
      const cardNow = turn.payload.cardNow;
      const tikiNow = turn.payload.tikiNow;
      let index;
      let popped;
      switch (cardNow) {
        case 'toast':
          state.pop();
          break;
        case 'topple':
          index = state.indexOf(state.find((tiki) => { if (tiki.name === tikiNow) { return tiki } }))
          popped = state.splice(index, 1);
          state.push(popped[0]);
          break;
        case '1up':
          index = state.indexOf(state.find((tiki) => { if (tiki.name === tikiNow) { return tiki } }));
          console.log(index)
          popped = state.splice(index, 1);
          console.log(popped[0].name)
          state.splice(index-1, 0, popped[0]);
          break;
        case '2up':
          index = state.indexOf(state.find((tiki) => { if (tiki.name === tikiNow) { return tiki } }));
          popped = state.splice(index, 1);
          state.splice(index - 2, 0, popped[0]);
          break;
        case '3up':
          index = state.indexOf(state.find((tiki) => { if (tiki.name === tikiNow) { return tiki } }));
          popped = state.splice(index, 1);
          state.splice(index - 3, 0, popped[0]);
          break;
      }
    }
  }
})

let cards = createSlice({
  name: 'cards',
  initialState: cardsState,
  reducers: {
    removeCard(state, cardDelete) {
      const indexOfCard = state.indexOf(cardDelete.payload);
      state.splice(indexOfCard, 1)
      return state;

    }
  }
})

let turnState = createSlice({
  name: 'turnState',
  initialState: { tikiNow: 'None', cardNow: 'None' },
  reducers: {
    setTiki(state, tiki) {
      state.tikiNow = tiki.payload;
    },
    setCard(state, card) {
      state.cardNow = card.payload;
    },
    resetTurnState() {
      return { tikiNow: 'None', cardNow: 'None', errorMessage: '' };
    },
    checkError(state, tikis) {
      tikis = tikis.payload;
      let errorState = false;
      switch (state.cardNow) {
        case 'toast':
          state.tikiNow = tikis.at(-1).name;
          break;
        case '1up':
          if (state.tikiNow === tikis[0].name) {
            state.tikiNow = 'None';
            state.errorMessage = "You can't 1up a tiki that is already at the top!"
            errorState = true;
          }
          break;
        case '2up':
          if (state.tikiNow === tikis[0].name || state.tikiNow === tikis[1].name) {
            state.tikiNow = 'None';
            state.errorMessage = "You can't 2up a tiki that is already at the top 2!"
            errorState = true;
          }
          break;
        case '3up':
          if (state.tikiNow === tikis[0].name || state.tikiNow === tikis[1].name || state.tikiNow === tikis[2].name) {
            state.tikiNow = 'None';
            state.errorMessage = "You can't 3up a tiki that is already at the top 3!"
            errorState = true;
          }
          break;
        case 'topple':
          if (state.tikiNow === tikis.at(-1).name) {
            state.tikiNow = 'None';
            state.errorMessage = "You can't topple a tiki that is not at the bottom!"
            errorState = true;
          }
          break;
        default:
          break;
      }
      if (errorState === false) {
        state.errorMessage = "";
      }
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

export let { setTiki, setCard, resetTurnState, checkError } = turnState.actions;
export let { setNewGame, moveTiki } = tikis.actions;
export let { removeCard } = cards.actions;