import React from 'react';
import CoverLetter from './CoverLetter';

const Resume = () => {
  const handleDownload = () => {
    window.open('/Resume.pdf', '_blank');
  };

  return (
    <>
      <style>{`
        body {
          background: #ddd;
        }

        .pdf-page {
          width: 8.5in;
          min-height: 11in;
          margin: 2rem auto;
          padding: 1in;
          background: #fff;
          color: #000;
          font-family: 'Times New Roman', Times, serif;
          font-size: 12pt;
          line-height: 1.4;
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
          page-break-after: always;
        }

        .pdf-page:last-of-type {
          page-break-after: auto;
        }

        .header-box {
          display: flex;
          justify-content: space-between;
          background-color: #e6f2ff;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .name-block {
          display: flex;
          flex-direction: column;
        }

        .name-block h1,
        .name-block h2 {
          font-size: 30pt;
          margin: 0;
          font-weight: normal;
          color: #2d8cf0;
        }

        .contact-block {
          display: flex;
          align-items: flex-start;
        }

        .vertical-line {
          border-left: 1px solid #000;
          height: 100%;
          margin-right: 1rem;
        }

        .contact-info {
          font-size: 12pt;
          line-height: 1.4;
        }

        p {
          margin-top: 0;
          margin-bottom: 0.8em;
        }

        hr {
          border: none;
          border-top: 1px solid #000;
          margin: 1em 0;
        }

        h2 {
          font-weight: normal;
          margin-top: 0.6em;
          margin-bottom: 0.2em;
          color: #2d8cf0;
          font-size: 14pt;
        }

        .section-title {
          border-bottom: 1px solid #000;
          padding-bottom: 0.1em;
          margin-bottom: 0.3em;
        }

        .edu-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5em;
        }

        .edu-item strong {
          display: inline-block;
        }

        ul {
          margin-left: 1em;
          margin-top: 0;
          margin-bottom: 1em;
        }

        li {
          margin-bottom: 0.3em;
        }

        .button {
          --main-focus: #2d8cf0;
          --font-color: #000;
          --bg-color-sub: #ddd;
          --bg-color: #fff;
          --main-color: #000;
          position: relative;
          width: 160px;
          height: 45px;
          cursor: pointer;
          display: flex;
          align-items: center;
          border: 2px solid var(--main-color);
          box-shadow: 3px 3px var(--main-color);
          background-color: var(--bg-color);
          border-radius: 5px;
          overflow: hidden;
          transition: all 0.3s ease;
          font-weight: 600;
          color: var(--font-color);
          user-select: none;
          font-size: 12pt;
          margin: 2rem auto;
          justify-content: center;
        }

        .button__text {
          transition: all 0.3s ease;
        }

        .button__icon {
          position: absolute;
          right: 0;
          height: 100%;
          width: 39px;
          background-color: var(--bg-color-sub);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .svg {
          width: 20px;
          fill: var(--main-color);
        }

        .button:hover {
          background: var(--bg-color);
        }

        .button:hover .button__text {
          color: transparent;
        }

        .button:hover .button__icon {
          width: 100%;
          transform: translateX(-1%);
        }

        .button:active {
          transform: translate(2px, 2px);
          box-shadow: 0 0 var(--main-color);
        }

        @media print {
          .button {
            display: none;
          }
          body {
            background: none;
          }
          .pdf-page {
            box-shadow: none;
            margin: 0 auto;
          }
        }

        /* ✅ Responsive for tablets */
        @media (max-width: 768px) {
          .pdf-page {
            width: 100%;
            height: auto;
            margin: 0;
            padding: 1rem;
            box-shadow: none;
            border-radius: 0;
            font-size: 10pt;
          }

          .header-box {
            flex-direction: column;
            align-items: flex-start;
          }

          .contact-block {
            margin-top: 1rem;
          }
        }

        /* ✅ Extra responsive for phones */
        @media (max-width: 480px) {
          .pdf-page {
          margin-top:2rem;
            padding: 0.5rem;
            font-size: 9pt;
          }

          .name-block h1,
          .name-block h2 {
            font-size: 24pt;
          }

          h2 {
            font-size: 12pt;
          }

          .contact-info {
            font-size: 10pt;
          }
        }
      `}</style>

      {/* ✅ Cover Letter Page */}
      <div className="pdf-page">
        <CoverLetter />
      </div>

      {/* ✅ Resume Page */}
      <div className="pdf-page">
        <div className="header-box">
          <div className="name-block">
            <h1>Kuldeep</h1>
            <h2>Singh</h2>
          </div>
          <div className="contact-block">
            <div className="vertical-line"></div>
            <div className="contact-info">
              kuldeepsingh91051176@gmail.com<br />
              +1 437-766-6596<br />
              www.linkedin.com/in/kuldeepsingh0028<br />
              Ontario, Canada
            </div>
          </div>
        </div>

        <p>
          Motivated and adaptable developer with experience in JavaScript, React, and full-stack technologies.
          Proficient in building responsive web applications, implementing REST APIs, and working with various databases.
          Currently expanding my expertise in cybersecurity fundamentals and best practices to develop secure software solutions.
          Known for strong problem-solving skills, collaborative teamwork, and eagerness to learn new tools and methodologies.
        </p>

        <h2 className="section-title">Skills & Tools</h2>
        <ul>
          <li>JavaScript, React, Node.js</li>
          <li>Spring Boot, Java, Python, PHP</li>
          <li>HTML, CSS, CSS3</li>
          <li>MySQL, NoSQL</li>
          <li>RESTful APIs</li>
          <li>Git & GitHub</li>
          <li>Agile Methodologies</li>
          <li>Cybersecurity Fundamentals</li>
        </ul>

        <h2 className="section-title">Education</h2>
        <div className="edu-item">
          <div>
            <strong>Computer Programming Diploma</strong> — Sheridan College, Brampton,<br /> Canada, Ontario
          </div>
          <div>(Dec 2024)</div>
        </div>
        <div className="edu-item">
          <div>
            <strong>High School Diploma</strong> — Jagat Jyoti Public Sr Sec School, Amritsar,<br /> Punjab, India
          </div>
          <div>(May 2023)</div>
        </div>

        <h2 className="section-title">Projects</h2>
        <ul>
          <li><strong>Project 1:</strong> Short project description.</li>
          <li><strong>Project 2:</strong> Short project description.</li>
        </ul>

        <h2 className="section-title">Certificates</h2>
        <ul>
          <li>Cybersecurity Essentials</li>
          <li>Other certifications</li>
        </ul>
      </div>

      {/* ✅ Download Button Outside the pages */}
      <button className="button" type="button" onClick={handleDownload}>
        <span className="button__text">PDF Download</span>
        <span className="button__icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" className="svg">
            <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"/>
            <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"/>
            <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"/>
          </svg>
        </span>
      </button>
    </>
  );
};

export default Resume;
