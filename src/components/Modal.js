import React, {useRef} from 'react'
import ReactDom from 'react-dom';

const Modal = ({ setShowModal, body }) => {
  // close the modal when clicking outside the modal
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false)
    }
  }
  return ReactDom.createPortal (
    <div className='container' ref={modalRef} onClick={closeModal}>
      <div className='modal'>
        <p>{body}</p>
        <button onClick={() => setShowModal(false)}>x</button>
      </div>
    </div>,
    document.getElementById("portal")
  )
}

export default Modal