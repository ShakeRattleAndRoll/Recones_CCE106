import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen() {
    const [data, setData] = useState([]);
    return (
        <ScrollView style={styles.Container} contentContainerStyle={styles.ContainerSpacing}>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  ContainerSpacing: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

});