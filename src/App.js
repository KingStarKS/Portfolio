// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import Profile from './components/Profile';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Contact from './components/Contact'; // ✅ New import
import AboutMe from './components/AboutMe';

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      setDarkMode(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

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
        <Route path="/skills" element={<Skills darkMode={darkMode} />} />
        <Route path="/resume" element={<Resume darkMode={darkMode} />} />
        <Route path="/contact" element={<Contact darkMode={darkMode} />} /> {/* ✅ New route */}
        <Route path="/about" element={<AboutMe darkMode={darkMode} />} /> {/* ✅ New route */}
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
