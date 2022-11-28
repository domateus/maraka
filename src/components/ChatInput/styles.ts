import styled from "styled-components";

export const Input = styled.input`
  width: 80%;
  height: 90%;
  padding: 0.3rem;
  border: none;
  background-color: #e0e0e0;
  color: black;
  font-size: 1.2rem;
  outline: none;
  border-radius: inherit;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0.5rem;
  border: 1px solid ${({ theme }) => theme?.colors?.nonary};
  border-radius: 0.6rem;
  background-color: #e0e0e0;
  &:focus {
    border: 1px solid ${({ theme }) => theme?.colors?.primary};
  }
`;

export const SendButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  cursor: pointer;
`;

export const EncryptionButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  cursor: pointer;
`;

export const Buttons = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: inherit;
  justify-content: center;
`;

export const List = styled.ul`
  width: 100%;
  background-color: ${({ theme }) => theme?.colors?.primary};
  color: ${({ theme }) => theme?.colors?.secondary};
  border-radius: 0.6rem;
  padding: 0.5rem;
  list-style: none;
`;

export const ListItem = styled.li`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme?.colors?.primary};
    background-color: ${({ theme }) => theme?.colors?.secondary};
  }
`;
