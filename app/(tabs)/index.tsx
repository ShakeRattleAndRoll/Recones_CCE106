import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from './theme';

// ang formation nag base ra sa example sa ppt

// Picture picker
// npx expo install expo-image-picker

export default function HomeScreen() {

  // Profile Picture
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

  // Login 
  const [lastloginDate, setlastloginDate] = useState<string | null>(null);
  const [lastlogin, setlastlogin] = useState('No login recorded yet!');
  const [login, setlogin] = useState(0);
  const [longestLogin, setlongestLogin] = useState(10);
  const [overallLogin, setoverallLogin] = useState(14);
  const [metricChanges, setMetricChanges] = useState({ current: 0, best: 0, total: 0 });

  function Loging_in() {
    const now = new Date();
    const currentDate = now.toDateString();
    const dateAndtime = now.toLocaleString();

    if (lastloginDate === currentDate) {
      alert('You already logged in today! Come back tomorrow.');
      return;
    }

    const newLogin = login + 1;
    const newOverall = overallLogin + 1;
    const newLongest = Math.max(longestLogin, newLogin);

    setlogin(newLogin);
    setoverallLogin(newOverall);
    setlongestLogin(newLongest);
    setMetricChanges({
      current: newLogin - login,
      best: newLongest - longestLogin,
      total: newOverall - overallLogin,
    });

    setlastlogin(dateAndtime);
    setlastloginDate(currentDate);
  }

  const isTodayLoggedIn = lastloginDate === new Date().toDateString();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.subContainer}>

      <View style={styles.topTitleContainer}>
        <Text style={styles.topTitleText}>Attendance Metric Activity</Text>
      </View>

      <View style={styles.headerContainer}>
        <View style={styles.profileTopRow}>
          <Text style={styles.profileTitleText}>Profile</Text>
        </View>

        <View style={styles.profileButtomRow}>
          <TouchableOpacity onPress={pickImage} activeOpacity={0.8} style={styles.profileWrapper}>
            <Image style={styles.profilePic} source={profilePic} />
            <View style={styles.editBadge}>
              <FontAwesome name="camera" size={10} color="#303030" />
            </View>
          </TouchableOpacity>

          <View style={styles.userInfoContainer}>
            <Text style={styles.userNameText}>Kenneth R. Recones</Text>
            <Text style={styles.userDegreeText}>
              Bachelor of Science in Information Technology
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.metricContainer}>

        <View style={styles.perMetricContainer}>
          <Text style={styles.metricTitle}>Current Streak</Text>
            <View style={styles.metricResultRow}>
            <View style={styles.metricValueWithBadge}>
              <Text style={styles.resultText}>{login}</Text>
              {metricChanges.current > 0 && (
                <View style={styles.plusBadge}>
                  <Text style={styles.plusBadgeText}>+{metricChanges.current}</Text>
                </View>
              )}
            </View>
            <FontAwesome name="fire" size={18} color="#FF5722" />
          </View>
        </View>

        <View style={styles.perMetricContainer}>
          <Text style={styles.metricTitle}>Best Streak</Text>
            <View style={styles.metricResultRow}>
            <View style={styles.metricValueWithBadge}>
              <Text style={styles.resultText}>{longestLogin}</Text>
              {metricChanges.best > 0 && (
                <View style={styles.plusBadge}>
                  <Text style={styles.plusBadgeText}>+{metricChanges.best}</Text>
                </View>
              )}
            </View>
            <FontAwesome name="trophy" size={18} color="#d1c300" />
          </View>
        </View>

        <View style={styles.perMetricContainer}>
          <Text style={styles.metricTitle}>Total Logins</Text>
            <View style={styles.metricResultRow}>
            <View style={styles.metricValueWithBadge}>
              <Text style={styles.resultText}>{overallLogin}</Text>
              {metricChanges.total > 0 && (
                <View style={styles.plusBadge}>
                  <Text style={styles.plusBadgeText}>+{metricChanges.total}</Text>
                </View>
              )}
            </View>
            <FontAwesome name="calendar" size={18} color="#303030" />
          </View>
        </View>

      </View>

      <View style={styles.actionCardContainer}>
        <Text style={styles.sectionHeading}>Daily Check-In</Text>
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            isTodayLoggedIn && styles.actionButtonDisabled,
            { opacity: pressed ? 0.85 : 1 },
          ]}
          onPress={Loging_in}
        >
          <Text style={styles.actionText}>
            {isTodayLoggedIn ? 'Logged In Today' : 'Record Daily Attendance'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.recentActContainer}>
        <Text style={styles.recentActHeader}>Recent Activity</Text>
        <Text style={styles.recentActText}>{lastlogin}</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
  subContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16,
  },

  // Top Title
  topTitleContainer: {
    paddingVertical: 4,
  },
  topTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  // Header Profile
  headerContainer: {
    padding: 16,
    width: '100%',
    backgroundColor: theme.color.primary,
    borderRadius: 16,
    gap: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  profileTopRow: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
    paddingBottom: 8,
  },
  profileTitleText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    opacity: 0.7,
  },
  profileButtomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    width: '100%',
  },
  profileWrapper: {
    position: 'relative',
  },
  profilePic: {
    width: 68,
    height: 68,
    borderRadius: 34,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: 20,
    height: 20,
    ...theme.spacing.trueCenter,
    elevation: 2,
  },
  userInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  userNameText: {
    ...theme.typography.header,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  userDegreeText: {
    fontSize: 13,
    opacity: 0.85,
    flexShrink: 1,
  },

  // Metric Section
  metricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },
  perMetricContainer: {
    flex: 1,
    backgroundColor: theme.color.primary,
    paddingTop: 18,
    paddingBottom: 12,
    paddingHorizontal: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  metricTitle: {
    ...theme.typography.metric,
    fontSize: 11,
    opacity: 0.8,
    marginBottom: 6,
    textAlign: 'center',
  },
  resultText: {
    ...theme.typography.result,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  metricResultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },

  metricValueWithBadge: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 3,
  },
  plusBadge: {
    backgroundColor: '#303030',
    minWidth: 18,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: -5,
    elevation: 2,
  },
  plusBadgeText: {
    color: '#89e472',
    fontSize: 10,
    fontWeight: 'bold',
  },

  // Action 
  actionCardContainer: {
    width: '100%',
    backgroundColor: theme.color.primary,
    padding: 16,
    borderRadius: 14,
    gap: 12,
    elevation: 1,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.9,
  },
  actionButton: {
    width: '100%',
    paddingVertical: 14,
    backgroundColor: theme.color.secondary,
    borderRadius: 10,
    ...theme.spacing.trueCenter,
  },
  actionButtonDisabled: {
    backgroundColor: theme.color.disabled,
    opacity: 0.9,
  },
  actionText: {
    ...theme.typography.action,
    fontWeight: 'bold',
    fontSize: 15,
  },

  // Recent Action
  recentActContainer: {
    width: '100%',
    backgroundColor: theme.color.primary,
    padding: 16,
    borderRadius: 14,
    gap: 4,
    elevation: 1,
  },
  recentActHeader: {
    fontSize: 12,
    opacity: 0.7,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  recentActText: {
    ...theme.typography.header,
    fontSize: 14,
    fontWeight: '500',
  },
});
