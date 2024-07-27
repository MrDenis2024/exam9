import React, {MouseEventHandler} from 'react';

interface Props extends React.PropsWithChildren {
  show: boolean;
  onClose: MouseEventHandler;
}

const Modal: React.FC<Props> = ({show, onClose, children}) => {
  return (
    <>
      <div className='modal-backdrop show' style={{display: show ? 'block' : 'none'}}/>
      <div className='modal show' style={{display: show ? 'block' : 'none'}} onClick={onClose}>
        <div className='modal-dialog' onClick={(event) => event.stopPropagation()}>
          <div className='modal-content'>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;