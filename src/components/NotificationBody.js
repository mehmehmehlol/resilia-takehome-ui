import React, {useState} from 'react'
import '../styles/NotificationBody.css'
import Modal from './Modal';

const NotificationBody = ({ list }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  }

  const convertDate = (str) => {
    let d = new Date(str);
    return d.toDateString();
  }

  return (
    <div className='notification-list'>
      {
        list.map((l) => (
          <div className="indiviudal-notification" key={l.id}>
              <h1>{l.title}</h1>
              <p>{convertDate(l.created_at)}</p>
              <p>{l.body}</p>
              <button onClick={openModal}>Click Me For More Details</button>
            {showModal ? <Modal setShowModal={setShowModal} body={l.body} /> : null}
          </div>
        ))
      }
    </div>
  )
}

export default NotificationBody