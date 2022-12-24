import React, {useState} from 'react';
import Modal from './Modal'

const NotificationCard = ({ notification }) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  }
  const convertDate = (str) => {
    let d = new Date(str);
    return d.toDateString();
  }

  const compressBody = (str) => {
    if (str.length > 100) {
      str = str.slice(0, 100) + "..."
    }
    return str;
  }
  return (
    <div className="individual-notification" key={notification.id}>
      <h1>{notification.title}</h1>
      <h3>{convertDate(notification.created_at)}</h3>
      <p>{compressBody(notification.body)}</p>
      <button onClick={openModal}>Click Me For More Details</button>
      {showModal ? <Modal setShowModal={setShowModal} title={notification.title} body={notification.body} /> : null}
    </div>
  )
}

export default NotificationCard