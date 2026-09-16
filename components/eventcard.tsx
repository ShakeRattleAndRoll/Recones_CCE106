import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/app/(tabs)/theme';
import { eventtype } from './eventdata';

export default function Eventcard({ event, onPress, joined }: { event: eventtype; onPress: () => void; joined: boolean }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}><View style={styles.top}><Text style={styles.title}>{event.title}</Text><Text style={styles.category}>{event.category}</Text></View><Text style={styles.info}>{event.date}</Text><Text style={styles.info}>{event.place}</Text>{joined && <Text style={styles.joined}>Joined</Text>}</Pressable>;
}
const styles = StyleSheet.create({ card: { backgroundColor: theme.color.primary, borderRadius: 4, padding: 16, gap: 6, elevation: 3 }, pressed: { opacity: .7 }, top: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 }, title: { flex: 1, fontSize: 16, fontWeight: 'bold' }, category: { color: theme.color.buttonContent, fontSize: 11, fontWeight: 'bold' }, info: { color: '#6d6d6d', fontSize: 12 }, joined: { alignSelf: 'flex-start', backgroundColor: '#d8f3dc', color: '#24733a', borderRadius: 100, paddingHorizontal: 9, paddingVertical: 4, fontSize: 10, fontWeight: 'bold' } });
