import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Taskcard from '@/components/taskcard';
import { taskdata } from '@/components/taskdata';
import { theme } from './theme';

type filtertype = 'All' | 'Pending' | 'Completed';

export default function task() {
  const [filter, setfilter] = useState<filtertype>('All');
  const visibleTask = filter === 'All' ? taskdata : taskdata.filter((item) => item.status === filter);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>StudyFlow</Text>
        <Text style={styles.title}>Tasks</Text>
        <Text style={styles.subTitle}>Keep track of your course activities</Text>
      </View>
      <View style={styles.filterCont}>
        {(['All', 'Pending', 'Completed'] as filtertype[]).map((item) => (
          <Pressable key={item} 
            onPress={() => setfilter(item)} 
            style={[styles.filter, filter === item && styles.activeFilter]}>
            <Text style={[styles.filterText, filter === item && styles.activeFilterText]}>
                {item}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.taskCont}>
        {visibleTask.map((item) => <Taskcard key={item.id} task={item} onPress={() => router.push({ pathname: '/task/[id]', params: { id: item.id } })} />)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    backgroundColor: 
    theme.color.background, 
    alignItems: 'center', 
    gap: 16, 
    paddingVertical: 20 
},
  header: { 
    width: theme.spacing.standard, 
    gap: 4 
},
  appTitle: { 
    fontSize: 12, 
    fontWeight: '700', 
    textTransform: 'uppercase', 
    color: theme.color.buttonContent 
},
  title: { 
    fontSize: 26, 
    fontWeight: 'bold' 
}, 
subTitle: 
{ fontSize: 13, 
    color: '#6d6d6d' 
},
  filterCont: { 
    width: theme.spacing.standard, 
    flexDirection: 'row', 
    gap: 8 
},
  filter: { 
    flex: 1, 
    alignItems: 'center', 
    borderRadius: 4, 
    backgroundColor: theme.color.primary, 
    paddingVertical: 10 
},
  activeFilter: { 
    backgroundColor: theme.color.buttonContent 
},
  filterText: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    color: theme.color.buttonContent 
}, 
activeFilterText: { 
    color: theme.color.primary 
},
  taskCont: { 
    width: theme.spacing.standard, 
    gap: 10 
},
});
