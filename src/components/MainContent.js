// src/components/MainContent.js

import React from 'react';
import '../styles/GlobalStyles.css';
import { Link } from 'react-router-dom';
import GlobeComponent from './GlobeComponent';

const boxesData = [
  { title: "Profile", description: "" },
  { title: "LinkedIn", description: "" },
  { title: "GitHub", description: "" },
  { title: "Resume", description: "" },           // Project 1 → Resume
  { title: "About Me", description: "" },         // Project 2 → About Me
  { title: "Project 3", description: "" },
  { title: "Live Map", description: "" },
  { title: "Switch", description: "" },
  { title: "Skills", description: "" },           // Project 4 → Skills
  { title: "Projects Live Demo", description: "" } // Project 5 → Live Demo
];

const MainContent = ({ darkMode, toggleDarkMode }) => {
  const column1 = boxesData.slice(0, Math.ceil(boxesData.length / 2));
  const column2 = boxesData.slice(Math.ceil(boxesData.length / 2));

  // LinkedIn tilt handlers
  const handleTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateY = mouseX * 0.15;
    const rotateX = -mouseY * 0.15;

    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const resetTilt = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <>
      <input
        type="checkbox"
        id="switch"
        checked={darkMode}
        onChange={toggleDarkMode}
      />

      <div className="app">
        <div className="body">
          <div className="main-circle"></div>

          <div className="king">
            <div className="main-grid">
              <div className="column">

                {/* Profile card */}
                <Link
                  to="/profile"
                  style={{ textDecoration: 'none', color: 'inherit', display: 'contents' }}
                >
                  <div className="box box-max" style={{ cursor: 'pointer' }}>
                    <div className="imacard-image-container">
                      <img
                        src="/king1.jpg"
                        alt="Kuldeep Singh"
                        className="imacard-image"
                      />
                    </div>
                  </div>
                </Link>

                <div className="box-row">
                  {/* LinkedIn with tilt effect */}
                  <div
                    className="box-half linkedin"
                    onClick={() => window.open('https://www.linkedin.com/in/kuldeepsingh0028/', '_blank')}
                    onMouseMove={handleTilt}
                    onMouseLeave={resetTilt}
                  >
                    <video className="video-background" autoPlay loop muted playsInline>
                      <source src="/v.mp4" type="video/mp4" />
                    </video>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      style={{ width: '50px', height: '50px', marginRight: '10px' }}
                    >
                      <path
                        d="M100.28 448H7.4V148.9h92.88zm-46.44-340a53.72 
                        53.72 0 11.42 107.44A53.72 53.72 0 0153.84 
                        108zM447.9 448h-92.4V302.4c0-34.7-12.4-58.4-43.4-58.4-23.7 
                        0-37.8 15.9-44 31.3-2.3 5.6-2.8 13.3-2.8 
                        21.1V448h-92.4s1.2-241 0-266.1h92.4v37.7c-.2.3-.5.7-.7 
                        1h.7v-1c12.3-19 34.3-46.2 
                        83.5-46.2 61 0 106.7 39.8 106.7 
                        125.3V448z"
                        fill="#0077b5"
                        className="linkedin-logo"
                      />
                    </svg>
                    <div className="linkedin-text">LinkedIn</div>
                  </div>

                  {/* GitHub */}
                  <div
                    className="box-half github"
                    onClick={() => window.open('https://github.com/KingStarKS', '_blank')}
                  >
                    <div className="video-background">
                      <video autoPlay loop muted playsInline>
                        <source src="/n.mp4" type="video/mp4" />
                      </video>
                    </div>
                    <svg
                      className="github-logo"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="white"
                        d="M12 0C5.37 0 0 5.37 0 12c0 5.3 
                        3.438 9.8 8.207 11.387.6.113.793-.26.793-.577 
                        0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 
                        1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.81 
                        1.304 3.495.997.107-.775.42-1.305.763-1.605-2.665-.3-5.467-1.332-5.467-5.93 
                        0-1.31.47-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 
                        0 0 1.008-.322 3.3 1.23a11.49 11.49 0 013-.404c1.02.005 2.045.137 
                        3 .404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 
                        3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 
                        5.625-5.48 5.92.43.37.823 1.102.823 2.222 
                        0 1.606-.014 2.898-.014 3.293 0 .32.192.694.8.576C20.565 
                        21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"
                      />
                    </svg>
                    <div className="github-text">GitHub</div>
                  </div>
                </div>

                {/* Resume */}
                <div className="box">
                  <h3>{column1[3].title}</h3>
                  <button onClick={() => window.open('/Resume.pdf', '_blank')}>
                    View Resume
                  </button>
                </div>

                {/* About Me */}
                <div className="box box-max">
                  <h3>{column1[4].title}</h3>
                  <Link to="/about">About Me</Link>
                </div>
              </div>

              <div className="column">
                {/* Projects Live Demo */}
                <div className="box box-max">
                  <h3>{column2[4].title}</h3>
                  <button onClick={() => window.open('https://yourlivedemo.com', '_blank')}>
                    See Live Demo
                  </button>
                </div>
<Link to="/skills" className="box-link">
  <div className="boxl">
  

    <div className="terminal-loader">
      <div className="terminal-header">
        <div className="terminal-title">Status</div>
        <div className="terminal-controls">
          <div className="control close"></div>
          <div className="control minimize"></div>
          <div className="control maximize"></div>
        </div>
      </div>
      <div className="text">SKILLS...</div>
    </div>
  </div>
</Link>




                <div className="box-row">
                  <div
                    className="box-half maps"
                    onDoubleClick={() => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                          (position) => {
                            const url = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
                            window.open(url, '_blank');
                          },
                          () => alert('Unable to retrieve your location')
                        );
                      } else {
                        alert('Geolocation is not supported by your browser');
                      }
                    }}
                  >
                    <GlobeComponent
                      width="400"
                      height="400"
                      markers={[
                        { lat: 43.7315, lng: -79.7624, label: 'Brampton' },
                        { lat: 31.6340, lng: 74.8723, label: 'Amritsar' },
                      ]}
                    />
                  </div>

                  {/* Switch */}
                  <div className="box-half">
                    <div className="phone">
                      <div className="content">
                        <div className="circle">
                          <div className="crescent"></div>
                        </div>
                        <label htmlFor="switch">
                          <div className="toggle"></div>
                          <div className="names">
                            <p className="light">Light</p>
                            <p className="dark">Dark</p>
                          </div>
                        </label>
                        <div className="mark"></div>
                      </div>
                    </div>
                  </div>
                </div>

              
                <div className="box box-max">
                  <h3>{column2[0].title}</h3>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default MainContent;
