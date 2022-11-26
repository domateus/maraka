import styled from "styled-components";

export const Container = styled.ul`
  width: 100%;
  max-width: 200px;
  margin: 0;
  padding: 0.1rem;
  list-style: none;
`;

export const Contact = styled.li<{ $selected: boolean }>`
  border-bottom: 1px solid ${({ theme }) => theme?.colors?.nonary};
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 0.4rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${({ theme, $selected }) =>
    $selected ? theme?.colors?.nonary : "transparent"};

  &:hover {
    background-color: ${({ theme }) => theme?.colors?.nonary};
    filter: brightness(0.9);
  }
  span {
    max-width: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
