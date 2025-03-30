import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useJobContext } from '../context/JobContext';

type ApplicationFormScreenProps = NativeStackScreenProps<RootStackParamList, 'ApplicationForm'>;

const ApplicationFormScreen: React.FC<ApplicationFormScreenProps> = ({ route, navigation }) => {
  const { job } = route.params || {}; // Ensure job is defined
  const { darkMode } = useJobContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [whyHireYou, setWhyHireYou] = useState('');

  useEffect(() => {
    if (job) {
      console.log('Received job data:', job);
    }
  }, [job]);

  const handleSubmit = () => {
    Alert.alert('Application Submitted', 'Thank you for applying!');
    setName('');
    setEmail('');
    setContactNumber('');
    setWhyHireYou('');
    navigation.navigate('JobFinder');
  };

  if (!job) {
    return (
      <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
        <Text style={[styles.errorText, darkMode && styles.darkText]}>No job data available.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={[styles.header, darkMode && styles.darkHeader]}>
        <Text style={[styles.headerText, darkMode && styles.darkText]}>Application Form</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={[styles.jobTitle, darkMode && styles.darkText]}>
          Applying for: <Text style={styles.jobTitleBold}>{job.title}</Text>
        </Text>
        <TextInput
          style={[styles.input, darkMode && styles.darkInput]}
          placeholder="Name"
          placeholderTextColor={darkMode ? "#bbb" : "#666"}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, darkMode && styles.darkInput]}
          placeholder="Email"
          placeholderTextColor={darkMode ? "#bbb" : "#666"}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, darkMode && styles.darkInput]}
          placeholder="Contact Number"
          placeholderTextColor={darkMode ? "#bbb" : "#666"}
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
        />
        <TextInput
          style={[styles.input, styles.textArea, darkMode && styles.darkInput]}
          placeholder="Why should we hire you?"
          placeholderTextColor={darkMode ? "#bbb" : "#666"}
          value={whyHireYou}
          onChangeText={setWhyHireYou}
          multiline
          textAlignVertical="top"
        />
        <Button title="Submit" onPress={handleSubmit} />
        <View style={styles.footer}>
          <Button title="Back to Jobs" onPress={() => navigation.navigate('JobFinder')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  header: {
    padding: 15,
    backgroundColor: 'white',
    alignItems: 'center',
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
    color: '#000',
  },
  darkText: {
    color: 'white',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  jobTitle: {
    fontSize: 20,
    marginBottom: 16,
    color: '#333',
  },
  jobTitleBold: {
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    color: '#000',
  },
  textArea: {
    height: 100, // Increased height for better visibility
    textAlignVertical: 'top',
  },
  darkInput: {
    backgroundColor: '#333',
    color: 'white',
    borderColor: '#555',
  },
  footer: {
    padding: 20,
  },
});

export default ApplicationFormScreen;