import React from 'react';
import { StyleSheet, View  } from 'react-native';
import Main from './components/Main'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { setLocalNotification } from './utils/helpers'

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
