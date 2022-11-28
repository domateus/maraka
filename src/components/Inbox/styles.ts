import styled from "styled-components";

export const Container = styled.div`
  width: 80%;
  max-width: 70vw;
  align-self: flex-end;
  position: relative;
`;

export const ScrollContainer = styled.div`
  position: absolute;
  bottom: 3rem;
  right: 2rem;
  color: ${({ theme }) => theme?.colors?.secondary};
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme?.colors?.primary};
  filter: drop-shadow(0px 0px 0.5rem ${({ theme }) => theme?.colors?.primary});
  border-radius: 50%;
  &:hover {
    filter: brightness(1.6);
    box-shadow: 0px 0px 1rem 0.2rem ${({ theme }) => theme?.colors?.primary};
  }
`;
