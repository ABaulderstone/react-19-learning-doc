import { useLayoutEffect, useRef, useEffect, ReactNode } from 'react';
import styles from './Modal.module.scss';
export interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => unknown;
}
export const Modal = ({ isOpen, children, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    if (isOpen) {
      modalRef?.current?.showModal();
    } else {
      modalRef?.current?.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // target is dialog when clicking on backdrop.
      //contents div is 100% width and height so clicks in there will not close modal
      if (event.target === modalRef.current) {
        onClose();
      }
    };

    // need to do this to remove event listener when effect runs again. cleanup for component being completely unmounted
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      console.log('Unmount');
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <dialog className={styles.modal} ref={modalRef}>
      <div className={styles.contents}>
        <div>
          <button onClick={onClose}>Close</button>
        </div>
        {children}
      </div>
    </dialog>
  );
};
