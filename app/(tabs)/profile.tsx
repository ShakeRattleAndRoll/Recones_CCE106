import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from './theme';

export default function Profile() {

    const DEFAULT_PROFILE = require('@/assets/images/Default_pfp.jpg');
    const [profilePic, setprofilePic] = useState(DEFAULT_PROFILE);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });
        if (!result.canceled) {
            setprofilePic({ uri: result.assets[0].uri });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={pickImage} activeOpacity={0.8} style={styles.profileWrapper}>
                    <Image style={styles.profilePic} source={profilePic} />
                    <View style={styles.editBadge}>
                        <FontAwesome name="camera" size={10} color="#303030" />
                    </View>
                </TouchableOpacity>
                <View style={styles.userContainer}>
                    <Text style={styles.userInfo}>Kenneth R. Recones</Text>
                    <Text style={styles.courseInfo}>Bachelor of Sciences in Information Technology</Text>
                </View>
                <Text style={styles.IDinfo}>Student ID: 146983</Text>
            </View>

            <View style={styles.extraInfoContainer}>
                <Text style={styles.extraInfoTitle}>Student Information</Text>
                <View style={styles.emailContainer}>
                    <View style={styles.Icon}>
                        <FontAwesome name="envelope" size={16} color={theme.color.buttonContent} />
                    </View>
                    <View>
                        <Text style={styles.courseInfo}>Email</Text>
                        <Text style={[styles.userInfo, {fontSize: 14}]}>k.recones.146983.tc@umindanao.edu.ph</Text>
                    </View>
                </View>

                <View style={styles.emailContainer}>
                    <View style={styles.Icon}>
                        <FontAwesome name="users" size={16} color={theme.color.buttonContent} />
                    </View>
                    <View>
                        <Text style={styles.courseInfo}>Department</Text>
                        <Text style={[styles.userInfo, { fontSize: 14 }]}>Department of Computing Education</Text>
                    </View>
                </View>

                <View style={styles.emailContainer}>
                    <View style={styles.Icon}>
                        <FontAwesome name="calendar" size={16} color={theme.color.buttonContent} />
                    </View>
                    <View>
                        <Text style={styles.courseInfo}>Academic Year</Text>
                        <Text style={[styles.userInfo, { fontSize: 14 }]}>2026-2027</Text>
                    </View>
                </View>

                <View style={styles.emailContainer}>
                    <View style={[styles.Icon, {backgroundColor: 'rgb(173, 172, 172)'}]}>
                        <FontAwesome name="github" size={22} color="#000000" />
                    </View>
                    <View>
                        <Text style={styles.courseInfo}>Github</Text>
                        <Text style={[styles.userInfo, { fontSize: 14 }]}>ShakeRattleAndRoll</Text>
                    </View>
                </View>
            </View>

            <View style={styles.recordContainer}>
                <Pressable style={styles.viewRecord} onPress={() => router.push({ pathname: '/student/[id]', params: { id: '146983' } })}>
                    <Text style={styles.recordText}>View Student Record</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: theme.color.background,
        ...theme.spacing.trueCenter,
        gap: 20,
    },

    //Profile
    profileContainer: {
        ...theme.spacing.trueCenter,
        backgroundColor: theme.color.primary,
        width: theme.spacing.standard,
        padding: 20,
        gap: 16,
        borderRadius: 4,
        elevation: 5,
    },
    userContainer: {
        ...theme.spacing.trueCenter,
        gap: 5,
    },
    profilePic: {
        width: 90,
        height: 90,
        maxWidth: 100,
        maxHeight: 100,
        resizeMode: 'cover',
        borderRadius: 100,
        borderWidth: 0.5,
    },
    userInfo: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    courseInfo: {
        fontSize: 12,
        fontWeight: '400',
        color: '#8e8d8d',
    },
    IDinfo: {
        fontSize: 12,
        fontWeight: 'bold',
        backgroundColor: theme.color.button,
        color: theme.color.buttonContent,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 100,
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: theme.color.primary,
        borderRadius: 10,
        width: 20,
        height: 20,
        ...theme.spacing.trueCenter,
        elevation: 2,
    },
    profileWrapper: {
        position: 'relative',  
    },

    // Student Info 
    extraInfoContainer: {
        backgroundColor: theme.color.primary,
        width: theme.spacing.standard,
        padding: 20,
        borderRadius: 4,
        gap: 12,
        elevation: 5,
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    extraInfoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    Icon: {
        ...theme.spacing.trueCenter,
        backgroundColor: theme.color.button,
        width: 42,
        height: 42,
        borderRadius: 100,
    },

    // View Student Record
    recordContainer: {
        backgroundColor: theme.color.buttonContent,
        width: '80%',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    viewRecord: {
        ...theme.spacing.trueCenter,
    },
    recordText: {
        color: theme.color.primary,
    },

});
