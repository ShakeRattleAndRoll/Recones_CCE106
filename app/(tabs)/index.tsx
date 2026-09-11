import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from './theme';

// Design inspired by quipper

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.welcomeCont}>
        <Text style={styles.appTitle}>Student Portal</Text>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
      </View>

      <View style={styles.semesterContainer}>
        <View style={styles.Icon}>
          <FontAwesome name="book" size={25} color={theme.color.primary} />
        </View>
        <View style={styles.totalsemContainer}>
          <Text style={[styles.appTitle, { color: "#b3d3ff", fontSize: 14 }]}>Current Term</Text>
          <Text style={styles.thesemester}>First Semester</Text>
          <Text style={styles.totalsem}>4 Active Semester</Text>
        </View>
      </View>

      <View style={styles.courseContainer}>
        <View>
          <Text style={[styles.welcomeText, { fontSize: 16 }]}>Courses </Text>
          <Text style={[styles.totalsem, { color: "#423d3d" }]}>All enrolled courses (tap to view details)</Text>
        </View>

        <View style={styles.theCourse}>
          <Pressable onPress={() => router.push({ pathname: '/course/[id]', params: { id: 'cce-106' } })} 
          style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={styles.courseTitle}>CCE 106</Text>
            <Text style={styles.courseDescription}>APPLICATION DEVELOPMENT AND EMERGING TECHNOLOGIES</Text>
          </Pressable>
        </View>

        <View style={styles.theCourse}>
          <Pressable onPress={() => router.push({ pathname: '/course/[id]', params: { id: 'it-11' } })} 
          style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={styles.courseTitle}>IT 11</Text>
            <Text style={styles.courseDescription}>NETWORKING 2</Text>
          </Pressable>
        </View>

        <View style={styles.theCourse}>
          <Pressable onPress={() => router.push({ pathname: '/course/[id]', params: { id: 'it-12' } })} 
          style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={styles.courseTitle}>IT 12</Text>
            <Text style={styles.courseDescription}>SYSTEMS INTEGRATION & ARCHITECTURE</Text>
          </Pressable>
        </View>

        <View style={styles.theCourse}>
          <Pressable onPress={() => router.push({ pathname: '/course/[id]', params: { id: 'it-17' } })} 
          style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={styles.courseTitle}>IT 17</Text>
            <Text style={styles.courseDescription}>	SOCIAL AND PROFESSIONAL ISSUES</Text>
          </Pressable>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.color.background,
    alignItems: 'center',
    gap: 10,
    paddingVertical: 20,
  },

  // Header
  welcomeCont: {
    width: theme.spacing.standard
  },
  appTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: theme.color.buttonContent,
  },
  welcomeText: {
    fontSize: 21,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  // Semester
  semesterContainer: {
    alignItems: 'center',
    backgroundColor: "#468ae2",
    flexDirection: 'row',
    width: theme.spacing.standard,
    borderRadius: 4,
    padding: 20,
    gap: 26,
    marginBottom: 20,
    elevation: 5,
  },
  Icon: {
    ...theme.spacing.trueCenter,
    backgroundColor: "#1654a0",
    width: 62,
    height: 62,
    borderRadius: 100,
    marginLeft: '5%',
  },
  totalsemContainer: {
    flex: 1,
  },
  thesemester: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.color.primary,
  },
  totalsem: {
    fontSize: 12,
    color: "#cbced3",
  },

  // Course
  courseContainer: {
    width: theme.spacing.standard,
    gap: 10,
  },
  theCourse: {
    backgroundColor: theme.color.primary,
    width: theme.spacing.full,
    padding: 14,
    borderRadius: 4,
  },
  courseTitle: {
    width: 75, 
    height: 38, 
    borderRadius: 4,
    backgroundColor: theme.color.buttonContent,
    color: theme.color.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 38, 
  },
  courseDescription: {
    flexShrink: 1,
    fontSize: 12,
    color: '#303030',
  },
});
