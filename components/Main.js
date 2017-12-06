/*
* Stateless UI component implementing main view
* (Stack of Tabbed Home View and various sub views)
*/

import React from 'react';
import { StyleSheet, View  } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import AddCard from './AddCard'
import DeckList from './DeckList'
import IndividualDeck from './IndividualDeck'
import NewDeck from './NewDeck'
import Quiz from './Quiz'

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'DECKS'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
        tabBarLabel: 'NEW DECK'
    }
  }
})

export default Main = StackNavigator({
  Home: {
    screen: Tabs
  },
  IndividualDeck: {
    screen: IndividualDeck
  },
  AddCard: {
    screen: AddCard
  },
  Quiz: {
    screen: Quiz
  },
})
