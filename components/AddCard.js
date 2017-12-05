/*
* Stateful UI component implementing a form to add cards.
* Connected via redux.
*/

import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { addCard } from '../actions'
import { connect } from 'react-redux'
import { addCardToDeck } from '../utils/api'

class AddCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      question: '',
      answer: ''
    }
  }

  handleSubmit = () => {
    const { question, answer } = this.state
    const card = { question, answer }
    const { deckId } = this.props

    if (!question) {
      return Alert.alert('Invalid entry', 'Please enter a question.')
    }
    if (!answer) {
      return Alert.alert('Invalid entry', 'Please enter an answer.')
    }

    //TODO think about more elegant solution (thunks ?)
    this.props.dispatch(addCard(deckId, card))
    addCardToDeck(deckId, card)

    this.setState({
       question: '',
       answer: ''})
    this.textInput.focus()
  }

  handleQuestionChange = (value) => {
    this.setState({ question: value})
  }

  handleAnswerChange = (value) => {
    this.setState({ answer: value})
  }

  render() {
    const { question, answer } = this.state
    const { deck } = this.props
    return (
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
        <Text>Add card to deck '{deck.title}' ({deck.questions.length} cards)</Text>
        <TextInput
          ref={(e) => {this.textInput = e}}
          placeholder="Question"
          value={question}
          style={{ borderWidth: 1, margin: 20, height: 50}}
          onChangeText={this.handleQuestionChange}
        />
        <TextInput
          placeholder="Answer"
          value={answer}
          style={{ borderWidth: 1, margin: 20, height: 50}}
          onChangeText={this.handleAnswerChange}
        />
        <Button
          title="Submit"
          onPress={this.handleSubmit}
        />
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deckId,
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(AddCard)
