// src/components/Card.js
import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 4px; /* sharper corners */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 1.5em;
  padding: 2em 2.5em;
  flex: 1 1 450px;  /* allow it to grow but set min width for laptop */
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: 
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.06);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 1.5em;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #222;
  margin-bottom: 0.75em;
  font-weight: 700;
`;

const Description = styled.p`
  color: #555;
  font-size: 1.1rem;
  line-height: 1.5;
  user-select: text;
`;

const Card = ({ image, title, description }) => {
  return (
    <CardContainer>
      {image && <Image src={image} alt={title} />}
      <Title>{title}</Title>
      <Description>{description}</Description>
    </CardContainer>
  );
};

export default Card;
