import { ThemedText } from '@/components/themed-text';
import { Linking, Pressable, ScrollView, StyleSheet, View, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

// kung di makita ang icons shesh
// npm install react-native-vector-icons 

// Naka focus po ko sa dark mode sir

export default function HomeScreen() {
  const colorScheme = useColorScheme(); 
  const iconColor = colorScheme === 'dark' ? '#FFFFFF' : '#000000';
  return (
    <ScrollView style={styles.Container} contentContainerStyle={styles.ContainerSpacing}>
      <View style={styles.ProfileContainer}>
        <View style={{borderColor: 'lightgreen' ,borderLeftWidth: 50, borderRightWidth: 50}}>
          <ThemedText style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center',}}>
              Profile Introduction
          </ThemedText>        
        </View>
          <View style={styles.TextContainerLine}>
            <ThemedText style={styles.InfoTextCategory}>  Personal Details</ThemedText>
            <ThemedText style={styles.InfoText}>Name: Kenneth R. Recones</ThemedText>
            <ThemedText style={styles.InfoText}>College: University of Mindanao - Tagum Branch</ThemedText>
            <ThemedText style={styles.InfoText}>Course: Bachelor of Science in Information Technology</ThemedText>
            <ThemedText style={styles.InfoText}>Year Level: 3rd Year</ThemedText>
            <ThemedText style={styles.InfoText}>Course Subject: CCE 106</ThemedText>
          </View>
          
          <View style={styles.TextContainerLine}>
            <ThemedText style={styles.InfoTextCategory}>  About this App</ThemedText>
            <ThemedText style={styles.InfoText}>For Profile Introduction Project</ThemedText>
            <ThemedText style={styles.InfoText}>Design inspired by CMD, VSC</ThemedText>
          </View>

          <View style={styles.TextContainerLine}>
            <ThemedText style={styles.InfoTextCategory}>  App Idea</ThemedText>
            <ThemedText style={styles.InfoText}>1. Schedule/Calendar</ThemedText>
            <ThemedText style={styles.InfoText}>2. Notepad</ThemedText>
            <ThemedText style={styles.InfoText}>3. Personal Info App</ThemedText>
            <ThemedText style={styles.InfoText}>4. Combine all of what i mention</ThemedText>
          </View>
          
          <View style={styles.TextContainerLine}>
            <ThemedText style={styles.InfoTextCategory}>  Socials & Contact Details</ThemedText>
            <Pressable onPress={() => Linking.openURL('https://www.facebook.com/kenneth.recones')}>
              <View style={styles.IconWithTextCont}>
                <Icon name="facebook" size={30} color={iconColor}></Icon>
                <ThemedText style={[styles.InfoText]}> Kenneth Rapanan Recones </ThemedText>
              </View>
            </Pressable>
            <Pressable onPress={() => Linking.openURL('https://github.com/ShakeRattleAndRoll')}>
              <View style={styles.IconWithTextCont}>
                <Icon name="github" size={30} color={iconColor}></Icon>
                <ThemedText style={[styles.InfoText]}> ShakeRattleAndRoll </ThemedText>
              </View>
            </Pressable>
            <Pressable onPress={() => Linking.openURL('mailto:k.recones.146983.tc@umindanao.edu.ph')}>
              <View style={styles.IconWithTextCont}>
                <Icon name="envelope" size={30} color={iconColor} solid></Icon>
                <ThemedText style={[styles.InfoText]}> k.recones.146983.tc@umindanao.edu.ph </ThemedText>
              </View>
            </Pressable>
          </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  ContainerSpacing: {
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  InfoTextCategory: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
    borderLeftWidth: 4,
    borderRightWidth: 100,
    borderColor: 'lightgreen',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  InfoText: {
    fontSize: 13,
    alignItems: 'center',
  },
  TextContainerLine: {
  borderTopColor: 'lightgreen', 
  borderTopWidth: 0.5, 
  paddingTop: 15,
  },
  ProfileContainer: {
    gap: 20,
    marginTop: 30,
  },
  ProfilePic: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  IconWithTextCont: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10,
    marginTop: 5
  },
});
