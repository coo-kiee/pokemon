import { createPortal } from 'react-dom';
import useModalStore, { IModalInfo, ModalState } from 'stores/useModalStore';

const Modal = () => {
  const { modal, Close } = useModalStore((state) => ({
    modal: state.modal,
    Close: state.Close,
  }));

  const renderModal = (type: keyof ModalState['modal'], { component, onConfirm, onClose }: IModalInfo) => {
    if (!component) return null;

    const handleConfirm = () => {
      Close(type);

      if (onConfirm) onConfirm();
    };

    const handleClose = () => {
      Close(type);

      if (onClose) onClose();
    };

    let children;
    switch (type) {
      case 'ALERT':
        children = (
          <div>
            <div>{component}</div>
            <button type="button" onClick={handleClose}>
              확인
            </button>
          </div>
        );
        break;
      case 'CONFIRM':
        children = (
          <div>
            <div>{component}</div>
            <button type="button" onClick={handleConfirm}>
              취소
            </button>
            <button type="button" onClick={handleClose}>
              확인
            </button>
          </div>
        );
        break;

      default:
        children = component;
        break;
    }

    return createPortal(<>{children}</>, document.body);
  };

  return <>{Object.entries(modal).map(([type, modalInfo]) => renderModal(type as keyof typeof modal, modalInfo))}</>;
};

export default Modal;
