import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the Job type
export type Job = {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string;
  workModel: string;
};

// Define the parameters for each screen in the navigation stack
export type RootStackParamList = {
  JobFinder: undefined; // No parameters for JobFinder
  SavedJobs: undefined; // No parameters for SavedJobs
  ApplicationForm: { job: Job }; // ApplicationForm expects a job parameter
};

// Define navigation prop types for each screen
export type JobFinderScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'JobFinder'>;
export type SavedJobsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SavedJobs'>;
export type ApplicationFormScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ApplicationForm'>;