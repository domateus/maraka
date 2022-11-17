import styled from "styled-components";

export const Container = styled.div``;

export const Messages = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 60vh;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Message = styled.div<{ last?: boolean }>`
  margin: 0.5rem;
  padding: 0.2rem;
  width: max-content;
  min-width: 2rem;
  white-space: normal;
  max-width: 80%;
  > div:first-child {
    font-weight: bold;
  }
  div {
    width: max-content;
    max-width: inherit;
    word-wrap: wrap;
  }
`;

export const MyMessage = styled(Message)`
  background-color: ${({ theme }) => theme?.colors?.myMessage};
  align-self: flex-end;
  border-radius: ${({ last }) => (last ? "0.6rem" : "0.6rem 0.6rem 0 0.6rem")};
  color: ${({ theme }) => theme?.colors?.myMessageColor};
`;

export const TheirMessage = styled(Message)`
  background-color: ${({ theme }) => theme?.colors?.theirMessage};
  align-self: flex-start;
  border-radius: ${({ last }) => (last ? "0.6rem" : "0.6rem 0.6rem 0.6rem 0")};
  color: ${({ theme }) => theme?.colors?.theirMessageColor};
`;

export const Input = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0.3rem;
  border: 1px solid ${({ theme }) => theme?.colors?.nonary};
  border-radius: 0.6rem;
  background-color: #e0e0e0;
  color: black;
  font-size: 1.2rem;
  outline: none;
  &:focus {
    border: 1px solid ${({ theme }) => theme?.colors?.primary};
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem;
  position: relative;
`;

export const SendButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  cursor: pointer;
  position: absolute;
  top: 0.6rem;
  right: 0.4rem;
`;
