import React, {useState} from 'react';
import Modal from './Modal'

const NotificationCard = ({ notification, markReadStatus }) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(!showModal);
  }
  const convertDatetime = (str) => {
    const d = new Date(str);
    return d.toUTCString();
  }

  const compressBody = (str) => {
    str = str.slice(0, 100) + "...";
    return str;
  }

  return (
    <div className="individual-notification" key={notification.id}>
      <h1>{notification.title}</h1>
      <h3>{convertDatetime(notification.created_at)}</h3>
      {
        notification.body.length > 100 ? 
        <>
          <p>{compressBody(notification.body)}</p>
          <button className="read-more-btn" onClick={openModal}>Read More</button>
        </>
        :
        <p>{notification.body}</p>
      }
      <button className="read-status-btn" onClick={() => markReadStatus(notification.id, notification.to_read)}>
        {notification.to_read ? "Make As Unread" : "Make As Read"}
      </button>
      {
        showModal && 
        <Modal 
          setShowModal={setShowModal} 
          title={notification.title} 
          body={notification.body} 
          datetime={convertDatetime(notification.created_at)}
        />
      }
    </div>
  )
}

export default NotificationCard