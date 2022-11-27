import styled from "styled-components";

export const Button = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: ${({ theme }) => theme?.colors?.secondary};
`;
