import React, { useEffect, useRef, useState } from 'react';
import Delaunay from 'delaunay-fast';

export default function Skills() {
  const canvasRef = useRef(null);
  const prompt = 'kuldeep@portfolio:~$ ';
  const inputRef = useRef(null);

  const [lines, setLines] = useState([`${prompt}Press Enter to see skills list...`]);
  const [stage, setStage] = useState('start');
  const [input, setInput] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [terminalClicked, setTerminalClicked] = useState(false);

  const skillCategories = [
    {
      id: 1,
      title: 'Backend',
      details: [
        { name: 'Node.js (Express, NestJS)', img: '/skills/nodejs.png' },
        { name: 'Java Spring Boot', img: '/skills/springboot.png' },
        { name: 'Python Django / Flask', img: '/skills/python.png' },
        { name: 'Databases: MySQL, MongoDB, PostgreSQL', img: '/skills/database.png' },
        { name: 'REST & GraphQL APIs', img: '/skills/api.png' },
        { name: 'Docker & Kubernetes', img: '/skills/docker.png' },
      ],
    },
    {
      id: 2,
      title: 'Frontend',
      details: [
        { name: 'React.js, Redux', img: '/skills/react.png' },
        { name: 'Vue.js', img: '/skills/vue.png' },
        { name: 'HTML5, CSS3, Sass', img: '/skills/htmlcss.png' },
        { name: 'TypeScript & JavaScript', img: '/skills/typescript.png' },
        { name: 'Responsive Design', img: '/skills/responsive.png' },
        { name: 'Testing (Jest, Cypress)', img: '/skills/testing.png' },
      ],
    },
    {
      id: 3,
      title: 'DevOps & Tools',
      details: [
        { name: 'Git & GitHub', img: '/skills/git.png' },
        { name: 'CI/CD (GitHub Actions, Jenkins)', img: '/skills/cicd.png' },
        { name: 'AWS & Azure basics', img: '/skills/aws.png' },
        { name: 'Linux CLI', img: '/skills/linux.png' },
        { name: 'Docker Compose', img: '/skills/docker-compose.png' },
        { name: 'Monitoring & Logging', img: '/skills/monitoring.png' },
      ],
    },
    {
      id: 4,
      title: 'Others',
      details: [
        { name: 'Agile & Scrum Methodology', img: '/skills/agile.png' },
        { name: 'TDD & BDD', img: '/skills/tdd.png' },
        { name: 'Unit & Integration Testing', img: '/skills/testing.png' },
        { name: 'REST API Design', img: '/skills/api.png' },
        { name: 'Problem Solving & Algorithms', img: '/skills/algorithms.png' },
      ],
    },
  ];

  useEffect(() => {
    if (inputRef.current && stage !== 'done') {
      inputRef.current.focus();
    }
  }, [lines, stage]);

  const onTerminalClick = () => {
    if (stage === 'done') {
      setLines([`${prompt}Press Enter to see skills list...`]);
      setStage('start');
      setSelectedSkill(null);
      setInput('');
      setTerminalClicked(false);
    } else if (!terminalClicked) {
      setTerminalClicked(true);
    }
  };

  const onInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      const trimmed = input.trim();

      if (trimmed === 'restart') {
        setLines([`${prompt}Press Enter to see skills list...`]);
        setStage('start');
        setSelectedSkill(null);
        setInput('');
        setTerminalClicked(false);
        return;
      }

      if (stage === 'start') {
        setLines((prev) => [
          ...prev,
          `${prompt}${trimmed}`,
          'Choose a skill category by number:',
          skillCategories.map((cat) => `${cat.id}. ${cat.title}`).join('\n'),
          "Type 'q' to quit or 'restart' to restart.",
        ]);
        setStage('menu');
        setInput('');
      } else if (stage === 'menu') {
        if (trimmed === 'q') {
          setLines((prev) => [...prev, `${prompt}${trimmed}`, 'Goodbye!']);
          setStage('done');
          setInput('');
          setSelectedSkill(null);
          setTerminalClicked(false);
          return;
        }
        const choice = parseInt(trimmed, 10);
        const selected = skillCategories.find((cat) => cat.id === choice);
        if (selected) {
          setSelectedSkill(selected);
          setLines((prev) => [
            ...prev,
            `${prompt}${trimmed}`,
            `--- ${selected.title} Skills ---`,
            "See the skills cards on the right.",
            "\nType 'b' to go back, 'q' to quit, or 'restart' to restart.",
          ]);
          setStage('detail');
          setInput('');
        } else {
          setLines((prev) => [
            ...prev,
            `${prompt}${trimmed}`,
            'Invalid choice. Please enter a valid number or q to quit.',
          ]);
          setInput('');
        }
      } else if (stage === 'detail') {
        if (trimmed === 'b') {
          setSelectedSkill(null);
          setLines((prev) => [
            ...prev,
            `${prompt}${trimmed}`,
            'Choose a skill category by number:',
            skillCategories.map((cat) => `${cat.id}. ${cat.title}`).join('\n'),
            "Type 'q' to quit or 'restart' to restart.",
          ]);
          setStage('menu');
          setInput('');
        } else if (trimmed === 'q') {
          setLines((prev) => [...prev, `${prompt}${trimmed}`, 'Goodbye!']);
          setStage('done');
          setInput('');
          setSelectedSkill(null);
          setTerminalClicked(false);
        } else {
          setLines((prev) => [
            ...prev,
            `${prompt}${trimmed}`,
            "Invalid command. Type 'b' to go back, 'q' to quit, or 'restart' to restart.",
          ]);
          setInput('');
        }
      }
    }
  };


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    const particleCount = 40;
    const flareCount = 10;
    const motion = 0.05;
    const tilt = 0.05;
    const color = '#FFEED4';
    const particleSizeBase = 1;
    const particleSizeMultiplier = 0.5;
    const flareSizeBase = 100;
    const flareSizeMultiplier = 100;
    const lineWidth = 1;
    const linkChance = 75;
    const linkLengthMin = 5;
    const linkLengthMax = 7;
    const linkOpacity = 0.25;
    const linkFade = 90;
    const linkSpeed = 1;
    const glareAngle = -60;
    const glareOpacityMultiplier = 0.05;
    const renderParticles = true;
    const renderParticleGlare = true;
    const renderFlares = true;
    const renderLinks = true;
    const renderMesh = false;
    const flicker = true;
    const flickerSmoothing = 15;
    const blurSize = 0;
    const orbitTilt = true;
    const randomMotion = true;
    const noiseLength = 1000;
    const noiseStrength = 1;

    let mouse = { x: 0, y: 0 };
    let n = 0;
    const nAngle = (Math.PI * 2) / noiseLength;
    const nRad = 100;
    const nScale = 0.5;
    let nPos = { x: 0, y: 0 };
    const points = [];
    let vertices = [];
    const triangles = [];
    const links = [];
    const particles = [];
    const flares = [];

    // Resize canvas to full window size * devicePixelRatio
    function resize() {
      canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.width * (canvas.clientHeight / canvas.clientWidth);
    }

    // Utility functions from your original code
    function random(min, max, float) {
      return float
        ? Math.random() * (max - min) + min
        : Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function sizeRatio() {
      return canvas.width >= canvas.height ? canvas.width : canvas.height;
    }

    function position(x, y, z) {
      return {
        x:
          x * canvas.width +
          (((canvas.width / 2 - mouse.x + (nPos.x - 0.5) * noiseStrength) * z) * motion),
        y:
          y * canvas.height +
          (((canvas.height / 2 - mouse.y + (nPos.y - 0.5) * noiseStrength) * z) * motion),
      };
    }

    function noisePoint(i) {
      const a = nAngle * i;
      const cosA = Math.cos(a);
      const sinA = Math.sin(a);
      const rad = nRad;
      return {
        x: rad * cosA,
        y: rad * sinA,
      };
    }

    // Particle class
    function Particle() {
      this.x = random(-0.1, 1.1, true);
      this.y = random(-0.1, 1.1, true);
      this.z = random(0, 4);
      this.color = color;
      this.opacity = random(0.1, 1, true);
      this.flicker = 0;
      this.neighbors = [];
    }
    Particle.prototype.render = function () {
      const pos = position(this.x, this.y, this.z);
      const r = (this.z * particleSizeMultiplier + particleSizeBase) * (sizeRatio() / 1000);
      let o = this.opacity;

      if (flicker) {
        const newVal = random(-0.5, 0.5, true);
        this.flicker += (newVal - this.flicker) / flickerSmoothing;
        this.flicker = Math.min(Math.max(this.flicker, -0.5), 0.5);
        o += this.flicker;
        o = Math.min(Math.max(o, 0), 1);
      }

      context.fillStyle = this.color;
      context.globalAlpha = o;
      context.beginPath();
      context.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false);
      context.fill();
      context.closePath();

      if (renderParticleGlare) {
        context.globalAlpha = o * glareOpacityMultiplier;
        context.ellipse(
          pos.x,
          pos.y,
          r * 100,
          r,
          ((glareAngle - (nPos.x - 0.5) * noiseStrength * motion) * Math.PI) / 180,
          0,
          2 * Math.PI,
          false
        );
        context.fill();
        context.closePath();
      }

      context.globalAlpha = 1;
    };

    // Flare class
    function Flare() {
      this.x = random(-0.25, 1.25, true);
      this.y = random(-0.25, 1.25, true);
      this.z = random(0, 2);
      this.color = color;
      this.opacity = random(0.001, 0.01, true);
    }
    Flare.prototype.render = function () {
      const pos = position(this.x, this.y, this.z);
      const r = (this.z * flareSizeMultiplier + flareSizeBase) * (sizeRatio() / 1000);
      context.beginPath();
      context.globalAlpha = this.opacity;
      context.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false);
      context.fillStyle = this.color;
      context.fill();
      context.closePath();
      context.globalAlpha = 1;
    };

    // Link class
    function Link(startVertex, numPoints) {
      this.length = numPoints;
      this.verts = [startVertex];
      this.stage = 0;
      this.linked = [startVertex];
      this.distances = [];
      this.traveled = 0;
      this.fade = 0;
      this.finished = false;
    }
    Link.prototype.render = function () {
      let points, pos, p, i;
      switch (this.stage) {
        case 0: // Vertex collection
          const last = particles[this.verts[this.verts.length - 1]];
          if (last && last.neighbors && last.neighbors.length > 0) {
            const neighbor = last.neighbors[random(0, last.neighbors.length - 1)];
            if (this.verts.indexOf(neighbor) === -1) {
              this.verts.push(neighbor);
            }
          } else {
            this.stage = 3;
            this.finished = true;
          }
          if (this.verts.length >= this.length) {
            for (i = 0; i < this.verts.length - 1; i++) {
              const p1 = particles[this.verts[i]];
              const p2 = particles[this.verts[i + 1]];
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              this.distances.push(dist);
            }
            this.stage = 1;
          }
          break;

        case 1: // Render line animation
          if (this.distances.length > 0) {
            points = [];
            for (i = 0; i < this.linked.length; i++) {
              p = particles[this.linked[i]];
              pos = position(p.x, p.y, p.z);
              points.push([pos.x, pos.y]);
            }
            const linkSpeedRel = (linkSpeed * 0.00001 * canvas.width);
            this.traveled += linkSpeedRel;
            const d = this.distances[this.linked.length - 1];
            if (this.traveled >= d) {
              this.traveled = 0;
              this.linked.push(this.verts[this.linked.length]);
              p = particles[this.linked[this.linked.length - 1]];
              pos = position(p.x, p.y, p.z);
              points.push([pos.x, pos.y]);
              if (this.linked.length >= this.verts.length) {
                this.stage = 2;
              }
            } else {
              const a = particles[this.linked[this.linked.length - 1]];
              const b = particles[this.verts[this.linked.length]];
              const t = d - this.traveled;
              const x = (this.traveled * b.x + t * a.x) / d;
              const y = (this.traveled * b.y + t * a.y) / d;
              const z = (this.traveled * b.z + t * a.z) / d;
              pos = position(x, y, z);
              points.push([pos.x, pos.y]);
            }
            this.drawLine(points);
          } else {
            this.stage = 3;
            this.finished = true;
          }
          break;

        case 2: // Fade out
          if (this.verts.length > 1) {
            if (this.fade < linkFade) {
              this.fade++;
              points = [];
              const alpha = (1 - this.fade / linkFade) * linkOpacity;
              for (i = 0; i < this.verts.length; i++) {
                p = particles[this.verts[i]];
                pos = position(p.x, p.y, p.z);
                points.push([pos.x, pos.y]);
              }
              this.drawLine(points, alpha);
            } else {
              this.stage = 3;
              this.finished = true;
            }
          } else {
            this.stage = 3;
            this.finished = true;
          }
          break;

        case 3: // Finished
        default:
          this.finished = true;
          break;
      }
    };
    Link.prototype.drawLine = function (points, alpha = linkOpacity) {
      if (points.length > 1 && alpha > 0) {
        context.globalAlpha = alpha;
        context.beginPath();
        for (let i = 0; i < points.length - 1; i++) {
          context.moveTo(points[i][0], points[i][1]);
          context.lineTo(points[i + 1][0], points[i + 1][1]);
        }
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.stroke();
        context.closePath();
        context.globalAlpha = 1;
      }
    };

    // Initialize particles and links
    function startLink(vertex, length) {
      links.push(new Link(vertex, length));
    }

    // Initialization function
    function init() {
      points.length = 0;
      vertices.length = 0;
      triangles.length = 0;
      links.length = 0;
      particles.length = 0;
      flares.length = 0;

      resize();

      mouse.x = canvas.clientWidth / 2;
      mouse.y = canvas.clientHeight / 2;

      // Create particles and points
      for (let i = 0; i < particleCount; i++) {
        const p = new Particle();
        particles.push(p);
        points.push([p.x * 1000, p.y * 1000]); // c = 1000
      }

      // Triangulate points with delaunay-fast
      vertices = Delaunay.triangulate(points);

      // Create triangles groups of 3 indices
      let tri = [];
      for (let i = 0; i < vertices.length; i++) {
        if (tri.length === 3) {
          triangles.push(tri);
          tri = [];
        }
        tri.push(vertices[i]);
      }

      // Assign neighbors to particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = 0; j < triangles.length; j++) {
          const k = triangles[j].indexOf(i);
          if (k !== -1) {
            triangles[j].forEach((value) => {
              if (value !== i && particles[i].neighbors.indexOf(value) === -1) {
                particles[i].neighbors.push(value);
              }
            });
          }
        }
      }

      // Create flares
      if (renderFlares) {
        for (let i = 0; i < flareCount; i++) {
          flares.push(new Flare());
        }
      }
    }

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      if (randomMotion) {
        n++;
        if (n >= noiseLength) n = 0;
        nPos = noisePoint(n);
      }

      context.clearRect(0, 0, canvas.width, canvas.height);

      if (blurSize > 0) {
        context.shadowBlur = blurSize;
        context.shadowColor = color;
      }

      if (renderParticles) {
        for (let i = 0; i < particleCount; i++) {
          particles[i].render();
        }
      }

      if (renderMesh) {
        context.beginPath();
        for (let v = 0; v < vertices.length - 1; v++) {
          if ((v + 1) % 3 === 0) continue;
          const p1 = particles[vertices[v]];
          const p2 = particles[vertices[v + 1]];
          const pos1 = position(p1.x, p1.y, p1.z);
          const pos2 = position(p2.x, p2.y, p2.z);
          context.moveTo(pos1.x, pos1.y);
          context.lineTo(pos2.x, pos2.y);
        }
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.stroke();
        context.closePath();
      }

      if (renderLinks) {
        if (random(0, linkChance) === linkChance) {
          const length = random(linkLengthMin, linkLengthMax);
          const start = random(0, particles.length - 1);
          startLink(start, length);
        }
        for (let l = links.length - 1; l >= 0; l--) {
          if (links[l] && !links[l].finished) {
            links[l].render();
          } else {
            links.splice(l, 1);
          }
        }
      }

      if (renderFlares) {
        for (let j = 0; j < flareCount; j++) {
          flares[j].render();
        }
      }
    }

    // Setup mouse movement for interaction
    if ('ontouchstart' in document.documentElement && window.DeviceOrientationEvent) {
      window.addEventListener(
        'deviceorientation',
        (e) => {
          mouse.x = canvas.clientWidth / 2 - (e.gamma / 90) * (canvas.clientWidth / 2) * 2;
          mouse.y = canvas.clientHeight / 2 - (e.beta / 90) * (canvas.clientHeight / 2) * 2;
        },
        true
      );
    } else {
      document.body.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      });
    }

    // Start everything
    init();
    animate();

    // Resize listener
    window.addEventListener('resize', resize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', resize);
      document.body.removeEventListener('mousemove', () => {});
    };
  }, []);
  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          background: 'radial-gradient(ellipse at center, #31102F 0%, #280B29 100%)',
        }}
      />

      <div className="header">Skills Terminal</div>

      <div className="wrapper">
        <div
          className={`terminal-container ${terminalClicked ? 'clicked' : ''}`}
          onClick={onTerminalClick}
          role="main"
          tabIndex={0}
        >
          {lines.map((line, i) => (
            <div key={i} className="terminal-line" style={{ whiteSpace: 'pre-wrap' }}>
              {line.startsWith(prompt) ? (
                <>
                  <span className="prompt">{prompt}</span>
                  <span>{line.slice(prompt.length)}</span>
                </>
              ) : (
                <span>{line}</span>
              )}
            </div>
          ))}

          {stage !== 'done' && (
            <div className="terminal-line input-line">
              <span className="prompt">{prompt}</span>
              <div style={{ position: 'relative', flex: 1 }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  className="terminal-input"
                  placeholder="Type here..."
                  autoComplete="off"
                  spellCheck="false"
                />
                <span className="caret" aria-hidden="true" />
              </div>
            </div>
          )}
        </div>

        <div className={`cards-panel ${terminalClicked && selectedSkill ? 'visible' : ''}`}>
          {selectedSkill &&
            selectedSkill.details.map((skill, i) => (
              <div key={i} className="card">
                <img src={skill.img} alt={skill.name} />
                <div className="card-name">{skill.name}</div>
              </div>
            ))}
        </div>
      </div>

      <style>{`
      body {
  margin: 0;
  background: #2c0e36;
  overflow: hidden;
}

.header {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: monospace;
  font-size: 1.8rem;
  color: teal;
  z-index: 1000;
  user-select: none;
  text-align: center;
  width: 100%;
  max-width: 900px;
  pointer-events: none; /* So clicks pass through header */
}

.wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  z-index: 1;
}

.terminal-container {
  background: #f5f5f5;
  color: #222;
  font-family: monospace;
  font-size: 1rem;
  border-radius: 10px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  width: 50vw;
  max-width: 800px;
  height: 600px;
  overflow-y: auto;
  cursor: pointer;
  transition: transform 0.5s ease, width 0.5s ease;
}

.terminal-container.clicked {
  cursor: auto;
  width: 45vw;
  max-width: 700px;
  transform: translateX(-5vw);
}

.cards-panel {
  margin-left: 2rem;
  width: 35vw;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}

.cards-panel.visible {
  opacity: 1;
  pointer-events: auto;
}

.card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.card img {
  max-width: 60px;
  height: auto;
}

.card-name {
  margin-top: 0.5rem;
  font-weight: bold;
  font-size: 0.9rem;
}

.prompt {
  color: teal;
  font-weight: bold;
}

.input-line {
  display: flex;
  align-items: center;
  margin-top: 1rem;
}

.terminal-input {
  background: transparent;
  border: none;
  outline: none;
  color: #222;
  font-family: monospace;
  font-size: 1rem;
  flex: 1;
  caret-color: teal;
  position: relative;
}

.caret {
  position: absolute;
  right: 0;
  background: teal;
  width: 8px;
  height: 1rem;
  display: inline-block;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
}

/* Responsive tweaks */
@media (max-width: 1024px) {
  .wrapper {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 5rem; /* To avoid overlap with fixed header */
  }

  .terminal-container,
  .terminal-container.clicked {
    width: 90vw;
    max-width: none;
    transform: none;
    margin-bottom: 2rem;
    height: 500px;
  }

  .cards-panel {
    width: 90vw;
    margin-left: 0;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    opacity: 1 !important;
    pointer-events: auto !important;
  }

  .header {
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .header {
    left: 1rem;
    transform: none;
    text-align: left;
    width: auto;
    font-size: 1.4rem;
  }

  .wrapper {
    padding-top: 4rem;
    height: auto;
    min-height: 100vh;
  }

  .terminal-container {
    font-size: 0.85rem;
    height: 400px;
    padding: 1.5rem;
  }

  .cards-panel {
    grid-template-columns: 1fr;
  }

  .card {
    padding: 1rem;
  }

  .card img {
    max-width: 40px;
  }

  .card-name {
    font-size: 0.85rem;
  }
}


      `}</style>
    </>
  );
}
