import { ThemedText } from "@/components/themed-text";
import { useState } from "react";
import { Keyboard, Pressable, StyleSheet, TextInput, TouchableWithoutFeedback, View, useColorScheme } from "react-native";

export default function HomeScreen() {

  const colorScheme = useColorScheme();

  let textColorScheme = colorScheme === 'dark' ? 'white' : 'black';

  const [firstValue, SetfirstValue] = useState("");
  const [secondValue, SetsecondValue] = useState("");
  const [result, Setresult] = useState("");
  const [firstfocus, setFirstfocus] = useState(false);
  const [secondfocus, setSecondfocus] = useState(false);
  const [tap, setTap] = useState(false);

  function Addition() {
    const num1 = Number(firstValue) || 0;
    const num2 = Number(secondValue) || 0;
    Setresult((num1 + num2).toString());
  }; 

  function Subtraction() {
    const num1 = Number(firstValue) || 0;
    const num2 = Number(secondValue) || 0;
    Setresult((num1 - num2).toString());
  };

  function Multiplication() {
    const num1 = Number(firstValue) || 0;
    const num2 = Number(secondValue) || 0;
    Setresult((num1 * num2).toString());
  };

  function Division() {
    const num1 = Number(firstValue) || 0;
    const num2 = Number(secondValue) || 0;
    if (num2 == 0) {
      Setresult('Cant Divide with 0');
    } else {
      Setresult((num1 / num2).toString());
    }
  };

  function reset() {
    SetsecondValue('');
    SetfirstValue('');
    Setresult('');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.inputValueContainer}>
          <View style={[styles.perValueContainer, firstfocus && styles.whenFocus]}>
            <TextInput 
              style={[styles.valueText, {color: textColorScheme}]}          
              placeholderTextColor={textColorScheme}
              value={firstValue} 
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(val) => SetfirstValue(val)}
              onFocus={() => setFirstfocus(true)}
              onBlur={() => setFirstfocus(false)}
              placeholder="..."
              />
          </View>

          <View style={[styles.perValueContainer, secondfocus && styles.whenFocus]}>
            <TextInput
              style={[styles.valueText, {color: textColorScheme}]}
              placeholderTextColor={textColorScheme}
              value={secondValue}
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(val) => SetsecondValue(val)}
              onFocus={() => setSecondfocus(true)}
              onBlur={() => setSecondfocus(false)}
              placeholder="..."
            />
          </View>
        </View>

        <View style={styles.perResultCont}>
          <ThemedText style={styles.valueText}>{result}</ThemedText>
        </View>

        <View style={styles.arithmeticCont}>
          <Pressable style={({ pressed }) => [styles.perArithmeticCont, pressed && styles.whenTapArithmetic]} onPress={Addition}>
            <ThemedText style={styles.arithmeticText}>+</ThemedText>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.perArithmeticCont, pressed && styles.whenTapArithmetic]} onPress={Subtraction}>
            <ThemedText style={styles.arithmeticText}>-</ThemedText>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.perArithmeticCont, pressed && styles.whenTapArithmetic]} onPress={Multiplication}>
            <ThemedText style={styles.arithmeticText}>×</ThemedText>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.perArithmeticCont, pressed && styles.whenTapArithmetic]} onPress={Division}>
            <ThemedText style={styles.arithmeticText}>÷</ThemedText>
          </Pressable>
        </View>

        <View>
          <Pressable 
            style={({pressed}) => [styles.perArithmeticCont, styles.resetDesign, pressed && styles.whenTapReset]}
            onPress={reset}>
            <ThemedText style={{fontSize: 24}}>
              R
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    backgroundColor: '#6697bad1',
  },
  inputValueContainer: {
    flexDirection: 'row',
    gap: 50,
  },
  perValueContainer: {
    width: 120,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 0.4,
    backgroundColor: '#6697ba',
  },
  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  perResultCont: {
    width: 200,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 0.4,
    backgroundColor: '#6697ba',
  },
  arithmeticCont: {
    flexDirection: 'row',
    gap: 20,
  },
  arithmeticText: {
    fontSize: 40
  },
  perArithmeticCont: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 0.4,
    backgroundColor: '#6697ba',
  },
  whenFocus: {
    backgroundColor: '#5aa54f',
  },
  whenTapArithmetic: {
    backgroundColor: '#4d728d1b',
  },
  whenTapReset: {
    backgroundColor: '#5a2121',
  },
  resetDesign: {
    borderRadius: 100, 
    backgroundColor: '#d34c4c',
  },
});
