import { ModalBtn } from "./ModalBtn";

interface ModalFooterProps {
  clearState?(): void;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;

  size?: string;
  onSubmit: () => void;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  clearState,
  setActive,

  size,
  onSubmit,
}) => {
  return (
    <footer className="modal__content-footer">
      <ModalBtn type="primary" size={size || ""} onClick={onSubmit}>
        Да
      </ModalBtn>
      <ModalBtn
        onClick={() => {
          clearState && clearState();
          setActive(false);
        }}
      >
        Закрыть
      </ModalBtn>
    </footer>
  );
};
