import { FontAwesome } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Statcard from '@/components/statcard';
import { eventdata } from '@/components/eventdata';
import { theme } from './theme';
import { useEvent } from '@/components/eventcontext';

export default function HomeScreen() {
  const { joinedEvent } = useEvent();
  return <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.welcomeCont}><Text style={styles.appTitle}>EventMate</Text><Text style={styles.welcomeText}>Welcome, Kenneth!</Text></View>
    <View style={styles.feature}><View style={styles.icon}><FontAwesome name="calendar" size={25} color={theme.color.primary} /></View><View><Text style={[styles.appTitle, { color: '#b3d3ff', fontSize: 14 }]}>CAMPUS EVENTS</Text><Text style={styles.featureTitle}>Find your next event</Text><Text style={styles.lightText}>Browse local campus activities</Text></View></View>
    <View style={styles.statCont}><Statcard label="Total Events" value="5" /><Statcard label="Joined" value={String(joinedEvent.length)} /><Statcard label="This Week" value="3" /></View>
    <Link href="/(tabs)/events" asChild><Pressable style={styles.eventLink}><Text style={styles.eventLinkText}>Browse All Events</Text></Pressable></Link>
    <View style={styles.list}><View><Text style={[styles.welcomeText, { fontSize: 16 }]}>Upcoming Events</Text><Text style={[styles.lightText, { color: '#423d3d' }]}>Tap an event to view details</Text></View>{eventdata.slice(0, 3).map((item) => <Pressable key={item.id} onPress={() => router.push({ pathname: '/event/[id]', params: { id: item.id } })} style={styles.event}><Text style={styles.eventDate}>{item.date}</Text><Text style={styles.eventName}>{item.title}</Text><Text style={styles.eventPlace}>{item.place}</Text></Pressable>)}</View>
  </ScrollView>;
}
const styles = StyleSheet.create({ container: { flexGrow: 1, backgroundColor: theme.color.background, alignItems: 'center', gap: 16, paddingVertical: 20 }, welcomeCont: { width: theme.spacing.standard }, appTitle: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', color: theme.color.buttonContent }, welcomeText: { fontSize: 21, fontWeight: 'bold', textTransform: 'uppercase' }, feature: { alignItems: 'center', backgroundColor: '#468ae2', flexDirection: 'row', width: theme.spacing.standard, borderRadius: 4, padding: 20, gap: 18, elevation: 5 }, icon: { ...theme.spacing.trueCenter, backgroundColor: '#1654a0', width: 62, height: 62, borderRadius: 100 }, featureTitle: { fontSize: 22, fontWeight: 'bold', color: theme.color.primary }, lightText: { fontSize: 12, color: '#cbced3' }, statCont: { width: theme.spacing.standard, flexDirection: 'row', gap: 8 }, eventLink: { width: theme.spacing.standard, backgroundColor: theme.color.buttonContent, borderRadius: 4, padding: 14, alignItems: 'center' }, eventLinkText: { color: theme.color.primary, fontWeight: 'bold' }, list: { width: theme.spacing.standard, gap: 10 }, event: { backgroundColor: theme.color.primary, padding: 14, borderRadius: 4, gap: 3 }, eventDate: { color: theme.color.buttonContent, fontWeight: 'bold', fontSize: 12 }, eventName: { fontWeight: 'bold', fontSize: 15 }, eventPlace: { color: '#6d6d6d', fontSize: 12 } });
