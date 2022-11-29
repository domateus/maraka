import { RootState } from "@context/store";
import { uuidv4 } from "@utils";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { SiLetsencrypt } from "react-icons/si";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";

const algorithms: EncryptionAlgorithm[] = [
  "Caesar cipher",
  "Monoalphabetic",
  "Polyalphabetic",
  "Hill cipher",
  "Playfair",
  "OTP",
  "Rail fence",
  "Columnar",
  "DES",
  "AES",
  "RC4",
  "RSA",
  "ECC",
];

import * as S from "./styles";

type SendMessagePayload = {
  text: string;
  encryption: EncryptionAlgorithm;
};

const ChatInput: React.FC<{
  sendMessage: (payload: SendMessagePayload) => void;
}> = ({ sendMessage }) => {
  const { theme } = useSelector((state: RootState) => state.session);

  const [text, setText] = useState("");
  const [encryption, setEncryption] = useState<EncryptionAlgorithm>("OTP");
  const [tooltipKey, resetTooltip] = useState(uuidv4());

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setText("");
      sendMessage({ text, encryption });
    }
  };

  const handleEncryptionChange = (algorithm: EncryptionAlgorithm) => {
    setEncryption(algorithm);
    resetTooltip(uuidv4());
  };

  return (
    <S.InputContainer>
      <S.Input
        type="text"
        value={text}
        onKeyDown={handleKeyDown}
        onChange={(e) => setText(e.target.value)}
      />
      <S.Buttons>
        <S.EncryptionButton>
          <a data-tip="React-tooltip" data-event="click">
            <SiLetsencrypt />
          </a>
          <ReactTooltip
            effect="solid"
            type={theme}
            clickable={true}
            delayHide={200}
            key={tooltipKey}
          >
            <S.List>
              {algorithms.map((algorithm) => (
                <S.ListItem
                  key={algorithm}
                  onClick={() => handleEncryptionChange(algorithm)}
                >
                  {algorithm}
                </S.ListItem>
              ))}
            </S.List>
          </ReactTooltip>
        </S.EncryptionButton>
        <S.SendButton
          onClick={() => {
            setText("");
            sendMessage({ text, encryption });
          }}
        >
          <FiSend color="black" />
        </S.SendButton>
      </S.Buttons>
    </S.InputContainer>
  );
};

export default ChatInput;
