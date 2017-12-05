/*
* This module includes the reducer for the UdaciCard app to manage
  decks and cards.
*/

import {
    SET_DECKS,
    ADD_CARD,
    ADD_DECK,
} from '../actions'

export default function reducer(state = {}, action) {
  switch (action.type) {

    case SET_DECKS:
      const { decks } = action
      return {
        ...decks
      }

    case ADD_DECK:
      const { title } = action
      return {
        ...state,
        [title]: {
          title,
          questions: [],
        }
      }

    case ADD_CARD:
      const { deckId, card } = action
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions: state[deckId].questions.concat(card)
        }
      }

    default:
      return state
  }
}
