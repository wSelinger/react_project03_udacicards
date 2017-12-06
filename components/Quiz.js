/*
* Stateful UI component implementing a view allowing to a quiz on a selected
* deck.
* Connected via redux.
* Updates the daily reminder notification upon opening the view.
*/

import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import TextButton from './TextButton'
import { connect } from 'react-redux'
import { green, red, white } from '../utils/colors'
import { clearLocalNotification, setLocalNotification} from '../utils/helpers'

class Quiz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.resetQuiz()
    clearLocalNotification()
      .then(setLocalNotification)
  }

  resetQuiz = () => {
    const { deck } = this.props
    this.setState({
      cardsLeft: deck.questions.map((card, index) => index),
      correctAnswers: 0
    })
    this.nextQuestion()
  }

  nextQuestion() {
    this.setState((state) => {
      const { cardsLeft } = state
      if (cardsLeft.length > 0) {
        const nextQuestion = Math.floor(Math.random()*cardsLeft.length)
        return {
          currentQuestion: cardsLeft[nextQuestion],
          cardsLeft: cardsLeft.filter((item, index) => index != nextQuestion),
          isQuestionDisplayed: true
        }
      }  else {
        return  {
          currentQuestion: -1,
          isQuestionDisplayed: true
        }
      }
    })
  }

  flipCard = () => {
    this.setState((state) => ({
      isQuestionDisplayed: !state.isQuestionDisplayed
    })
    )
  }

  handleBackToDeck = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  handleCorrectAnswer = () => {
    this.setState((state) => ({
      correctAnswers: state.correctAnswers+1
    })
    )
    this.nextQuestion()
  }

  handleIncorrectAnswer = () => {
    this.nextQuestion()
  }

  render() {
    const { deck, navigation } = this.props
    const { title, questions } = deck
    const {
      cardsLeft,
      currentQuestion,
      correctAnswers,
      isQuestionDisplayed } = this.state

    if (typeof correctAnswers === 'undefined') {
      return null
    }

    if (currentQuestion < 0) {
      return (
        <View style={styles.container}>
          <Text>Congratulations, you completed the quiz !</Text>
          <Text>Correct answers: {correctAnswers}/{questions.length}</Text>
          <Button
            title='Restart Quiz'
            onPress={this.resetQuiz}
          />
          <Button
            title='Back to deck'
            onPress={this.handleBackToDeck}
          />
        </View>
      )
    }

    const card = questions[currentQuestion]
    return (
      <View style={styles.container}>
        <Text>Cards left: {cardsLeft.length+1}/{questions.length}</Text>
        <Text style={styles.card}>{isQuestionDisplayed ? card.question : card.answer}</Text>
        <Button
          title={isQuestionDisplayed ? 'Answer' : 'Question'}
          onPress={this.flipCard}
        />
        <TextButton
          onPress={this.handleCorrectAnswer}
          style={[styles.correct, styles.button]}>
          Correct
        </TextButton>
        <TextButton
          onPress={this.handleIncorrectAnswer}
          style={[styles.incorrect, styles.button]}>
          Incorrect
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    alignItems: 'center'
  },
  button: {
    fontSize: 20,
    padding: 10,
    borderRadius: 7,
    height: 60,
    width: 200,
    marginLeft: 40,
    marginRight: 40,
  },
  correct: {
    backgroundColor: green,
  },
  incorrect: {
    backgroundColor: red,
  },
  card: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: 200,
    width: 300,
    borderRadius: 7,
    borderWidth: 1
  }
})

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(Quiz)
