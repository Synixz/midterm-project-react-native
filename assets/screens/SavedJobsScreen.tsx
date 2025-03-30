import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJobContext } from '../context/JobContext';
import { JobFinderScreenNavigationProp, Job } from '../types/navigation';

type SavedJobsScreenProps = {
  navigation: JobFinderScreenNavigationProp;
};

const SavedJobsScreen: React.FC<SavedJobsScreenProps> = ({ navigation }) => {
  const { savedJobs, removeJob, darkMode } = useJobContext();

  const renderItem = ({ item }: { item: Job }) => (
    <View style={[styles.jobItem, darkMode && styles.darkJobItem]}>
      <Text style={[styles.title, darkMode && styles.darkText]}>{item.title}</Text>
      <Text style={[styles.company, darkMode && styles.darkText]}>{item.companyName}</Text>
      <Button title="Apply" onPress={() => navigation.navigate('ApplicationForm', { job: item })} />
      <Button title="Remove" onPress={() => removeJob(item.id)} color="red" />
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, darkMode ? styles.darkContainer : styles.lightContainer]} edges={['top', 'left', 'right']}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <Text style={[styles.header, darkMode && styles.darkText]}>Saved Jobs</Text>
        <FlatList data={savedJobs} keyExtractor={(item) => item.id} renderItem={renderItem} />
        <Button title="Back to Jobs" onPress={() => navigation.navigate('JobFinder')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: 'white',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  darkText: {
    color: 'white',
  },
  jobItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  darkJobItem: {
    backgroundColor: '#333',
    borderColor: '#555',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 16,
    color: 'gray',
  },
});

export default SavedJobsScreen;