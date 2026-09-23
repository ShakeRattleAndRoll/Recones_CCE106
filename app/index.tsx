import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from './theme';

// npx expo install expo-secure-store

// Have mercy sir, nalibog ko sir unsa ning mga URL para diay na sa backend so nigamit kog fake API 
// pang testing raman diay ang postman base sakong nasabtan

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [checkingSession, setCheckingSession] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function restoreSession() {
      try {
        const saveToken = await SecureStore.getItemAsync('userToken')
        if (saveToken) {
          router.replace('/dashboard');
        }
      } 
      finally {
        setCheckingSession(false);
      }
    }
    restoreSession();
  }, []);

  const login = async () => {

    if (!username || !password) {
      setError('Please fill in both fields');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim()
        }),
      })

      const data = await response.json();

      if (response.ok) {
        await SecureStore.setItemAsync('userToken', data.accessToken);
        await SecureStore.setItemAsync('userName', `${data.firstName} ${data.lastName}`);

        router.replace('/dashboard');
      } else {
        setError (data.message || 'Invalid Username or Password');
      }

    } catch (err) {
      setError('Network Connection Error');
    } 
    finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6993ee" />
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.Container} contentContainerStyle={styles.ContainerSpacing}>

      <View style={styles.headerTitle}>
        <Text style={{...theme.typography.title}}>Student Portal</Text>
        <Text style={{ ...theme.typography.description }} >Login to enroll course</Text>
        <Text style={{ ...theme.typography.text }}>copy the placeholder to login</Text>
      </View>

      <View style={styles.LoginCredential}>

        <View style={styles.PerInput}>
          <Text>Username</Text>
          <TextInput style={styles.LoginInput} 
            placeholder='emilys'
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.PerInput}>
          <Text>Password</Text>
          <TextInput style={styles.LoginInput} 
            placeholder='emilyspass'
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.LoginButton}>
          <TouchableOpacity onPress={login} 
            style={[styles.LoginInput, {backgroundColor: '#6993ee'} ]}
            disabled={loading}
            > 

              {
                loading? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Login</Text>
                )
              }

          </TouchableOpacity>
        </View>

        { error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null } 

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
  errorText: {
    marginTop: 14,
    color: '#e64c4c',
    fontWeight: 'bold',
    fontSize: 18,
  },


});