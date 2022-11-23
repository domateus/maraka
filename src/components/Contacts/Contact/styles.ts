import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Contact = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  border: 1px solid ${({ $selected }) => ($selected ? "#FFFF00" : "black")};
  "};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
    &:hover {
    background-color: #e0e0e0;
  }
`;
