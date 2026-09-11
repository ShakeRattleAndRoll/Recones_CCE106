import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { theme } from '../(tabs)/theme';

const courses = {
  'cce-106': {
    code: 'CCE 106',
    name: 'APPLICATION DEVELOPMENT AND EMERGING TECHNOLOGIES',
    units: '3 Units',
    instructor: 'TBA',
    schedule: 'First Semester',
  },
  'it-11': {
    code: 'IT 11',
    name: 'NETWORKING 2',
    units: '3 Units',
    instructor: 'TBA',
    schedule: 'First Semester',
  },
  'it-12': {
    code: 'IT 12',
    name: 'SYSTEMS INTEGRATION & ARCHITECTURE',
    units: '3 Units',
    instructor: 'TBA',
    schedule: 'First Semester',
  },
  'it-17': {
    code: 'IT 17',
    name: 'SOCIAL AND PROFESSIONAL ISSUES',
    units: '3 Units',
    instructor: 'TBA',
    schedule: 'First Semester',
  },
} as const;

export default function course() {
  const { id } = useLocalSearchParams<{ id: keyof typeof courses }>();
  const selectedCourse = courses[id] ?? courses['cce-106'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.courseCard}>
        <Text style={styles.label}>COURSE</Text>
        <Text style={styles.code}>{selectedCourse.code}</Text>
        <Text style={styles.name}>{selectedCourse.name}</Text>
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.title}>Course Information</Text>
        <Detail label="Units" value={selectedCourse.units} />
        <Detail label="Instructor" value={selectedCourse.instructor} />
        <Detail label="Term" value={selectedCourse.schedule} />
      </View>
    </ScrollView>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detail}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.color.background,
    alignItems: 'center',
    gap: 18,
    paddingVertical: 20,
  },
  courseCard: {
    width: theme.spacing.standard,
    backgroundColor: '#468ae2',
    borderRadius: 4,
    padding: 22,
    gap: 8,
    elevation: 5,
  },
  label: {
    color: '#b3d3ff',
    fontWeight: '700',
    fontSize: 12,
  },
  code: {
    color: theme.color.primary,
    fontSize: 30,
    fontWeight: 'bold',
  },
  name: {
    color: theme.color.primary,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  detailsCard: {
    width: theme.spacing.standard,
    backgroundColor: theme.color.primary,
    borderRadius: 4,
    padding: 20,
    gap: 12,
    elevation: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  detail: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dedede',
    paddingBottom: 10,
    gap: 3,
  },
  detailLabel: {
    color: '#8e8d8d',
    fontSize: 12,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
  },
});