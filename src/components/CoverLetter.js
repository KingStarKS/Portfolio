import React from 'react';

const CoverLetter = () => {
  return (
    <>
      <style>{`
        .cover-letter {
          font-family: 'Times New Roman', Times, serif;
          font-size: 12pt;
          color: #000;
          line-height: 1.5;
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

        .letter-content {
          text-align: left;
        }

        .letter-content p {
          margin-top: 0;
          margin-bottom: 1.5em;
        }

        /* ✅ Tablet responsiveness */
        @media (max-width: 768px) {
          .cover-letter {
            font-size: 10pt;
          }

          .header-box {
            flex-direction: column;
            align-items: flex-start;
          }

          .contact-block {
            margin-top: 1rem;
          }

          .contact-info {
            font-size: 10pt;
          }

          .name-block h1,
          .name-block h2 {
            font-size: 26pt;
          }
        }

        /* ✅ Phone responsiveness */
        @media (max-width: 480px) {
          .cover-letter {
            font-size: 9pt;
          }

          .header-box {
            padding: 0.5rem;
          }

          .contact-info {
            font-size: 9pt;
          }

          .name-block h1,
          .name-block h2 {
            font-size: 22pt;
          }
        }
      `}</style>

      <div className="cover-letter">
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

        <div className="letter-content">
          <p>Dear Hiring Manager,</p>
          <p>
            I am excited to submit my application for the Full Stack Developer role at your firm.
            With a strong foundation in software development and hands-on experience with JavaScript,
            React, Node.js, Spring Boot, and Python, I am confident that my technical skills align well
            with your company’s goals.
          </p>
          <p>
            Throughout my academic career and personal projects, I have built responsive web applications,
            developed RESTful APIs, and worked with both MySQL and NoSQL databases. I am comfortable using
            Git and GitHub for version control and thrive in Agile team environments where collaboration
            and clear communication are key. My growing expertise in cybersecurity fundamentals also enables
            me to develop secure, reliable solutions.
          </p>
          <p>
            I am eager to contribute my problem-solving abilities, commitment to clean code, and passion for
            learning new tools and frameworks to your innovative team. I believe my blend of technical
            knowledge and teamwork will allow me to add real value to your projects.
          </p>
          <p>
            Thank you for considering my application. I look forward to the opportunity to discuss how my
            skills and enthusiasm can benefit your organization.
          </p>
          <p>Sincerely,<br />Kuldeep Singh</p>
        </div>
      </div>
    </>
  );
};

export default CoverLetter;
