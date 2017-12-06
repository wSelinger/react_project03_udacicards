/*
* Stateful UI component implementing a form to add a deck.
* Connected via redux.
*/

import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import  * as api from '../utils/api'

class NewDeck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
    }
  }

  handleSubmit = () => {
    const { title } = this.state
    const { dispatch, navigation } = this.props
    if (!title) {
      return Alert.alert('Invalid entry', 'Please enter a title.')
    }
    dispatch(addDeck(title))
    api.addDeck(title)
    this.setState({ title: ''})
    navigation.navigate('IndividualDeck', { deckId: title});
  }

  handleTitleChange = (value) => {
    this.setState({ title: value})
  }

  render() {
    const { title } = this.state
    return (
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
        <Text>What is the title of your new deck ?</Text>
        <TextInput
          value={title}
          placeholder="Deck Title"
          style={{ borderWidth: 1, margin: 20, height: 50}}
          onChangeText={this.handleTitleChange}
        />
        <Button
          title="Submit"
          onPress={this.handleSubmit}
        />
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(NewDeck)
