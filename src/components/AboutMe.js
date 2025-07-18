import React, { Suspense, lazy, useState } from 'react';
import { motion } from 'framer-motion';

const Spline = lazy(() => import('@splinetool/react-spline'));

// Inline styles for sections, boxes, etc.
const sectionStyle = {
  height: '100vh',
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '60px 40px',
  color: '#222',
  fontFamily: "'Poppins', sans-serif",
  lineHeight: '1.8',
  fontSize: '1.25rem',
  textAlign: 'left',
  display: 'flex',
  justifyContent: 'center',    // center box horizontally
  alignItems: 'center',        // center box vertically
  position: 'sticky',
  top: 0,
  scrollSnapAlign: 'start',
  zIndex: 1,
};

const boxStyle = {
  backgroundColor: '#d1d1d1',  // solid light grey background (no transparency)
  padding: '40px 50px',
  borderRadius: '0px',         // sharp corners
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  maxWidth: '850px',
  width: '100%',
  color: '#111',
  boxSizing: 'border-box',
  transformStyle: 'preserve-3d',
  willChange: 'transform',
  transition: 'transform 0.2s ease-out',
};

const headingStyle = {
  fontSize: '3.2rem',
  fontWeight: '700',
  marginBottom: '24px',
  borderBottom: '4px solid #FF6F61',
  paddingBottom: '10px',
  maxWidth: 'fit-content',
  boxShadow: 'none',
  background: 'transparent',
};

const paragraphStyle = {
  marginBottom: '1.6rem',
};

const footerStyle = {
  padding: '20px 0',
  textAlign: 'center',
  fontSize: '1rem',
  color: '#888',
  fontFamily: "'Poppins', sans-serif",
  borderTop: '1px solid #ddd',
  position: 'relative',
  zIndex: 10,
};

export default function AboutMe() {
  const [splineLoaded, setSplineLoaded] = useState(false);

  const handleSplineLoad = () => setSplineLoaded(true);

  const ContentSection = ({ title, children }) => (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={sectionStyle}
    >
      <div style={boxStyle}>
        <h2 style={headingStyle}>{title}</h2>
        {children}
      </div>
    </motion.section>
  );

  return (
    <>
      {/* Global CSS for scroll snap and smooth scroll */}
      <style>{`
        html, body {
          height: 100%;
          margin: 0; padding: 0;
          scroll-behavior: smooth;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
        }
        #root, #app {
          height: 100vh;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
        }
      `}</style>

      <div style={{ backgroundColor: '#f9f9f9', overflowX: 'hidden' }}>
        {/* Hero with lazy-loaded Spline */}
        <Suspense
          fallback={
            <div
              style={{
                height: '100vh',
                width: '100vw',
                backgroundColor: '#f9f9f9',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.5rem',
                color: '#aaa',
              }}
            >
              Loading...
            </div>
          }
        >
          <div
            style={{
              height: '100vh',
              width: '100vw',
              position: 'relative',
              opacity: splineLoaded ? 1 : 0,
              transition: 'opacity 1.2s ease',
            }}
          >
            <Spline
              scene="https://prod.spline.design/tzulLegXrVaIbMVJ/scene.splinecode"
              onLoad={handleSplineLoad}
            />
            <div
              style={{
                position: 'absolute',
                zIndex: 10,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#111',
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.85)',
                padding: '3rem 4rem',
                borderRadius: '30px',
                maxWidth: '850px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              <p style={{ fontSize: '1.8rem', fontWeight: '400', margin: 0 }}>
                To learn more about me — just scroll down.
              </p>
            </div>
          </div>
        </Suspense>

        {/* Content Sections */}
        <ContentSection title="Summary">
          <p style={paragraphStyle}>
            Hello! I’m Kuldeep Singh, a graduate in Computer Programming from Sheridan College, Brampton. I have a strong foundation in software development and a deep passion for building innovative digital experiences.
          </p>
          <p style={paragraphStyle}>
            My journey into programming began shortly after completing high school. I started by learning the basics of web development and quickly became fascinated with how ideas turn into interactive applications. This curiosity soon evolved into a focused career path, leading me to pursue formal studies in Canada.
          </p>
        </ContentSection>

        <ContentSection title="Education">
          <p style={paragraphStyle}>
            I completed my High School Diploma in April 2023 from Jagat Jyoti Public Sr. Sec School, Amritsar, Punjab, India.
          </p>
          <p style={paragraphStyle}>
            Afterwards, I moved to Canada to further my education and completed a Diploma in Computer Programming from Sheridan College in Brampton, Ontario, graduating in December 2024.
          </p>
        </ContentSection>

        <ContentSection title="My Coding Journey">
          <p style={paragraphStyle}>
            I began coding after high school, starting with basic HTML and CSS, experimenting with small projects and layouts. With each step, I wanted to build more dynamic experiences, which led me to explore JavaScript and React.
          </p>
          <p style={paragraphStyle}>
            Over time, I became more involved in backend technologies like Java and Spring Boot, and worked with APIs and databases to build full-stack applications. The learning never stops, and I constantly push myself to grow as a developer by building, breaking, and rebuilding projects that reflect real-world challenges.
          </p>
        </ContentSection>

        <ContentSection title="Beyond the Code">
          <p style={paragraphStyle}>
            Beyond coding, I love to explore and live life outside the screen. I enjoy traveling to new places, learning about different cultures, and drawing inspiration from every experience.
          </p>
          <p style={paragraphStyle}>
            I regularly go to the gym to stay fit and focused. I also play video games, which spark my creativity and sharpen my reflexes. On top of that, I draw portraits as a way to express myself — it helps me stay connected to the artistic side of things.
          </p>
        </ContentSection>

        <ContentSection title="My Mindset">
          <p style={paragraphStyle}>
            I believe in staying curious, adaptable, and open to learning. Whether it’s debugging a tough piece of code or exploring a new tool, I try to approach every challenge with patience and persistence. Growth to me means evolving every day — not just in code, but in how I think and create.
          </p>
        </ContentSection>

        {/* Quote Full Section (no box) */}
        <section
          style={{
            height: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f9f9f9',
            padding: '0 20px',
            scrollSnapAlign: 'start',
          }}
        >
          <p
            style={{
              fontStyle: 'italic',
              fontSize: '3.5rem',
              color: '#FF6F61',
              maxWidth: '900px',
              textAlign: 'center',
              margin: 0,
              lineHeight: '1.2',
              fontWeight: '600',
            }}
          >
            “There is no right time. Sometimes, you just have to take the leap.”
          </p>
        </section>

        {/* Footer */}
        <footer style={footerStyle}>©Kuldeep Singh</footer>
      </div>
    </>
  );
}
