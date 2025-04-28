import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { LoginScreen } from './components/LoginScreen';
import { Navigation } from './components/Navigation';
import { HRAdminDashboard } from './pages/HRAdminDashboard';
import { EmployeeDashboard } from './pages/EmployeeDashboard';
import { ManagerDashboard } from './pages/ManagerDashboard';
import { EmployeesSection } from './pages/EmployeesSection';
import { JobsSection } from './pages/JobsSection';
import { MetricsSection } from './pages/MetricsSection';
import { ReviewsSection } from './pages/ReviewsSection';
import { SkillsSection } from './pages/SkillsSection';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  const renderContent = () => {
    // Dashboard pages
    if (activePage === 'dashboard') {
      switch (user.role) {
        case 'hr-admin':
          return <HRAdminDashboard />;
        case 'manager':
          return <ManagerDashboard />;
        case 'employee':
          return <EmployeeDashboard />;
        default:
          return null;
      }
    }

    // HR Admin sections
    if (user.role === 'hr-admin') {
      switch (activePage) {
        case 'employees':
          return <EmployeesSection />;
        case 'jobs':
          return <JobsSection />;
        case 'metrics':
          return <MetricsSection />;
      }
    }

    // Manager sections
    if (user.role === 'manager') {
      if (activePage === 'my-team') {
        return <ManagerDashboard />;
      }
      if (activePage === 'reviews') {
        return <ReviewsSection />;
      }
    }

    // Employee sections
    if (user.role === 'employee') {
      if (activePage === 'job-matches') {
        return <EmployeeDashboard />;
      }
      if (activePage === 'my-skills') {
        return <SkillsSection />;
      }
    }

    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">This section is under development.</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activePage={activePage} setActivePage={setActivePage} />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;