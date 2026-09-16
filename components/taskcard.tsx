import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/app/(tabs)/theme';
import { tasktype } from './taskdata';

type taskcardProps = {
  task: tasktype;
  onPress: () => void;
};

export default function Taskcard({ task, onPress }: taskcardProps) {
  return (
    <Pressable onPress={onPress} 
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.top}>
        <Text style={styles.title}>
            {task.title}
        </Text>
        <Text style={[styles.status, task.status === 'Completed' ? styles.completed : styles.pending]}>
            {task.status}
        </Text>
      </View>
      <Text style={styles.subject}>{task.subject}</Text>
      <Text style={styles.due}>Due: {task.due}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: 
    theme.color.primary, 
    borderRadius: 4, 
    padding: 16,
    gap: 6, 
    elevation: 3 
},
  pressed: { 
    opacity: 0.7 
},
  top: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    justifyContent: 'space-between', 
    gap: 8 
},
  title: { 
    flex: 1, 
    fontSize: 16, 
    fontWeight: 'bold' 
},
  subject: { 
    color: theme.color.buttonContent, 
    fontSize: 13, 
    fontWeight: '600' 
},
  due: {
    color: '#6d6d6d', 
    fontSize: 12 
},
  status: { 
    borderRadius: 100, 
    paddingHorizontal: 9, 
    paddingVertical: 4, 
    fontSize: 10, 
    fontWeight: 'bold' 
},
  pending: { 
    backgroundColor: '#fff0c2', 
    color: '#885b00' 
},
  completed: {
    backgroundColor: '#d8f3dc', color: '#24733a' },
});
