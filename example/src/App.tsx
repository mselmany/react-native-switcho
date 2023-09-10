import 'react-native-reanimated';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Highlighto } from '@mselmany/react-native-switcho';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.border}>
        <Highlighto.Container>
          <View style={styles.inner}>
            <View style={styles.emptyArea} />
            <View style={styles.emptyArea} />
            <View style={styles.emptyArea} />
            <Highlighto.Element>
              <View style={styles.button}>
                <Text>Predefined size: large</Text>
              </View>
            </Highlighto.Element>
            <View style={styles.emptyArea} />
            <View style={styles.emptyArea} />
          </View>
        </Highlighto.Container>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  border: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'red',
  },
  inner: {
    flex: 1,
    gap: 20,
  },
  emptyArea: {
    width: '100%',
    height: 380,
    backgroundColor: 'yellow',
  },
  button: {
    width: '100%',
    height: 60,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
