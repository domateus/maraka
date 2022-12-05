import styled from "styled-components";

export const Messages = styled.div`
  height: 60vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MessageContainer = styled.div<{ align: "left" | "right" }>`
  display: flex;
  align-items: center;
  justify-content: ${({ align }) =>
    align === "left" ? "flex-start" : "flex-end"};
  position: relative;
`;

export const Message = styled.div<{ last?: boolean; align: "left" | "right" }>`
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
  background-color: ${({ theme, align }) =>
    align === "left" ? theme?.colors?.theirMessage : theme?.colors?.myMessage};
  align-self: ${({ align }) => (align === "left" ? "flex-start" : "flex-end")};
  border-radius: ${({ last, align }) =>
    last
      ? align === "left"
        ? "0.6rem 0.6rem 0.6rem 0"
        : "0.6rem 0.6rem 0 0.6rem"
      : "0.6rem"};
  color: ${({ theme, align }) =>
    align === "left"
      ? theme?.colors?.theirMessageColor
      : theme?.colors?.myMessageColor};
`;

export const xPadding = styled.div<{ size?: number }>`
  margin-bottom: ${({ size }) => (size ? `${size}rem` : "0.5rem")};
`;

export const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
`;

export const Image = styled.img<{ src: string }>`
  max-width: 100%;
  max-height: 100%;
  border-radius: 0.1rem;
  background-image: ${({ src }) => src};
`;
