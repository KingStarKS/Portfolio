// src/components/Navbar.js
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";

// === Animations ===
const smoothSlideIn = keyframes`
  0% { transform: translateX(120%) translateY(50%) rotate(-8deg); opacity: 0; }
  30% { transform: translateX(20%) translateY(10%) rotate(3deg); opacity: 1; }
  60% { transform: translateX(-5%) translateY(2%) rotate(-1deg); }
  80% { transform: translateX(2%) translateY(0%) rotate(0.5deg); }
  100% { transform: translateX(0%) translateY(0%) rotate(0deg); }
`;

const slideOut = keyframes`
  0% { transform: translateX(0%) translateY(0%) rotate(0deg); opacity: 1; }
  50% { transform: translateX(5%) translateY(-5%) rotate(-5deg); opacity: 0.7; }
  100% { transform: translateX(120%) translateY(50%) rotate(10deg); opacity: 0; }
`;

// === Styled Components ===
const ButtonRow = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 11000;
  display: flex;
  gap: 1rem;
`;

const BaseButton = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #fff;
  transition: all 450ms ease-in-out;
  background: ${({ darkMode }) =>
    darkMode
      ? "linear-gradient(40deg, #8983F7, #A3DAFB 70%)"
      : "linear-gradient(40deg, #FF0080, #FF8C00 70%)"};

  &:hover {
    box-shadow:
      inset 0px 1px 0px rgba(255, 255, 255, 0.4),
      inset 0px -4px 0px rgba(0, 0, 0, 0.2),
      0 0 0 4px rgba(255, 255, 255, 0.2),
      0 0 180px 0 ${({ darkMode }) => (darkMode ? "#8983F7" : "#FF0080")};
    transform: translateY(-2px);
  }
`;

const MenuButton = styled(BaseButton)`
  width: 15em;
  height: 5em;
  border-radius: 3em;

  @media (max-width: 768px) {
    width: 10em;
    height: 3.5em;
  }
`;

const BackButton = styled(BaseButton)`
  width: 5em;
  height: 5em;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 3.5em;
    height: 3.5em;
  }
`;

// Fix for warning: prevent 'hasMounted' prop forwarded to DOM
const SideMenu = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "hasMounted",
})`
  position: fixed;
  top: 7rem;
  right: 5em;
  width: 40vw;
  max-width: 600px;
  min-width: 240px;
  background: ${({ darkMode }) =>
    darkMode
      ? "linear-gradient(40deg, #8983F7, #A3DAFB 70%)"
      : "linear-gradient(40deg, #FF0080, #FF8C00 70%)"};
  border-radius: 20px;
  padding: 2em;
  box-shadow: -4px 4px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 2em;
  z-index: 10500;

  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: translateX(120%);

  ${({ isOpen, hasMounted }) =>
    hasMounted &&
    (isOpen
      ? css`
          animation: ${smoothSlideIn} 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        `
      : css`
          animation: ${slideOut} 1s ease forwards;
        `)}

  @media (max-width: 768px) {
    top: 6rem;
    right: 1rem;
    width: calc(100vw - 2rem);
    max-width: 100%;
    border-radius: 20px;
    padding: 2em 1.5em;
  }
`;

const SideMenuItem = styled(Link)`
  color: white;
  font-weight: bold;
  text-decoration: none;
  font-size: 2.5rem;
  cursor: pointer;
  user-select: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6347;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ArrowIcon = styled.span`
  font-size: 1.5rem;
  line-height: 1;
`;

const Sparkle = styled.svg`
  fill: white;
  transition: all 500ms ease;

  ${MenuButton}:hover & {
    transform: scale(1.2);
  }
`;

const Text = styled.span`
  font-weight: 600;
  color: inherit;
  font-size: medium;

  @media (max-width: 768px) {
    font-size: small;
  }
`;

// === Navbar Component ===

const Navbar = ({ darkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setHasMounted(true);
  };

  const goBack = () => navigate(-1);

  return (
    <>
      <ButtonRow>
        {location.pathname !== "/" && (
          <BackButton onClick={goBack} darkMode={darkMode} aria-label="Go back">
            <ArrowIcon>&larr;</ArrowIcon>
          </BackButton>
        )}

        <MenuButton
          onClick={toggleMenu}
          darkMode={darkMode}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <Sparkle
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L15 8l6 1-4.5 4 1 6-5-3-5 3 1-6-4.5-4 6-1z" />
          </Sparkle>
          <Text>{menuOpen ? "Close" : "Menu"}</Text>
        </MenuButton>
      </ButtonRow>

      <SideMenu isOpen={menuOpen} hasMounted={hasMounted} darkMode={darkMode}>
        <SideMenuItem to="/" onClick={() => setMenuOpen(false)}>
          Home
        </SideMenuItem>
        <SideMenuItem to="/about" onClick={() => setMenuOpen(false)}>
          About
        </SideMenuItem>
        <SideMenuItem to="/contact" onClick={() => setMenuOpen(false)}>
          Contact
        </SideMenuItem>
      </SideMenu>
    </>
  );
};

export default Navbar;
