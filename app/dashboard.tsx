import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from './theme';

// npx expo install expo-secure-store

interface Quote {
    id: number;
    quote: string;
    author: string;
}

const Default_Quote = {
    id: "0",
    quote: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
}

export default function Dashboard() {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [studName, setstudName] = useState<string>('Student');
    const [loading, setLoading] = useState(true);

    const [quoteData, setquoteData] = useState(Default_Quote);
    const [quoteLoading, setquoteLoading] = useState(false);
    const [quoteError, setqouteError] = useState<string | null>(null);

    useEffect(() => {
        savedName();
        fetchProtectedProfile();
        fetchQuote();
    }, []);

    const savedName = async () => {
        try {
            const save = await SecureStore.getItemAsync('userName');
            if (save) {
                setstudName(save);
            }
        } catch (err) {
            console.log('Error loading saved name', err);
        }
    };

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
                setstudName(`${data.firstName} ${data.lastName}`);
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

    const fetchQuote = async () => {
        setquoteLoading(true);
        setqouteError(null);

        try {
            const response = await fetch('https://dummyjson.com/quotes/random');
            const data = await response.json();

            if (response.ok) {
                setquoteData(data);
            } else {
                setqouteError('Failed to fetch quote.');
            }
        } catch (error) {
            setqouteError('Network error loading quote.');
        } finally {
            setquoteLoading(false);
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

            <Text style={{ ...theme.typography.title }}>Welcome, {studName}</Text>
            <Text style={[{ ...theme.typography.description }, {marginBottom: 12}]}>Here is your daily dose of Quotes</Text>

            <View style={styles.quoteCard}>
                <Text style={styles.quoteHeader}>QUOTE OF THE DAY</Text>

                {quoteLoading ? (
                    <ActivityIndicator size="large" color="#38bdf8" style={{ marginVertical: 20 }} />
                ) : quoteError ? (
                    <Text style={styles.errorText}>{quoteError}</Text>
                ) : (
                    <View style={styles.quoteContent}>
                        <Text style={styles.quoteText}>"{quoteData?.quote}"</Text>
                        <Text style={styles.authorText}>— {quoteData?.author}</Text>
                    </View>
                )}

                <TouchableOpacity
                    onPress={fetchQuote}
                    style={styles.newQuoteButton}
                    disabled={quoteLoading}
                >
                    <Text style={styles.newQuoteButtonText}>NEW QUOTE</Text>
                </TouchableOpacity>
            </View>

            <View style={{...theme.spacing.trueCenter}}>
                <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                    <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Log out</Text>
                </TouchableOpacity>
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
    logoutButton: {
        marginTop: 20,
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

    quoteCard: {
        backgroundColor: '#0c2340',
        borderRadius: 16,
        padding: 24,
        width: '100%',
        maxWidth: 350,
        alignItems: 'center',
        marginVertical: 15,
        elevation: 4,
    },
    quoteHeader: {
        color: '#38bdf8',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        marginBottom: 16,
    },
    quoteContent: {
        alignItems: 'center',
        marginVertical: 10,
    },
    quoteText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 26,
        marginBottom: 12,
    },
    authorText: {
        color: '#cbd5e1',
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 16,
    },
    errorText: {
        color: '#f87171',
        marginVertical: 15,
        fontWeight: 'bold',
    },
    newQuoteButton: {
        backgroundColor: '#0284c7',
        paddingVertical: 12,
        paddingHorizontal: 28,
        borderRadius: 25,
        marginTop: 10,
    },
    newQuoteButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 12,
        letterSpacing: 1,
    },

})