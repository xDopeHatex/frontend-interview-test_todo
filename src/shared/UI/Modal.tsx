/* VENDOR */

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/* APPLICATION */
import "./Modal.css";

interface ModalProps {
  item?: {
    id: string;
    name: string;
    description: string;
    category?: string;
  };
  active: boolean;

  children: React.ReactNode;
  clearState?(): void;
  onClickCloseHandler: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  onClickCloseHandler,
}) => {
  const elRef: React.MutableRefObject<any> = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot: HTMLElement = document.getElementById("modal")!;
    modalRoot!.appendChild(elRef.current);

    return () => modalRoot!.removeChild(elRef.current);
  }, []);

  let modalRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    let handler = (e: any) => {
      if (modalRef?.current === e.target) {
        onClickCloseHandler(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return createPortal(
    <>
      <div ref={modalRef} className="modal">
        <div className="modal__content">{children}</div>
      </div>
    </>,
    elRef.current,
  );
};
