import React, { useState, useRef, useEffect } from 'react';

const style = `
.trap-button-wrapper {
  position: relative;
  display: inline-block;
}

.trap-button {
  position: relative;
  z-index: 2;
  background: #8ECACC;
  color: white;
  border-radius: 5px;
  padding: 0.6rem 1.2rem;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  border: none;
}

.grabber {
  position: absolute;
  bottom: -55px;
  right: -40px;
  width: 90px;
  height: 100px;
  pointer-events: none;
}

.grabber__body {
  position: absolute;
  width: 30px;
  height: 30px;
  top: 50%;
  left: 25%;
  background: #7D9A9E;
  border-radius: 50%;
  transform: translateY(120%);
  transition: transform 0.3s ease;
  z-index: 1;
}

.grabber__face {
  position: absolute;
  width: 28px;
  height: 28px;
  top: 15%;
  left: 25%;
  transform: translateY(120%);
  transition: transform 0.3s ease;
  z-index: 3;
}

.grabber__arm-wrapper {
  position: absolute;
  top: 25px;
  left: 40%;
  width: 20px;
  height: 80px;
  transform-origin: top center;
  transition: transform 0.2s ease;
  z-index: 2;
}

.grabber__arm {
  position: relative;
  width: 20px;
  height: 80px;
  background: #7D9A9E;
  border-radius: 20px;
  transform: translateY(30%);
  transition: transform 0.3s ease;
}

.grabber__hand {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 35px;
  transform-origin: bottom center;
  cursor: pointer;
}

/* Show face and body when stalking or grabbing */
.grabber--stalking .grabber__body,
.grabber--grabbing .grabber__body {
  transform: translateY(0%);
}

.grabber--stalking .grabber__face,
.grabber--grabbing .grabber__face {
  transform: translateY(0%);
}

.grabber--stalking .grabber__arm {
  transform: translateY(30%);
}

.grabber--grabbing .grabber__arm {
  transform: translateY(0%);
}
`;

if (typeof document !== 'undefined' && !document.getElementById('trap-button-style')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'trap-button-style';
  styleEl.innerHTML = style;
  document.head.appendChild(styleEl);
}

const useHover = () => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const enter = () => setHovered(true);
    const leave = () => setHovered(false);

    node.addEventListener('mouseenter', enter);
    node.addEventListener('mouseleave', leave);

    return () => {
      node.removeEventListener('mouseenter', enter);
      node.removeEventListener('mouseleave', leave);
    };
  }, []);

  return [ref, hovered];
};

const ASSETS = {
  head: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/184729/head.svg',
  hand: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/184729/hand.svg',
};

const ResumeTrapButton = () => {
  const [ref, hovered] = useHover();
  const armWrapperRef = useRef();
  const [state, setState] = useState('waiting');

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [buttonPos, setButtonPos] = useState(null);

  useEffect(() => {
    const handleMove = e => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    if (hovered) setState('stalking');
    else setState('waiting');
  }, [hovered]);

  useEffect(() => {
    if (!buttonPos || !armWrapperRef.current) return;

    const centerX = buttonPos.left + buttonPos.width / 2;
    const centerY = buttonPos.top + buttonPos.height / 2;

    // Calculate vector from arm base (which is positioned relative to button)
    // Use button center as pivot
    const dx = mousePos.x - centerX;
    const dy = mousePos.y - centerY;

    // atan2 returns angle in radians; convert and adjust:
    // The arm image points "up" by default, so rotation 0deg = pointing straight up.
    // atan2(dx, -dy) gives angle with 0 at up direction.
    const angleDeg = Math.atan2(dx, -dy) * (180 / Math.PI);

    // Clamp angle for natural movement, e.g. between -80 and 80 degrees
    const clampedAngle = Math.max(-80, Math.min(80, angleDeg));

    armWrapperRef.current.style.transform = `rotate(${clampedAngle}deg)`;
  }, [mousePos, buttonPos]);

  useEffect(() => {
    if (ref.current) {
      setButtonPos(ref.current.getBoundingClientRect());
    }
  }, [ref.current]);

  const handleMouseEnterHand = () => {
    setState('grabbing');
    setTimeout(() => setState('waiting'), 1500);
  };

  return (
    <div className="trap-button-wrapper" ref={ref}>
      <button className="trap-button">Resume</button>
      <div className={`grabber grabber--${state}`}>
        <div className="grabber__body"></div>
        <img className="grabber__face" src={ASSETS.head} alt="head" />
        <div className="grabber__arm-wrapper" ref={armWrapperRef}>
          <div className="grabber__arm">
            <img
              className="grabber__hand"
              src={ASSETS.hand}
              alt="hand"
              onMouseEnter={handleMouseEnterHand}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTrapButton;
