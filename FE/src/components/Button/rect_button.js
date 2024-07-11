import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: auto;
  height: 70px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #e6e6e6;
  background: color(display-p3 0.902 0.902 0.902);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #000; /* Adjust the text color as needed */
  padding: 0 20px; /* Add padding for flexible width */
  border: none; /* Remove default button border */
  cursor: pointer;

  &:disabled {
    background: #bababa;
    background: color(display-p3 0.7291 0.7291 0.7291);
    cursor: not-allowed; /* Change cursor to not-allowed */
  }

  &:active {
    background: color(
      display-p3 0.6 0.6 0.6
    ); /* Darker background when active */
  }
  &:highlight {
    background: #2f2f2f;
    background: color(display-p3 0.1824 0.1824 0.1824);
  }
`;

const RectButton = ({ children, onClick, disabled }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default RectButton;
