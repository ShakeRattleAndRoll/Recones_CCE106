import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Taskcard from '@/components/taskcard';
import { taskdata } from '@/components/taskdata';
import { theme } from '../(tabs)/theme';

const coursedata = {
  'cce-106': { code: 'CCE 106', name: 'APPLICATION DEVELOPMENT AND EMERGING TECHNOLOGIES' },
  'it-11': { code: 'IT 11', name: 'NETWORKING 2' },
  'it-12': { code: 'IT 12', name: 'SYSTEMS INTEGRATION & ARCHITECTURE' },
  'it-17': { code: 'IT 17', name: 'SOCIAL AND PROFESSIONAL ISSUES' },
} as const;

export default function course() {
  const { id } = useLocalSearchParams<{ id: keyof typeof coursedata }>();
  const selectedCourse = coursedata[id];
  const courseTask = selectedCourse ? taskdata.filter((item) => item.subject === selectedCourse.code) : [];

  if (!selectedCourse) {
    return <View style={styles.empty}><Text style={styles.emptyText}>Course not found</Text><Pressable onPress={() => router.back()} style={styles.back}><Text style={styles.backText}>Go Back</Text></Pressable></View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.courseCard}><Text style={styles.label}>{selectedCourse.code}</Text><Text style={styles.name}>{selectedCourse.name}</Text><Text style={styles.count}>{courseTask.length} task{courseTask.length === 1 ? '' : 's'} for this course</Text></View>
      <View style={styles.taskCont}>{courseTask.map((item) => <Taskcard key={item.id} task={item} onPress={() => router.push({ pathname: '/task/[id]', params: { id: item.id } })} />)}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: theme.color.background, alignItems: 'center', gap: 18, paddingVertical: 20 },
  courseCard: { width: theme.spacing.standard, backgroundColor: '#468ae2', borderRadius: 4, padding: 20, gap: 7, elevation: 5 },
  label: { color: '#b3d3ff', fontSize: 13, fontWeight: 'bold' },
  name: { color: theme.color.primary, fontSize: 17, fontWeight: 'bold', lineHeight: 23 },
  count: { color: '#dcecff', fontSize: 12 },
  taskCont: { width: theme.spacing.standard, gap: 10 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, backgroundColor: theme.color.background },
  emptyText: { fontSize: 20, fontWeight: 'bold' }, back: { backgroundColor: theme.color.buttonContent, borderRadius: 4, padding: 12 }, backText: { color: theme.color.primary, fontWeight: 'bold' },
});
