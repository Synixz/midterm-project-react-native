import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJobContext } from '../context/JobContext';
import { JobFinderScreenNavigationProp, Job } from '../types/navigation';

type JobFinderScreenProps = {
  navigation: JobFinderScreenNavigationProp;
};

const JobFinderScreen: React.FC<JobFinderScreenProps> = ({ navigation }) => {
  const { jobs, fetchJobs, saveJob, darkMode, toggleDarkMode } = useJobContext();

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleSaveJob = (job: Job) => {
    saveJob(job);
    Alert.alert('Job Saved', 'The job has been saved successfully.', [{ text: 'OK' }]);
  };

  const renderItem = ({ item }: { item: Job }) => (
    <View style={[styles.jobItem, darkMode && styles.darkJobItem]}>
      <Image source={{ uri: item.companyLogo }} style={styles.logo} />
      <Text style={[styles.title, darkMode && styles.darkText]}>{item.title}</Text>
      <Text style={[styles.company, darkMode && styles.darkText]}>{item.companyName}</Text>
      <Text style={[styles.workModel, darkMode && styles.darkText]}>{item.workModel}</Text>
      <Button title="Save Job" onPress={() => handleSaveJob(item)} />
      <Button title="Apply" onPress={() => navigation.navigate('ApplicationForm', { job: item })} />
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, darkMode ? styles.darkContainer : styles.lightContainer]} edges={['top', 'left', 'right']}>
      {/* Custom Header with Dark Mode Toggle and Saved Jobs Button */}
      <View style={[styles.customHeader, darkMode && styles.darkHeader]}>
        <Text style={[styles.headerText, darkMode && styles.darkText]}>Job Finder</Text>
        <View>
          <TouchableOpacity onPress={toggleDarkMode} style={styles.toggleButton}>
            <Text style={styles.toggleButtonText}>{darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SavedJobs')} style={styles.savedJobsButton}>
            <Text style={[styles.savedJobsButtonText, styles.centerText]}>Saved Jobs</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Job List */}
      <FlatList data={jobs} keyExtractor={(item) => item.id} renderItem={renderItem} />
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
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5, // Adjust this value to fine-tune header gap
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  darkHeader: {
    backgroundColor: '#333',
    borderBottomColor: '#555',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  darkText: {
    color: 'white',
  },
  toggleButton: {
    backgroundColor: '#555',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginBottom: 5,
  },
  toggleButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  savedJobsButton: {
    backgroundColor: '#555',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  savedJobsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  centerText: {
    textAlign: 'center',
  },
  jobItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  darkJobItem: {
    backgroundColor: '#333',
    borderColor: '#555',
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 16,
    color: 'gray',
  },
  workModel: {
    fontSize: 14,
    color: 'blue',
  },
});

export default JobFinderScreen;
