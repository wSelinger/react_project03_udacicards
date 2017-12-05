import React from 'react';
import { StyleSheet, View  } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import AddCard from './components/AddCard'
import DeckList from './components/DeckList'
import IndividualDeck from './components/IndividualDeck'
import NewDeck from './components/NewDeck'
import Quiz from './components/Quiz'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { setLocalNotification } from './utils/helpers'

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

const Main = StackNavigator({
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

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    // without flex: 1 Navigator displays emtpy screen
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}} >
          <Main />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
