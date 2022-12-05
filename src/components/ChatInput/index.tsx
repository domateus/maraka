import { RootState } from "@context/store";
import { uuidv4 } from "@utils";
import Image from "next/image";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
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
  images: { id: string; src: string }[];
};

const ChatInput: React.FC<{
  sendMessage: (payload: SendMessagePayload) => void;
}> = ({ sendMessage }) => {
  const { theme, userToChat } = useSelector(
    (state: RootState) => state.session
  );
  const { contacts } = useSelector((state: RootState) => state.contacts);

  const [text, setText] = useState("");
  const [encryption, setEncryption] = useState<EncryptionAlgorithm>("OTP");
  const [tooltipKey, resetTooltip] = useState(uuidv4());
  const [images, setImages] = useState<{ id: string; src: string }[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setText("");
      sendMessage({ text, encryption, images });
      setImages([]);
    }
  };

  const handleEncryptionChange = (algorithm: EncryptionAlgorithm) => {
    setEncryption(algorithm);
    resetTooltip(uuidv4());
  };

  return (
    <>
      <S.InputContainer>
        <S.Input
          disabled={!contacts.find((c) => c.name === userToChat)?.dhk}
          type="text"
          value={text}
          onKeyDown={handleKeyDown}
          onChange={(e) => setText(e.target.value)}
        />

        <S.Buttons>
          <S.FileButton>
            <label htmlFor="image-input">
              <GrAttachment color={images.length ? "green" : "black"} />
            </label>

            <input
              type="file"
              id="image-input"
              accept="image/jpeg, image/png, image/jpg"
              onChange={(e) => {
                if (!e.target.files?.length) return;
                // const url = URL.createObjectURL(e.target.files![0]);
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                  const url = reader.result;
                  setImages((prev) => [
                    ...prev,
                    { id: uuidv4(), src: `${url}` },
                  ]);
                });
                reader.readAsDataURL(e.target.files[0]);
              }}
            />
          </S.FileButton>
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
              sendMessage({ text, encryption, images });
              setImages([]);
            }}
          >
            <FiSend color="black" />
          </S.SendButton>
        </S.Buttons>
      </S.InputContainer>
      <div>
        {!!images.length && <h4>Images: </h4>}
        {(images || []).map((image) => (
          <Image
            layout="fixed"
            alt=""
            width={200}
            height={200}
            key={image.id}
            src={image.src}
          />
        ))}
      </div>
    </>
  );
};

export default ChatInput;
