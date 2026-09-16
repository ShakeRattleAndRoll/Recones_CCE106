import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Eventcard from '@/components/eventcard';
import { eventdata } from '@/components/eventdata';
import { theme } from './theme';
import { useEvent } from '@/components/eventcontext';

type filtertype = 'All' | 'Technology' | 'Workshop' | 'Sports' | 'Arts';
export default function events() {
  const [filter, setfilter] = useState<filtertype>('All');
  const { joinedEvent } = useEvent();
  const visibleEvent = filter === 'All' ? eventdata : eventdata.filter((item) => item.category === filter);
  return <ScrollView contentContainerStyle={styles.container}><View style={styles.header}><Text style={styles.appTitle}>EventMate</Text><Text style={styles.title}>Events</Text><Text style={styles.subTitle}>Discover what is happening on campus</Text></View><ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterCont}>{(['All', 'Technology', 'Workshop', 'Sports', 'Arts'] as filtertype[]).map((item) => <Pressable key={item} onPress={() => setfilter(item)} style={[styles.filter, filter === item && styles.active]}><Text style={[styles.filterText, filter === item && styles.activeText]}>{item}</Text></Pressable>)}</ScrollView><View style={styles.eventCont}>{visibleEvent.map((item) => <Eventcard key={item.id} event={item} joined={joinedEvent.includes(item.id)} onPress={() => router.push({ pathname: '/event/[id]', params: { id: item.id } })} />)}</View></ScrollView>;
}
const styles = StyleSheet.create({ container: { flexGrow: 1, backgroundColor: theme.color.background, alignItems: 'center', gap: 16, paddingVertical: 20 }, header: { width: theme.spacing.standard, gap: 4 }, appTitle: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', color: theme.color.buttonContent }, title: { fontSize: 26, fontWeight: 'bold' }, subTitle: { fontSize: 13, color: '#6d6d6d' }, filterScroll: { width: theme.spacing.standard, flexGrow: 0 }, filterCont: { gap: 8, paddingHorizontal: 2, alignItems: 'center' }, filter: { alignSelf: 'flex-start', backgroundColor: theme.color.primary, paddingHorizontal: 13, paddingVertical: 10, borderRadius: 4 }, active: { backgroundColor: theme.color.buttonContent }, filterText: { color: theme.color.buttonContent, fontSize: 12, fontWeight: 'bold' }, activeText: { color: theme.color.primary }, eventCont: { width: theme.spacing.standard, gap: 10 } });
