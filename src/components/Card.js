// src/components/Card.js
import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 1em;
  padding: 1em;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05); // Add hover effect to slightly zoom the card
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 1.2em;
  color: #333;
`;

const Description = styled.p`
  color: #666;
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
