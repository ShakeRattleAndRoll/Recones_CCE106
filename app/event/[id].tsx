import { useEvent } from '@/components/eventcontext';
import { eventdata } from '@/components/eventdata';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../(tabs)/theme';

export default function eventdetails() {
  const { id } = useLocalSearchParams<{ id: string }>(); 
  const event = eventdata.find((item) => item.id === id); 
  const { joinedEvent, toggleEvent } = useEvent(); 
  const joined = event ? joinedEvent.includes(event.id) : false;
  if (!event) 
    return <View style={styles.empty}><Text style={styles.title}>Event not found</Text><Pressable onPress={() => router.replace('/(tabs)/events')} style={styles.action}><Text style={styles.actionText}>Go to Events</Text></Pressable></View>;
  return <ScrollView contentContainerStyle={styles.container}><View style={styles.banner}><Text style={styles.label}>{event.category}</Text><Text style={styles.eventTitle}>{event.title}</Text><Text style={styles.light}>{event.date}</Text><Text style={styles.light}>{event.place}</Text></View><View style={styles.card}><Text style={styles.heading}>About this event</Text><Text style={styles.description}>{event.description}</Text><Text style={styles.heading}>Your status</Text><Text style={styles.status}>{joined ? 'Joined — you are attending this event.' : 'You have not joined this event.'}</Text><Pressable onPress={() => toggleEvent(event.id)} style={styles.action}><Text style={styles.actionText}>{joined ? 'Leave Event' : 'Join Event'}</Text></Pressable><Pressable onPress={() => router.back()} style={styles.back}><Text style={styles.backText}>Go Back</Text></Pressable></View></ScrollView>;
}
const styles = StyleSheet.create({ 
  container: { 
    flexGrow: 1, 
    backgroundColor: theme.color.background,
    alignItems: 'center', 
    gap: 18, 
    paddingVertical: 20 
  }, 
  banner: { 
    width: theme.spacing.standard, 
    backgroundColor: '#468ae2', 
    padding: 20, 
    borderRadius: 4, 
    gap: 8, 
    elevation: 5 
  }, 
  label: { 
    color: '#b3d3ff', 
    fontWeight: 'bold', 
    fontSize: 12 
  },
  eventTitle: { 
    color: theme.color.primary, 
    fontWeight: 'bold', 
    fontSize: 24 
  }, 
  light: { 
    color: '#dcecff', 
    fontSize: 13 
  }, 
  card: { 
    width: theme.spacing.standard, 
    backgroundColor: theme.color.primary, 
    borderRadius: 4, 
    padding: 20, 
    gap: 10, 
    elevation: 4 
  }, 
  heading: { 
    color: theme.color.buttonContent, 
    fontSize: 14, 
    fontWeight: 'bold' 
  }, 
  description: { 
    color: '#423d3d', 
    lineHeight: 20 
  }, 
  status: { 
    fontWeight: 'bold' 
  }, 
  action: { 
    alignItems: 'center', 
    padding: 13, 
    borderRadius: 4, 
    backgroundColor: theme.color.buttonContent 
  }, 
  actionText: { 
    color: theme.color.primary, 
    fontWeight: 'bold' 
  }, 
  back: { 
    alignItems: 'center', 
    padding: 8 
  }, 
  backText: { 
    color: theme.color.buttonContent, 
    fontWeight: 'bold' 
  }, 
  empty: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 12, 
    backgroundColor: theme.color.background 
  }, 
  title: { 
    fontSize: 22, 
    fontWeight: 'bold' 
  } 
});
