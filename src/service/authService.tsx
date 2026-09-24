import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'https://dummyjson.com';

export async function loginUser(username: string, password: string) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username.trim(),
            password: password.trim(),
            expiresInMins: 30,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Invalid Username or Password');
    }

    await SecureStore.setItemAsync('userToken', data.accessToken);
    await SecureStore.setItemAsync('userName', `${data.firstName} ${data.lastName}`);

    return data;
}

export async function getCurrentUser(token: string) {
    const response = await fetch(`${BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch profile session.');
    }

    const data = await response.json();
    return data;
}