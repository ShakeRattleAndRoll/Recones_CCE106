import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from './theme';

import { loginUser } from '@/src/service/authService';

// npx expo install expo-secure-store

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
      await loginUser(username, password)
      router.replace('/dashboard');
    }
    catch (err: any) {
      setError(err.message || 'Login Faild: Please Check your Credentials.');
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
            secureTextEntry={true}
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