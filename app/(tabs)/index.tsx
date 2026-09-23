import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { theme } from './theme';

// kung di makita ang icons shesh
// npm install react-native-vector-icons 

// Naka focus po ko sa dark mode sir

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  return (
    <ScrollView style={styles.Container} contentContainerStyle={styles.ContainerSpacing}>
      <View style={styles.headerTitle}>
        <Text style={{...theme.typography.title}}>Student Portal</Text>
        <Text style={{ ...theme.typography.description }} >Login to enroll course</Text>
      </View>

      <View style={styles.LoginCredential}>

        <View style={styles.PerInput}>
          <Text>Username</Text>
          <TextInput style={styles.LoginInput} placeholder='Juan Dela Cruz'/>
        </View>

        <View style={styles.PerInput}>
          <Text>Password</Text>
          <TextInput style={styles.LoginInput} placeholder='**********'/>
        </View>

        <View style={styles.LoginButton}>
          <Pressable onPress={() => alert('You Click Me')} style={[styles.LoginInput, {backgroundColor: '#6993ee'} ]}> 
            <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Login</Text>
          </Pressable>
        </View>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
  ContainerSpacing: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  headerTitle: {
    padding: 10,
    marginVertical: 30,
  },
  LoginCredential: {
    ...theme.spacing.trueCenter,
    backgroundColor: theme.color.primary,
    padding: 20,
    borderRadius: 4,
    elevation: 2,
  },
  PerInput: {
    width: '96%',
    maxWidth: 300,
    marginBottom: 20,
  },
  LoginButton: {
    width: '96%',
    maxWidth: 200,
  },
  LoginInput: {
    backgroundColor: theme.color.secondary,
    borderRadius: 2,
    padding: 14,
    alignItems: 'center',
  },
});