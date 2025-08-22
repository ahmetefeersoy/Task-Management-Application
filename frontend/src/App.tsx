import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TasksPage from './pages/TasksPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'login' | 'register'>('login');
  const token = useSelector((state: RootState) => state.auth.token);

  // Check if user is already logged in on app start
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const switchToRegister = () => {
    setCurrentView('register');
  };

  const switchToLogin = () => {
    setCurrentView('login');
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <TasksPage onLogout={handleLogout} />
      ) : (
        <>
          {currentView === 'login' ? (
            <LoginPage 
              onLogin={handleLogin} 
              onSwitchToRegister={switchToRegister}
            />
          ) : (
            <RegisterPage 
              onRegister={handleRegister}
              onSwitchToLogin={switchToLogin}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
