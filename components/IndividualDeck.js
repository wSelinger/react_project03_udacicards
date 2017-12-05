/*
* Stateless UI component implementing the card view.
* Connected via redux.
*/

import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import Deck from './Deck'

function IndividualDeck({ deck, deckId, navigation }) {

  const { title, questions } = deck
  return (
    <View style={styles.container}>
      <Deck title={title} questions={questions} />
      <Button
        title="Add Card"
        onPress={() => navigation.navigate('AddCard', { deckId: deckId })}
      />
      <Button
        title="Start Quiz"
        onPress={() => navigation.navigate('Quiz', { deckId: deckId })}
      />
    </View>
  )
}

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deckId,
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(IndividualDeck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    alignItems: 'center'
  }
})
