import React, { JSXElementConstructor, ReactElement } from "react";
import ReactDOM from "react-dom";
import { Box } from "../../display";
import { SerializedStyles } from "@emotion/react";
import styles from "./styles";

interface ModalProps {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  isOpen: boolean;
  onClose: () => void;
  css: SerializedStyles;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  css,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Box className="modal" onClick={onClose} css={styles} data-testid="modal">
      <Box className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close"
          onClick={onClose}
          name="close-modal"
          aria-label="Close"
        >
          &times;
        </button>
        {React.Children.map(children, (Child: React.ReactElement) => {
          return React.cloneElement(Child, { css });
        })}
      </Box>
    </Box>,
    document.getElementById("root") as HTMLElement
  );
};
