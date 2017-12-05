/*
* Stateless UI component implementing the DeckList view.
* Connected via redux.
* Triggers retrieval of the decks in componentDidMount.
*/

import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Deck from './Deck'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { setDecks } from '../actions'

// item is an iterator structure (index, item, separators -functions: (highlight, unhighlight, updateProps))
function renderItem(listItem, navigation) {
  const { title, questions } = listItem.item
  return (
    <TouchableOpacity onPress={() => navigation.navigate('IndividualDeck', { deckId: title})}>
      <View style={{flex: 1, margin: 10, borderBottomWidth: StyleSheet.hairlineWidth  }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{questions.length} card{questions.length !== 1 ? 's' : ''}</Text>
      </View>
    </TouchableOpacity>
  )
}

class DeckList extends Component {
  componentDidMount() {
    getDecks().then((decks) => this.props.dispatch(setDecks(decks)))
  }

  render() {
    const { navigation, decks } = this.props
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={decks}
          renderItem={(item) => renderItem(item, navigation)}
          keyExtractor={(item) => item.title}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  description: {
    fontSize: 13,
    color: '#999',
  }
})

function mapStateToProps(state) {
  return {
    decks: Object.keys(state).map((deckId) =>
      state[deckId]
    )
  }
}

export default connect(mapStateToProps)(DeckList)
