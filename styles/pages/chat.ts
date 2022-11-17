import styled from "styled-components";

export const Chat = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  max-height: 100vh;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  > div:nth-child(2) {
    width: 80%;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme?.colors?.tertiary};
  border-bottom: 1px solid ${({ theme }) => theme?.colors?.nonary};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
  margin: 0 auto;
`;
