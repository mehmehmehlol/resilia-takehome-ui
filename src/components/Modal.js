import React, {useRef} from 'react'
import ReactDom from 'react-dom';

const Modal = ({ setShowModal, title, body }) => {
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
        <div className='container-content'>
          <h1>{title}</h1>
          <p>{body}</p>
        </div>
        <button onClick={() => setShowModal(false)}>x</button>
      </div>
    </div>,
    document.getElementById("portal")
  )
}

export default Modal