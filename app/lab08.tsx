import React, { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { theme } from './theme';

type AttendanceStatus = 'present' | 'absent' | null;
type Student = { id: string; name: string; status: AttendanceStatus };

const initialStudents: Student[] = [{ id: 'kenneth-recones', name: 'Kenneth R. Recones', status: null }];

export default function Lab08Screen() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [studentName, setStudentName] = useState('');
  const { present, absent } = useMemo(() => ({
    present: students.filter((student) => student.status === 'present').length,
    absent: students.filter((student) => student.status === 'absent').length,
  }), [students]);

  function setAttendance(studentId: string, status: Exclude<AttendanceStatus, null>) {
    setStudents((current) => current.map((student) => student.id === studentId && student.status !== status ? { ...student, status } : student));
  }

  function deleteStudent(studentId: string) {
    setStudents((current) => current.filter((student) => student.id !== studentId));
  }

  function addStudent() {
    const name = studentName.trim();
    if (!name) return;
    if (students.some((student) => student.name.toLocaleLowerCase() === name.toLocaleLowerCase())) {
      Alert.alert('Student already added', `${name} is already on this attendance list.`);
      return;
    }
    setStudents((current) => [...current, { id: `${Date.now()}-${name}`, name, status: null }]);
    setStudentName('');
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.appTitle}>Student Attendance</Text>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
      </View>
      <View style={styles.attendanceCont}>
        <AttendanceCount label="Present" count={present} color="#97e272" />
        <AttendanceCount label="Absent" count={absent} color="#ef6a6a" />
      </View>
      <View style={styles.addStudentRow}>
        <TextInput value={studentName} 
        onChangeText={setStudentName} 
        onSubmitEditing={addStudent} 
        placeholder="Enter student name" style={styles.studentInput} returnKeyType="done" />
        <Pressable onPress={addStudent} 
        style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
      <View style={styles.studentList}>
        {students.map((student) => (
          <View key={student.id} style={styles.studentCont}>
            <View style={styles.studentDetails}>
              <View style={styles.studentTopRow}>
                <Text numberOfLines={1} style={styles.studentName}>{student.name}</Text>
                <View style={styles.actions}>
                  <StatusButton label="P" selected={student.status === 'present'} 
                    color="#97e272" onPress={() => setAttendance(student.id, 'present')} />
                  <StatusButton label="A" selected={student.status === 'absent'} 
                    color="#ef6a6a" onPress={() => setAttendance(student.id, 'absent')} />
                  <Pressable accessibilityLabel={`Delete ${student.name}`} 
                    onPress={() => deleteStudent(student.id)} style={styles.deleteButton}>
                        <Text style={styles.deleteButtonText}>Delete</Text>
                   </Pressable>
                </View>
              </View>
              <Text style={styles.statusText}>{student.status ? student.status[0].toUpperCase() + student.status.slice(1) : 'Not marked'}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function AttendanceCount({ label, count, color }: { label: string; count: number; color: string }) {
  return <View style={[styles.countCard, { borderLeftColor: color }]}><Text style={styles.count}>{count}</Text><Text style={styles.countLabel}>{label}</Text></View>;
}

function StatusButton({ label, selected, color, onPress }: { label: string; selected: boolean; color: string; onPress: () => void }) {
  return <Pressable accessibilityState={{ selected, disabled: selected }} disabled={selected} onPress={onPress} style={[styles.statusButton, { backgroundColor: color }, selected && styles.selectedButton]}><Text style={styles.statusButtonText}>{label}</Text></Pressable>;
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    backgroundColor: theme.color.background, 
    padding: 20, 
    gap: 16 
},
  header: { 
    gap: 3 
}, 
appTitle: { 
    fontSize: 12, 
    fontWeight: '700', 
    textTransform: 'uppercase', 
    color: theme.color.buttonContent 
}, 
welcomeText: { 
    fontSize: 21, 
    fontWeight: 'bold', 
    textTransform: 'uppercase' 
},
  attendanceCont: { 
    flexDirection: 'row', 
    gap: 12 
}, 
countCard: { 
    flex: 1, 
    backgroundColor: theme.color.primary,
    minHeight: 88, 
    justifyContent: 'center', 
    paddingHorizontal: 16, 
    borderLeftWidth: 6,
    borderRadius: 8, 
    elevation: 3 }, 
count: { 
    fontSize: 30, 
    fontWeight: '700' 
}, 
countLabel: { 
    fontSize: 14, 
    marginTop: 2 
},
  addStudentRow: { 
    flexDirection: 'row', 
    gap: 8 
}, 
studentInput: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: '#b5b5b5', 
    borderRadius: 6, 
    backgroundColor: '#fff', 
    paddingHorizontal: 12, 
    paddingVertical: 10 
}, 
addButton: { 
    justifyContent: 'center',
    paddingHorizontal: 18, 
    backgroundColor: theme.color.primary, 
    borderRadius: 6 
}, 
addButtonText: { 
    fontWeight: '700' 
},
  studentList: { 
    gap: 10 
}, 
studentCont: { 
    backgroundColor: theme.color.primary, 
    borderRadius: 8, 
    padding: 12 
}, 
studentDetails: { 
    gap: 4 
}, 
studentTopRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8 
}, 
studentName: { 
    flex: 1, 
    fontSize: 16, 
    fontWeight: '700' 
}, 
statusText: { 
    fontSize: 13, 
    color: '#555' 
}, 
actions: { 
    flexDirection: 'row',
    gap: 6 
}, 
statusButton: { 
    alignItems: 'center', 
    paddingHorizontal: 8, 
    paddingVertical: 7, 
    borderRadius: 5 
}, 
selectedButton: { 
    opacity: 0.55 
}, 
statusButtonText: { 
    fontSize: 12, 
    fontWeight: '700' 
}, 
deleteButton: { 
    alignItems: 'center', 
    backgroundColor: '#d94c4c', 
    borderRadius: 5, 
    paddingHorizontal: 8, 
    paddingVertical: 7 
}, 
deleteButtonText: { 
    color: '#fff', 
    fontSize: 12, 
    fontWeight: '700' 
},
});
