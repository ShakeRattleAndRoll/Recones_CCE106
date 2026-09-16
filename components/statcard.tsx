import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@/app/(tabs)/theme';

type statcardProps = {
  label: string;
  value: string;
};

export default function Statcard({ label, value }: statcardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: theme.color.primary, borderRadius: 4, padding: 12, elevation: 3, gap: 3 },
  value: { fontSize: 22, fontWeight: 'bold', color: theme.color.buttonContent },
  label: { fontSize: 11, color: '#6d6d6d' },
});
