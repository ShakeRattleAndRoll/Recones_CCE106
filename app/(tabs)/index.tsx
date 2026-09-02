import { ThemedText } from '@/components/themed-text';
import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, TextInput, View, } from 'react-native';

interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Submit CCE106 Activity 1', dueDate: '2026-09-05', completed: false },
    { id: '2', title: 'Study React Native Hooks', dueDate: '2026-09-07', completed: true },
  ]);
  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAddTask = () => {
    if (!taskTitle.trim() || !dueDate.trim()) {
      Alert.alert('Validation Error', 'Please enter both a task title and a due date.');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      dueDate: dueDate.trim(),
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setTaskTitle('');
    setDueDate('');
    Alert.alert('Success', 'Task added successfully!');
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const updatedState = !task.completed;
          Alert.alert(
            'Task Updated',
            `Task marked as ${updatedState ? 'completed' : 'pending'}.`
          );
          return { ...task, completed: updatedState };
        }
        return task;
      })
    );
  };

  const handleDeleteTask = (id: string) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setTasks((prev) => prev.filter((t) => t.id !== id));
        },
      },
    ]);
  };

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.profileContainer}>
        <View style={styles.avatarWrapper}>
          <Image
            source={require('@/assets/images/Skeleton-Gun.jpg')}
            style={styles.profilePicture}
          />
        </View>

        <View style={styles.textContainer}>
          <ThemedText style={styles.name} numberOfLines={1}>
            Kenneth R. Recones
          </ThemedText>
          <ThemedText style={styles.degree}>
            Bachelor of Science in Information Technology
          </ThemedText>
        </View>
      </View>

      <View style={styles.counterRow}>
        <View style={[styles.counterBadge, styles.pendingBadge]}>
          <ThemedText style={styles.counterText}>Pending: {pendingCount}</ThemedText>
        </View>
        <View style={[styles.counterBadge, styles.completedBadge]}>
          <ThemedText style={styles.counterText}>Completed: {completedCount}</ThemedText>
        </View>
      </View>

      <View style={styles.formContainer}>
        <ThemedText style={styles.sectionTitle}>Add New Task</ThemedText>
        <TextInput
          style={styles.textInput}
          placeholder="Task Title"
          value={taskTitle}
          onChangeText={setTaskTitle}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Due Date"
          value={dueDate}
          onChangeText={setDueDate}
        />
        <Pressable
          style={({ pressed }) => [styles.addButton, pressed && styles.pressedState]}
          onPress={handleAddTask}
        >
          <ThemedText style={styles.addButtonText}>Add Task</ThemedText>
        </Pressable>
      </View>

      <View style={styles.listContainer}>
        <ThemedText style={styles.sectionTitle}>Task List</ThemedText>
        {tasks.length === 0 ? (
          <ThemedText style={styles.emptyText}>No tasks added yet.</ThemedText>
        ) : (
          tasks.map((task) => (
            <View key={task.id} style={styles.taskCard}>
              <Pressable
                style={styles.taskInfo}
                onPress={() => handleToggleTask(task.id)}
              >
                <ThemedText
                  style={[
                    styles.taskTitle,
                    task.completed && styles.completedText,
                  ]}
                >
                  {task.completed ? '✓' : '○ '}
                  {task.title}
                </ThemedText>
                <ThemedText style={styles.taskDate}>Due: {task.dueDate}</ThemedText>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.deleteButton,
                  pressed && styles.pressedState,
                ]}
                onPress={() => handleDeleteTask(task.id)}
              >
                <ThemedText style={styles.deleteButtonText}>Delete</ThemedText>
              </Pressable>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 50,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#96da95',
    borderRadius: 12,
    borderWidth: 0.4,
    width: '100%',
  },
  avatarWrapper: {
    marginRight: 12,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    color: '#1a3e19',
    fontSize: 16,
    marginBottom: 4,
  },
  degree: {
    fontSize: 12,
    color: '#2d5a2c',
    flexWrap: 'wrap',
    lineHeight: 16,
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  counterBadge: {
    flex: 0.48,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 0.4,
  },
  pendingBadge: {
    backgroundColor: '#ffe0b2',
  },
  completedBadge: {
    backgroundColor: '#c8e6c9',
  },
  counterText: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 13,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    height: 42,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    width: '100%',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 10,
  },
  taskCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  taskDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  pressedState: {
    opacity: 0.6,
  },
});