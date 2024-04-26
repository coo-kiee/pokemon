/* eslint-disable no-param-reassign */
import { ReactNode } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type ModalType = 'ALERT' | 'CONFIRM' | 'CUSTOM' | `CUSTOM${number}`;
export interface IModalInfo {
  component: JSX.Element | ReactNode;
  onConfirm?: () => void;
  onClose?: () => void;
}

// State
export type ModalState = {
  modal: {
    [key in ModalType]: IModalInfo;
  };
};

// Action
type ModalAction = {
  Alert: (props: IModalInfo) => void;
  Confirm: (props: IModalInfo) => void;
  Custom: (props: { type: 'CUSTOM' | `CUSTOM${number}` } & IModalInfo) => void;
  Close: (props: ModalType) => void;
};

const INITIAL: ModalState['modal'] = {
  ALERT: { component: null },
  CONFIRM: { component: null },
  CUSTOM: { component: null },
};

const useModalStore = create(
  immer<ModalState & ModalAction>((set) => ({
    modal: { ...INITIAL },
    Alert: (modalInfo) =>
      set((state) => {
        state.modal.ALERT = modalInfo;
      }),
    Confirm: (modalInfo) =>
      set((state) => {
        state.modal.CONFIRM = modalInfo;
      }),
    Custom: ({ type, ...modalInfo }) =>
      set((state) => {
        state.modal[type] = modalInfo;
      }),
    Close: (type) =>
      set((state) => {
        state.modal[type] = { component: null, onConfirm: undefined, onClose: undefined };
      }),
  })),
);

export default useModalStore;
