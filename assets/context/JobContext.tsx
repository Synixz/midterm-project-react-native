import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import axios from 'axios';
import uuid from 'react-native-uuid';

let apiUrl = 'https://empllo.com/api/v1';

export interface Job {
    id: string;
    title: string;
    companyName: string;
    companyLogo: string;
    workModel: string;
}

interface JobContextType {
  jobs: Job[];
  savedJobs: Job[];
  fetchJobs: () => Promise<void>;
  saveJob: (job: Job) => void;
  removeJob: (jobId: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const systemTheme = useColorScheme(); // Get system theme
  const [darkMode, setDarkMode] = useState(systemTheme === 'dark'); // Store dark mode state

  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(apiUrl);
      if (response.data && Array.isArray(response.data.jobs)) {
        const jobsWithId = response.data.jobs.map((job: any) => ({
          id: uuid.v4().toString(),
          title: job.title || 'No Title',
          companyName: job.companyName || 'Unknown Company',
          workModel: job.workModel || 'Unknown',
          companyLogo: job.companyLogo || '',
        }));
        setJobs(jobsWithId);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const saveJob = (job: Job) => {
    setSavedJobs((prevJobs) => [...prevJobs, job]);
  };

  const removeJob = (jobId: string) => {
    setSavedJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <JobContext.Provider value={{ jobs, savedJobs, fetchJobs, saveJob, removeJob, darkMode, toggleDarkMode }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
};
