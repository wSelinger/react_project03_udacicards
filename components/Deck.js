/*
* Stateless UI component representing a deck header view.
*/

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Deck({title, questions}) {
  return (
    <View style={{margin: 10, borderWidth: 1, borderRadius: 7, width: 200, height: 100, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{title}</Text>
      <Text>{questions.length} card{questions.length !== 1 ? 's' : ''}</Text>
    </View>
  )
}
