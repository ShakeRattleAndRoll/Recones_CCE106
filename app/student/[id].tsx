import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { theme } from '../(tabs)/theme';

export default function Student() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.studentCard}>
        <Text style={styles.label}>STUDENT</Text>
        <Text style={styles.name}>Kenneth R. Recones</Text>
        <Text style={styles.id}>Student ID: {id ?? '146983'}</Text>
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.title}>Student Record</Text>
        <Detail label="Program" value="Bachelor of Sciences in Information Technology" />
        <Detail label="Department" value="Department of Computing Education" />
        <Detail label="Academic Year" value="2026-2027" />
        <Detail label="Status" value="Currently enrolled" />
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
  studentCard: {
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
  name: {
    color: theme.color.primary,
    fontSize: 25,
    fontWeight: 'bold',
  },
  id: {
    alignSelf: 'flex-start',
    backgroundColor: theme.color.button,
    color: theme.color.buttonContent,
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
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
