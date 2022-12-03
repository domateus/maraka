import { commandSet, obey } from "@context/command";
import {
  canScrollToNewMessages,
  noMessagesToScrollTo,
} from "@context/contacts";
import { RootState } from "@context/store";
import { useObserver } from "@hooks";
import { useLayoutEffect, useMemo, useRef } from "react";
import { BsShieldLock } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import * as S from "../styles";

const TextMessage: React.FC<{
  message: Message<TextPayload>;
  isLast: boolean;
}> = ({ message, isLast }) => {
  const dispatch = useDispatch();
  const { theme, user, userToChat } = useSelector(
    (state: RootState) => state.session
  );
  const observer = useObserver({
    onVisible: () => dispatch(canScrollToNewMessages(userToChat)),
    onHidden: () => dispatch(noMessagesToScrollTo(userToChat)),
  });
  const { commands } = useSelector((state: RootState) => state.command);

  const messageRef = useRef<HTMLDivElement>(null);

  const align = message.from === user ? "right" : "left";

  useLayoutEffect(() => {
    if (messageRef.current && isLast) {
      if (message.from === user) {
        messageRef.current.scrollIntoView({ behavior: "smooth" });
      }
      observer.observe(messageRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [isLast, message.from, observer, user]);

  if (commands.length) {
    const command = commands.find(
      (command) => command.name === commandSet.SCROLL_DOWN
    );
    if (command && command.targetId === message.id) {
      dispatch(obey(command.name));
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }

  const encryptionInfo = useMemo(
    () => (
      <>
        <a data-for={message.id} data-tip="React-tooltip" data-event="click">
          <BsShieldLock size={20} />
        </a>
        <ReactTooltip
          id={message.id}
          effect="solid"
          type={theme === "light" ? "dark" : "light"}
          clickable={true}
          delayHide={200}
        >
          <b>encryption: </b>
          <span>{message.payload.encryption}</span>
          {message.from !== user && (
            <>
              <br />
              <b>hash match: </b>
              <span>{message.hashVerified ? "true" : "false"}</span>
            </>
          )}
          <S.xPadding size={0.1} />
        </ReactTooltip>
      </>
    ),
    [
      message.from,
      message.hashVerified,
      message.id,
      message.payload.encryption,
      theme,
      user,
    ]
  );

  return (
    <S.MessageContainer ref={messageRef} align={align}>
      {align === "right" && encryptionInfo}
      <S.Message align={message.from === user ? "right" : "left"}>
        <div>{message.from}</div>
        <div>{message.payload.text}</div>
      </S.Message>
      {align === "left" && encryptionInfo}
    </S.MessageContainer>
  );
};

export default TextMessage;
