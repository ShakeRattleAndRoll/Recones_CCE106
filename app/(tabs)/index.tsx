import { ThemedText } from '@/components/themed-text';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

export default function HomeScreen() {
  
  const [ClickCount, AllCount] = useState(0);
  const [message, setMessage] = useState('');

  function Increase() {
    AllCount(ClickCount => ClickCount + 1);
    setMessage('');
  }

  function Decrease() {
    if (ClickCount > 0) {
      AllCount(ClickCount => ClickCount - 1);
      setMessage('');
    } else {
      setMessage('Cant go below 0');
    }
  }

  function Reset() {
    AllCount(0);
    setMessage('');
  }

  const colorScheme = useColorScheme();
  let countTextColor = colorScheme === 'dark' ? 'white' : 'dark';

  if (ClickCount >= 100) {
    countTextColor = 'red';
  } else if (ClickCount >= 50) {
    countTextColor = 'yellow'
  } else if (ClickCount >= 25) {
    countTextColor = 'green'
  }

  return (
    <View style={styles.Container}>
      <ThemedText style={[styles.CountText, {color: countTextColor}]}>{ClickCount}</ThemedText>
      <ThemedText style={styles.messageText}>{message}</ThemedText>

      <View style={styles.ButtonContainer}>
        <Pressable style={styles.ButtonDesign} onPress={Increase}>
          <Text style={styles.ButtonTextDesign}>
            Increase
          </Text>
        </Pressable>
        <Pressable style={[styles.ButtonDesign, styles.DecreaseButton]} onPress={Decrease}>
          <Text style={styles.ButtonTextDesign}>
            Decrease
          </Text>
        </Pressable>
        <Pressable style={[styles.ButtonDesign, styles.ResetButton]} onPress={Reset}>
          <Text style={styles.ButtonTextDesign}>
            Reset
          </Text>
        </Pressable>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    gap: 100,
  },
  CountText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 30,
  },
  ButtonDesign: {
    width: 100,
    paddingVertical: 20,
    marginHorizontal: 10,
    backgroundColor: 'green',
    borderRadius: 8,
  },
  ButtonTextDesign: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 12
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  DecreaseButton: {
    backgroundColor: 'red',
  },
  ResetButton: {
    backgroundColor: 'grey',
  },
  messageText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'red',
  },
});
