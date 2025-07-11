// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import Profile from './components/Profile';

// This handles routing and dark mode globally
function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  // Load darkMode state from localStorage when the app loads
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      setDarkMode(JSON.parse(saved));
    }
  }, []);

  // Save darkMode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Handler to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <>
      <GlobalStyles />
      <Navbar darkMode={darkMode} />
      <Routes>
        <Route
          path="/"
          element={<MainContent darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
        />
        <Route path="/profile" element={<Profile darkMode={darkMode} />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
