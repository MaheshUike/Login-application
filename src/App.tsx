

import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/login';
import SignUp from './components/signup';
import Welcome from './components/welcome';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

function App() {
  const signUpFormData = useSelector((state: RootState) => state.form.formData);
  const [currentView, setCurrentView] = useState('login'); 
  // useEffect(() => {
  //   if (signUpFormData.email && signUpFormData.password) {
  //     setCurrentView('welcome');
  //   }
  // }, [signUpFormData]);

  const handleSignUpSuccess = () => {
    setCurrentView('login');
  };

  const renderComponent = () => {
    switch (currentView) {
      case 'signup':
        return <SignUp onNavigate={setCurrentView} onSignUpSuccess={handleSignUpSuccess} />;
      case 'welcome':
        return <Welcome />;
      case 'login':
      default:
        return <Login onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="App">
      {renderComponent()}
    </div>
  );
}

export default App;
