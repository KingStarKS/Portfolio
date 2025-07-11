import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import NameCard from "./NameCard"; // Adjust path if needed

const Profile = () => {
  const heroImageRef = useRef(null);
  const trapeziumRef = useRef(null);
  const detailsRef = useRef(null);
  const scrollTimeline = useRef(null);

  const [isTrapeziumOpen, setIsTrapeziumOpen] = useState(false);
  const [isClickable, setIsClickable] = useState(false);

  const createScrollTimeline = () => {
    if (!heroImageRef.current) return;

    scrollTimeline.current = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.8,
        onUpdate: (self) => {
          setIsClickable(self.progress > 0.5);
        },
      },
    });

    scrollTimeline.current.to(heroImageRef.current, {
      width: "300px",
      height: "50vh",
      borderRadius: "1rem",
      scale: 0.95,
      ease: "power4.out",
      transformOrigin: "center center",
    });

    scrollTimeline.current.to(
      heroImageRef.current,
      {
        y: "70vh",
        ease: "power4.out",
      },
      "<"
    );
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    createScrollTimeline();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (scrollTimeline.current) scrollTimeline.current.kill();
    };
  }, []);

  const openTrapezium = () => {
    setIsTrapeziumOpen(true);

    if (scrollTimeline.current) {
      scrollTimeline.current.kill();
      scrollTimeline.current = null;
    }

    const tl = gsap.timeline();

    tl.to(trapeziumRef.current, {
      clipPath: "polygon(0% 0%, 55% 20vh, 55% 80vh, 0% 100%)",
      backgroundColor: "#111",
      ease: "power4.out",
      duration: 0.8,
    });

    tl.to(
      heroImageRef.current,
      {
        clipPath: "polygon(0% 0%, 55% 8vh, 55% 42vh, 0% 50vh)",
        x: "-25%",
        y: "75vh",
        width: "40vw",
        height: "50vh",
        ease: "power4.out",
        duration: 0.8,
      },
      "<"
    );

    tl.fromTo(
      detailsRef.current,
      { autoAlpha: 0, x: 50 },
      { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );
  };

  const closeTrapezium = () => {
    if (scrollTimeline.current) {
      scrollTimeline.current.kill();
      scrollTimeline.current = null;
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    tl.to(detailsRef.current, {
      autoAlpha: 0,
      x: 50,
      duration: 0.3,
    });

    tl.to(
      [trapeziumRef.current, heroImageRef.current],
      {
        autoAlpha: 0,
        duration: 0.4,
      },
      "-=0.2"
    );

    tl.set(trapeziumRef.current, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      backgroundColor: "#fff",
    });
    tl.set(heroImageRef.current, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      width: "100vw",
      height: "50vh",
      x: "0%",
      y: "0vh",
      scale: 1,
    });

    tl.to(
      [trapeziumRef.current, heroImageRef.current],
      {
        autoAlpha: 1,
        duration: 0.4,
      }
    );

    tl.call(() => {
      setIsTrapeziumOpen(false);
      createScrollTimeline();
    });
  };

  return (
    <div className="profile-wrap">
      <style>{`
        body {
          margin: 0;
          background: #000;
          color: #fff;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          overflow-x: hidden;
        }
        .profile-wrap {
          overflow-x: hidden;
          user-select: none;
        }
        .hero {
          height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .name-card {
          height: 50vh;
          background: rgba(255, 255, 255, 0.05);
          z-index: 5;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .image-section {
          height: 50vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 20;
        }
        .image-wrapper {
          position: relative;
          width: 100vw;
          height: 50vh;
          overflow: hidden;
          backface-visibility: hidden;
          transform-style: preserve-3d;
          background: #222;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
          z-index: 30;
          cursor: ${isClickable && !isTrapeziumOpen ? "pointer" : "default"};
        }
        .image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
        }
        .gap-spacer {
          width: 100%;
          height: 100vh;
          position: relative;
          background: #fff;
          overflow: hidden;
          z-index: 10;
        }
        .details-wrapper {
          position: absolute;
          top: 100vh; left: 0; right: 0; bottom: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 2rem;
          z-index: 50;
          pointer-events: none;
        }
        /* Responsive Details Box */
        .details-box {
          width: 60vw;
          height: 80vh;
          max-height: 80vh;
          background: #fff;
          padding: 3rem 3rem 2rem 3rem;
          border-radius: 1.2rem;
          opacity: 0;
          pointer-events: none;
          box-shadow: 0 0 40px rgba(0,0,0,0.3);
          color: #222;
          transition: all 0.3s ease;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 1.25rem;
          line-height: 1.7;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          overflow-y: auto; /* scrollbar only if needed */
          scroll-behavior: smooth;
        }
        .details-box.show {
          opacity: 1;
          pointer-events: auto;
        }
        .details-box h2 {
          margin-top: 0;
          font-weight: 700;
          font-size: 2rem;
          color: #111;
        }
        .details-box p {
          margin-bottom: 1rem;
          color: #444;
        }
        .details-box a {
          display: inline-block;
          margin-top: 1.5rem;
          font-weight: 600;
          color: #007BFF;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.3s ease;
          font-size: 1.125rem;
        }
        .details-box a:hover,
        .details-box a:focus {
          color: #0056b3;
          outline: none;
          text-decoration: underline;
        }
        .details-box button {
          background: none;
          border: 2px solid #444;
          color: #444;
          padding: 0.5rem 1.2rem;
          margin-top: 1.5rem;
          cursor: pointer;
          border-radius: 0.5rem;
          align-self: flex-start;
          font-weight: 600;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .details-box button:hover,
        .details-box button:focus {
          background-color: #444;
          color: #fff;
          outline: none;
        }
        /* Tablet */
        @media (max-width: 1024px) {
          .details-box {
            width: 80vw;
            height: 70vh;
            max-height: 70vh;
            overflow-y: auto;
            scroll-behavior: smooth;
            font-size: 1.125rem;
            padding: 2.5rem 2.5rem 1.5rem 2.5rem;
          }
        }
        /* Phone */
        @media (max-width: 480px) {
          .details-box {
            width: 100vw;
            height: 100vh;
            max-height: 100vh;
            border-radius: 0;
            padding: 2rem;
            overflow-y: auto;
            scroll-behavior: smooth;
            font-size: 1rem;
            justify-content: flex-start;
          }
          .details-wrapper {
            justify-content: center;
            padding: 0;
          }
        }
        section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f9f9f9;
          color: #222;
        }
        footer {
          text-align: center;
          padding: 4rem 2rem;
          color: #777;
          background: #111;
        }
      `}</style>

      <div className="hero">
        <div className="name-card">
          <NameCard />
        </div>
        <div className="image-section">
          <div
            className="image-wrapper"
            ref={heroImageRef}
            onClick={isClickable && !isTrapeziumOpen ? openTrapezium : undefined}
          >
            <img
              src="https://assets.codepen.io/605876/model-shades.jpg?format=auto&quality=100"
              alt="Profile"
              draggable={false}
            />
          </div>
        </div>
      </div>

      <div
        className="gap-spacer"
        ref={trapeziumRef}
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          background: "#fff",
        }}
      ></div>

      <div className="details-wrapper">
        <div
          className={`details-box ${isTrapeziumOpen ? "show" : ""}`}
          ref={detailsRef}
        >
          <h2>Kuldeep Singh</h2>
          <p>
            I am a dedicated Computer Programming graduate from Sheridan College, based in Brampton, Ontario. Over the years, I have developed a solid foundation in software development through a combination of academic knowledge and hands-on solo projects.
          </p>
          <p>
            My technical expertise spans multiple programming languages and frameworks including Java, React, PHP, Spring Boot, and Python. These skills have enabled me to build full-stack applications with a focus on clean code, maintainability, and user experience.
          </p>
          <p>
            I am passionate about leveraging technology to solve real-world problems and continuously improving my skills by exploring new tools and methodologies.
          </p>
          <a
            href="/projects"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/projects";
            }}
            aria-label="View my projects"
          >
            View My Projects →
          </a>
          <button onClick={closeTrapezium} aria-label="Close details panel">
            Close ✕
          </button>
        </div>
      </div>

      <section>
        <h2>Keep scrolling.</h2>
      </section>

      <footer>© Kuldeep Singh</footer>
    </div>
  );
};

export default Profile;
