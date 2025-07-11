// src/components/GlobeComponent.js
import React, { useRef, useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import styled from 'styled-components';

// Styled container for globe & zoom controls
const GlobeWrapper = styled.div`
  position: relative;
  width: ${({ width }) => width || '400px'};
  height: ${({ height }) => height || '400px'};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
  background: #000;

  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.15);
  }
`;

const ZoomControls = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 10;
`;

const ZoomButton = styled.button`
  width: 36px;
  height: 36px;
  background: rgba(255,255,255,0.15);
  border: 1px solid #fff;
  border-radius: 50%;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  line-height: 1;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255,255,255,0.35);
  }
`;

// Create HTML label elements for markers
const createLabel = (d) => {
  const el = document.createElement('div');
  el.style.color = 'white';
  el.style.padding = '2px 6px';
  el.style.background = 'rgba(0, 0, 0, 0.7)';
  el.style.borderRadius = '4px';
  el.style.fontSize = '0.75rem';
  el.style.whiteSpace = 'nowrap';
  el.style.pointerEvents = 'none';
  el.innerText = d.label;
  return el;
};

const GlobeComponent = ({
  width = '400px',
  height = '400px',
  markers = [],
  animate = true,
}) => {
  const globeEl = useRef();
  const [distance, setDistance] = useState(1.3); // Camera altitude (zoom), smaller = closer
  const [isInteracting, setIsInteracting] = useState(false);

  // Zoom handlers: change altitude (distance)
  const zoomIn = () => setDistance(d => Math.max(1.2, d - 0.5));
  const zoomOut = () => setDistance(d => Math.min(10, d + 0.5));

  // Initialize globe on mount
  useEffect(() => {
    if (!globeEl.current || typeof globeEl.current.pointOfView !== 'function') return;

    // Center the globe on lat=0, lng=0
    globeEl.current.pointOfView({ lat: 0, lng: 0, altitude: distance }, 0);

    // Setup interaction event listeners for pausing rotation
    const globeCanvas = globeEl.current.renderer().domElement;

    const handlePointerDown = () => setIsInteracting(true);
    const handlePointerUp = () => setIsInteracting(false);
    const handlePointerLeave = () => setIsInteracting(false);
    const handlePointerEnter = () => setIsInteracting(true);

    globeCanvas.addEventListener('pointerdown', handlePointerDown);
    globeCanvas.addEventListener('pointerup', handlePointerUp);
    globeCanvas.addEventListener('pointerleave', handlePointerLeave);
    globeCanvas.addEventListener('mouseenter', handlePointerEnter);
    globeCanvas.addEventListener('mouseleave', handlePointerUp);

    return () => {
      globeCanvas.removeEventListener('pointerdown', handlePointerDown);
      globeCanvas.removeEventListener('pointerup', handlePointerUp);
      globeCanvas.removeEventListener('pointerleave', handlePointerLeave);
      globeCanvas.removeEventListener('mouseenter', handlePointerEnter);
      globeCanvas.removeEventListener('mouseleave', handlePointerUp);
    };
  }, [distance]);

  // Update camera altitude when distance changes (zoom)
  useEffect(() => {
    if (!globeEl.current || typeof globeEl.current.pointOfView !== 'function') return;
    globeEl.current.pointOfView({ lat: 0, lng: 0, altitude: distance }, 500);
  }, [distance]);

  // Auto-rotate globe unless interacting
  useEffect(() => {
    if (!globeEl.current || !animate) return;
    let frameId;

    const rotate = () => {
      if (!isInteracting && globeEl.current && typeof globeEl.current.pointOfView === 'function') {
        const pov = globeEl.current.pointOfView();
        if (pov) {
          const { lat, lng, altitude } = pov;
          globeEl.current.pointOfView({ lat, lng: lng + 0.2, altitude }, 0);
        }
      }
      frameId = requestAnimationFrame(rotate);
    };
    frameId = requestAnimationFrame(rotate);

    return () => cancelAnimationFrame(frameId);
  }, [animate, isInteracting]);

  return (
    <GlobeWrapper width={width} height={height}>
      <Globe
        ref={globeEl}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="rgba(0,0,0,0)"
        width={parseInt(width)}
        height={parseInt(height)}
        pointsData={markers}
        pointLat="lat"
        pointLng="lng"
        pointLabel="label"
        pointAltitude={0.01}
        pointColor={() => '#FF0080'}
        pointRadius={0.5}
        htmlElementsData={markers}
        htmlElement={createLabel}
        enablePointerInteraction={true}
      />
      <ZoomControls>
        <ZoomButton onClick={zoomIn} aria-label="Zoom in">+</ZoomButton>
        <ZoomButton onClick={zoomOut} aria-label="Zoom out">−</ZoomButton>
      </ZoomControls>
    </GlobeWrapper>
  );
};

export default GlobeComponent;
