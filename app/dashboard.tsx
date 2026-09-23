import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from './theme';

// npx expo install expo-secure-store

export default function Dashboard() {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProtectedProfile();
    }, []);

    const fetchProtectedProfile = async () => {
        try {
            const token = await SecureStore.getItemAsync('userToken');

            const response = await fetch('https://dummyjson.com/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else if (response.status === 401) {
                await logout();
            }
        } catch (error) {
            console.log('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('userName');
        router.replace('/');
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.Container} contentContainerStyle={styles.ContainerSpacing}>

            <Text> Welcome </Text>
            <Text> (WIP) </Text>

            <Pressable onPress={logout} style={styles.logoutButton}>
                <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Log out</Text>
            </Pressable>

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
        ...theme.spacing.trueCenter
    },
    logoutButton: {
        marginTop: 50,
        backgroundColor: '#cc4343',
        padding: 15,
        width: '80%',
        alignItems: 'center',
        borderRadius: 5,
        elevation: 3,
    },
    center: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },

})