import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'userToken';
const NAME_KEY = 'userName';

export async function saveToken(token: string, name?: string) {
    try {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
        if (name) {
            await SecureStore.setItemAsync(NAME_KEY, name);
        }
    } catch (error) {
        console.error('Error saving token to SecureStore:', error);
    }
}

export async function getToken() {
    try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        return token;
    } catch (error) {
        console.error('Error getting token from SecureStore:', error);
        return null;
    }
}

export async function deleteToken() {
    try {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync(NAME_KEY);
    } catch (error) {
        console.error('Error removing token from SecureStore:', error);
    }
}




