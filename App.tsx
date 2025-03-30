import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobFinderScreen from './assets/screens/JobFinderScreen';
import ApplicationFormScreen from './assets/screens/ApplicationFormScreen';
import SavedJobsScreen from './assets/screens/SavedJobsScreen'; // Import the Saved Jobs screen
import { RootStackParamList } from './assets/types/navigation';
import { JobProvider } from './assets/context/JobContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <JobProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="JobFinder" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="JobFinder" component={JobFinderScreen} />
          <Stack.Screen name="ApplicationForm" component={ApplicationFormScreen} />
          <Stack.Screen name="SavedJobs" component={SavedJobsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </JobProvider>
  );
}
