import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { taskdata } from '@/components/taskdata';
import { theme } from '../(tabs)/theme';

export default function Taskdetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const task = taskdata.find((item) => item.id === id);
  const [status, setstatus] = useState(task?.status ?? 'Pending');

  if (!task) return <View style={styles.emptyCont}><Text style={styles.emptyTitle}>Task not found</Text><Text style={styles.emptyText}>This task may have been removed or the link is invalid.</Text><Pressable onPress={() => router.replace('/(tabs)/task')} style={styles.action}><Text style={styles.actionText}>Go to Tasks</Text></Pressable></View>;

  const nextStatus = status === 'Completed' ? 'Pending' : 'Completed';
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.taskCard}>
        <Text style={styles.label}>TASK DETAILS</Text>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.subject}>{task.subject}</Text>
        <Text style={styles.due}>Due: {task.due}</Text>
      </View>
      <View style={styles.detailsCard}>
        <Text style={styles.detailTitle}>Description</Text>
        <Text style={styles.description}>{task.description}</Text>
        <Text style={styles.detailTitle}>Status</Text>
        <Text style={styles.status}>{status}</Text>
        <Pressable onPress={() => setstatus(nextStatus)} 
        style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
          <Text style={styles.actionText}>Mark as {nextStatus}</Text>
        </Pressable>
        <Pressable onPress={() => router.back()} 
        style={styles.back}>
          <Text style={styles.backText}>Go Back</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    backgroundColor: theme.color.background, 
    alignItems: 'center', 
    gap: 18, 
    paddingVertical: 20 
  },
  taskCard: { 
    width: theme.spacing.standard, 
    backgroundColor: '#468ae2', 
    borderRadius: 4, 
    padding: 22, 
    gap: 8, 
    elevation: 5 
  },
  label: { 
    color: '#b3d3ff',
    fontWeight: '700', 
    fontSize: 12 
  }, 
  title: { 
    color: theme.color.primary, 
    fontSize: 24, 
    fontWeight: 'bold' 
  }, 
  subject: { 
    color: theme.color.primary, 
    fontSize: 14, 
    fontWeight: '600' 
  }, 
  due: { 
    color: '#dcecff', 
    fontSize: 13 
  },
  detailsCard: { 
    width: theme.spacing.standard, 
    backgroundColor: theme.color.primary, 
    borderRadius: 4, 
    padding: 20, 
    gap: 10, 
    elevation: 4 
  }, 
  detailTitle: 
  { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: theme.color.buttonContent 
  }, 
  description: { 
    fontSize: 14, 
    lineHeight: 20, 
    color: '#423d3d' 
  }, 
  status: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  action: { 
    alignItems: 'center', 
    borderRadius: 4, 
    backgroundColor: theme.color.buttonContent, 
    padding: 13, 
    marginTop: 6 
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
  pressed: { 
    opacity: 0.7 
  },
  emptyCont: { 
    flex: 1, 
    backgroundColor: theme.color.background, 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 30, gap: 12 
  }, 
  emptyTitle: { 
    fontSize: 24, 
    fontWeight: 'bold' 
  }, 
  emptyText: { 
    textAlign: 'center', 
    color: '#6d6d6d' 
  },
});
